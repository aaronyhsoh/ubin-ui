import React from 'react';
// import './ConfirmationModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {distributeDividendStore} from "../../store/DistributeDividendStore";
import {buyerPageStore} from "../../store/BuyerPageStore";
import NestedModal from "./NestedModal";

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNestedModal: false
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  modalBody() {
    return(
      <div>
        <p>Ticker Code: {buyerPageStore.selectedRow.tickerCode}</p>
        {/*<p>Currency: {buyerPageStore.selectedRow.currency}</p>*/}
        {/*<p>Order Price: {buyerPageStore.selectedRow.unitPrice}</p>*/}
        <p>Purchase Amount: {buyerPageStore.amountToPurchase}</p>
        <p style={{ fontWeight: 'bold'}}>Total Price (USD): {buyerPageStore.totalPricePaid}</p>

      </div>
    )
  }

  toggleModal() {
    if (this.state.showNestedModal) {
      this.setState({showNestedModal: false})
    } else {
      this.setState({showNestedModal: true})
    }
  }

  render() {
    const { showOrHideModal, show, modalHeader, modalData } = this.props;
    const { showNestedModal } = this.state;

    function confirmSubmission() {
      //distributeDividendStore.distributeDividends();
      buyerPageStore.subscribeToAsset();
      showOrHideModal();
    }


    return (
      <div>
        {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
        <Modal isOpen={show} toggle={showOrHideModal} className={this.props.className}>
          <ModalHeader toggle={showOrHideModal}>{this.props.modalHeader}</ModalHeader>
          <ModalBody>
            {this.props.modalData}
            <NestedModal
              modalHeader="Confirm subscription"
              showOrHideModal={this.toggleModal}
              show={showNestedModal}
              modalData={this.modalBody()}
              hideOuterModal={this.props.showOrHideModal}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>Confirm</Button>{' '}
            <Button color="danger" onClick={this.props.showOrHideModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmationModal;
