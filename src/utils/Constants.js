export default {
  URLS: {
    HOMEPAGE: '/home',
    DISTRIBUTE_DIVIDENDS: '/distribute_dividends',
    TRANSACTION_HISTORY: '/transaction_history',
    ISSUANCE_REQUEST: '/issuance_request',
    WALLET_BALANCE: '/wallet_balance',
    PLACE_HOLDER4: '/place_holder4'
  },
  PORT: {
    LOCAL_ENV: 'http://localhost:8080',
    PRODUCTION_ENV: '',
    TESTING_ENV: 'http://localhost:8080',
    UBIN_AUTH_ENV: 'https://apilab.iinconnect.com/token'
  },
  PATHS: {
    TOKEN_HISTORY: '/token_history',
    SUBMIT_PAYMENT: '/submit',
    CREATE_ASSET: '/submit/issuance/request',
    VERIFY_USER: '/verifyUser',
    GET_AVAILABLE_ASSETS: '/query/issuance/pending',
    GET_ALL_USERS: '/getUsers',
    GET_WALLET_BALANCE: '/query/wallet/balance',
    GET_ALL_PENDING_ISSUANCE: '/query/issuance/admin',
    VIEW_ASSET: '/viewAsset',
    APPROVE_ISSUANCE: '/submit/issuance/approve',
    REDEMPTION_REQUEST: '/submit/redemption/request',
    GET_ISSUED_ASSETS: '/query/issuance/pending',
    GET_CASH_BALANCE: '/query/cash/balance'
  }
}
