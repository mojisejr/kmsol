'use client'

import { getKmsolProgram, getKmsolProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useKmsolProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getKmsolProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getKmsolProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['kmsol', 'all', { cluster }],
    queryFn: () => program.account.kmsol.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['kmsol', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ kmsol: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useKmsolProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useKmsolProgram()

  const accountQuery = useQuery({
    queryKey: ['kmsol', 'fetch', { cluster, account }],
    queryFn: () => program.account.kmsol.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['kmsol', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ kmsol: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['kmsol', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ kmsol: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['kmsol', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ kmsol: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['kmsol', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ kmsol: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
