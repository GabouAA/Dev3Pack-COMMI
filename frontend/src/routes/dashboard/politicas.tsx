import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Sparkles } from "lucide-react";
import { DashShell } from "@/components/commi/dash-sidebar";

export const Route = createFileRoute("/dashboard/politicas")({
  head: () => ({ meta: [{ title: "Políticas — COMMI" }] }),
  component: () => (
    <DashShell title="Políticas">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="mb-3 font-bold text-primary">Will draw</h3>
          {["OCs y personajes originales", "Anime / semi-realismo", "Fanart"].map((w) => (
            <div key={w} className="mb-2 flex items-center justify-between rounded-xl bg-secondary/40 px-3 py-2 text-sm">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> {w}</span>
              <button className="text-muted-foreground">×</button>
            </div>
          ))}
          <input placeholder="Añadir item..." className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="mb-3 font-bold text-destructive">Won&apos;t draw</h3>
          {["Contenido ilegal", "Plagio", "Hate / discriminación"].map((w) => (
            <div key={w} className="mb-2 flex items-center justify-between rounded-xl bg-secondary/40 px-3 py-2 text-sm">
              <span className="inline-flex items-center gap-2"><X className="h-4 w-4 text-destructive" /> {w}</span>
              <button className="text-muted-foreground">×</button>
            </div>
          ))}
          <input placeholder="Añadir item..." className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-gradient-to-r from-primary/10 to-gold/20 p-5">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" /> Las políticas se publican on-chain como hash inmutable.
        </span>
        <button className="btn-press rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
          Guardar políticas
        </button>
      </div>
    </DashShell>
  ),
});