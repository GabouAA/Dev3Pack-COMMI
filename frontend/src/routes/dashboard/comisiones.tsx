import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Lock, Clock, MessageSquare } from "lucide-react";
import { DashShell } from "@/components/commi/dash-sidebar";
import { commissions, STAGES } from "@/components/commi/data";

export const Route = createFileRoute("/dashboard/comisiones")({
  head: () => ({ meta: [{ title: "Comisiones — COMMI" }] }),
  component: ComisionesPage,
});

const TABS = ["Activas", "Completadas", "Canceladas", "Como comprador"];

function ComisionesPage() {
  const [tab, setTab] = useState(TABS[0]);
  return (
    <DashShell title="Comisiones">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`btn-press rounded-full px-4 py-2 text-sm font-semibold ${
              tab === t ? "bg-primary text-primary-foreground" : "border border-border bg-card"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {commissions.map((c) => (
          <div key={c.id} className="card-lift overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
              <img src={c.thumbnail} alt="" className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold">{c.type}</span>
                  <span className="mono text-[11px] text-muted-foreground">#{c.id}</span>
                </div>
                <h3 className="mt-1 font-bold">{c.title}</h3>
                <p className="text-xs text-muted-foreground">comprador @{c.buyer}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {STAGES.map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                        i < c.stage ? "bg-primary/15 text-primary" :
                        i === c.stage ? "bg-gold/30 text-brown animate-pulse-ring" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {i < c.stage ? <Check className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                        {s}
                      </div>
                      {i < STAGES.length - 1 && <span className="text-muted-foreground">→</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-gold px-3 py-1 mono text-xs font-bold text-gold-foreground">
                  {c.amountSol} SOL en escrow
                </span>
                <span className={`inline-flex items-center gap-1 text-xs ${c.deadlineHours < 48 ? "text-destructive" : "text-muted-foreground"}`}>
                  <Clock className="h-3 w-3" /> {c.deadlineHours}h restantes
                </span>
                <button className="btn-press rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                  Ver detalle
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-border bg-secondary/30 px-5 py-3 text-xs text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" /> Última actualización hace 2 horas
            </div>
          </div>
        ))}
      </div>
    </DashShell>
  );
}