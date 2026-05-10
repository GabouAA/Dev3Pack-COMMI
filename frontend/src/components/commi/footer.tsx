import { Link } from "@tanstack/react-router";
import { SolanaLogo, BrushUnderline } from "./doodles";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="relative inline-block text-2xl font-extrabold text-brown">
            COMMI
            <BrushUnderline className="absolute -bottom-2 left-0 h-2 w-full text-primary" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            La primera plataforma descentralizada para ilustradores. Cobra en SOL,
            trabaja sin fronteras.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-foreground">Plataforma</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/artistas" className="hover:text-primary">Comisiones</Link></li>
            <li><Link to="/artistas" className="hover:text-primary">Portafolio</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-primary" href="#">Políticas</a></li>
            <li><a className="hover:text-primary" href="#">Términos</a></li>
            <li><a className="hover:text-primary" href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold text-foreground">Comunidad</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-primary" href="#">Twitter / X</a></li>
            <li><a className="hover:text-primary" href="#">Discord</a></li>
            <li><a className="hover:text-primary" href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <span>© 2025 COMMI. Hecho con ♥ para ilustradores.</span>
          <span className="inline-flex items-center gap-2">
            Construido sobre Solana <SolanaLogo className="h-4 w-6" />
          </span>
        </div>
      </div>
    </footer>
  );
}