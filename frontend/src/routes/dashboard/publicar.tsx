import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashShell } from "@/components/commi/dash-sidebar";

export const Route = createFileRoute("/dashboard/publicar")({
  head: () => ({ meta: [{ title: "Publicar — COMMI" }] }),
  component: PublicarPage,
});

function PublicarPage() {
  const [open, setOpen] = useState(true);
  const [slots, setSlots] = useState(5);
  return (
    <DashShell title="Publicar">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">¿Estás abierto a comisiones?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Aparecerás en búsquedas.</p>
              </div>
              <button onClick={() => setOpen(!open)} className={`relative h-8 w-14 rounded-full transition ${open ? "bg-primary" : "bg-muted"}`}>
                <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${open ? "left-7" : "left-1"}`} />
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold">Slots simultáneos: {slots}</h3>
            <input type="range" min={1} max={10} value={slots} onChange={(e) => setSlots(+e.target.value)} className="mt-3 w-full accent-primary" />
            <div className="mt-4 grid grid-cols-10 gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`h-3 rounded ${i < slots ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold">Crear anuncio</h3>
            <input className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" placeholder="Título" />
            <textarea className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm" rows={4} placeholder="Descripción..." />
            <button className="btn-press mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Publicar</button>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft h-fit">
          <h4 className="mb-3 text-sm font-bold">Visibilidad</h4>
          {["Perfil público", "Mostrar en búsqueda", "Aceptar DMs"].map((l) => (
            <label key={l} className="flex items-center justify-between py-2 text-sm">
              {l}
              <input type="checkbox" defaultChecked className="accent-primary h-4 w-4" />
            </label>
          ))}
        </div>
      </div>
    </DashShell>
  );
}