<p align="center">
  <img src="https://img.shields.io/badge/Solana-Devnet-9945FF?style=for-the-badge&logo=solana&logoColor=white" />
  <img src="https://img.shields.io/badge/Anchor-0.32-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

# COMMI — Trustless Art Commissions on Solana

**COMMI** is a decentralized escrow platform that eliminates the #1 problem in the freelance illustration market: **trust between strangers.**

Clients lock SOL into an on-chain escrow smart contract before work begins. Artists get paid automatically when work is approved. No middlemen. No chargebacks. No "exposure as payment." Just code-enforced fairness.

> 🏆 Built for the **Solana Hackathon** — Dev3Pack team.

---

## The Problem

Every year, thousands of independent artists lose income to:

| Pain Point | Impact |
|---|---|
| **Non-paying clients** | Artists deliver finished work and never receive payment |
| **Vanishing artists** | Clients pay upfront and the artist disappears |
| **Platform fees (20–40%)** | Fiverr, Upwork, and similar platforms take massive cuts |
| **Cross-border friction** | PayPal holds, currency conversion fees, banking restrictions in LATAM |
| **No enforceable agreements** | Disputes rely on platform goodwill, not code |

Traditional freelance platforms act as centralized arbitrators — taking a cut while offering no real guarantees. Artists in Latin America are hit hardest: limited banking access, volatile local currencies, and platforms that don't serve their markets.

## The Solution: Code-Enforced Escrow on Solana

COMMI replaces trust with **smart contracts**. Here's the deal:

1. **Client** selects a service and locks SOL into an escrow vault (a PDA owned by the program).
2. **Artist** accepts the commission and begins work.
3. **Artist** delivers the work on-chain.
4. **Client** approves → funds are released to the artist instantly.
5. If the deadline passes without delivery → the client can reclaim their funds.

No human arbitration. No "we'll review your case in 5–7 business days." The rules are baked into the blockchain.

### Why Solana?

We chose Solana deliberately — not as a buzzword, but because the problem demands it:

- **Sub-second finality** — Clients see their escrow lock confirmed in ~400ms. No waiting 15 minutes wondering if the transaction went through.
- **Negligible fees** — A full `create_commission` transaction costs < $0.001. Artists keep what they earn.
- **Program Derived Addresses (PDAs)** — Each commission generates a unique, deterministic escrow account. No admin keys, no custodial risk.
- **Global by default** — A 17-year-old artist in Bolivia and a client in Tokyo can transact with the same ease. No bank account required.
- **Anchor framework** — Type-safe, auditable smart contracts with built-in account validation.

---

## Smart Contract Architecture

**Program ID:** [`8xd2LdCeLpjxehjws8NYfF7CqwPMY2veWjhaSUKLnvwp`](https://explorer.solana.com/address/8xd2LdCeLpjxehjws8NYfF7CqwPMY2veWjhaSUKLnvwp?cluster=devnet)

**Deployed on:** Solana Devnet

### Instructions

| Instruction | Signer | Description |
|---|---|---|
| `create_commission` | Client | Creates the commission PDA + vault PDA, transfers SOL into escrow |
| `accept_commission` | Artist | Artist accepts the job, status moves to `Accepted` |
| `deliver_work` | Artist | Artist marks work as delivered |
| `approve_work` | Client | Client approves delivery, SOL is released to artist |
| `refund` | Client | If deadline is passed, client reclaims escrowed SOL |

### On-Chain Accounts

```
Commission (PDA)
├── client: Pubkey        — who's paying
├── artist: Pubkey        — who's working
├── amount: u64           — lamports locked in escrow
├── status: Enum          — Open → Accepted → Delivered → Approved
├── created_at: i64       — Unix timestamp
├── deadline: i64         — Unix timestamp (refund available after this)
└── bump: u8              — PDA bump seed

CommissionVault (PDA)
├── commission: Pubkey    — linked commission account
└── bump: u8              — PDA bump seed
```

### PDA Derivation

```
Commission PDA:  seeds = ["commission", client_pubkey, artist_pubkey]
Vault PDA:       seeds = ["vault", commission_pda]
```

### Commission Lifecycle

```
    Client creates          Artist accepts         Artist delivers        Client approves
        ┌─────┐                ┌──────────┐           ┌───────────┐          ┌──────────┐
 SOL →  │ Open │ ────────────► │ Accepted │ ────────► │ Delivered │ ───────► │ Approved │
        └─────┘                └──────────┘           └───────────┘          └──────────┘
           │                                                                      │
           │                                                                      ▼
           │                                                               SOL → Artist
           │
           ▼ (after deadline)
      ┌───────────┐
      │ Cancelled │ ──► SOL → Client (refund)
      └───────────┘
```

---

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| **Blockchain** | Solana (Devnet) | Settlement layer, escrow custody |
| **Smart Contracts** | Anchor 0.32 (Rust) | Program logic, PDA management |
| **Frontend Framework** | TanStack Start + Vite 7 | SSR-ready React application |
| **UI** | React 19, Tailwind CSS 4, Radix UI | Component library and design system |
| **Wallet Integration** | `@solana/wallet-adapter-react` | Phantom, Solflare, and others |
| **Program Interaction** | `@coral-xyz/anchor` (TypeScript) | IDL-typed RPC calls |
| **Notifications** | Sonner | Transaction feedback toasts |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A Solana wallet browser extension ([Phantom](https://phantom.app/) or [Solflare](https://solflare.com/))
- Your wallet set to **Devnet** with test SOL

### 1. Clone the repository

```bash
git clone https://github.com/your-org/Dev3Pack-COMMI.git
cd Dev3Pack-COMMI
```

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`.

### 4. Connect your wallet

1. Open your browser and navigate to `http://localhost:8080`.
2. Switch your Phantom/Solflare wallet to **Devnet**.
3. Get free test SOL from the [Solana Faucet](https://faucet.solana.com/).
4. Browse artists, click **"Encargar comisión"** (Order Commission), and sign the transaction.

### 5. Verify on-chain

After submitting, click the **"Ver"** (View) button on the success toast to open your transaction in [Solana Explorer](https://explorer.solana.com/?cluster=devnet).

---

## Project Structure

```
Dev3Pack-COMMI/
├── 8xd2...idl.json                    # Anchor IDL (deployed contract ABI)
├── frontend/
│   ├── src/
│   │   ├── components/commi/          # UI components (Navbar, Footer, Cards)
│   │   ├── hooks/
│   │   │   └── useAnchorProgram.ts    # Anchor program hook (RPC + error handling)
│   │   ├── idl/
│   │   │   └── my_program.json        # IDL consumed by Anchor client
│   │   ├── providers/
│   │   │   └── SolanaProvider.tsx      # Wallet + Connection context
│   │   ├── routes/
│   │   │   ├── index.tsx              # Landing page
│   │   │   ├── artistas.tsx           # Artist discovery
│   │   │   ├── profile/$handle.tsx    # Artist profile
│   │   │   ├── commission/new/$handle.tsx  # ← Commission + Escrow TX
│   │   │   └── dashboard/            # Artist dashboard (wallet, commissions)
│   │   └── styles.css                 # Design system tokens
│   ├── vite.config.ts                 # Vite + Node polyfills + SSR config
│   └── package.json
└── README.md
```

---

## How We Use Solana (Deep Dive)

### Wallet Connection

The `SolanaProvider` wraps the entire app with three context layers:

```tsx
<ConnectionProvider endpoint={devnetRPC}>
  <WalletProvider wallets={[Phantom, Solflare]} autoConnect>
    <WalletModalProvider>
      {children}
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>
```

This gives every component access to the Solana connection and the user's wallet via React hooks (`useWallet`, `useConnection`).

### Program Interaction via Anchor

The `useAnchorProgram` hook creates a typed Anchor `Program` instance from the IDL:

```ts
const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "processed" });
const program = new Program(idl as Idl, provider);
```

This allows us to call smart contract instructions with full TypeScript type safety:

```ts
await program.methods
  .createCommission(amountInLamports, deadlineUnix)
  .accounts({
    client: walletPubkey,
    artist: artistPubkey,
    commission: commissionPda,
    vault: vaultPda,
    systemProgram: SystemProgram.programId,
  })
  .rpc();
```

### PDA Derivation on the Client

We derive the same deterministic addresses the program expects:

```ts
const [commissionPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("commission"), clientPubkey.toBuffer(), artistPubkey.toBuffer()],
  PROGRAM_ID
);

const [vaultPda] = PublicKey.findProgramAddressSync(
  [Buffer.from("vault"), commissionPda.toBuffer()],
  PROGRAM_ID
);
```

This ensures the frontend and the on-chain program always agree on account addresses — no server needed.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_SOLANA_RPC_URL` | `https://api.devnet.solana.com` | Custom Solana RPC endpoint |

Create a `.env` file in `frontend/` if you need a custom RPC (e.g., Helius, QuickNode):

```env
VITE_SOLANA_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
```

---

## Roadmap

- [x] Anchor smart contract deployed to Devnet
- [x] Escrow creation (`create_commission`) integrated in frontend
- [x] Wallet connection (Phantom, Solflare)
- [x] Artist profiles and discovery page
- [x] Artist dashboard with wallet overview
- [ ] `accept_commission` / `deliver_work` / `approve_work` flows in UI
- [ ] Real-time commission status tracking via WebSocket
- [ ] On-chain reputation system (verified reviews linked to transactions)
- [ ] Mainnet deployment
- [ ] Mobile-responsive wallet experience

---

## Team — Dev3Pack

Built with urgency and care during the Solana Hackathon.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  <strong>COMMI</strong> — Because artists deserve to get paid, and clients deserve guarantees.<br/>
  Powered by <a href="https://solana.com">Solana</a>.
</p>
