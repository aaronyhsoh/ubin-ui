import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TextList from "../TextList/TextList";
import {Button} from "react-bootstrap";
import TableRow from "@material-ui/core/TableRow";
import {buyerPageStore} from "../../store/BuyerPageStore";
import {userStore} from "../../store/UserStore";
import * as api from "../../utils/Api";
import ConfirmationModal from "../Modal/ConfirmationModal";
import {TextField} from "@material-ui/core";
import moment from "moment";

class ExpandableRow extends React.Component {
  mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: {}
    }

  }

  componentDidMount() {
    this.mounted = true;
    let viewAssetRequest = {
      blockchainType : "stacs",
      tickerCode: buyerPageStore.availableAssets[this.props.rowIndex].tickerCode,
      requesterId: userStore.username
    }
    api.viewAsset(viewAssetRequest)
      .then(data => {
        buyerPageStore.selectedRow = data;
        if (this.mounted) {
          this.setState({
            data: data
          })
        }
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

  modalBody() {
    return(
      <div>

        {Object.keys(buyerPageStore.selectedRow).map((d, key) => {
          if (d === "Subscription End Date") {
            let formattedDate = moment(buyerPageStore.selectedRow[d], 'YYYY-MM-DDTHH:mm:ss.SSS').format('DD/MM/YYYY HH:mm:ss');
            return (
              <p key={key}>{d} : {formattedDate}</p>
            )
          }
          else {
            return (
              <p key={key}>{d} : {buyerPageStore.selectedRow[d]}</p>
            )
          }
        })}
        <TextField
          label="Amount to purchase"
          className="input-field"
          value={this.state.purchaseUnits}
          onChange={this.changeAmount}
          margin="dense"
          variant="outlined"
          error={isNaN(this.state.purchaseUnits)}
          helperText={isNaN(this.state.purchaseUnits) ? 'Only integers allowed': ''}
        />

      </div>
    )
  }

  fetchAssetData() {
    let viewAssetRequest = {
      blockchainType : "stacs",
      tickerCode: buyerPageStore.availableAssets[this.props.rowIndex].tickerCode,
      requesterId: userStore.username
    }
    api.viewAsset(viewAssetRequest)
      .then(data => {
        buyerPageStore.selectedRow = data;
        if (this.mounted) {
          this.setState({
            data: data
          })
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const {showModal} = this.state

    return(
      <TableRow>
        <TableCell/>
        <TableCell colSpan={2} align="right">
          {/*<TextList type="label" data={buyerPageStore.availableAssets[rowMeta.dataIndex]}/>*/}
          <TextList type="label" rowIndex={this.props.rowIndex}/>
        </TableCell>
        <TableCell colSpan={2} align="left">
          {/*<TextList type="value" data={buyerPageStore.availableAssets[rowMeta.dataIndex]}/>*/}
          <TextList type="value" rowIndex={this.props.rowIndex}/>
        </TableCell>

        <TableCell colSpan={2} justify="centre">
          <Button color="primary" onClick={() => {
            this.props.toggleModal();
            this.props.selectRow(this.props.rowIndex);
          }}>Subscribe</Button>

        </TableCell>

      </TableRow>
    )
  }
}

export default ExpandableRow;
