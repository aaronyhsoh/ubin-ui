import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import './WalletBalance.css';
import {walletStore} from "../../store/WalletStore";
import {Button} from "react-bootstrap";
import * as api from "../../utils/Api";
import {userStore} from "../../store/UserStore";
import moment from "moment";
import RedeemModal from "../../components/Modal/RedeemModal";

class WalletBalance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cashBalance: walletStore.cashBalance,
      updating: false,
      formattedDate: moment().format('DD/MM/YYYY hh:mm a'),
      modal: false
    }

    this.initData();

    this.initData = this.initData.bind(this);

  }

  toggleModal() {
    if (this.state.modal) {
      this.setState({
        modal: false
      })
    } else {
      this.setState({
        modal: true
      })
    }
  }

  initData() {
    this.stacsAddressUrl = "https://browser.stacs.io/addressDetail?address=" + userStore.userDetails.stacsAddress;
    this.ubinUrl = "https://iinlab.iinconnect.com";
    this.setState({formattedDate: moment().format('DD/MM/YYYY hh:mm a')});
    this.org = userStore.userDetails.organization;
    console.log(this.org);
    this.formattedDate = moment().format('DD/MM/YYYY hh:mm a');
    

    api.getWalletBalance("user1")
      .then(data => {
        console.log(data)
        walletStore.stablecoinBalance = data.walletBalanceList;
        this.setState({
          updating: true
        })
      })
      .catch(error => console.log(error))

      api.getCashBalance("user1")
      .then(data => {
        console.log(data)
        walletStore.cashBalance = data.cashBalanceList;
        this.setState({
          updating: true
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const {updating} = this.state;

    //let dec = parseFloat(Math.round({object.amount} * 100) / 100).toFixed(2);
    let cashBalance = walletStore.cashBalance.map(function (object, index) {

      
      return (
        <Grid key={index} item xs={12} sm={6}>
          <p><span style={{
            fontSize: "x-large",
            fontWeight: "bold",
            marginLeft: "2em"
          }}> {object.amount}</span> {object.currency} </p>
        </Grid>
      )
    })

    // let cashBalance = walletStore.cashBalance.forEach(function (item, index) {
    //   return (
    //     <Grid key={index} item xs={6}>
    //       <p>{walletStore.cashBalance[index].tokenId}: {walletStore.cashBalance[index].amount}</p>
    //     </Grid>
    //   )
    // })

    let stablecoinBalance = walletStore.stablecoinBalance.map(function (object, index) {
      
      return (
        <div key={index} style={{width: "33%", marginTop: "10px", marginBottom: "15px"}}>
          <div style={{
            width: "10%",
            float: "left",
            textAlign: "center",
            verticalAlign: "text-top",
            fontSize: "small",
            marginTop: "3px"
          }}></div>
          <div style={{
            width: "90%",
            float: "left",
            textAlign: "left",
            verticalAlign: "text-top",
            fontSize: "small",
            marginTop: "3px",
            fontStyle: "italic"
          }}></div>
          <div style={{width: "0%", float: "left", align: "left"}}>&nbsp;</div>
          <div style={{
            width: "10%",
            float: "left",
            textAlign: "right",
            verticalAlign: "text-bottom",
            height: "25px",
            marginTop: "3px"
          }}></div>
          <div style={{
            width: "40%",
            float: "left",
            textAlign: "left",
            verticalAlign: "text-bottom",
            height: "25px",
            marginTop: "3px"
          }}>{object.pool} ({object.currency}):
          </div>
          <div style={{
            width: "20%",
            float: "left",
            align: "left",
            textAlign: "right",
            verticalAlign: "text-bottom",
            fontSize: "x-large",
            fontWeight: "bold",
            height: "25px"
          }}>{object.amount}</div>
          <div style={{
            width: "20%",
            float: "left",
            align: "left",
            height: "25px",
            verticalAlign: "text-bottom",
            marginTop: "3px"
          }}>&nbsp;
          </div>
        </div>
      )
    })
    //userStore.userDetails.stacsAddress
    return (
      <div style={{width: "960px", align: "center"}}>
        <h1>Account Balance <span style={{fontSize: 'large'}}>Last Updated: {this.state.formattedDate} <Button onClick={this.initData}>Refresh</Button></span></h1>
        {/* <Button onClick={this.initData}>Refresh</Button> */}
        <Box borderColor="grey.500" border={1} borderRadius="borderRadius">
          <h3 style={{float: "left", padding: "20px", textDecoration: "underline"}}>Cash Balance</h3>
          {/* <Link href={this.ubinUrl} target="_blank"><LaunchIcon style={{marginLeft: "-10px", marginTop: "25px"}}/></Link> */}
          <div style={{paddingLeft: 20, paddingRight: 20}}>
            <Grid container spacing={0} className="nationalities-residences">
              {cashBalance}
            </Grid>
          </div>
        </Box>
        <div style={{padding: "20px", marginBottom: "20px"}}></div>
        <div style={{visibility:this.org === 'seller' ? "hidden" : "visible"}}>
          <Box borderColor="grey.500" border={1} borderRadius="borderRadius" marginBottom="100px">
            <h3 style={{float: "left", padding: "20px", textDecoration: "underline"}}>Stablecoin Account Balance</h3>
            <Button style={{marginLeft: "-10px", marginTop: "25px"}} onClick={() => {this.toggleModal()}}>Redeem</Button>
            {/* <Link href={this.stacsAddressUrl} target="_blank">
              <LaunchIcon style={{marginLeft: "-10px", marginTop: "25px"}}/>
            </Link> */}
            <div style={{paddingLeft: 20, paddingRight: 20}}>
              <Grid container spacing={0} className="nationalities-residences">
                {stablecoinBalance}
              </Grid>
            </div>
          </Box>
        </div>
        <RedeemModal
          modalHeader="Redeem"
          showOrHideModal={() => this.toggleModal()}
          show={this.state.modal}/>
      </div>

    )
  }
}

export default WalletBalance;
