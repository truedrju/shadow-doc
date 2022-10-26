import { clusterApiUrl } from "@solana/web3.js"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"

import { Provider } from "react-redux"
import { useMemo } from "react"
import "react-toastify/dist/ReactToastify.css"

import "../styles/global.css"

import ErrorBoundary from "../components/errboundary"

import { store } from "../store/store"
import UserProvider from "../providers/UserProvider"
import NotificationProvider from "../providers/NotificationProvider"

import LayoutV4 from "../components/layoutV4/Layout"

export default function App({ Component, pageProps }) {
    let network
    // eslint-disable-next-line no-undef
    if (process.env.NEXT_PUBLIC_PLUMENV == "prod") {
        network = WalletAdapterNetwork.Mainnet
    } else {
        network = WalletAdapterNetwork.Devnet
    }

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            // getSolflareWallet(),
            // getSlopeWallet(),
            // getSolletWallet({ network }),
            // getSolletExtensionWallet({ network }),
        ],
        [network]
    )

    const endpoint = useMemo(() => clusterApiUrl(network), [network])

    return (
        <Provider store={store}>
            <NotificationProvider />
            <UserProvider />
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <LayoutV4>
                        <ErrorBoundary>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </LayoutV4>
                </WalletProvider>
            </ConnectionProvider>
        </Provider>
    )
}