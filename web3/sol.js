
import base58 from 'bs58'
import { get200 } from '../services/request'
import {Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'



export async function runSOLSignIn(solana) {
  try {
    // `signMessage` will be undefined if the wallet doesn't support it
  if (!solana.signMessage) throw new Error('please use a phantom wallet to continue')
    let publicKey = solana.publicKey.toString()
    let {message} = await get200(`/api/auth/start?publicKey=${publicKey}`)
    const mb = new TextEncoder().encode(message)
    let sig = await solana.signMessage(mb)
    let encodeSig = base58.encode(sig.signature)

    return await get200(`/api/auth/finish?wallet=phantom&signature=${encodeSig}`)
  } catch (error) {
    console.error(error)
    throw Error(`could not run sign in process : ${error}`)
  } 
}


export async function transferSOL(connection, solana, amt, receiverPubKey) {
  if (!amt || amt <= 0) throw `Cannot transfer SOL balance of ${amt}`
  console.log(connection, solana, amt, receiverPubKey)


  var transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: solana.publicKey,
      toPubkey: receiverPubKey,
      lamports: amt * LAMPORTS_PER_SOL //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
    }),
  )

  let blockhashObj = await connection.getRecentBlockhash()
  transaction.recentBlockhash = await blockhashObj.blockhash
  transaction.feePayer = solana.publicKey

  const {signature} = await solana.request({
    method: "signAndSendTransaction",
    params: {
         message: base58.encode(transaction.serializeMessage()),
    },
  })

  let {value} = await connection.confirmTransaction(signature)
  if (value.err) {
    throw `could not confirm transaction ${value.err}`
  }

  return value
}


export async function checkMinBalance(connection, solana, targetBalance) {
  let res = await connection.getBalance(solana.publicKey)
  return res/LAMPORTS_PER_SOL > targetBalance
}


const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
)
export async function hasToken(userPK, tokenMintAddress) {
  console.log("COM", userPK, tokenMintAddress)
  let tokenMintPK = new PublicKey(tokenMintAddress)
  let res = (await PublicKey.findProgramAddress(
    [
        userPK.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintPK.toBuffer(),
    ],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  ))[0]

  console.log("res", res.toString())

}


export async function transferSOLToCreators(connection, solana, amt, creators) {
  try {
    if (!amt || amt <= 0) throw `Cannot transfer SOL balance of ${amt}`
    if (!connection || !solana || !creators) throw  `Invalid Args: (!connection || !solana || !creators)`


    let tx = new Transaction().add(
      SystemProgram.transfer({
          fromPubkey: solana.publicKey,
          toPubkey: creators[0].address,
          lamports: creators[0].share / 100 * amt * LAMPORTS_PER_SOL 
        })
      ).add(
      SystemProgram.transfer({
        fromPubkey: solana.publicKey,
        toPubkey: creators[1].address,
        lamports: creators[1].share / 100 * amt * LAMPORTS_PER_SOL 
      }),
    )
    // console.log(1, fromPubkey: solana.publicKey,)

    let blockhashObj = await connection.getRecentBlockhash()
    tx.recentBlockhash = await blockhashObj.blockhash
    tx.feePayer = solana.publicKey

    const {signature} = await solana.request({
      method: "signAndSendTransaction",
      params: {
          message: base58.encode(tx.serializeMessage()),
      },
    })


    let {value} = await connection.confirmTransaction(signature)
    if (value.err) {
      throw `could not confirm transaction ${value.err}`
    }

    return value
    
  } catch (error) {
    console.log(error)
    throw Error(`transferSOLToCreators failed ${JSON.stringify(error)}`)
  }
  
}