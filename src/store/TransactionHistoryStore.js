import * as api from '../utils/Api';

class TransactionHistoryStore {
  buyerTransactionHistory = [];
  tableData = [];


  initData() {
    //api call to init buyerTransactionHistory
    let transactionHistoryRequest = {
      "blockchainType": "stacs",
      "requesterId": "investor_a",
      "pageNumber": 0,
      "pageSize": 10
    }
    // api.getTransactionHistory(transactionHistoryRequest)
    //   .then(data => {
    //     console.log("transactionHistory: ", data);
    //     this.buyerTransactionHistory = data;
    //     console.log("data.length: ", data.content.length);
    //     for (let i = 0; i < data.content.length; i++) {
    //       let row = {
    //         tickerCode: data.content.tickerCode,
    //         quantity: data.content.tokenQuantity,
    //         subscriptionDate: data.content.dateSubmitted,
    //         lastUpdatedDate: data.content.lastUpdatedDate
    //       }
    //       this.tableData.push(row);
    //     }
    //   })
  }

  clearData() {
    this.buyerTransactionHistory = [];
  }
}

export const transactionHistoryStore = new TransactionHistoryStore();
