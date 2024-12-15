// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import KmsolIDL from '../target/idl/kmsol.json'
import type { Kmsol } from '../target/types/kmsol'

// Re-export the generated IDL and type
export { Kmsol, KmsolIDL }

// The programId is imported from the program IDL.
export const KMSOL_PROGRAM_ID = new PublicKey(KmsolIDL.address)

// This is a helper function to get the Kmsol Anchor program.
export function getKmsolProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...KmsolIDL, address: address ? address.toBase58() : KmsolIDL.address } as Kmsol, provider)
}

// This is a helper function to get the program ID for the Kmsol program depending on the cluster.
export function getKmsolProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Kmsol program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return KMSOL_PROGRAM_ID
  }
}
