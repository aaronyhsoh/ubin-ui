import MUIDataTable from "mui-datatables";
import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Button} from "react-bootstrap";
import {transactionHistoryStore} from "../../store/TransactionHistoryStore";
import * as api from "../../utils/Api";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import moment from "moment";
import ApproveIssuanceModal from "../Modal/ApproveIssuanceModal";

class TransactionHistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updating: false,
      showModal: false
    }
    this.initData = this.initData.bind(this);
    this.initData();
  }

  initData() {
    api.getAllPendingIssuance()
      .then(data => {
        console.log(data);
        //this.buyerTransactionHistory = data;
        transactionHistoryStore.tableData = [];
        for (let i = 0; i < data.length; i++) {
          let formattedDate = moment(data[i].createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY hh:mm a');
          let row = {
            pool: data[i].pool,
            date: formattedDate,
            currency: data[i].currency,
            amount: parseFloat(data[i].amount).toFixed(2),
            status: data[i].approvalStatus,
            requestedBy: data[i].userId,
            id: data[i].id,
            issuanceId: data[i].issuanceId
          }
          transactionHistoryStore.tableData.push(row);
        }
        this.setState({
          data: transactionHistoryStore.tableData,
        })
      })
      .catch(error => console.log(error));
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({showModal: false})
    } else {
      this.setState({showModal: true})
    }
  }

  approveIssuance(rowData, rowData2) {
    console.log("approveIssuance")
    let reqBody = {
      pool: rowData2.rowData[0],
      currency: rowData2.rowData[2],
      amount: rowData2.rowData[3],
      userId: rowData2.rowData[5],
      issuanceStatusId: rowData2.rowData[6]
    }
    console.log(reqBody);
    api.approveIssuance(reqBody)
      .then(data => {
        console.log(data);
        this.setState({
          showModal: true
        })

        setTimeout(() => {
          this.setState({
            showModal: false
          })
          this.initData()
        }, 2000)

      })
    console.log(transactionHistoryStore.tableData)
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
      MUIDataTableToolbar: {
        titleText: {
          fontWeight: 'bold',
          fontSize: '2.2rem'
        }
      }
    }
  })
  
  // componentDidMount() {
  //   this.initData();
  // }

  render() {
    const columns = [
      {
        name: "pool",
        label: "Pool",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "date",
        label: "Date",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "currency",
        label: "Currency",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "amount",
        label: "Amount",
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
        name: "requestedBy",
        label: "Requested By",
        options: {
          display: true
        }
      },
      {
        name: "id",
        label: "ID",
        options: {
          display: false
        }
      },
      {
        name: "",
        options: {
          customBodyRender: (value, value2) => { return (
            value2.rowData[4] === "APPROVED" ? "" : <Button onClick={() => this.approveIssuance(value, value2)}>Approve</Button>
          )}    
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
                <p>{transactionHistoryStore.tableData[index].issuanceId !== null ? "Transaction ID: " : ""}</p>
              </TableCell>
              <TableCell colSpan={4} align="left">
                {/*<TextList type="value" data={buyerPageStore.availableAssets[rowMeta.dataIndex]}/>*/}
                <p><a
                  href={"http://localhost:5002/ui/namespaces/default/tokens/transfers?time=24hours&slide=" + transactionHistoryStore.tableData[index].issuanceId}
                  target="_blank">{transactionHistoryStore.tableData[index].issuanceId}</a></p>
                <p>{transactionHistoryStore.tableData[index].ubinEscrowid}</p>
              </TableCell>
            </TableRow>
          )
        }
      }
    };
    return (
      <div>
        {/* <Button onClick={() => {this.initData() }}>Refresh</Button> */}
        <ApproveIssuanceModal
            show={this.state.showModal}
            showOrHideModal={()=> this.toggleModal()}
          />
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title={"Issuance"}
            data={transactionHistoryStore.tableData}
            columns={columns}
            options={options}/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default TransactionHistoryTable;
