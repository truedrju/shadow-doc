


export const defaultContract = [
  {
    constant: true,
    inputs: [{ name: "src", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
]


export const SupportedTokens = [{
  address: '0x626e8036deb333b408be468f951bdb42433cbf18',
  token: 'AIOZ',
}, {
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  token: 'DAI',
},
{
  address: '0x845838df265dcd2c412a1dc9e959c7d08537f8a2',
  token: 'cDAI+cUSDC',
}]
