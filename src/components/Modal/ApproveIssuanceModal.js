import React from 'react';
// import './ConfirmationModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Redirect} from "react-router-dom"


class ApproveIssuanceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Success",
      redirect: false,
      spinner: false
    }
  }

  render() {
    const {showOrHideModal, hideOuterModal, show, modalHeader, modalData} = this.props;

    return (
      <div>
        {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
        <Modal isOpen={show} toggle={showOrHideModal} className={this.props.className}>
          <ModalHeader toggle={showOrHideModal}>{this.props.modalHeader}</ModalHeader>
          <ModalBody>
            {this.state.content}
          </ModalBody>
          
        </Modal>
      </div>
    );
  }
}

export default ApproveIssuanceModal;
