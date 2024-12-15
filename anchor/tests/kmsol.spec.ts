import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Kmsol} from '../target/types/kmsol'

describe('kmsol', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Kmsol as Program<Kmsol>

  const kmsolKeypair = Keypair.generate()

  it('Initialize Kmsol', async () => {
    await program.methods
      .initialize()
      .accounts({
        kmsol: kmsolKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([kmsolKeypair])
      .rpc()

    const currentCount = await program.account.kmsol.fetch(kmsolKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Kmsol', async () => {
    await program.methods.increment().accounts({ kmsol: kmsolKeypair.publicKey }).rpc()

    const currentCount = await program.account.kmsol.fetch(kmsolKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Kmsol Again', async () => {
    await program.methods.increment().accounts({ kmsol: kmsolKeypair.publicKey }).rpc()

    const currentCount = await program.account.kmsol.fetch(kmsolKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Kmsol', async () => {
    await program.methods.decrement().accounts({ kmsol: kmsolKeypair.publicKey }).rpc()

    const currentCount = await program.account.kmsol.fetch(kmsolKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set kmsol value', async () => {
    await program.methods.set(42).accounts({ kmsol: kmsolKeypair.publicKey }).rpc()

    const currentCount = await program.account.kmsol.fetch(kmsolKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the kmsol account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        kmsol: kmsolKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.kmsol.fetchNullable(kmsolKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
