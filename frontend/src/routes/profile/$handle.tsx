import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Check, X, Sparkles } from "lucide-react";
import { Navbar } from "@/components/commi/navbar";
import { Footer } from "@/components/commi/footer";
import { artists, SOL_USD } from "@/components/commi/data";
import { SolanaLogo } from "@/components/commi/doodles";

export const Route = createFileRoute("/profile/$handle")({
  loader: ({ params }) => {
    const artist = artists.find((a) => a.handle === params.handle);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.artist.name} (@${loaderData.artist.handle}) — COMMI` },
          { name: "description", content: loaderData.artist.bio },
          { property: "og:image", content: loaderData.artist.banner },
        ]
      : [{ title: "Artista — COMMI" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Artista no encontrado</h1>
        <Link to="/artistas" className="mt-4 inline-block text-primary underline">
          Ver todos los artistas
        </Link>
      </div>
    </div>
  ),
  component: ProfilePage,
});

const TABS = ["Portafolio", "Servicios", "Reseñas", "Políticas"] as const;
type Tab = (typeof TABS)[number];

function ProfilePage() {
  const { artist } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("Portafolio");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative">
        <div className="h-64 w-full overflow-hidden md:h-80">
          <img src={artist.banner} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="h-32 w-32 rounded-full border-4 border-background object-cover shadow-lift"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold">{artist.name}</h1>
              <p className="mono text-sm text-muted-foreground">@{artist.handle} · {artist.country}</p>
              <p className="mt-2 max-w-xl text-foreground/80">{artist.bio}</p>
              <div className="mt-3 flex flex-wrap gap-2">
              {artist.tags.map((t: string) => (
                  <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-2">
              <Link
                to="/commission/new/$handle"
                params={{ handle: artist.handle }}
                className="btn-press rounded-full bg-gold px-6 py-3 text-center text-sm font-bold text-gold-foreground shadow-soft"
              >
                Encargar comisión
              </Link>
              <button className="btn-press rounded-full border-2 border-primary px-6 py-2.5 text-sm font-semibold text-primary">
                Seguir
              </button>
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs">
                <SolanaLogo className="h-4 w-6" /> Acepta SOL
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 border-y border-border py-4 text-sm">
            <span><strong>234</strong> comisiones</span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <strong>{artist.rating.toFixed(1)}</strong> ({artist.reviews} reseñas)
            </span>
            <span>Desde <strong className="mono">{artist.priceFrom} SOL</strong></span>
            {artist.online && (
              <span className="inline-flex items-center gap-2 text-primary">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Abierto a comisiones
              </span>
            )}
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`btn-press shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-card hover:border-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="py-10">
            {tab === "Portafolio" && <Portafolio handle={artist.handle} />}
            {tab === "Servicios" && <Servicios />}
            {tab === "Reseñas" && <Resenas />}
            {tab === "Políticas" && <Politicas />}
          </div>
        </div>
      </section>

      <Link
        to="/commission/new/$handle"
        params={{ handle: artist.handle }}
        className="btn-press fixed bottom-6 right-6 z-40 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lift"
      >
        🎨 Encargar comisión
      </Link>

      <Footer />
    </div>
  );
}

function Portafolio({ handle }: { handle: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-2xl border border-border shadow-soft"
          style={{ height: 200 + ((i * 37) % 100) }}
        >
          <img
            src={`https://picsum.photos/seed/${handle}-${i}/600/600`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt=""
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 text-white transition-transform group-hover:translate-y-0">
            <p className="text-sm font-semibold">Pieza #{i + 1}</p>
            <p className="mono text-xs">+ 0.{(i + 4) % 9}{(i * 3) % 9} SOL</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Servicios() {
  const services = [
    { name: "Retrato medio cuerpo", desc: "Personaje con sombreado básico, fondo simple.", days: 7, sol: 0.8, includes: ["1 personaje", "Fondo simple", "2 revisiones"] },
    { name: "Personaje completo", desc: "Cuerpo completo, sombreado pleno, fondo detallado.", days: 14, sol: 2.2, includes: ["1 personaje", "Fondo detallado", "3 revisiones", "PSD"] },
    { name: "Pack de stickers", desc: "6 stickers chibi para Discord/Twitch.", days: 10, sol: 0.6, includes: ["6 stickers", "PNG transparente", "Uso comercial limitado"] },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {services.map((s) => (
        <div key={s.name} className="card-lift rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold">{s.name}</h3>
            <span className="rounded-full bg-gold px-3 py-1 mono text-xs font-bold text-gold-foreground">
              {s.sol} SOL
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          <ul className="mt-3 space-y-1 text-sm">
            {s.includes.map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" /> {i}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Entrega ~{s.days} días</span>
            <span className="mono">≈ ${(s.sol * SOL_USD).toFixed(0)}</span>
          </div>
          <button className="btn-press mt-4 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
            Solicitar
          </button>
        </div>
      ))}
    </div>
  );
}

function Resenas() {
  const dist = [60, 28, 8, 2, 2];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <p className="text-5xl font-extrabold">4.9</p>
        <p className="mt-1 text-sm text-muted-foreground">128 reseñas</p>
        <div className="mt-4 space-y-2">
          {dist.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="w-4">{5 - i}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gold" style={{ width: `${p}%` }} />
              </div>
              <span className="mono w-8 text-right text-muted-foreground">{p}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        {[
          { who: "anon_neko", txt: "Increíble, superó mis expectativas. La comunicación impecable.", sol: 1.2 },
          { who: "kira", txt: "Muy rápida y atenta a cada revisión. ¡100% recomendada!", sol: 0.6 },
          { who: "vinz", txt: "Excelente arte. Los stages se liberaron sin problema.", sol: 2.4 },
        ].map((r, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={`https://i.pravatar.cc/100?img=${i + 4}`} alt="" className="h-9 w-9 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">@{r.who}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-3 w-3 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 mono text-[10px] font-bold text-primary">
                <Sparkles className="h-3 w-3" /> Verificado en Solana
              </span>
            </div>
            <p className="mt-3 text-sm text-foreground/80">{r.txt}</p>
            <p className="mt-2 mono text-xs text-muted-foreground">{r.sol} SOL · 12 abr 2026</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Politicas() {
  const will = ["OCs y personajes originales", "Anime / semi-realismo", "Fanart de personajes existentes", "NSFW suave (con contrato adicional)"];
  const wont = ["Contenido ilegal", "Plagio o trazado", "Hate / discriminación", "Mecha pesado"];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="mb-3 font-bold text-primary">Will draw</h3>
        <ul className="space-y-2 text-sm">
          {will.map((w) => (
            <li key={w} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> {w}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="mb-3 font-bold text-destructive">Won&apos;t draw</h3>
        <ul className="space-y-2 text-sm">
          {wont.map((w) => (
            <li key={w} className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 text-destructive" /> {w}</li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="mb-3 font-bold">Revisiones y cancelaciones</h3>
        <p className="text-sm text-muted-foreground">
          Hasta 3 revisiones gratis por etapa. Revisiones extra 0.1 SOL c/u.
          Reembolsos: 100% antes de sketch, 75% en sketch, 50% en lineart, 0% tras color.
        </p>
      </div>
    </div>
  );
}