import * as api from '../utils/Api'

class WalletStore {
  // ubinWallet = [{
  //   "blockchainType": "UBIN",
  //   "tokenID": "USD",
  //   "amount": 9781.000000,
  //   "lastUpdatedDate": "2019-10-18T06:12:58.348+0000"
  // }];
  // stacsWallet = [{
  //   "blockchainType": "stacs",
  //   "tokenID": "UBIN04",
  //   "amount": 29.00000000,
  //   "lastUpdatedDate": "2019-10-18T06:12:57.384+0000"
  // },
  //   {
  //     "blockchainType": "stacs",
  //     "tokenID": "UBIN02",
  //     "amount": 14.00000000,
  //     "lastUpdatedDate": "2019-10-18T06:12:57.467+0000"
  //   },
  //   {
  //     "blockchainType": "stacs",
  //     "tokenID": "UBIN01",
  //     "amount": 55.00000000,
  //     "lastUpdatedDate": "2019-10-18T06:12:57.526+0000"
  //   },];

  ubinWallet = [];
  stacsWallet = [];

  clearData() {
    this.ubinWallet = [];
    this.stacsWallet = [];
  }



}

export const walletStore = new WalletStore();
