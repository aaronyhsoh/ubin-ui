import MUIDataTable from "mui-datatables";
import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Button} from "react-bootstrap";
import SuccessModal from "../Modal/SuccessModal";
import {MuiThemeProvider, TextField} from "@material-ui/core";
import {buyerPageStore} from "../../store/BuyerPageStore";
import {userStore} from "../../store/UserStore"
import * as api from '../../utils/Api';
import TextList from "../TextList/TextList";
import ExpandableRow from "./ExpandableRow";
import ModalBody from "./ModalBody";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import moment from "moment";
import ApproveIssuanceModal from "../Modal/ApproveIssuanceModal";


class RedemptionTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      availableAssets: buyerPageStore.initData(userStore.username),
      selectedRow: {},
      showModal: false,
      purchaseUnits: 0,
      totalAmount: 0,
      totalPayable: 0
    }

    this.fetchData();

    this.selectRow = this.selectRow.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
  }



  handleClick(rowMeta) {
    if (this.state.showModal) {
      this.setState({showModal: false})
    } else {
      this.setState({showModal: true})
    }
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({showModal: false})
    } else {
      this.setState({showModal: true})
    }
  }

  changeAmount(event) {
    this.setState({
      purchaseUnits: event.target.value
    })
  }

  selectRow(rowIndex) {
    // buyerPageStore.selectedRow = buyerPageStore.availableAssets[rowMeta.dataIndex]
    let viewAssetRequest = {
      blockchainType : " stacs",
      tickerCode: buyerPageStore.availableAssets[rowIndex].tickerCode,
      requesterId: userStore.username
    }
    // api.viewAsset(viewAssetRequest)
    //   .then(data => {
    //     buyerPageStore.selectedRow = data;
    //   })
    //   .catch(error => console.log(error));
    // console.log(buyerPageStore.selectedRow);
  }

  approveRedemption(data1, data2) {
    console.log(data2)
    let requestBody = {
        id: data2.rowData[0],
        pool: data2.rowData[1],
        amount: data2.rowData[4],
        userId: data2.rowData[6]
    } 
    
    api.approveRedemption(requestBody)
        .then(data => {
            console.log(data);
            this.setState({
                showModal: true
            })

            setTimeout(() => {
                this.setState({
                    showModal: false
                })
                this.fetchData()
            }, 2000)
        })
  }

  fetchData() {
    api.getAllRedemptionRequests()
      .then(data => {
        console.log(data);
        buyerPageStore.availableAssets = data;
        for (let i = 0; i < data.length; i++) {
          let formattedDate = moment(data[i].createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY hh:mm a');
          buyerPageStore.availableAssets[i].issueDate = formattedDate;

          let amount = parseFloat(data[i].amount).toFixed(2);
          buyerPageStore.availableAssets[i].amount = amount;

          
        }
        this.setState({
          availableAssets: buyerPageStore.availableAssets
        })
      })
      .catch(error => console.log(error))
  }

  getAssetData() {
    let viewAssetRequest = {
      "blockchainType":"stacs",
      "tickerCode":"UBIN01",
      "requesterId": userStore.username//"investor_a"
    }
    // api.viewAsset(viewAssetRequest)
    //   .then(data => {
    //
    //   })
  }

  modalBody() {
    return(
      <ModalBody/>

    )
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
    const {showModal, availableAssets} = this.state;
    console.log(buyerPageStore.availableAssets)

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
              filter: true,
              sort: true,
              display: false
              //sortDirection: 'asc'
            }
        },
      {
        name: "pool",
        label: "Pool",
        options: {
          filter: true,
          sort: true,
          //sortDirection: 'asc'
        }
      },
      {
        name: "pool",
        label: "Token ID",
        options: {
          filter: true,
          sort: true,
          resizableColumns: false
        }
      },
      {
        name: "currency",
        label: "Currency",
        options: {
          filter: true,
          sort: true,
          resizableColumns: false,
          display: false

        }
      },
      {
        name: "amount",
        label: "Amount",
        options: {
          filter: true,
          sort: true,
          resizableColumns: false

        }
      },
      {
        name: "approvalStatus",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          resizableColumns: false
        }
      },
      {
        name: "userId",
        label: "User ID",
        options: {
          filter: true,
          sort: true,
          display: true
          //sortDirection: 'asc'
        }
    },
    {
      name: "burnId",
      label: "Transaction ID",
      options: {
        filter: true,
        sort: true,
        display: false
        //sortDirection: 'asc'
      }
  },
      {
        name: "issueDate",
        label: "",
        options: {
          sortDirection: "asc",
          display: false
        }
      },
      {
        name: "",
        options: {
          customBodyRender: (value, value2) => { return (
            value2.rowData[5] === "APPROVED" ? "" : <Button onClick={() => this.approveRedemption(value, value2)}>Approve</Button>
          )}    
        }
      }
      // {
      //   name: "",
      //   options: {
      //     customBodyRender: (value, value2, value3) => {
      //       return (
      //         <Button onClick={this.handleClick(value)}>Test</Button>
      //       )
      //     }
      //   }
      // }


    ];

    // const data = [
    //   {
    //     tickerCode: "TT101",
    //     totalQuantity: "10000",
    //     subscriptionEndDate: "November 2019",
    //     lastUpdatedDate: "NY",
    //     securityName: "Testing Token"
    //   },
    //   {
    //     tickerCode: "TT202",
    //     totalQuantity: "5000",
    //     subscriptionEndDate: "January 2020",
    //     lastUpdatedDate: "CT",
    //     securityName: "Testing Token"
    //   },
    //   {
    //     tickerCode: "BB303",
    //     totalQuantity: "4000",
    //     subscriptionEndDate: "February 2020",
    //     lastUpdatedDate: "FL",
    //     securityName: "Testing Token"
    //   },
    //   {
    //     tickerCode: "AARON",
    //     totalQuantity: "20000",
    //     subscriptionEndDate: "June 2020",
    //     lastUpdatedDate: "TX",
    //     securityName: "Testing Token",
    //     extraInfo: "Testing"
    //   },
    // ];

    const options = {
      filterType: 'checkbox',
      download: false,
      print: false,
      selectableRows: 'none',
      filter: false,
      responsive: 'scrollMaxHeight',
      expandableRows: true,
      renderExpandableRow: (rowData, rowMeta) => {
        
        // this.selectRow(rowMeta);
        console.log(rowData)
        if (rowData[7] !== null) {
          return (
            <TableRow>
              <TableCell/>
              <TableCell colSpan={2} align="right">
                {/*<TextList type="label" data={transactionHistoryStore.tableData[index]}/>*/}
                <p>{"Transaction ID: "}</p>
              </TableCell>
              <TableCell colSpan={4} align="left">
                {/*<TextList type="value" data={buyerPageStore.availableAssets[rowMeta.dataIndex]}/>*/}
                <p><a
                  href={"http://localhost:5002/ui/namespaces/default/tokens/transfers?time=24hours&slide=" + rowData[7]}
                  target="_blank">{rowData[7]}</a></p>
                
              </TableCell>
            </TableRow>
          )
        }
      }
    };

    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={"Redemption"}
          data={availableAssets}
          columns={columns}
          options={options}/>
        </MuiThemeProvider> 
        <ApproveIssuanceModal
            modalHeader="Success"
            showOrHideModal={() => this.toggleModal()}
            show={showModal}
        // modalData={this.modalBody()}
      />
      </div>
    )
  }
}

export default RedemptionTable;
