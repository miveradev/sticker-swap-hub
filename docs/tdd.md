# Technical Design Document (TDD) v1

# 1. Arquitectura general

## Stack final

```
Next.js 15 (App Router)
TypeScript
PostgreSQL
Prisma ORM
Better Auth (Google OAuth)
TailwindCSS
shadcn/ui
Vercel (hosting)
Neon (DB)
```

---

## Arquitectura lógica

```
Client (React)
   ↓
Server Actions / Route Handlers
   ↓
Prisma ORM
   ↓
PostgreSQL (Neon)
```

---

## Filosofía

- Fullstack en Next.js (sin backend separado)
- Server Actions para mutaciones rápidas
- Route Handlers solo si hace falta API externa
- UI optimista para UX fluida

---

# 2. Modelo de Base de Datos (Prisma)

## User

```graphql
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  stickers  UserSticker[]
}
```

---

## Album

```graphql
model Album {
  id          String   @id @default(cuid())
  code        String   @unique
  name        String
  description String?
  isActive    Boolean  @default(true)

  stickers    Sticker[]
}
```

---

## Sticker

```graphql
model Sticker {
  id        String @id @default(cuid())
  albumId   String

  code      String
  name      String
  section   String
  position  Int

  album     Album  @relation(fields: [albumId], references: [id])

  userStickers UserSticker[]

  @@unique([albumId, code])
}
```

---

## UserSticker

```graphql
model UserSticker {
  id         String @id @default(cuid())

  userId     String
  stickerId  String

  quantity   Int @default(0)

  user       User    @relation(fields: [userId], references: [id])
  sticker    Sticker @relation(fields: [stickerId], references: [id])

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([userId, stickerId])
}
```

---

# 3. Estrategia de datos clave

## Regla importante

```
Si quantity = 0 → no existe fila en DB
```

---

## Interpretación

| quantity | significado |
| -------- | ----------- |
| 0        | no existe   |
| 1        | pegado      |
| 2        | 1 repetido  |
| 3        | 2 repetidos |

---

# 4. Server Actions (núcleo del sistema)

## updateStickerQuantity

```tsx
updateStickerQuantity(userId, stickerId, delta);
```

### lógica:

```
si no existe:
  crear con quantity = 1

si existe:
  quantity += delta

si quantity <= 0:
  borrar registro
```

---

## ventajas

- idempotente
- simple
- perfecto para UI de + / -
- optimizable con optimistic UI

---

# 5. Queries clave del sistema

## Obtener álbum completo de usuario

```sql
UserSticker
+ Sticker
WHERE userId= ?
```

---

## Cromos faltantes

```sql
Sticker LEFT JOIN UserSticker
WHERE UserSticker IS NULL OR quantity = 0
```

---

## Repetidos

```sql
quantity > 1
```

---

## Comparación entre usuarios

### A puede dar a B

```sql
A.quantity > 1
AND B.quantity IS NULL OR 0
```

---

### B puede dar a A

(simétrico)

---

# 6. Estrategia de comparación (IMPORTANTE)

Esto es el core del producto.

---

## Input

```
userA
userB
```

---

## Output

```
A → B potential swaps
B → A potential swaps
score
```

---

## Algoritmo

1. Traer UserSticker de A
2. Traer UserSticker de B
3. Mapear en memoria
4. Comparar sets

---

## Complejidad

```
O(n)
n = 980
```

Perfectamente aceptable.

---

# 7. Estructura del proyecto Next.js

```
src/
  app/
    (auth)/
    (public)/
    dashboard/
    album/[albumCode]/
    u/[username]/

  components/
    ui/

  features/
    album/
    sticker/
    profile/
    comparison/

  lib/
    prisma/
    auth/
    i18n/
    utils/

  server/
    actions/
      sticker.ts
      user.ts
      comparison.ts

  prisma/
    schema.prisma

  messages/
    en.json
    es.json
```

---

# 8. Seed del sistema

## Archivo CSV → Prisma seed

```
scripts/seed-album.ts
```

---

Flujo:

```
1. Leer CSV
2. Crear Album
3. Insertar Stickers
4. Ordenar por position
```

---

# 9. Auth Strategy

## Better Auth

Provider:

```
Google OAuth
```

---

Flujo:

```
Login Google
→ Callback
→ Create User (if not exists)
→ Redirect dashboard
```

---

# 10. UI Strategy

## Principio clave

```
No modals para acciones core
```

---

## Interacción principal

Grid:

```
[ ESP10 ]
[ Pedri ]

[- 3 +]
```

---

## Optimistic UI obligatorio

Porque:

- interacción constante
- baja latencia percibida
- experiencia app-like

---

# 11. Performance Strategy

## Cargar álbum

- SSR inicial
- cache en server
- hydration parcial

---

## Updates

- Server Actions
- debounce opcional (300ms futuro)

---

# 12. Internacionalización

## next-intl

Estructura:

```
/messages/en.json
/messages/es.json
```

---

Ejemplo:

```json
{
  "album.title": "My Album"
}
```

---

# 13. Deployment

## Vercel

- frontend + backend
- edge functions si necesario

---

## Neon

- PostgreSQL serverless
- autoscaling
- free tier suficiente

---

# 14. Observability (MVP mínimo)

No meter:

- Sentry (opcional después)
- logs avanzados

Solo:

- console logs
- Vercel analytics (opcional)

---

# 15. Riesgos técnicos

## Riesgo 1: UI lenta en grid grande

Mitigación:

- virtualización futura (solo si hace falta)

---

## Riesgo 2: abuso de updates (spam clicks)

Mitigación:

- rate limiting futuro
- debounce client-side

---

## Riesgo 3: comparación costosa a futuro

Mitigación:

- cache de comparación (V2 si escala)

---

# 16. MVP Completion Criteria

El sistema está listo cuando:

- Usuario puede loguearse con Google
- Puede cargar su colección
- Puede modificar cromos en grid
- Puede ver perfil público
- Puede comparar con otro usuario
- Puede compartir su URL
