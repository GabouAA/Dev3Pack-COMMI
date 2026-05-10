import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Info, UploadCloud, CheckCircle2, Wallet, Loader2 } from "lucide-react";
import { Navbar } from "@/components/commi/navbar";
import { Footer } from "@/components/commi/footer";
import { artists, SOL_USD } from "@/components/commi/data";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorProgram, PROGRAM_ID } from "@/hooks/useAnchorProgram";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { toast } from "sonner";

export const Route = createFileRoute("/commission/new/$handle")({
  loader: ({ params }) => {
    const artist = artists.find((a) => a.handle === params.handle);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Encargar a ${loaderData.artist.name} — COMMI` },
        ]
      : [{ title: "Encargar — COMMI" }],
  }),
  component: CommissionNewPage,
});

function CommissionNewPage() {
  const { artist } = Route.useLoaderData();
  const wallet = useWallet();
  const { program, handleTransaction } = useAnchorProgram();
  
  // Mock services since they aren't explicitly in the artist object in data.ts
  const services = [
    { id: "s1", name: "Retrato medio cuerpo", desc: "Personaje con sombreado básico.", sol: 0.8 },
    { id: "s2", name: "Personaje completo", desc: "Cuerpo completo, fondo detallado.", sol: 2.2 },
    { id: "s3", name: "Pack de stickers", desc: "6 stickers chibi.", sol: 0.6 },
  ];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0].id);
  const [details, setDetails] = useState("");
  const [isHoveringDrop, setIsHoveringDrop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const platformFee = selectedService.sol * 0.05; // 5% fee
  const totalSol = selectedService.sol + platformFee;

  const handleCreateCommission = async () => {
    if (!wallet.connected || !wallet.publicKey || !program) {
      toast.error("Por favor conecta tu billetera primero.");
      return;
    }

    if (!details.trim()) {
      toast.error("Por favor describe los detalles de tu encargo.");
      return;
    }

    setIsSubmitting(true);
    try {
      const amountInLamports = new BN(Math.floor(totalSol * 1e9));
      // Deadline: 7 días en el futuro
      const deadlineUnix = new BN(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60);
      
      const clientPubkey = wallet.publicKey;
      const artistPubkey = new PublicKey(artist.pubkey);

      const [commissionPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("commission"), clientPubkey.toBuffer(), artistPubkey.toBuffer()],
        PROGRAM_ID
      );

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), commissionPda.toBuffer()],
        PROGRAM_ID
      );

      const txHash = await handleTransaction(async () => {
        return await program.methods
          .createCommission(amountInLamports, deadlineUnix)
          .accounts({
            client: clientPubkey,
            artist: artistPubkey,
            commission: commissionPda,
            vault: vaultPda,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
      });

      toast.success("¡Comisión encargada con éxito!", {
        description: `Transacción: ${txHash.slice(0, 8)}...`,
        action: {
          label: "Ver",
          onClick: () => window.open(`https://explorer.solana.com/tx/${txHash}?cluster=devnet`, "_blank"),
        },
        duration: 5000,
      });

    } catch (e: any) {
      toast.error(e.message || "Error al crear la comisión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/profile/$handle"
            params={{ handle: artist.handle }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold">Encargar comisión</h1>
            <p className="text-muted-foreground">
              Estás solicitando un trabajo a <strong className="text-foreground">@{artist.handle}</strong>
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Form */}
          <div className="space-y-8 lg:col-span-2">
            
            <section className="space-y-4">
              <h2 className="text-xl font-bold">1. Selecciona el servicio</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={`btn-press relative cursor-pointer rounded-2xl border-2 p-5 transition-all ${
                      selectedServiceId === service.id
                        ? "border-primary bg-primary/5 shadow-soft"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={selectedServiceId === service.id}
                      onChange={() => setSelectedServiceId(service.id)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold">{service.name}</h3>
                      {selectedServiceId === service.id && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{service.desc}</p>
                    <p className="mono mt-3 font-semibold text-primary">{service.sol} SOL</p>
                  </label>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">2. Detalles de tu idea</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium">Describe lo que necesitas con el mayor detalle posible</label>
                <textarea
                  rows={6}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Quiero una ilustración de mi personaje estilo cyberpunk. Tiene el pelo azul, usa una chaqueta amarilla..."
                  className="w-full resize-none rounded-2xl border-2 border-border bg-card p-4 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">3. Imágenes de referencia</h2>
              <div
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-colors ${
                  isHoveringDrop ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/50"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsHoveringDrop(true); }}
                onDragLeave={() => setIsHoveringDrop(false)}
                onDrop={(e) => { e.preventDefault(); setIsHoveringDrop(false); }}
              >
                <UploadCloud className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Haz clic o arrastra imágenes aquí</p>
                <p className="mt-1 text-sm text-muted-foreground">PNG, JPG o GIF hasta 5MB</p>
              </div>
            </section>

          </div>

          {/* Right Column: Checkout Summary */}
          <div>
            <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-lift">
              <h2 className="text-xl font-bold">Resumen del encargo</h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img src={artist.avatar} alt={artist.name} className="h-10 w-10 rounded-full object-cover shadow-soft" />
                  <div>
                    <p className="font-semibold">{artist.name}</p>
                    <p className="text-xs text-muted-foreground">Artista</p>
                  </div>
                </div>

                <div className="h-px w-full bg-border" />

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{selectedService.name}</span>
                  <span className="mono font-medium">{selectedService.sol} SOL</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    Tarifa de plataforma (5%)
                    <Info className="h-3 w-3" />
                  </span>
                  <span className="mono font-medium">{platformFee.toFixed(3)} SOL</span>
                </div>

                <div className="h-px w-full bg-border" />

                <div className="flex items-end justify-between">
                  <span className="font-bold">Total a pagar</span>
                  <div className="text-right">
                    <p className="mono text-2xl font-black text-primary">{totalSol.toFixed(3)} SOL</p>
                    <p className="mono text-xs text-muted-foreground">≈ ${(totalSol * SOL_USD).toFixed(2)} USD</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {!wallet.connected ? (
                  <div className="flex justify-center w-full [&_.wallet-adapter-button]:w-full [&_.wallet-adapter-button]:justify-center [&_.wallet-adapter-button]:rounded-full [&_.wallet-adapter-button]:bg-gold [&_.wallet-adapter-button]:text-gold-foreground [&_.wallet-adapter-button]:shadow-soft [&_.wallet-adapter-button:hover]:bg-gold/90 [&_.wallet-adapter-button]:h-[52px]">
                    <WalletMultiButton />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCreateCommission}
                    disabled={isSubmitting}
                    className="btn-press flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 font-bold text-gold-foreground shadow-soft transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Wallet className="h-5 w-5" />
                    )}
                    {isSubmitting ? "Confirmando en Wallet..." : `Bloquear ${totalSol.toFixed(3)} SOL`}
                  </button>
                )}
                
                <p className="text-center text-xs text-muted-foreground">
                  Tus fondos estarán seguros en un contrato inteligente de <strong>Escrow</strong> y solo se liberarán al artista cuando apruebes el trabajo final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
