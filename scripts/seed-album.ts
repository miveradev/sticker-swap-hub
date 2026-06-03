import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// ── Types ──────────────────────────────────────────────────────────────────────

interface RawRow {
  position: string;
  code: string;
  name: string;
  section: string;
  section_name: string;
  _line: number;
}

interface ValidRow {
  position: number;
  code: string;
  name: string;
  section: string;
  sectionName: string;
}

interface SectionDef {
  slug: string;
  name: string;
  sortOrder: number;
}

export interface AlbumConfig {
  slug: string;
  name: string;
  description?: string;
  csvPath: string;
}

interface ValidationResult {
  rows: ValidRow[];
  errors: string[];
  warnings: string[];
}

// ── CSV Parser ─────────────────────────────────────────────────────────────────

function splitCsvLine(line: string): string[] {
  const fields: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (ch === "," && !quoted) {
      fields.push(field.trim());
      field = "";
    } else {
      field += ch;
    }
  }
  fields.push(field.trim());
  return fields;
}

function parseCsv(filePath: string): RawRow[] {
  const abs = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(abs)) throw new Error(`CSV not found: ${abs}`);

  const lines = fs
    .readFileSync(abs, "utf-8")
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0);

  if (lines.length < 2) throw new Error("CSV is empty or has no data rows");

  const headers = splitCsvLine(lines[0]);
  const REQUIRED = [
    "position",
    "code",
    "name",
    "section",
    "section_name",
  ] as const;

  const colIndex = {} as Record<(typeof REQUIRED)[number], number>;
  for (const col of REQUIRED) {
    const idx = headers.indexOf(col);
    if (idx === -1) throw new Error(`CSV missing required column: "${col}"`);
    colIndex[col] = idx;
  }

  return lines.slice(1).map((line, i) => {
    const cols = splitCsvLine(line);
    return {
      position: cols[colIndex.position] ?? "",
      code: cols[colIndex.code] ?? "",
      name: cols[colIndex.name] ?? "",
      section: cols[colIndex.section] ?? "",
      section_name: cols[colIndex.section_name] ?? "",
      _line: i + 2,
    };
  });
}

// ── Validation ─────────────────────────────────────────────────────────────────

function validateRows(raw: RawRow[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const rows: ValidRow[] = [];
  const seenPositions = new Map<number, number>();
  const seenCodes = new Map<string, number>();

  for (const r of raw) {
    const at = `Line ${r._line}`;
    const fieldErrors: string[] = [];

    if (!r.position.trim()) fieldErrors.push("missing position");
    if (!r.code.trim()) fieldErrors.push("missing code");
    if (!r.section.trim()) fieldErrors.push("missing section");
    if (!r.section_name.trim()) fieldErrors.push("missing section_name");

    if (fieldErrors.length > 0) {
      errors.push(`${at}: ${fieldErrors.join(", ")}`);
      continue;
    }

    const position = Number(r.position);
    if (!Number.isInteger(position) || position < 1) {
      errors.push(`${at}: position "${r.position}" must be a positive integer`);
      continue;
    }

    if (seenPositions.has(position)) {
      warnings.push(
        `${at}: duplicate position ${position} (first at line ${seenPositions.get(position)}), row skipped`
      );
      continue;
    }

    if (seenCodes.has(r.code)) {
      warnings.push(
        `${at}: duplicate code "${r.code}" (first at line ${seenCodes.get(r.code)}), row skipped`
      );
      continue;
    }

    seenPositions.set(position, r._line);
    seenCodes.set(r.code, r._line);

    rows.push({
      position,
      code: r.code,
      name: r.name.trim(),
      section: r.section,
      sectionName: r.section_name.trim(),
    });
  }

  return { rows, errors, warnings };
}

// ── Section extraction ─────────────────────────────────────────────────────────

function extractSections(rows: ValidRow[]): SectionDef[] {
  const map = new Map<string, SectionDef>();
  for (const row of rows) {
    if (!map.has(row.section)) {
      map.set(row.section, {
        slug: row.section,
        name: row.sectionName,
        sortOrder: map.size,
      });
    }
  }
  return [...map.values()];
}

// ── DB client ──────────────────────────────────────────────────────────────────

function createClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

// ── Logging ────────────────────────────────────────────────────────────────────

const log = (msg: string) => console.log(msg);
const warn = (msg: string) => console.warn(`[WARN] ${msg}`);
const logError = (msg: string) => console.error(`[ERROR] ${msg}`);

// ── Seed ───────────────────────────────────────────────────────────────────────

export async function seedAlbum(config: AlbumConfig): Promise<void> {
  const t0 = Date.now();

  // 1. Parse
  log(`\nReading CSV: ${config.csvPath}`);
  const raw = parseCsv(config.csvPath);
  log(`  Rows in file: ${raw.length}`);

  // 2. Validate
  log("\nValidating rows...");
  const { rows, errors, warnings } = validateRows(raw);

  warnings.forEach(warn);

  if (errors.length > 0) {
    errors.forEach(logError);
    throw new Error(`Seed aborted: ${errors.length} validation error(s)`);
  }

  const skippedInCsv = raw.length - rows.length;
  log(`  Valid: ${rows.length} | Skipped (CSV duplicates): ${skippedInCsv}`);

  const sectionDefs = extractSections(rows);
  log(`  Unique sections: ${sectionDefs.length}`);

  // 3. Seed DB
  const prisma = createClient();

  try {
    // 3a. Album
    log(`\nAlbum: "${config.name}"`);
    const existingAlbum = await prisma.album.findUnique({
      where: { slug: config.slug },
      select: { id: true },
    });

    const album = await prisma.album.upsert({
      where: { slug: config.slug },
      create: {
        slug: config.slug,
        name: config.name,
        ...(config.description != null && { description: config.description }),
      },
      update: {},
      select: { id: true, name: true, slug: true },
    });

    log(
      existingAlbum
        ? `  [FOUND]   id=${album.id}`
        : `  [CREATED] id=${album.id}`
    );

    // 3b. Sections — find-or-create individually to track counts and build ID map
    log("\nSections:");
    let sectionsCreated = 0;
    const sectionIdMap = new Map<string, string>();

    for (const def of sectionDefs) {
      const existing = await prisma.section.findUnique({
        where: { albumId_slug: { albumId: album.id, slug: def.slug } },
        select: { id: true },
      });

      if (existing) {
        sectionIdMap.set(def.slug, existing.id);
        log(`  [FOUND]   ${def.slug} — ${def.name}`);
      } else {
        const created = await prisma.section.create({
          data: {
            albumId: album.id,
            slug: def.slug,
            name: def.name,
            sortOrder: def.sortOrder,
          },
          select: { id: true },
        });
        sectionIdMap.set(def.slug, created.id);
        sectionsCreated++;
        log(`  [CREATED] ${def.slug} — ${def.name}`);
      }
    }

    log(
      `  => ${sectionsCreated} created, ${sectionDefs.length - sectionsCreated} already existed`
    );

    // 3c. Stickers — bulk insert with duplicate skipping inside a transaction
    log("\nStickers:");
    const stickerPayload = rows.map((row) => ({
      albumId: album.id,
      sectionId: sectionIdMap.get(row.section)!,
      code: row.code,
      name: row.name,
      position: row.position,
    }));

    const inserted = await prisma.$transaction(
      (tx) =>
        tx.sticker.createManyAndReturn({
          data: stickerPayload,
          skipDuplicates: true,
          select: { id: true },
        }),
      { timeout: 30_000 }
    );

    const stickersCreated = inserted.length;
    const stickersSkipped = rows.length - stickersCreated;

    log(`  [CREATED] ${stickersCreated}`);
    if (stickersSkipped > 0) {
      warn(`${stickersSkipped} sticker(s) already existed in DB and were skipped`);
    }

    // 4. Summary
    const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
    log("\n--------------------------");
    log("  Seed complete");
    log(`  Album:    ${existingAlbum ? "found" : "created"}`);
    log(
      `  Sections: ${sectionsCreated} created, ${sectionDefs.length - sectionsCreated} found`
    );
    log(
      `  Stickers: ${stickersCreated} created, ${stickersSkipped} skipped`
    );
    log(`  Time:     ${elapsed}s`);
    log("--------------------------\n");
  } finally {
    await prisma.$disconnect();
  }
}

// ── Entry point ────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  log("Sticker Swap Hub -- Album Seeder");
  log("==================================");

  await seedAlbum({
    slug: "world-cup-2026",
    name: "FIFA World Cup 2026",
    csvPath: "data/world-cup-2026.csv",
  });
}

main().catch((err: unknown) => {
  console.error("[FATAL]", err instanceof Error ? err.message : err);
  process.exit(1);
});
