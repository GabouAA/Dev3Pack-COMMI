import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Search,
  Zap,
  Globe,
  Coins,
  Lock,
  Check,
  Palette,
  ClipboardList,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/commi/navbar";
import { Footer } from "@/components/commi/footer";
import {
  BrushUnderline,
  Particles,
  ScrollArrow,
  SketchScribble,
  SolanaLogo,
  StarDoodle,
  PencilDoodle,
  InkDrop,
} from "@/components/commi/doodles";
import { useCountUp, useScrollReveal } from "@/components/commi/theme";
import { artists, categories, commissions } from "@/components/commi/data";
import { ArtistCard } from "@/components/commi/artist-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COMMI — Comisiones de ilustración con pagos en SOL" },
      {
        name: "description",
        content:
          "COMMI conecta ilustradores con compradores internacionales. Cobra en Solana, sin fronteras, con escrow on-chain.",
      },
      { property: "og:title", content: "COMMI — Comisiones de ilustración en SOL" },
      {
        property: "og:description",
        content:
          "Plataforma descentralizada para ilustradores. Pagos progresivos en escrow Solana.",
      },
    ],
  }),
  component: Landing,
});

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const v = useCountUp(value);
  return (
    <div className="text-center">
      <div className="text-3xl font-extrabold text-gold md:text-4xl">
        {Math.round(v).toLocaleString("es")}
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-brown-foreground/70">
        {label}
      </div>
    </div>
  );
}

function Landing() {
  useScrollReveal();

  // Stats viewport trigger — for simplicity always animate on mount
  useEffect(() => {
    document.title = "COMMI — Comisiones de ilustración en SOL";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative -mt-16 flex min-h-[100vh] items-center overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-black/55" />
        <Particles />
        <SketchScribble className="doodle right-10 top-24 h-40 w-40 text-white" />
        <PencilDoodle className="doodle left-8 bottom-32 h-24 w-24 text-white" />

        <div className="relative mx-auto max-w-5xl px-6 pt-32 text-center text-white">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Powered by Solana
            <SolanaLogo className="ml-1 h-4 w-6 animate-spin-slow" />
          </span>
          <h1
            className="mt-6 animate-fade-up text-4xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            Listo para realizar comisiones, comprar ilustraciones
            <span className="relative inline-block">
              {" "}
              y mucho más
              <BrushUnderline className="absolute -bottom-3 left-0 h-3 w-full text-gold" />
            </span>
            ...
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl animate-fade-up text-base text-white/85 md:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            La primera plataforma descentralizada para ilustradores
            internacionales. Cobra en SOL, trabaja sin fronteras.
          </p>
          <div
            className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              to="/registro"
              className="btn-press inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-gold-foreground shadow-lift hover:brightness-105"
            >
              Registrarme →
            </Link>
            <Link
              to="/artistas"
              className="btn-press rounded-full border-2 border-white/70 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10"
            >
              Ver artistas
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80">
          <ScrollArrow className="h-6 w-6 animate-bounce-arrow" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brown text-brown-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          <Stat value={1240} suffix="+" label="Artistas activos" />
          <Stat value={8900} suffix="+" label="Comisiones" />
          <Stat value={430} suffix="K+ SOL" label="Pagados" />
          <Stat value={42} label="Países" />
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative mx-auto max-w-5xl px-6 py-20">
        <InkDrop className="doodle right-12 top-6 h-10 w-10 text-primary" />
        <h2 className="scroll-reveal text-center text-3xl font-extrabold text-foreground md:text-4xl">
          Encuentra tu ilustrador ideal
        </h2>
        <div className="scroll-reveal mt-8 flex items-center gap-3 rounded-full border border-border bg-card p-2 shadow-soft">
          <Search className="ml-3 h-5 w-5 text-muted-foreground" />
          <input
            placeholder="Busca a algún artista en específico..."
            className="flex-1 bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground"
          />
          <button className="btn-press rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Buscar
          </button>
        </div>

        <div className="scroll-reveal mt-6 -mx-6 overflow-x-auto px-6">
          <div className="flex gap-2 pb-2">
            {categories.map((c) => (
              <button
                key={c.label}
                className="btn-press inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:bg-primary/5"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: c.color }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTISTS */}
      <section className="relative bg-secondary/40 py-20">
        <StarDoodle className="doodle left-10 top-10 h-16 w-16 text-primary" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="scroll-reveal flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Artistas destacados
              </h2>
              <p className="mt-2 text-muted-foreground">
                Reseñas verificadas en blockchain. Pagos en escrow.
              </p>
            </div>
            <Link
              to="/artistas"
              className="hidden text-sm font-semibold text-primary hover:underline md:block"
            >
              Ver todos →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {artists.slice(0, 8).map((a, i) => (
              <ArtistCard key={a.handle} artist={a} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="btn-press rounded-full border-2 border-primary px-7 py-3 text-sm font-bold text-primary hover:bg-primary/5">
              Cargar más
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="scroll-reveal text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">¿Cómo funciona COMMI?</h2>
          <p className="mt-2 text-muted-foreground">
            Pagos progresivos, on-chain, en 4 pasos.
          </p>
        </div>
        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <svg
            className="pointer-events-none absolute inset-x-0 top-12 hidden h-2 w-full md:block"
            viewBox="0 0 1000 10"
            preserveAspectRatio="none"
          >
            <path
              d="M0 5 H1000"
              stroke="var(--primary)"
              strokeWidth="2"
              className="dashed-anim"
            />
          </svg>
          {[
            { icon: Palette, title: "Explora artistas", desc: "Encuentra el ilustrador perfecto para tu idea." },
            { icon: ClipboardList, title: "Define tu comisión", desc: "Llena el formulario con todos los detalles." },
            { icon: Lock, title: "Pago en escrow Solana", desc: "Tus fondos quedan bloqueados en un smart contract." },
            { icon: Check, title: "Aprueba y libera", desc: "Liberas el pago por etapas a medida que avanza." },
          ].map((s, i) => (
            <div
              key={s.title}
              className="scroll-reveal relative rounded-2xl border border-border bg-card p-6 shadow-soft card-lift"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <span className="absolute right-4 top-4 mono text-xs font-bold text-gold">
                0{i + 1}
              </span>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRESSIVE PAYMENT */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="scroll-reveal text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Pago progresivo en escrow
            </h2>
            <p className="mt-2 text-muted-foreground">
              El comprador libera 25% en cada etapa aprobada.
            </p>
          </div>
          <div className="scroll-reveal mt-10 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="grid grid-cols-4 gap-3">
              {["Sketch", "Lineart", "Color", "Final"].map((s, i) => (
                <div key={s} className="text-center">
                  <div
                    className={`mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full ${
                      i < 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < 2 ? <Coins className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  </div>
                  <div className="text-sm font-semibold">{s}</div>
                  <div className="mono text-xs text-muted-foreground">{(i + 1) * 25}%</div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: "50%" }}
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Liberados <span className="mono font-bold text-foreground">1.6 SOL</span> de{" "}
              <span className="mono font-bold text-foreground">3.2 SOL</span>
            </p>
          </div>
        </div>
      </section>

      {/* WHY SOLANA */}
      <section className="relative overflow-hidden bg-brown py-24 text-brown-foreground">
        <StarDoodle className="doodle right-20 top-10 h-12 w-12 text-gold" />
        <InkDrop className="doodle left-12 bottom-20 h-10 w-10 text-gold" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="scroll-reveal text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">¿Por qué Solana?</h2>
            <p className="mt-2 text-brown-foreground/70">
              Velocidad, comisiones bajas y alcance global.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Zap, title: "Transacciones instantáneas", desc: "Confirmación en menos de 1 segundo." },
              { icon: Coins, title: "Comisiones mínimas", desc: "Menos de $0.001 por transacción." },
              { icon: Globe, title: "Sin fronteras", desc: "Cobra desde cualquier país del mundo." },
            ].map((c) => (
              <div
                key={c.title}
                className="scroll-reveal card-lift rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur"
              >
                <c.icon className="h-8 w-8 text-gold" />
                <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-brown-foreground/75">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / RECENT */}
      <section className="overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="scroll-reveal mb-10 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Comisiones recientes
            </h2>
          </div>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-5 animate-scroll-x" style={{ width: "200%" }}>
            {[...commissions, ...commissions, ...commissions].map((c, i) => (
              <div
                key={i}
                className="flex w-80 shrink-0 items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                <img
                  src={c.thumbnail}
                  alt=""
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.title}</p>
                  <p className="text-xs text-muted-foreground">@{c.artist} · {c.type}</p>
                  <p className="mono mt-1 text-xs">
                    <span className="font-bold text-primary">{c.amountSol} SOL</span> · ⭐ 4.9
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO SHOWCASE */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="scroll-reveal mb-10 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">Galería</h2>
            <p className="mt-2 text-muted-foreground">
              Una pequeña muestra del talento en COMMI.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
            {[
              { seed: 201, span: "md:col-span-2 md:row-span-2 h-80 md:h-full" },
              { seed: 202, span: "h-40 md:h-44" },
              { seed: 203, span: "h-40 md:h-44" },
              { seed: 204, span: "h-40 md:h-44" },
              { seed: 205, span: "h-40 md:h-44" },
            ].map((c, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-border shadow-soft ${c.span}`}
              >
                <img
                  src={`https://picsum.photos/seed/commi-g-${c.seed}/600/600`}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white transition-transform group-hover:translate-y-0">
                  <p className="text-sm font-semibold">@artist_{c.seed}</p>
                  <p className="mono text-xs">desde 0.7 SOL</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24" style={{ background: "var(--gradient-warm)" }}>
        <StarDoodle className="doodle right-10 top-12 h-16 w-16 text-gold" />
        <StarDoodle className="doodle left-16 bottom-10 h-10 w-10 text-gold" />
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <ShieldCheck className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
            ¿Eres ilustrador? Empieza a ganar SOL hoy.
          </h2>
          <p className="mt-4 text-white/85">
            Crea tu perfil, define tus servicios y empieza a recibir comisiones internacionales.
          </p>
          <Link
            to="/registro"
            className="btn-press mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-gold-foreground shadow-lift"
          >
            Únete gratis →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
