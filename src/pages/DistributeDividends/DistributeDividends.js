import React from 'react';
import DataTable from "../../components/DataTable/DataTable";
import { distributeDividendStore } from "../../store/DistributeDividendStore";
import DataFetcher from '../../components/DataFetcher/DataFetcher';
import './DistributeDividends.css';
import ActionBar from "../../components/ActionBar/ActionBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';

class DistributeDividends extends React.Component {
  constructor(props) {
    super(props);
    distributeDividendStore.initData();
    this.state = {
      data: distributeDividendStore.getData(),
      header: distributeDividendStore.getTableHeader(),
      showModal: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }

  updateTable() {
    this.setState({
      data: distributeDividendStore.getData(),
      header: distributeDividendStore.getTableHeader()
    })
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal: false })
    }
    else {
      this.setState({ showModal: true })
    }
  }

  render() {
    const { data, header, showModal } = this.state;
    return (
      <div className="main-content">
        <div className="data-table">
          <div className="header">
            <h2>DISTRIBUTE DIVIDENDS</h2>
            <DataFetcher
              update = {this.updateTable}
            />
          </div>
          <div className="action-bar">
            <ActionBar
              update = {this.updateTable}
              showOrHideModal={this.toggleModal}
            />
          </div>
          <DataTable data={data} columns={header}/>
        </div>
        <ConfirmationModal
          modalHeader="Subscribing to asset"
          showOrHideModal={this.toggleModal}
          show={showModal}
          modalData={data}
        />
      </div>
    )
  }
}

export default DistributeDividends;
