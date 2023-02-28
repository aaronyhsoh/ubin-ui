import React from 'react';
import {buyerPageStore} from "../../store/BuyerPageStore";
import {TextField} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import ConfirmationModal from "../Modal/ConfirmationModal";
import NestedModal from "../Modal/NestedModal";
import moment from "moment";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class ModalBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      purchaseUnits: 0,
      totalAmount: 0,
      totalPayable: 0,
      isAuto: buyerPageStore.isAuto,
      showModal: false
    }

    this.toggleAutoSwitch = this.toggleAutoSwitch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.changeAmount = this.changeAmount.bind(this);
  }

  changeAmount(event) {
    let totalPrice = parseInt(event.target.value) * parseFloat(buyerPageStore.selectedRow.unitPrice)

    this.setState({
      purchaseUnits: event.target.value,
      totalAmount: totalPrice.toFixed(2)
    })
    console.log(totalPrice)
    buyerPageStore.totalPricePaid = totalPrice.toFixed(2)
    buyerPageStore.amountToPurchase = event.target.value;
  }

  toggleAutoSwitch() {
    if (this.state.isAuto) {
      this.setState({
        isAuto: false
      })
    } else {
      this.setState({
        isAuto: true
      })
    }
    buyerPageStore.isAuto = !buyerPageStore.isAuto;
  }

  modalBody() {
    return(
      <ModalBody/>
    )
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({showModal: false})
    } else {
      this.setState({showModal: true})
    }
  }

  render() {
    const {purchaseUnits, totalAmount, isAuto, showModal} = this.state;
    return (
      <div>
        {Object.keys(buyerPageStore.selectedRow).map((d, key) => {
          let list = Object.keys(buyerPageStore.displayInfo);
          if (list.includes(d)) {
            if (d === "subscriptionEndDate") {
              let formattedDate = moment(buyerPageStore.selectedRow[d], 'YYYY-MM-DDTHH:mm:ss.SSS').format('DD/MM/YYYY HH:mm a');

              return (
                <p key={key}>{buyerPageStore.displayInfo[d]} : {formattedDate}</p>
              )
            } else {
              return (
                <p key={key}>{buyerPageStore.displayInfo[d]} : {buyerPageStore.selectedRow[d]}</p>
              )
            }
          }
        })}
        <FormControlLabel
          control={
            <Switch
              checked={isAuto}
              onChange={this.toggleAutoSwitch}
              value="checkedB"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Auto-release funds"
          //labelPlacement="start"
        />

        <TextField
          label="Amount to purchase"
          className="input-field"
          value={purchaseUnits}
          onChange={this.changeAmount}
          margin="dense"
          variant="outlined"
          error={isNaN(purchaseUnits)}
          helperText={isNaN(purchaseUnits) ? 'Only integers allowed': ''}
        />
        <p style={{fontWeight: 'bold'}}>Total Price (USD): {isNaN(totalAmount) ? 0 : totalAmount}</p>

      </div>
    );
  }
}

export default ModalBody;
