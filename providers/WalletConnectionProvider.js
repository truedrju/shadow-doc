import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import {
    getPhantomWallet,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { useMemo } from 'react'

export const WalletConnectionProvider = ({ children }) => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = 'mainnet-beta'

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network])

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
        ],
        [network]
    )

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    )
}
