import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onOpenSample }) {
  const { pathname } = useLocation();

  const item = (to, label) => (
    <Link
      to={to}
      className={`link ${pathname === to ? "text-[var(--accent)]" : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <header className="navbar sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        {/* App name / logo */}
        <Link to="/" className="link text-lg font-semibold">FabricHub</Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          {item("/", "Home")}
          {item("/collections", "Collections")}
          {item("/about", "About")}
          {item("/partnerships", "Partnerships")}
          {item("/contact", "Contact")}
        </div>

        {/* CTA */}
        <button
          type="button"
          className="btn"
          onClick={() => onOpenSample?.()}
        >
          Request Sample
        </button>
      </nav>
    </header>
  );
}
