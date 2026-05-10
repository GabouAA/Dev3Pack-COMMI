import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { useMemo } from "react";
import { PublicKey } from "@solana/web3.js";
import idl from "../idl/my_program.json";

// Set your program ID here
export const PROGRAM_ID = new PublicKey("8xd2LdCeLpjxehjws8NYfF7CqwPMY2veWjhaSUKLnvwp");

export function useAnchorProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    // We cast the imported JSON as Idl to satisfy Anchor's types
    return new Program(idl as Idl, provider);
  }, [provider]);

  const handleTransaction = async (transactionCallback: () => Promise<string>) => {
    try {
      const txHash = await transactionCallback();
      console.log("Transaction successful, hash:", txHash);
      return txHash;
    } catch (error: any) {
      console.error("Solana transaction error:", error);
      // Example of custom error handling
      if (error.message?.includes("User rejected")) {
        throw new Error("Transacción rechazada por el usuario.");
      }
      throw new Error(error.message || "Error desconocido en la transacción.");
    }
  };

  return {
    program,
    provider,
    connection,
    wallet,
    handleTransaction,
  };
}
