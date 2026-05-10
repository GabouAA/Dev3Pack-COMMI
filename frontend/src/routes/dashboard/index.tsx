import { createFileRoute, Link } from "@tanstack/react-router";
import { Coins, Star, Lock, TrendingUp } from "lucide-react";
import { DashShell } from "@/components/commi/dash-sidebar";
import { useCountUp } from "@/components/commi/theme";
import { commissions, SOL_USD } from "@/components/commi/data";
import { SolanaLogo } from "@/components/commi/doodles";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — COMMI" }] }),
  component: DashHome,
});

function StatCard({ icon: Icon, label, value, suffix, mono }: any) {
  const v = useCountUp(value);
  return (
    <div className="card-lift rounded-2xl border border-border bg-card p-5 shadow-soft">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-extrabold ${mono ? "mono" : ""}`}>
        {value < 100 ? v.toFixed(1) : Math.round(v)}{suffix}
      </p>
    </div>
  );
}

function DashHome() {
  return (
    <DashShell>
      <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-deep p-8 text-primary-foreground shadow-lift">
        <p className="text-sm opacity-80">Bienvenida</p>
        <h2 className="mt-1 text-3xl font-extrabold">Hola, Luna ✨</h2>
        <p className="mt-1 opacity-90">Tienes 3 comisiones activas y 4.2 SOL en escrow.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Coins} label="Total ganado" value={12.4} suffix=" SOL" mono />
        <StatCard icon={TrendingUp} label="Activas" value={3} suffix="" />
        <StatCard icon={Star} label="Calificación" value={4.9} suffix="" mono />
        <StatCard icon={Lock} label="En escrow" value={4.2} suffix=" SOL" mono />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Actividad reciente</h3>
            <Link to="/dashboard/comisiones" className="text-xs font-semibold text-primary">Ver todo →</Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {commissions.map((c) => (
              <li key={c.id} className="flex items-center gap-4 py-3">
                <img src={c.thumbnail} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold">{c.title}</p>
                  <p className="text-xs text-muted-foreground">@{c.buyer} · etapa {c.stage}/4</p>
                </div>
                <span className="mono text-sm font-bold text-primary">{c.amountSol} SOL</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-lg font-bold">Acciones rápidas</h3>
          <div className="mt-4 space-y-3">
            <Link to="/dashboard/portafolio" className="btn-press block rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
              Subir nueva obra
            </Link>
            <Link to="/dashboard/servicios" className="btn-press block rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground">
              Crear nuevo servicio
            </Link>
            <Link to="/dashboard/wallet" className="btn-press block rounded-xl border border-border px-4 py-3 text-sm font-semibold">
              Ver wallet
            </Link>
          </div>
          <div className="mt-6 rounded-xl bg-secondary p-3 text-xs">
            <span className="inline-flex items-center gap-2"><SolanaLogo className="h-4 w-6" /> Wallet conectada</span>
            <p className="mono mt-1 text-muted-foreground">8kJq...1dd2</p>
          </div>
        </div>
      </div>
    </DashShell>
  );
}