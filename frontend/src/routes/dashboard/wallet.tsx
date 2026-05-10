import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, ExternalLink, Lock, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { DashShell } from "@/components/commi/dash-sidebar";
import { useCountUp } from "@/components/commi/theme";
import { txns, SOL_USD, commissions } from "@/components/commi/data";
import { SolanaLogo } from "@/components/commi/doodles";

export const Route = createFileRoute("/dashboard/wallet")({
  head: () => ({ meta: [{ title: "Wallet — COMMI" }] }),
  component: WalletPage,
});

const chartData = Array.from({ length: 30 }).map((_, i) => ({
  day: `${i + 1}`,
  sol: +(Math.sin(i / 4) * 0.4 + 0.6 + (i / 30) * 0.7).toFixed(2),
}));

function WalletPage() {
  const balance = useCountUp(12.4);
  const [copied, setCopied] = useState(false);
  const addr = "8kJqHnP2x...zN1dd2QwfA";
  return (
    <DashShell title="Wallet">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-border bg-gradient-to-br from-brown to-primary-deep p-8 text-brown-foreground shadow-lift">
          <div className="flex items-center gap-3">
            <SolanaLogo className="h-8 w-12 animate-spin-slow" />
            <span className="text-sm opacity-80">Saldo disponible</span>
          </div>
          <p className="mono mt-4 text-6xl font-extrabold">{balance.toFixed(2)} <span className="text-2xl">SOL</span></p>
          <p className="mt-1 text-sm opacity-80">≈ ${(balance * SOL_USD).toFixed(2)} USD</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-press inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-gold-foreground">
              <ArrowDownToLine className="h-4 w-4" /> Depositar SOL
            </button>
            <button className="btn-press inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold backdrop-blur hover:bg-white/25">
              <ArrowUpFromLine className="h-4 w-4" /> Retirar SOL
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-xs">
            <span className="mono opacity-90">{addr}</span>
            <button
              onClick={() => { navigator.clipboard?.writeText(addr); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
              className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1"
            >
              <Copy className="h-3 w-3" /> {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-bold">Conectar wallet</h3>
          <p className="mt-1 text-xs text-muted-foreground">Soporte para Phantom y Solflare.</p>
          <button className="btn-press mt-4 flex w-full items-center justify-between rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-semibold">
            <span>Phantom</span><span className="text-primary">Conectar</span>
          </button>
          <button className="btn-press mt-2 flex w-full items-center justify-between rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-semibold">
            <span>Solflare</span><span className="text-primary">Conectar</span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="mb-4 font-bold">Ganancias últimos 30 días</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="sol" stroke="var(--primary)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-bold">Resumen Escrow</h3>
          <p className="mono mt-2 text-3xl font-extrabold text-gold">4.2 SOL</p>
          <p className="text-xs text-muted-foreground">bloqueados en {commissions.length} comisiones activas</p>
          <div className="mt-4 space-y-3">
            {commissions.map((c) => (
              <div key={c.id}>
                <div className="flex justify-between text-xs">
                  <span className="truncate">{c.title}</span>
                  <span className="mono font-bold">{c.amountSol} SOL</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary transition-all" style={{ width: `${(c.stage / 4) * 100}%` }} />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  <Lock className="mr-1 inline h-3 w-3" />
                  {(c.amountSol * 0.25).toFixed(2)} SOL se libera al completar etapa {c.stage + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-bold">Historial de transacciones</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-left">Tipo</th>
                <th className="px-6 py-3 text-left">De/Para</th>
                <th className="px-6 py-3 text-right">Monto</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">TX</th>
              </tr>
            </thead>
            <tbody>
              {txns.map((t, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-6 py-3 mono text-xs">{t.date}</td>
                  <td className="px-6 py-3">{t.type}</td>
                  <td className="px-6 py-3 mono text-xs">@{t.from}</td>
                  <td className={`px-6 py-3 mono text-right font-bold ${t.amount < 0 ? "text-destructive" : "text-primary"}`}>
                    {t.amount > 0 ? "+" : ""}{t.amount} SOL
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      t.status === "Completado" ? "bg-primary/15 text-primary" :
                      t.status === "En Escrow" ? "bg-gold/30 text-brown" : "bg-muted text-muted-foreground"
                    }`}>{t.status}</span>
                  </td>
                  <td className="px-6 py-3 mono text-xs">
                    <a href="#" className="inline-flex items-center gap-1 text-primary hover:underline">
                      {t.hash} <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashShell>
  );
}