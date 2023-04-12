/**
 * A dict that maps the chainId to the chainName, rpcUrl, and blockExplorerUrl, transaction service url
 * For Goerli and Binance  Smarrt chain,
 */

// ChainInfo is the type of the chain info object
export type ChainInfo = {
    chainName: string
    rpcUrl: string
    blockExplorerUrl: string
    transactionServiceUrl: string
}

export const CHAIN_INFO: { [chainId: string]: ChainInfo } = {
    '1': {
        chainName: 'Ethereum Mainnet',
        rpcUrl: 'https://mainnet.infura.io/v3/6b9b3a0d3d1f4c8e9b1d2a0f7f0c2e7e',
        blockExplorerUrl: 'https://etherscan.io',
        transactionServiceUrl: 'https://safe-transaction-mainnet.safe.global',
    },
    '5': {
        chainName: 'Goerli Testnet',
        rpcUrl: 'https://goerli.infura.io/v3/6b9b3a0d3d1f4c8e9b1d2a0f7f0c2e7e',
        blockExplorerUrl: 'https://goerli.etherscan.io',
        transactionServiceUrl: 'https://safe-transaction-goerli.safe.global',
    },
    '56': {
        chainName: 'Binance Smart Chain',
        rpcUrl: 'https://bsc-dataseed.binance.org',
        blockExplorerUrl: 'https://bscscan.com',
        transactionServiceUrl: 'https://safe-transaction-bsc.safe.global',
    },
}


        