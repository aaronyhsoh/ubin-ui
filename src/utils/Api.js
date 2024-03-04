import { data } from 'jquery';
import _ from './Constants';

// let url = _.PORT.LOCAL_ENV;
let url = _.PORT.TESTING_ENV

export async function getCashBalance(userId) {
  let response = await fetch(url + _.PATHS.GET_CASH_BALANCE + "/" + userId, {
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  })
  let data = await response.json();
  return data;
}

export async function getTokenHistory({ tokenCode }) {
  let response = await fetch(url + _.URLS.DISTRIBUTE_DIVIDENDS + _.PATHS.TOKEN_HISTORY, {
    method: 'post',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ walletAddressOrTokenCode: tokenCode })
  })
  let data = await response.json();
  return data;
}

export async function submitForPayment({ paymentCurrency, payerWalletAddress, tokenCode, paymentInfo }) {
  let response = await fetch(url + _.URLS.DISTRIBUTE_DIVIDENDS + _.PATHS.SUBMIT_PAYMENT, {
    method: 'post',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      paymentCurrency: paymentCurrency,
      payerWalletAddress: payerWalletAddress,
      tokenCode: tokenCode,
      paymentInfo: paymentInfo
    })
  })
  let data = await response.json();
  return data;
}

export async function createAsset(formData) {
  console.log(formData)
  let reqBody = {
    pool: formData.securityName,
    amount: formData.totalCirculatingAmount,
    tokenIndex: "",
    currency: formData.currency,
    messagingMethod: null,
    userId: formData.issuerId
  }
  let response = await fetch(url + _.PATHS.CREATE_ASSET, {
    method: 'POST',
    headers: { "Content-type": "application/json; charset=utf-8"},
    body: JSON.stringify(reqBody)
  })
  
  let data = await response;
  return data;
}

export async function verifyLogin(username) {
  let response = await fetch(url + _.PATHS.VERIFY_USER, {
    method: 'post',
    headers: { "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify({
      username: username
    })
  })
  let data = await response.json();
  return data;
}

export async function getAvailableAssets(userId) {
  let response = await  fetch(url + _.PATHS.GET_AVAILABLE_ASSETS + "/" + userId, {
    method: 'GET'
  })
  let data = await response.json();
  return data;
}

export async function getUsers() {
  let response = await fetch(url + _.PATHS.GET_ALL_USERS, {
    method: 'get'
  })
  let data = await response.json();
  return data;
}

export async function getWalletBalance(userId) {
  let response = await fetch(url + _.PATHS.GET_WALLET_BALANCE + "/" + userId, {
    method: 'GET',
    headers: { "Content-type": "application/json; charset=UTF-8"},
    //body: JSON.stringify(walletRequest)
  })
  let data = await response.json();
  return data;
}

export async function getAllPendingIssuance() {
  let response = await fetch(url + _.PATHS.GET_ALL_PENDING_ISSUANCE, {
    method: 'GET',
    headers: { "Content-type": "application/json; charset=UTF-8"},
  })
  let data = await response.json();
  return data;
}

export async function getAllRedemptionRequests() {
  let response = await fetch(url + _.PATHS.GET_ALL_REDEMPTION_REQUESTS, {
    method: 'GET',
    headers: { "Content-type": "application/json; charset=UTF-8"},
  })
  let data= await response.json();
  return data;
}

export async function approveIssuance(requestBody) {
  let response = await fetch(url + _.PATHS.APPROVE_ISSUANCE, {
    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(requestBody)
  })
  let data= await response.json();
  return data;
}

export async function approveRedemption(requestBody) {
  let response = await fetch(url + _.PATHS.APPROVE_REDEMPTION, {
    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(requestBody)
  })
  let data= await response.json();
  return data;
}

export async function submitRedemptionRequest(redemptionRequestBody) {
  let response = await fetch(url + _.PATHS.REDEMPTION_REQUEST, {
    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(redemptionRequestBody)
  })
  let data= await response.json();
  return data;
}

export async function getIssuedAssets(issuedAssetsRequest) {
  let response = await fetch(url + _.PATHS.GET_ISSUED_ASSETS, {
    method: 'GET',
    headers: { "Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(issuedAssetsRequest)
  })
  let data= await response.json();
  return data;
}
