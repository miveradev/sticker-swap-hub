import { LayoutGrid } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full py-16 bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-foreground" />
          <span className="text-lg font-bold tracking-tight text-foreground">Sticker Swap Hub</span>
        </div>
        <nav className="flex gap-6 flex-wrap justify-center">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Album
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Compare Collections
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms
          </a>
        </nav>
        <span className="text-sm text-muted-foreground text-center">
          © 2026 Sticker Swap Hub.
          <br />
          Track. Compare. Trade.
        </span>
      </div>
    </footer>
  )
}
