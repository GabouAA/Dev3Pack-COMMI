import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Navbar } from "@/components/commi/navbar";
import { Footer } from "@/components/commi/footer";
import { ArtistCard } from "@/components/commi/artist-card";
import { artists, categories } from "@/components/commi/data";
import { useScrollReveal } from "@/components/commi/theme";

export const Route = createFileRoute("/artistas")({
  head: () => ({
    meta: [
      { title: "Explora artistas — COMMI" },
      { name: "description", content: "Encuentra ilustradores de todo el mundo y encarga tu comisión pagada en SOL." },
    ],
  }),
  component: ArtistsPage,
});

function ArtistsPage() {
  useScrollReveal();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const filtered = artists.filter((a) => {
    const matchesQ = !q || a.name.toLowerCase().includes(q.toLowerCase()) || a.handle.includes(q.toLowerCase());
    const matchesCat = !cat || a.tags.some((t) => t.toLowerCase().includes(cat.toLowerCase()));
    return matchesQ && matchesCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 pt-10">
        <h1 className="text-4xl font-extrabold">Explora artistas</h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} ilustradores listos para crear contigo.</p>
        <div className="mt-6 flex items-center gap-3 rounded-full border border-border bg-card p-2 shadow-soft">
          <Search className="ml-3 h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre o @handle..."
            className="flex-1 bg-transparent py-3 outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setCat(null)}
            className={`btn-press rounded-full border px-3 py-1.5 text-xs font-medium ${
              !cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
            }`}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c.label}
              onClick={() => setCat(c.label)}
              className={`btn-press inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                cat === c.label ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((a, i) => (
            <ArtistCard key={a.handle} artist={a} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <p className="text-lg font-bold">Sin resultados</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Prueba con otra categoría o palabra clave.
            </p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}