import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { BrushUnderline } from "./doodles";
import { ThemeToggle } from "./theme";

const links = [
  { label: "Comisiones", to: "/artistas" },
  { label: "Compra", to: "/artistas" },
  { label: "Artistas", to: "/artistas" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="relative text-2xl font-extrabold tracking-tight text-brown">
            COMMI
            <BrushUnderline className="absolute -bottom-2 left-0 h-2 w-full text-primary" />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="nav-link text-sm font-medium text-foreground/80 hover:text-foreground"
              data-active={path === l.to}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/registro"
            className="btn-press rounded-full border-2 border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
          >
            Soy un ilustrador
          </Link>
          <Link
            to="/registro"
            className="btn-press rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary-deep"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            Registrarme
          </Link>
          <ThemeToggle />
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-lg px-3 py-2 text-foreground hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="rounded-full border-2 border-primary px-4 py-2 text-center font-semibold text-primary"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="rounded-full bg-primary px-4 py-2 text-center font-semibold text-primary-foreground"
            >
              Registrarme
            </Link>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}