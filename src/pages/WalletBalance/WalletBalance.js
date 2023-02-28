import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import './WalletBalance.css';
import {walletStore} from "../../store/WalletStore";
import {Button} from "react-bootstrap";
import {forEach} from "react-bootstrap/utils/ElementChildren";
import * as api from "../../utils/Api";
import {userStore} from "../../store/UserStore";
import LaunchIcon from '@material-ui/icons/Launch';
import Link from '@material-ui/core/Link';
import moment from "moment";
import Paho from "paho-mqtt";
import {transactionHistoryStore} from "../../store/TransactionHistoryStore";
import {buyerPageStore} from "../../store/BuyerPageStore";
import CircularIndeterminate from "../../components/Spinner/Spinner";

class WalletBalance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ubinWallet: walletStore.ubinWallet,
      updating: false,
      formattedDate: moment().format('DD/MM/YYYY hh:mm a')
    }

    this.initData();

    this.initData = this.initData.bind(this);

  }

  initData() {
    this.stacsAddressUrl = "https://browser.stacs.io/addressDetail?address=" + userStore.userDetails.stacsAddress;
    this.ubinUrl = "https://iinlab.iinconnect.com";
    this.setState({formattedDate: moment().format('DD/MM/YYYY hh:mm a')});
    this.org = userStore.userDetails.organization;
    console.log(this.org);
    this.formattedDate = moment().format('DD/MM/YYYY hh:mm a');
    let requestBody = {
      blockchainType: "ubin",
      tokenCode: "USD",
      requesterUserId: userStore.username //"investor_a"
    }

    api.getWalletBalance(requestBody)
      .then(data => {
        walletStore.clearData();
        data.forEach(function (item) {
          if (item.blockchainType === "stacs") {
            walletStore.stacsWallet.push(item);
          }
          if (item.blockchainType === "UBIN") {
            walletStore.ubinWallet.push(item);
          }
        })
        this.setState({
          updating: true
        })
      })
      .catch(error => console.log(error))
  }
  componentDidMount() {
    this.websocketInit();
  }

  websocketInit() {
    var client = new Paho.Client('wss://b-0d787971-5593-4592-97c9-6c5d1308167d-1.mq.ap-southeast-1.amazonaws.com:61619/mqtt', "stacs-local-" + new Date().getTime());
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = message => {
      let result = JSON.parse(message.payloadString);
      console.log(result);
      for (let i = 0; i < walletStore.ubinWallet.length; i++) {
        if ((walletStore.ubinWallet[i].tokenID === result.Currency)) {
          walletStore.ubinWallet[i].amount = result.Amount;

          this.setState({
            ubinWallet: walletStore.ubinWallet,
            formattedDate: moment().format('DD/MM/YYYY hh:mm a'),
            updating: false
          });

          break;
        }
      }
    };
    client.connect({
      onSuccess: () => {
        console.log("onConnect");
        client.subscribe(userStore.userDetails.ubinAddress);
        console.log("ubinAddress: ",userStore.userDetails.ubinAddress);
      },
      onFailure: console.log,
      userName: "poll-worker",
      password: "Welcome54321",
      useSSL: true
    });
  }

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0)
      console.log("onConnectionLost:" + responseObject.errorMessage);
  };

  render() {
    const {updating} = this.state;

    // var client = new Paho.Client('wss://b-0d787971-5593-4592-97c9-6c5d1308167d-1.mq.ap-southeast-1.amazonaws.com:61619/mqtt', "stacs-local-" + new Date().getTime());
    // console.log(client)
    // client.onConnectionLost = onConnectionLost;
    // client.onMessageArrived = onMessageArrived;
    // client.connect({
    //   onSuccess: onConnect,
    //   onFailure: console.log,
    //   userName: "poll-worker",
    //   password: "Welcome54321",
    //   useSSL: true
    // });
    //
    // function onConnect() {
    //   // Once a connection has been made, make a subscription and send a message.
    //   console.log("onConnect");
    //   client.subscribe(userStore.userDetails.ubinAddress);
    //   // let message = new Paho.Message("Hello");
    //   // message.destinationName = "/World";
    //   // client.send(message);
    // };
    //
    // function onConnectionLost(responseObject) {
    //   if (responseObject.errorCode !== 0)
    //     console.log("onConnectionLost:" + responseObject.errorMessage);
    // }
    //
    // function onMessageArrived(message) {
    //   console.log("onMessageArrived:" + message.payloadString);
    //   let result = JSON.parse(message.payloadString);
    //   console.log(result);
    //   console.log(walletStore.ubinWallet[0]);
    //   let currentState = updating;
    //   walletStore.ubinWallet[0].amount = result.Amount;
    //   this.setState({
    //     updating: !currentState
    //   })
    //   //client.disconnect();
    // }

    //let dec = parseFloat(Math.round({object.amount} * 100) / 100).toFixed(2);
    let ubinWallet = walletStore.ubinWallet.map(function (object, index) {

      var value = parseFloat(Math.round(object.amount * 100) / 100);
      var formattedValue = Number(value).toLocaleString(undefined, {minimumFractionDigits: 2});
      return (
        <Grid key={index} item xs={12} sm={6}>
          <p>What you have: <span style={{
            fontSize: "x-large",
            fontWeight: "bold",
            marginLeft: "2em"
          }}> {formattedValue}</span> {object.tokenID} </p>
        </Grid>
      )
    })

    // let ubinWallet = walletStore.ubinWallet.forEach(function (item, index) {
    //   return (
    //     <Grid key={index} item xs={6}>
    //       <p>{walletStore.ubinWallet[index].tokenId}: {walletStore.ubinWallet[index].amount}</p>
    //     </Grid>
    //   )
    // })

    let stacsWallet = walletStore.stacsWallet.map(function (object, index) {
      var formattedValue = Number(object.amount).toLocaleString();

      return (
        /*
        <table style={{width:"100%", align:"left"}}>
          <tr>
               <td style={{textAlign:"left", width:"20%"}}>&nbsp;</td>
              <td style={{textAlign:"right", width:"40%"}}>{object.tokenID} :</td>
              <td style={{textAlign:"left", fontSize: "x-large", fontWeight:"bold", width:"5%"}}>{object.amount}</td>
              <td style={{width:"5%"}}>Units</td>
             <td style={{textAlign:"left", width:"20%"}}>&nbsp;</td>

          </tr>
          <tr>
          <td style={{textAlign:"left", width:"20%"}}>&nbsp;</td>
          <td style={{fontSize:"small", fontWeight:"italic",textAlign:"right"}}>{object.securityName}</td>
          </tr>

        </table>*/

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
          }}>{object.securityName}</div>
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
            width: "30%",
            float: "left",
            textAlign: "left",
            verticalAlign: "text-bottom",
            height: "25px",
            marginTop: "3px"
          }}>{object.tokenID} :
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
          }}>{formattedValue}</div>
          <div style={{
            width: "20%",
            float: "left",
            align: "left",
            height: "25px",
            verticalAlign: "text-bottom",
            marginTop: "3px"
          }}>&nbsp; Units
          </div>

        </div>

        /*
            <Paper>
            <Table aria-label="simple table">
             <TableBody>
             {walletStore.stacsWallet.map(obj => (
              <TableRow key={index}>
              <TableCell  align="right">
                {obj.securityName}
               </TableCell>
                <TableCell align="right">{object.tokenID}</TableCell>
              </TableRow>
              ))}
             </TableBody>
             </Table>
             </Paper>*/
        /*
        <Grid key={index} item xs={6}>
          <p > <span> {object.securityName} ({object.tokenID}):</span>
          <span style={{fontSize: "x-large", fontWeight:"bold", marginLeft:"2em"}}>{object.amount} </span>
          <span > Units</span>
          </p>

        </Grid>*/
      )
    })
    //userStore.userDetails.stacsAddress
    return (
      <div style={{width: "960px", align: "center"}}>
        <h1>Account Balance <span style={{fontSize: 'large'}}>Last Updated: {this.state.formattedDate}</span></h1>
        {/*<Button onClick={this.initData}>Refresh</Button>*/}
        <Box borderColor="grey.500" border={1} borderRadius="borderRadius">
          <h3 style={{float: "left", padding: "20px", textDecoration: "underline"}}>Ubin Account Balance</h3>
          <Link href={this.ubinUrl} target="_blank"><LaunchIcon style={{marginLeft: "-10px", marginTop: "25px"}}/></Link>
          <div style={{paddingLeft: 20, paddingRight: 20}}>
            <Grid container spacing={0} className="nationalities-residences">
              {ubinWallet}
            </Grid>
          </div>
        </Box>
        <div style={{padding: "20px", marginBottom: "20px"}}></div>
        <div style={{visibility:this.org === 'seller' ? "hidden" : "visible"}}>
        <Box borderColor="grey.500" border={1} borderRadius="borderRadius" marginBottom="100px">
          <h3 style={{float: "left", padding: "20px", textDecoration: "underline"}}>STACS Digital Securities
            Portfolio</h3><Link href={this.stacsAddressUrl} target="_blank"><LaunchIcon
          style={{marginLeft: "-10px", marginTop: "25px"}}/></Link>

          <div style={{paddingLeft: 20, paddingRight: 20}}>
            <Grid container spacing={0} className="nationalities-residences">
              {stacsWallet}
            </Grid>
          </div>
        </Box>
        </div>
      </div>

    )
  }
}

export default WalletBalance;
