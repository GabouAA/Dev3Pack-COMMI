import { createFileRoute } from "@tanstack/react-router";
import { Plus, Eye, EyeOff } from "lucide-react";
import { DashShell } from "@/components/commi/dash-sidebar";

export const Route = createFileRoute("/dashboard/portafolio")({
  head: () => ({ meta: [{ title: "Portafolio — COMMI" }] }),
  component: () => (
    <DashShell title="Portafolio">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">12 obras publicadas</p>
        <button className="btn-press inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Subir obra
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="card-lift overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <img src={`https://picsum.photos/seed/p-${i}/400/${300 + (i % 3) * 80}`} alt="" className="w-full object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold truncate">Obra #{i + 1}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Retrato · OC</span>
                <button className="text-muted-foreground hover:text-primary">
                  {i % 4 === 0 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashShell>
  ),
});