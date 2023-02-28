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
import {createAssetStore} from "../CreateAssetForm/CreateAssetStore";

class CreateAssetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      spinner: false
    }

    this.issueAsset = this.issueAsset.bind(this)

  }

  redirect = () => {
    if (this.state.redirect === true) {
      return (
        <Redirect to="/home"/>
      )
    }
  }

  issueAsset() {
    const info =createAssetStore.generateInfo();
    this.setState({
      spinner: true
    })
    api.createAsset(info)
      .then(data => {
        this.props.showOrHideModal();
        this.setState({
          spinner: false,
          redirect: true
        })
      })
      .catch(error => { console.log(error); })
    this.props.showOrHideModal();
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
            Are you sure you want to issue asset?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.issueAsset}>Confirm</Button>{' '}
            <Button color="danger" onClick={this.props.showOrHideModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {this.state.spinner ? <CircularIndeterminate/> : ''}
      </div>
    );
  }
}

export default CreateAssetModal;
