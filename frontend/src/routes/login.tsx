import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/commi/navbar";
import { SolanaLogo } from "@/components/commi/doodles";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesión — COMMI" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lift">
          <h1 className="text-2xl font-extrabold">Bienvenido de vuelta</h1>
          <p className="mt-1 text-sm text-muted-foreground">Inicia sesión para continuar.</p>
          <form className="mt-6 space-y-3">
            <input className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" placeholder="Email" />
            <input type="password" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" placeholder="Contraseña" />
            <button className="btn-press w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground">Entrar</button>
          </form>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> o <div className="h-px flex-1 bg-border" />
          </div>
          <button className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary py-3 text-sm font-semibold">
            <SolanaLogo className="h-4 w-6" /> Conectar con Phantom
          </button>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            ¿No tienes cuenta? <Link to="/registro" className="font-bold text-primary">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  ),
});