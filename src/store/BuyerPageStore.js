import * as api from '../utils/Api'
import {userStore} from "./UserStore";
import moment from "moment";

class BuyerPageStore {
  displayInfo = {
    //currency: "Currency",
    unitPrice: "Order Price (USD)",
    //tickerCode: "Ticker Code",
    quantityForPurchase: "Available Quantity",
    // couponFrequency: "Coupon Frequency",
    subscriptionEndDate: "Subscription End Date",
    minimumPurchaseAmount: "Min Purchase Amount",
    maximumPurchaseAmount: "Max Purchase Amount"
  }
  expandableRowInfo = {
    //currency: "Currency",
    faceValuePrice: "Face Value Price (USD)",
    //unitPrice: "Order Price (USD)",
    eligibleInvestorType: "Eligible Investor Type",
    //tickerCode: "Ticker Code",
    //availableQuantityForPurchase: "Available Quantity",
    couponFrequency: "Coupon Frequency",
    subscriptionEndDate: "Subscription End Date",
    minimumPurchaseAmount: "Minimum Purchase Amount",
    maximumPurchaseAmount: "Maximum Purchase Amount",
    kycNationality: " Nationalities",
    kycResidencies: " Residencies"
  }

  availableAssets = [];
  selectedRow = {};
  amountToPurchase = 0;
  totalPricePaid = 0;
  isAuto = false;
  autoList = [];


  // Fetch list of bonds / funds
  initData(userId) {
    api.getAvailableAssets(userId)
      .then(data => {
        this.availableAssets = data;

        for (let i = 0; i < data.length; i++) {
          let formattedDate = moment(data[i].subscriptionEndDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY hh:mm:ss');
          this.availableAssets[i].subscriptionEndDate = formattedDate;

        }

        return data;
      })
      .catch(error => console.log(error))
  }

  fetchAssetData(rowIndex) {
    let viewAssetRequest = {
      blockchainType : "stacs",
      tickerCode: buyerPageStore.availableAssets[rowIndex].tickerCode,
      requesterId: userStore.username
    }
    api.viewAsset(viewAssetRequest)
      .then(data => {
        buyerPageStore.selectedRow = data;
        return data;
      })
      .catch(error => console.log(error));
  }

  subscribeToAsset() {
    
  }

  formatDateString(dateISOString) {
    let formattedDate = moment(dateISOString, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY hh:mm:ss');
    return formattedDate;

  }

  clearData() {
    this.availableAssets = [];
    this.selectedRow = {};
  }

}

export const buyerPageStore = new BuyerPageStore();

