import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DashShell } from "@/components/commi/dash-sidebar";
import { SOL_USD } from "@/components/commi/data";

export const Route = createFileRoute("/dashboard/servicios")({
  head: () => ({ meta: [{ title: "Servicios — COMMI" }] }),
  component: () => (
    <DashShell title="Servicios">
      <div className="mb-6 flex justify-end">
        <button className="btn-press inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Crear servicio
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {[
          { name: "Retrato", tiers: [{ n: "Basic", sol: 0.5, days: 5 }, { n: "Standard", sol: 1.2, days: 7 }, { n: "Premium", sol: 2.5, days: 12 }] },
          { name: "Personaje completo", tiers: [{ n: "Basic", sol: 1.0, days: 7 }, { n: "Standard", sol: 2.2, days: 14 }, { n: "Premium", sol: 4.0, days: 21 }] },
        ].map((s) => (
          <div key={s.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft card-lift">
            <h3 className="text-lg font-bold">{s.name}</h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {s.tiers.map((t) => (
                <div key={t.n} className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
                  <p className="text-xs font-bold">{t.n}</p>
                  <p className="mono mt-1 text-lg font-extrabold text-primary">{t.sol}</p>
                  <p className="text-[10px] text-muted-foreground">SOL · ${(t.sol * SOL_USD).toFixed(0)}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{t.days}d</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashShell>
  ),
});