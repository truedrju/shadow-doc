import { withIronSessionApiRoute } from "iron-session/next"
import { ironOptions } from "../../../config/session"
import base58 from 'bs58'
import { sign } from 'tweetnacl'
import * as ethUtil from "ethereumjs-util"
import * as sigUtil from "@metamask/eth-sig-util"

export default withIronSessionApiRoute(finish, ironOptions)

async function finish(req, res) {
    // get user from database then:
    let {signature, wallet} = req.query
    console.log("starting...", req.query)
    try {
        let pic, isVerified
        switch (wallet) {
            case "metamask":
                isVerified = verifyMetaMask(req.session.auth_message, signature, req.session.publicKey)
                pic = '/images/signin_metamask.png'
                break
        
            case "phantom":
                isVerified = verifyPhantom(req.session.auth_message, signature, req.session.publicKey)
                pic = '/images/signin_phantom.png'
                break
    
            default:
                throw Error(`invalid login type ${wallet}`)
        }
    
        if (!isVerified) {
            throw Error(`could not verify signature. check key arguments or nonce value`)
        }
    
        req.session.user = {
            publicKey: req.session.publicKey,
            userName: req.session.publicKey.substring(req.session.publicKey.length - 5, req.session.publicKey.length),
            picture: pic
        }
    
        await req.session.save()
        res.send({user: req.session.user})
    } catch (error) {
        console.error(error)
        res.status(500).send( {error})
        
    }

}

function verifyPhantom(message, signature, publicKey) {
    console.log(typeof publicKey)
    let authB = new TextEncoder().encode(message)
    let publicKeyB = base58.decode(publicKey)
    let sigB2 = base58.decode(signature)
    return sign.detached.verify(authB, sigB2, publicKeyB)
}

function verifyMetaMask(message, sig, keyToMatch) {
    let keyUsedToSign = addressFromMessage(message, sig)
    return keyUsedToSign.toLowerCase() == keyToMatch.toLowerCase()
}

function addressFromMessage(msg, signature) {
    // eslint-disable-next-line no-undef
    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, "utf8"))

    const body = {
        data: msgBufferHex,
        signature: signature,
    }

    return sigUtil.recoverPersonalSignature(body)
}
