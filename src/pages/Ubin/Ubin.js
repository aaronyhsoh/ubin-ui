import React from 'react';
import HorizontalNonLinearAlternativeLabelStepper from "../../components/CreateAssetForm/CreateAssetForm";
import './Ubin.css';


class Ubin extends React.Component {
  render() {
    return(
      <div className="ubin-content">
        <div className="left-empty"/>
        <div className="middle-content">
          <h1 className="header">Submit Stablecoin Issuance Request</h1>
          <HorizontalNonLinearAlternativeLabelStepper/>
        </div>
        <div className="right-empty"/>
      </div>
    )
  }
}

export default Ubin;
