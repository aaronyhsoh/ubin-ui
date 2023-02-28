import MUIDataTable from "mui-datatables";
import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Button} from "react-bootstrap";
import {transactionHistoryStore} from "../../store/TransactionHistoryStore";
import * as api from "../../utils/Api";
import {userStore} from "../../store/UserStore";
import {getTransactionHistory} from "../../utils/Api";
import {buyerPageStore} from "../../store/BuyerPageStore";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import ExpandableRow from "../AssetTable/ExpandableRow";
import TextList from "../TextList/TextList";
import moment from "moment";
import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';
import Paho from 'paho-mqtt'
import CircularIndeterminate from "../Spinner/Spinner";

class TransactionHistoryTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updating: false
    }

    this.initData = this.initData.bind(this);

    this.websocketInit = this.websocketInit.bind(this);
    this.onMessageArrived = this.onMessageArrived.bind(this);
    //this.initData();
  }

  initData() {
    //api call to init buyerTransactionHistory
    let transactionHistoryRequest = {
      "blockchainType": "stacs",
      "requesterId": userStore.username,
      "pageNumber": 0,
      "pageSize": 30
    }

    api.getTransactionHistory(transactionHistoryRequest)
      .then(data => {
        console.log(data);
        //this.buyerTransactionHistory = data;
        transactionHistoryStore.tableData = [];
        for (let i = 0; i < data.content.length; i++) {
          let formattedDate = moment(data.content[i].dateSubmitted, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY hh:mm a');

          let row = {
            tickerCode: data.content[i].tickerCode,
            quantity: data.content[i].tokenQuantity,
            subscriptionDate: formattedDate,
            totalPrice: parseFloat(Math.round(data.content[i].totalPrice * 100) / 100).toFixed(2),
            status: data.content[i].status,
            ubinRequestid: data.content[i].ubinRequestid,
            stacsTxid: data.content[i].stacsTxid,
            ubinEscrowid: data.content[i].ubinEscrowid
          }

          transactionHistoryStore.tableData.push(row);

        }
        this.setState({
          data: transactionHistoryStore.tableData
        })
      })
      .catch(error => console.log(error));
  }

  escrowAction(rowData, action) {
    let escrowActionRequest = {
      blockchainType: "ubin",
      requesterId: userStore.username,
      ubinRequestId: rowData[5],
      escrowActionType: action
    }

    api.executeEscrowAction(escrowActionRequest)
      .then(data => {
        this.setState({
          updating: true
        })

      })
      .catch(error => {
        console.log(error)
      })
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      // MUIDataTable: {
      //   paper: {
      //     height: 'inherit',
      //   },
      //   responsiveScroll: {
      //     maxHeight: window.height,
      //     height: 'calc(100% - 128px)'
      //   }
      // },
      MUIDataTableBodyCell: {
        root: {
          //backgroundColor: "#bdc8c8"
        }
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          //backgroundColor: '#bdc8c8',
          fontSize: '1rem',
          fontWeight: 'bold'
        }
      },
      MUIDataTableSelectCell: {
        root: {
          //backgroundColor: '#bdc8c8'
        }
      },
      // MuiTableRow: {
      //   root: {
      //     backgroundColor: "#bdc8c8"
      //   }
      // },
      MUIDataTableToolbar: {
        titleText: {
          fontWeight: 'bold',
          fontSize: '2.2rem'
        }
      }
    }
  })

  websocketInit() {
    var client = new Paho.Client('wss://b-0d787971-5593-4592-97c9-6c5d1308167d-1.mq.ap-southeast-1.amazonaws.com:61619/mqtt', "stacs-local-" + new Date().getTime());
    console.log(client)
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = message => {
      let result = JSON.parse(message.payloadString);
      for (let i = 0; i < transactionHistoryStore.tableData.length; i++) {
        if ((transactionHistoryStore.tableData[i].ubinEscrowid === result.EscrowId) || (transactionHistoryStore.tableData[i].ubinRequestid === result.UbinRequestId)) {

          // if (transactionHistoryStore.tableData[i].status !== result.Status) {
            transactionHistoryStore.tableData[i].ubinEscrowid = result.EscrowId
            transactionHistoryStore.tableData[i].status = result.Status;
            transactionHistoryStore.tableData[i].stacsTxid = result.StacsTxId;
            this.setState({
              data: transactionHistoryStore.tableData
            });

            if (buyerPageStore.autoList.includes(transactionHistoryStore.tableData[i].ubinRequestid) && transactionHistoryStore.tableData[i].status === "VERIFYING_DELIVERY") {
              let escrowActionRequest = {
                blockchainType: "ubin",
                requesterId: userStore.username,
                ubinRequestId: transactionHistoryStore.tableData[i].ubinRequestid,
                escrowActionType: "RELEASE"
              }
              let index = buyerPageStore.autoList.indexOf(transactionHistoryStore.tableData[i].ubinRequestid);
              buyerPageStore.autoList.splice(index, 1);

              api.executeEscrowAction(escrowActionRequest)
                .then(data => {
                  console.log("test",data)
                })
                .catch(error => {
                  console.log(error)
                });
            }
            break;
          // }
        }
      }
    };
    client.connect({
      onSuccess: () => {
        console.log("onConnect");
        client.subscribe(userStore.userDetails.ubinAddress);
      },
      onFailure: console.log,
      userName: "poll-worker",
      password: "Welcome54321",
      useSSL: true
    });
  }

  onConnect(client) {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe(userStore.userDetails.ubinAddress);
    // let message = new Paho.Message("Hello");
    // message.destinationName = "/World";
    // client.send(message);
  };

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0)
      console.log("onConnectionLost:" + responseObject.errorMessage);
  };

  onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    let result = JSON.parse(message.payloadString);
    console.log(result);
    console.log(transactionHistoryStore.tableData);
    for (let i = 0; i < transactionHistoryStore.tableData.length; i++) {
      if (transactionHistoryStore.tableData[i].ubinEscrowid === result.EscrowId) {
        transactionHistoryStore.tableData[i].status = result.Status;
        this.setState({data: transactionHistoryStore.tableData});
        break;
      }
    }
    //client.disconnect();
  };

  componentDidMount() {
    this.initData();
    this.websocketInit();
  }

  render() {
    const {data, updating} = this.state;
    // var stompClient = null;
    // var client = new Paho.Client('wss://b-0d787971-5593-4592-97c9-6c5d1308167d-1.mq.ap-southeast-1.amazonaws.com:61619/mqtt', "stacs-local-"+new Date().getTime());
    // console.log(client)
    // client.onConnectionLost = onConnectionLost;
    // client.onMessageArrived = onMessageArrived;
    // client.connect({
    //   onSuccess:onConnect,
    //   onFailure: console.log,
    //   userName: "poll-worker",
    //   password: "Welcome54321",
    //   useSSL: true
    // });


    const columns = [
      {
        name: "tickerCode",
        label: "Ticker Code",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "quantity",
        label: "Quantity",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "subscriptionDate",
        label: "Subscription Date",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "totalPrice",
        label: "Total Price (USD)",
        options: {
          filter: true,
          sort: true,
          viewColumns: false,
        }
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          viewColumns: false,
        }
      },
      {
        name: "ubinRequestid",
        label: "Request ID",
        options: {
          display: false
        }
      },
      {
        name: "stacsTxid",
        options: {
          display: false
        }
      },
      {
        name: "ubinEscrowid",
        options: {
          display: false
        }
      },
      {
        name: "",
        options: {
          customBodyRender: (value, value2) => {

            switch(value2.rowData[4]) {
              case "VERIFYING_DELIVERY":
                if (buyerPageStore.autoList.includes(value2.rowData[5])) {
                  return (
                    <div>
                      <CircularIndeterminate/>
                      {/*<Button*/}
                      {/*  variant="danger"*/}
                      {/*  onClick={() => this.escrowAction(value2.rowData, "DISPUTE")}*/}
                      {/*>Dispute*/}
                      {/*</Button>*/}
                    </div>
                  )
                }
                else {
                  return (
                    this.state.updating ? <CircularIndeterminate/> :
                      <Button
                        variant="danger"
                        onClick={() => this.escrowAction(value2.rowData, "DISPUTE")}
                      >Dispute
                      </Button>

                  )
                }; break;
              case "COMPLETED" : return(<div></div>); break;
              case "DISPUTE_IN_PROGRESS": return(<div></div>); break;
              case "INSUFFICIENT_FUNDS": return(<div></div>); break;
              default: return(<CircularIndeterminate/>); break;
            }
            // console.log(value2);
            // if (value2.rowData[4] === "VERIFYING_DELIVERY") {
            //   console.log(buyerPageStore.autoList);
            //   if (buyerPageStore.autoList.includes(value2.rowData[5])) {
            //
            //     return (
            //       <div>
            //         <CircularIndeterminate/>
            //         <Button
            //           variant="danger"
            //           onClick={() => this.escrowAction(value2.rowData, "DISPUTE")}
            //         >Dispute
            //         </Button>
            //       </div>
            //     )
            //   } else {
            //     if (this.state.updating) {
            //       return (
            //         <div>
            //           <CircularIndeterminate/>
            //         </div>
            //       )
            //     }
            //     else {
            //       return (
            //         <div>
            //           <Button
            //             variant="danger"
            //             onClick={() => this.escrowAction(value2.rowData, "DISPUTE")}
            //           >Dispute
            //           </Button>
            //         </div>
            //       )
            //     }
            //   }
            // } else if (value2.rowData[4] !== "COMPLETED" || value2.rowData[4] !== "DISPUTE_IN_PROGRESS") {
            //   return (
            //     <div>
            //       <CircularIndeterminate/>
            //       {/*<Button variant="danger" onClick={() => this.escrowAction(value2.rowData, "DISPUTE")} disabled>Dispute</Button>*/}
            //     </div>
            //   )
            //
            // }
            // else {
            //   return (
            //     <div>
            //
            //     </div>
            //   )
            // }
            // return (
            //   <div>
            //     {/*<Button variant="success" onClick={() => this.escrowAction(value2.rowData, "RELEASE")} disabled>Release</Button>*/}
            //     {/*<Button variant="danger" onClick={() => this.escrowAction(value2.rowData, "DISPUTE")} disabled>Dispute</Button>*/}
            //   </div>
            // )

          }
        }
      }
    ];

    const options = {
      filterType: 'checkbox',
      download: false,
      print: false,
      selectableRows: 'none',
      filter: false,
      responsive: 'scrollMaxHeight',
      fixedHeader: true,
      expandableRows: true,
      renderExpandableRow: (rowData, rowMeta) => {

        let index = rowMeta.dataIndex
        if (transactionHistoryStore.tableData[index].stacsTxid !== null || transactionHistoryStore.tableData[index].ubinEscrowid !== null) {
          return (
            <TableRow>
              <TableCell/>
              <TableCell colSpan={2} align="right">
                {/*<TextList type="label" data={transactionHistoryStore.tableData[index]}/>*/}
                <p>{transactionHistoryStore.tableData[index].stacsTxid !== null ? "STACS transaction id: " : ""}</p>
                <p>{transactionHistoryStore.tableData[index].ubinEscrowid !== null ? "Ubin escrow id: " : ""}</p>
              </TableCell>
              <TableCell colSpan={4} align="left">
                {/*<TextList type="value" data={buyerPageStore.availableAssets[rowMeta.dataIndex]}/>*/}
                <p><a
                  href={"https://browser.stacs.io/txidDetails?id=" + transactionHistoryStore.tableData[index].stacsTxid}
                  target="_blank">{transactionHistoryStore.tableData[index].stacsTxid}</a></p>
                <p>{transactionHistoryStore.tableData[index].ubinEscrowid}</p>
              </TableCell>


            </TableRow>
          )
        }
      }
    };
    return (
      <div>
        {/*<Button onClick={this.initData}>Refresh</Button>*/}
        <MuiThemeProvider theme={this.getMuiTheme()}>

          <MUIDataTable
            title={"Order Status"}
            data={transactionHistoryStore.tableData}
            columns={columns}
            options={options}/>
        </MuiThemeProvider>
      </div>


    )
  }
}

export default TransactionHistoryTable;
