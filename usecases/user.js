import { useDispatch } from "react-redux"

import { runEVMSignIn, ensureWeb3 } from "../web3/evm"
import { runSOLSignIn } from "../web3/sol"
import { setUser, setUserLoggingIn } from "../store/userSlice"
import { setIsLoginModalOpen } from "../store/helperSlice"
import { setToast } from "../store/helperSlice"
import { get200 } from "../services/request"
import { logoutUser } from "../store/userSlice"

export function useLogin() {
    const dispatch = useDispatch()

    async function metamaskLogin() {
        let web3 = await ensureWeb3(web3, "metamask", window)
        if (!web3) {
            throw Error("no web3 object found")
        }
        return runEVMSignIn(web3, window)
        // case "torus":
                //   window.torus = torus;
                //   await torus.init();
                //   await torus.login(); // await torus.ethereum.enable()
                //   web3 = new Web3(torus.provider);
                //   torus.hideTorusButton();
    }

    async function phantomLogin() {
        if (!window.solana || !window.solana.isPhantom) {
            throw Error(
                "please install phantom wallet to sign in with phantom"
            )
        }

        if (!window.solana.isConnected) {
            await window.solana.connect()
        }

        return await runSOLSignIn(window.solana)
    }


    function loginGen(walletLogin) {
        return async function() {
            try {
                dispatch(setUserLoggingIn(true))
                let userData = await walletLogin()
                
                if (!userData) {
                    dispatch(
                        setToast({
                            type: "error",
                            text: `login: could not lgoin"`,
                        })
                    )
                }
    
                dispatch(setUser(userData.user))                
            } catch (error) {
                let stringy = JSON.stringify(error)
                let msg = stringy == "{}" ? error : stringy
    
                //hide torus button if have error before login
                // if (loginType == "torus") {
                //     torus.hideTorusButton()
                // }
    
                dispatch(
                    setToast({ type: "error", text: `login: ${msg}` })
                )
            } finally {
                dispatch(setUserLoggingIn(false))
                dispatch(setIsLoginModalOpen(false))
            }
        }
    }

    return {
        handleMetaMask: loginGen(metamaskLogin),
        handlePhantom: loginGen(phantomLogin),
    }
}

export function useLogout() {
    let dispatch = useDispatch()

    const handleLogout = async () => {
        get200("/api/user/logout")
        dispatch(logoutUser(""))
    }

    return {
        handleLogout,
    }
}
