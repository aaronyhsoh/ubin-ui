import MUIDataTable from "mui-datatables";
import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Button} from "react-bootstrap";
import ConfirmationModal from "../Modal/ConfirmationModal";
import {MuiThemeProvider, TextField} from "@material-ui/core";
import {buyerPageStore} from "../../store/BuyerPageStore";
import {userStore} from "../../store/UserStore"
import * as api from '../../utils/Api';
import TextList from "../TextList/TextList";
import ExpandableRow from "./ExpandableRow";
import ModalBody from "./ModalBody";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import moment from "moment";


class AssetTable extends React.Component {

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

  fetchData() {
    api.getAvailableAssets(userStore.username)
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
          resizableColumns: false

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
        name: "issueDate",
        label: "",
        options: {
          sortDirection: "desc",
          display: false
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
        this.getAssetData();
        // this.selectRow(rowMeta);
        return (
          <ExpandableRow
            rowIndex={rowMeta.dataIndex}
            toggleModal={this.toggleModal}
            selectRow={this.selectRow}
          />
        )
      }
    };

    return (
      <div>
        <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={"Issuance"}
          data={availableAssets}
          columns={columns}
          options={options}/>
        </MuiThemeProvider>
        <ConfirmationModal
          modalHeader={buyerPageStore.selectedRow.tickerCode}
          showOrHideModal={this.toggleModal}
          show={showModal}
          modalData={this.modalBody()}
        />
      </div>
    )
  }
}

export default AssetTable;
