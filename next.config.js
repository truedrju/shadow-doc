module.exports = {
    reactStrictMode: true,
    webpack5: true,
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false
      }
      return config
    },
    images: {
      domains: ['cdn.sstatic.net', 'source.unsplash.com', 'assets.coingecko.com', "lh3.googleusercontent.com", 'storage.opensea.io', 'pbs.twimg.com', 'storage.googleapis.com', 'img.youtube.com', "avatars.dicebear.com", "www.arweave.net"],
    },
}



// const withPlugins = require('next-compose-plugins');

// /* eslint-disable @typescript-eslint/no-var-requires */
// const withTM = require("next-transpile-modules")([
//   // "@blocto/sdk",
//   // "@project-serum/sol-wallet-adapter",
//   // "@solana/wallet-adapter-base",
//   // "@solana/wallet-adapter-react",
//   // "@solana/wallet-adapter-react-ui",
//   // "@solana/wallet-adapter-bitkeep",
//   // "@solana/wallet-adapter-bitpie",
//   // "@solana/wallet-adapter-blocto",
//   // "@solana/wallet-adapter-clover",
//   // "@solana/wallet-adapter-coin98",
//   // "@solana/wallet-adapter-coinhub",
//   // "@solana/wallet-adapter-ledger",
//   // "@solana/wallet-adapter-mathwallet",
//   "@solana/wallet-adapter-phantom",
//   // "@solana/wallet-adapter-safepal",
//   // "@solana/wallet-adapter-slope",
//   // "@solana/wallet-adapter-solflare",
//   // "@solana/wallet-adapter-sollet",
//   // "@solana/wallet-adapter-solong",
//   // "@solana/wallet-adapter-tokenpocket",
//   "@solana/wallet-adapter-torus",
// ]);

/** @type {import('next').NextConfig} */
// withTM({
//   reactStrictMode: true,
//   webpack5: true,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback.fs = false;
//     }
//     return config;
//   },
//   images: {
//     domains: ['assets.coingecko.com', "lh3.googleusercontent.com", 'storage.opensea.io', 'pbs.twimg.com', 'storage.googleapis.com','img.youtube.com', 'avatars.dicebear.com'],
//   },
// });



// module.exports = withPlugins([
//   [withTM, {
//     reactStrictMode: true,
//     webpack5: true,
//     webpack: (config, { isServer }) => {
//       if (!isServer) {
//         config.resolve.fallback.fs = false;
//       }
//       return config;
//     },
//     images: {
//       domains: ['assets.coingecko.com', "lh3.googleusercontent.com", 'storage.opensea.io', 'pbs.twimg.com', 'storage.googleapis.com', 'img.youtube.com', "avatars.dicebear.com", "www.arweave.net"],
//     },
//   }]
//   // s{redirects: redirects}
// ])

