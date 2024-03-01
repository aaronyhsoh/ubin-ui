import React from 'react';
import { distributeDividendStore } from "../../store/DistributeDividendStore";
import DataFetcher from '../../components/DataFetcher/DataFetcher';
// import './DistributeDividends.css';
import ActionBar from "../../components/ActionBar/ActionBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import AssetTable from "../../components/AssetTable/AssetTable";
import './BuyerPage.css';
import {buyerPageStore} from "../../store/BuyerPageStore";
import RedemptionTable from '../../components/AssetTable/RedemptionTable';

class BuyerPage extends React.Component {
  constructor(props) {
    super(props);
    buyerPageStore.initData();
    this.state = {
      showModal: false
    }

    //this.toggleModal = this.toggleModal.bind(this);
    //this.updateTable = this.updateTable.bind(this);
  }



  render() {
    const { showModal } = this.state;
    return (
      <div className="main-content">

          <div className="left-empty"/>
          <div className="middle-content">
            <RedemptionTable/>
          </div>
          <div className="right-empty"/>


      </div>
    )
  }
}

export default BuyerPage;
