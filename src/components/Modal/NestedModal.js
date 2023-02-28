import React from 'react';
// import './ConfirmationModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {distributeDividendStore} from "../../store/DistributeDividendStore";
import {buyerPageStore} from "../../store/BuyerPageStore";
import {Redirect} from "react-router-dom";
import {userStore} from "../../store/UserStore";
import * as api from "../../utils/Api";
import CircularIndeterminate from "../Spinner/Spinner";

class NestedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      spinner: false,
      submitted: false
    }

    this.confirmSubmission = this.confirmSubmission.bind(this);
    this.subscribeToAsset = this.subscribeToAsset.bind(this);
  }

  redirect = () => {
    if (this.state.redirect === true) {
      return (
        <Redirect to="/transaction_history"/>
      )
    }
  }

  subscribeToAsset() {

    let subscribeAssetRequest = {
      blockchainType: "stacs",
      buyerId: userStore.username,
      tickerCode: buyerPageStore.selectedRow.tickerCode,
      tokenAmountToPurchase: buyerPageStore.amountToPurchase,
      totalPricePaid: buyerPageStore.totalPricePaid,
      priceCurrency: "USD",
      unitPricePerToken: buyerPageStore.selectedRow.unitPrice
    }

    this.props.showOrHideModal();
    this.setState({
      spinner: true,
      submitted: true
    })

    api.subscribeToAsset(subscribeAssetRequest)
      .then(data => {
        //if (data) {
        console.log("SUCCESS");
        //this.autoList.push(data);
        if (buyerPageStore.isAuto === true) {
          buyerPageStore.autoList.push(data.ubinRequestId);
        }

        this.props.hideOuterModal();

        this.setState({
          redirect: true,
          spinner: false
        })
        //}
      })
      .catch(error => console.log(error));
  }

  confirmSubmission() {
    //distributeDividendStore.distributeDividends();
    this.subscribeToAsset();
    //this.props.hideOuterModal();
    //this.props.showOrHideModal();
    //this.state.redirect = true;

  }

  render() {
    const {showOrHideModal, hideOuterModal, show, modalHeader, modalData} = this.props;

    return (
      <div>
        {this.redirect()}
        {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
        <Modal isOpen={show} toggle={showOrHideModal} className={this.props.className}>
          <ModalHeader toggle={showOrHideModal}>{this.props.modalHeader}</ModalHeader>
          <ModalBody>
            {this.props.modalData}

          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={this.state.submitted} onClick={this.subscribeToAsset}>Confirm</Button>{' '}
            <Button color="danger" onClick={this.props.showOrHideModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {this.state.spinner ? <CircularIndeterminate/> : ''}
      </div>
    );
  }
}

export default NestedModal;
