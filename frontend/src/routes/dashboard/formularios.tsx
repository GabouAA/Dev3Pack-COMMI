import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DashShell } from "@/components/commi/dash-sidebar";

export const Route = createFileRoute("/dashboard/formularios")({
  head: () => ({ meta: [{ title: "Formularios — COMMI" }] }),
  component: () => (
    <DashShell title="Formularios">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-bold">Campos disponibles</h3>
          <div className="mt-4 space-y-2 text-sm">
            {["Texto corto", "Texto largo", "Opción múltiple", "Imagen / referencia", "Color picker", "Checkbox"].map((label) => (
              <div key={label} className="cursor-grab rounded-xl border border-dashed border-border bg-secondary/40 px-3 py-2 hover:border-primary">
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Formulario por defecto</h3>
            <button className="btn-press inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
              <Plus className="h-3.5 w-3.5" /> Nuevo
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {["Nombre del personaje", "Descripción detallada", "Referencias (subir imágenes)", "Colores principales", "Uso comercial (Sí/No)", "Fecha límite", "Presupuesto en SOL", "Notas adicionales"].map((label) => (
              <div key={label} className="rounded-xl border border-border bg-secondary/30 p-4">
                <p className="text-sm font-semibold">{label}</p>
                <div className="mt-2 h-9 rounded-lg bg-background/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashShell>
  ),
});