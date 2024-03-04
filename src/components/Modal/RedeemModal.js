import React from 'react';
// import './ConfirmationModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Redirect} from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import { walletStore } from '../../store/WalletStore';
import MenuItem from '@material-ui/core/MenuItem';
import { userStore } from '../../store/UserStore';
import * as api from "../../utils/Api";

class RedeemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        success: false,
        errorMsg: "",
      content: "",
      redirect: false,
      spinner: false,
      amount: 0,
      pool: ""
    }
  }

  handleTextChange(event) {
    console.log(walletStore.stablecoinBalance)
    console.log(event)
    this.setState({amount: event.target.value});
  }

  handleDropdownChange(event) {
    console.log(event)
    this.setState({pool: event.target.value});
  }

  toggleRedirect() {
    this.setState({
        redirect: !this.state.redirect
    })
  }

  submitRequest() {
    let requestBody = {
        pool: this.state.pool,
        amount: this.state.amount,
        userId: userStore.username
    }
    api.submitRedemptionRequest(requestBody)
      .then(data => {
        console.log(data)
        if (data.success === true) {
            this.setState({
                success: true
            })
            setTimeout(() => {
                this.props.showOrHideModal()
                this.setState({ success: false })
            }, 3000);
        } else {
            this.setState({ success: false, errorMsg: data.message })
            setTimeout(() => {
                this.props.showOrHideModal()
                this.setState({ errorMsg: ""})
            }, 3000);
        }
      })
      .catch(error => { console.log(error); })
  }

  redirect = () => {
    if (this.state.redirect === true) {
      return (
        <Redirect to="/home"/>
      )
    }
  }

  render() {
    const {showOrHideModal, hideOuterModal, show, modalHeader} = this.props;

    return (
      <div>
        {this.redirect()}
        {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
        <Modal isOpen={show} toggle={showOrHideModal} className={this.props.className}>
          <ModalHeader toggle={showOrHideModal}>{this.props.modalHeader}</ModalHeader>
          <ModalBody>
            {this.state.success ? "Success" : this.state.errorMsg === "" ? <div><TextField
                select
                label="Stablecoin"
                className="text-field"
                value={this.state.pool}
                onChange={(e) => this.handleDropdownChange(e)}
                SelectProps={{
                    MenuProps: {
                    className: "MuiMenu",
                    },
                }}
                // helperText={"Please Select " + createAssetStore.formData[props.currentStep][props.id].label}
                margin="dense"
                variant="outlined"
                fullWidth={true}>
                    {walletStore.stablecoinBalance.map(option => (
                        <MenuItem key={option.pool} value={option.pool}>
                            {option.pool} ({option.currency})
                        </MenuItem>
                    ))}
            </TextField>
            <TextField
                // key={key}
                label="Amount"
                className="input-field"
                value={this.state.amount}
                onChange={(e) => this.handleTextChange(e)}
                margin="dense"
                variant="outlined"
            /></div> : this.state.errorMsg}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() =>this.state.success ? showOrHideModal : this.submitRequest()}>Ok</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RedeemModal;