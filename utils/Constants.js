export default {
  URLS: {
    HOMEPAGE: '/home',
    DISTRIBUTE_DIVIDENDS: '/distribute_dividends',
    TRANSACTION_HISTORY: '/transaction_history',
    CREATE_BOND: '/create_bond',
    WALLET_BALANCE: '/wallet_balance',
    PLACE_HOLDER4: '/place_holder4'
  },
  PORT: {
    LOCAL_ENV: 'http://localhost:80/v1',
    PRODUCTION_ENV: '',
    TESTING_ENV: 'https://ubin.stacs.io/v1',
    UBIN_AUTH_ENV: 'https://apilab.iinconnect.com/token'
  },
  PATHS: {
    TOKEN_HISTORY: '/token_history',
    SUBMIT_PAYMENT: '/submit',
    CREATE_ASSET: '/issueAsset',
    VERIFY_USER: '/verifyUser',
    GET_AVAILABLE_ASSETS: '/getAvailableAssets',
    GET_ALL_USERS: '/getUsers',
    GET_WALLET_BALANCE: '/getWalletBalance',
    GET_TRANSACTION_HISTORY: '/viewOrderBook',
    VIEW_ASSET: '/viewAsset',
    SUBSCRIBE_TO_ASSET: '/subscribeToAsset',
    ESCROW_ACTION: '/executeEscrowAction',
    GET_ISSUED_ASSETS: '/getIssuedAssets',
    UBIN_AUTH: '/ubinAuth'
  }
}
