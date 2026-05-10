import { Link, useRouterState } from "@tanstack/react-router";
import {
  Image as ImageIcon,
  Wallet,
  Palette,
  Plus,
  Wrench,
  ClipboardList,
  ScrollText,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { BrushUnderline, SolanaLogo } from "./doodles";

type NavItem = {
  to: string;
  label: string;
  icon: typeof Home;
  exact?: boolean;
};

const items: NavItem[] = [
  { to: "/dashboard", label: "Inicio", icon: Home, exact: true },
  { to: "/dashboard/portafolio", label: "Portafolio", icon: ImageIcon },
  { to: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { to: "/dashboard/comisiones", label: "Comisiones", icon: Palette },
  { to: "/dashboard/publicar", label: "Publicar", icon: Plus },
  { to: "/dashboard/servicios", label: "Servicios", icon: Wrench },
  { to: "/dashboard/formularios", label: "Formularios", icon: ClipboardList },
  { to: "/dashboard/politicas", label: "Políticas", icon: ScrollText },
];

export function DashSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="border-b border-sidebar-border p-5">
        <Link to="/" className="relative inline-block text-2xl font-extrabold text-brown">
          COMMI
          <BrushUnderline className="absolute -bottom-2 left-0 h-2 w-full text-primary" />
        </Link>
      </div>
      <div className="flex items-center gap-3 border-b border-sidebar-border p-4">
        <img src="https://i.pravatar.cc/100?img=47" alt="" className="h-10 w-10 rounded-full" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">Luna Vargas</p>
          <p className="mono truncate text-[11px] text-muted-foreground">@lunaink</p>
        </div>
      </div>
      <div className="px-4 py-3 text-xs">
        <div className="flex items-center justify-between rounded-xl bg-secondary p-3">
          <span className="text-muted-foreground">Saldo</span>
          <span className="mono inline-flex items-center gap-1 font-bold">
            <SolanaLogo className="h-3 w-5" /> 12.4 SOL
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((it) => {
          const active = it.exact ? path === it.to : path.startsWith(it.to);
          return (
          <Link
              key={it.to}
              to={it.to as any}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "hover:bg-secondary"
              }`}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3 space-y-1 text-sm">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-secondary">
          <Settings className="h-4 w-4" /> Ajustes
        </button>
        <Link to="/login" className="flex items-center gap-3 rounded-xl px-3 py-2 text-destructive hover:bg-secondary">
          <LogOut className="h-4 w-4" /> Salir
        </Link>
      </div>
    </aside>
  );
}

export function DashShell({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashSidebar />
      <main className="flex-1 min-w-0">
        {title && (
          <header className="sticky top-0 z-30 border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
            <h1 className="text-xl font-extrabold">{title}</h1>
          </header>
        )}
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}