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

  toggleRedirect() {
    this.setState({
        redirect: !this.state.redirect
    })
  }
  redirect = () => {
    if (this.state.redirect === true) {
      return (
        <Redirect to="/home"/>
      )
    }
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
            {this.state.content}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggleRedirect()}>Ok</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ApproveIssuanceModal;
