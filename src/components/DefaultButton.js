import React from 'react';
import { distributeDividendStore } from '../store/DistributeDividendStore';
import ConfirmationModal from './Modal/ConfirmationModal';

class DefaultButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    }
  }

  handleClick = () => {
    switch(this.props.buttonValue) {
      case "Submit" :
        //distributeDividendStore.distributeDividends();
        if (distributeDividendStore.updatedData.length > 0) {
          this.props.showModal();
        }
        else {
          alert("Error: No recipients.");
        }
        break;
      case "Delete selected rows" :
        distributeDividendStore.deleteRows();
        break;
      case "Clear selected rows" :
        distributeDividendStore.clearSelection();
        break;
      default: break;
    }
  }

  render() {
    var buttonType = "";

    switch(this.props.buttonValue) {
      case "Submit" :
        buttonType = "btn btn-primary";
        break;
      case "Delete selected rows" :
        buttonType = "btn btn-danger";
        break;
      case "Clear selected rows" :
        buttonType = "btn btn-secondary";
        break;
      default : break;
    }

    return (
      <div>
        <button className={ `${buttonType}` } onClick={this.handleClick}>
          { this.props.buttonValue }
        </button>
      </div>
    );
  }

}

export default DefaultButton;
