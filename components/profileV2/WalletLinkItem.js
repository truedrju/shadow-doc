import Image from 'next/image'
import { ensureWeb3, getPublicKey } from '../../web3/evm'
import { useSelector, useDispatch } from 'react-redux'
import { setToast } from '../../store/helperSlice'
import { addWallet } from '../../services/userService'
import { useState } from "react"

export default function WalletLinkItem({ wallet }) {
    const dispatch = useDispatch()
    let { user } = useSelector((state) => state.user)
    let [existWallet, setExistWallet] = useState(user.wallets.some(w => w.walletName == wallet))

    const linkWallet = async (wallet) => {
        // const torus = new Torus()
        let web3
        let publicKey

        try {
            switch (wallet) {
                case "phantom":
                    if (!window.solana || !window.solana.isPhantom) {
                        throw Error("please install phantom wallet to sign in with phantom")
                    }

                    if (!window.solana.isConnected) {
                        await window.solana.connect()
                    }
                    publicKey = window.solana.publicKey.toString()
                    await addWallet({ userID: user.userId, publicKey: publicKey, walletType: "sol", walletName: wallet })

                    setExistWallet(true)
                    break

                // case "torus":
                //     window.torus = torus
                //     await torus.init()
                //     await torus.login()
                //     web3 = new Web3(torus.provider)
                //     torus.hideTorusButton()

                case "metamask":
                    web3 = await ensureWeb3(web3, wallet, window)
                    if (!web3) {
                        throw Error("no web3 object found")
                    }
                    publicKey = await getPublicKey(web3)
                    await addWallet({ userID: user.userId, publicKey: publicKey, walletType: "eth", walletName: wallet })

                    setExistWallet(true)
                    break
            }

        } catch (error) {
            let stringy = JSON.stringify(error)
            let msg = stringy == "{}" ? error : stringy

            //hide torus button if have error before login
            // if (wallet == "torus") {
            //     torus.hideTorusButton()
            // }

            dispatch(setToast({ type: "error", text: `${wallet} login: ${msg}` }))
        }
    }

    return (
        <form className="h-[90px] bg-[#2C2725]/[0.5] rounded-[15px] flex flex-row justify-between my-2">
            <div className="relative h-2/3 my-auto flex flex-row ml-5">
                <div className='flex'>
                    {(wallet == "torus") ? <Image src={`/images/social.png`} width={40} height={28} objectFit="contain" /> : <Image src={`/images/icon_${wallet}.svg`} width={40} height={28} />}
                </div>

                {existWallet ? <div className='absolute top-0 left-0 flex'>
                    <Image src="/images/green_circle.svg" width={10} height={10} />
                </div> : <div />}
            </div>
            <div className="flex flex-col justify-center m-5 space-y-2">
                {/* <button className="bg-white/[0.5] text-black text-[12px] rounded-[15px] h-[19px] w-[75px]" type="button">extension</button>
                <button className="bg-white/[0.5] text-black text-[12px] rounded-[15px] h-[19px] w-[75px]" type="button" >wallet</button> */}
                {existWallet ? <button className="text-black text-[12px] rounded-[15px] h-[19px] w-[75px] bg-[#83EB3A]" type="button" >{"connected"}</button>
                    : <button className="text-black text-[12px] rounded-[15px] h-[19px] w-[75px] bg-white" type="button" onClick={() => linkWallet(wallet)}>{"connect"}</button>}
            </div>
        </form>
    )
}