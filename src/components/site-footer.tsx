import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="font-display text-xl font-bold">
            FIN<span className="text-forge">TUBE</span>
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Precision finned tubes engineered for heat exchangers, economisers and air-cooled
            condensers across power, petrochemical and HVAC industries.
          </p>
        </div>
        <div>
          <h4 className="eyebrow">Navigate</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                About us
              </Link>
            </li>
            <li>
              <Link to="/products" className="transition-colors hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow">Works</h4>
          <address className="mt-4 space-y-2 text-sm not-italic text-muted-foreground">
            <p>Plot 42, Industrial Estate</p>
            <p>Pune, Maharashtra 411019</p>
            <p>+91 20 4890 1200</p>
            <p>sales@fintube.co</p>
          </address>
        </div>
      </div>
      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FinTube Engineering. All rights reserved.
      </div>
    </footer>
  );
}
