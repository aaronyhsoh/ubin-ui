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
import {viewProjectStore} from "../../store/ViewProjectStore";
import {MuiThemeProvider} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import moment from "moment";
import Link from '@material-ui/core/Link';

class ViewProjectsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }

    this.initData = this.initData.bind(this);

    this.initData();
  }

  initData() {
    //api call to init issued Assets
    let issuedAssetsRequest = {
      "blockchainType": "stacs",
      "requesterUserId": userStore.username
    }

    api.getIssuedAssets(issuedAssetsRequest)
      .then(data => {
        viewProjectStore.issuedAssets = [];
        // viewProjectStore.issuedAssets = data;
        for (let i = 0; i < data.length; i++) {

          let row = {
            securityName: data[i].securityName,
            tickerCode: data[i].tickerCode,
            issueSize: data[i].totalQuantity,
            issueDate: moment(data[i].issueDate,'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY'),// hh:mm a
            maturityDate: moment(data[i].maturityDate,'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY'),
            issuePrice: parseFloat(Math.round(data[i].issuePrice * 100) / 100).toFixed(2),
            couponRatePercent: parseFloat(Math.round(data[i].couponRatePercent * 100) / 100).toFixed(2),
            stacsTxid: data[i].stacsTxid,

            subscriptionEndDate: data[i].subscriptionEndDate,
            lastUpdatedDate: data[i].lastUpdatedDate,
            assetType: data[i].assetType
          }
          viewProjectStore.issuedAssets.push(row);
        }
        this.setState({
          data: viewProjectStore.issuedAssets
        })
      })
      .catch(error => console.log(error));

  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
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


  render() {
    const columns = [
       {
          name: "securityName",
          label: "Security Name",
          options: {
            filter: true,
            sort: false,
            viewColumns: false,
            width: "100px"
          }
        },
      {
        name: "tickerCode",
        label: "Ticker Code",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "issueSize",
        label: "Issue Size",
        options: {
          filter: true,
          sort: false,
        }
      },
      {
          name: "issueDate",
          label: "Issue Date",
          options: {
            filter: true,
            sort: false,
          }
        },
      {
        name: "maturityDate",
        label: "Maturity Date",
        options: {
          filter: true,
          sort: false,
        }
      },
      {
          name: "issuePrice",
          label: "Issue Price (USD)",
          options: {
            filter: true,
            sort: false,
          }
        },
       {
         name: "couponRatePercent",
         label: "Coupon Rate (%p.a.)",
         options: {
           filter: true,
           sort: false,
         }
       },
       {
       name: "stacsTxid",
       label: "Stacs TxId",
       options: {
         filter: true,
         sort: false,
         display: false
       }
     },
      {
        name: "subscriptionEndDate",
        label: "Subscription End Date",
        options: {
          filter: true,
          sort: false,
          display: false
        }
      },/*
      {
        name: "lastUpdatedDate",
        label: "Timestamp",
        options: {
          filter: true,
          sort: false,
          viewColumns: false,
        }
      },
      {
        name: "assetType",
        label: "Asset Type",
        options: {
          filter: true,
          sort: false,
          viewColumns: false,
        }
      }, */

      // {
      //   name: "ubinRequestid",
      //   label: "Request ID",
      //   options: {
      //     display: false
      //   }
      // },
      {
        name: "",
        options: {
          customBodyRender: (value, value2) => {
          let url = "https://browser.stacs.io/txidDetails?id=" + value2.rowData[7];
              return (
                <div>
                  {/*<Button variant="success" onClick={() => this.escrowAction(value2.rowData, "RELEASE")}>Release</Button>*/}
                  {/*<Button variant="primary" onClick={() => console.log(value2.rowData[0]  )}>View</Button> */}
                  <Link href={url} target="_blank">
                  <Button variant="primary">View</Button>
                  </Link>
                </div>
              )

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
      responsive: 'scrollMaxHeight'
    };
    return (
      <div>
        {/*<Button onClick={this.initData}>Refresh</Button>*/}
        <MuiThemeProvider theme={this.getMuiTheme()}>

        <MUIDataTable
          title={"Debt Securities"}
          data={viewProjectStore.issuedAssets}
          columns={columns}
          options={options}/>
        </MuiThemeProvider>
      </div>


    )
  }
}

export default ViewProjectsTable;
