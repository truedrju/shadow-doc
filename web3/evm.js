// import Web3 from 'web3';
// import { defaultContract } from './contracts';
// import { getProjectChains } from '../services/projectService';

import Portis from '@portis/web3'

import { sleep } from '../utils/effects'
import { get200 } from '../services/request'

export async function runEVMSignIn(web3) {
  try {
    let publicKey = await getPublicKey(web3)
    let {message} = await get200(`/api/auth/start?publicKey=${publicKey}`)
    let signature  = await signAuthMessage(web3, publicKey, message)
    return await get200(`/api/auth/finish?wallet=metamask&signature=${signature}`)
  } catch (error) {
      throw Error(`could not run sign in process : ${error}`)
  } 
}


export async function ensureWeb3(web3, walletType, window) {
  if (web3) {
    return web3
  }

  // sometimes web3 object is not present, 
  // retry getting web3 object if so
  for(let i=0; i<3;i++) {
    switch (walletType.toLowerCase()) {
      case "metamask":
        web3 = await getMetaMaskWeb3(window)
        break
      case "portis":
        web3 = await getPortisWeb3()
        break
      // case "torus":
      //   web3 = await getTorusWeb3(window)
      }

      if(web3) {
        return web3
      } else {
        await sleep(i* 100)
      }
  }

  // all tries failed, get out
  throw Error("could not initweb3 object")
}

export async function getMetaMaskWeb3(window) {
  if (!(window).ethereum) {
    return null, "Please install MetaMask first"
  }

  try {
    // Request account access if needed
    await (window).ethereum.enable()
    // We don't know window.web3 version, so we use our own instance of Web3
    // with the injected provider given by MetaMask
    // eslint-disable-next-line no-undef
    return new Web3((window).ethereum)
  } catch (error) {
    if (error.code == -32002) {
      throw Error("please approve message in wallet browser extension to sign in")
    } 
  }
}

async function getPortisWeb3() {
  const portis = new Portis('51efb397-d024-4b1a-bb1b-b7d1fb275a8c', 'mainnet')
  await portis.showPortis()  
  // eslint-disable-next-line no-undef
  return new Web3(portis.provider)
}

export async function getPublicKey(web3) {
  try {
    if(!web3) {
      throw Error("no web3 object passed")
    }
  
    const coinbase = await web3.eth.getCoinbase()
      if (!coinbase) {
        throw Error("could not communicate with web3 object")
      }
  
      return coinbase.toLowerCase()
    
  } catch (error) {
    throw Error(`could not get publicKey : ${error}`)
  } 
}

export async function signAuthMessage(web3, publicKey, message) {
  try {
    return await web3.eth.personal.sign(message, publicKey, '') // MetaMask will ignore the third arg password here  
  } catch (error) {
    throw Error(`could not signAuthMessage : ${error}`)
  }
}

export async function getMainAccount(web3) {
  try {
    if(!web3) {
      throw Error("no web3 object found")
    }
    const accounts = await web3.eth.getAccounts()
    return accounts[0]  
  } catch (error) {
    throw Error(`could not getMainAccount : ${error}`)
  }
}

// export async function getActiveProjectIDs(web3, chainID) {
//   try {
//     if (!web3) {
//       throw Error("no web3 object found")
//     }
//     let accountId = await getMainAccount(web3)

//     let activeAccountProjectIds = []
//     // let ethBalance = await web3.eth.getBalance(accountId)
//     // activeAccounts["ether"] = formatUnits(ethBalance,"ether")

//     // let projectChains = await getProjectChains(chainID)
//     // if(!projectChains.length) {
//     //   throw Error("no projectChains found for chainID " + chainID)
//     // }

//     // const run = async (index) => {
//     //   let token = projectChains[index]
//     //   try {
//     //     const contract = new web3.eth.Contract(
//     //       defaultContract,
//     //       token.primaryAddress
//     //     )

//     //     await contract.methods
//     //       .balanceOf(accountId)
//     //       .call(
//     //       { from: '0x0000000000000000000000000000000000000000' },
//     //       (err, data) => {
//     //         if (err) {
//     //           console.error(err)
//     //         }

//     //         if (!data) {
//     //           return
//     //         }

//     //         if (data > 0) {
//     //           activeAccountProjectIds.push(token.projectID)
//     //         }
            
//     //         // Keep for later if we want to store balances
//     //         // for now we just return all projects with non 0 balance
//     //         // activeAccounts[token.chainName] = formatUnits(data, "ether")
//     //       }
//     //     )
//     //   } catch (e) {
//     //     console.error(`could not get account ${e}`)
//     //   }
//     // }

//     // let iters = projectChains.length
//     // for (let i = 0; i < iters; i++) {
//     //   await run(i)
//     // }
//     // return activeAccountProjectIds
    
//   } catch (error) {
//     throw Error(`could not getActiveProjectIDs : ${error}`)
//   }
// }

