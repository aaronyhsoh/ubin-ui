import React from 'react';
import TransactionHistoryTable from "../../components/TransactionHistoryTable/TransactionHistoryTable";
import './TransactionHistory.css';

class TransactionHistory extends React.Component {
  render() {
    return (
      <div className="main-content">
        <div className="left-empty"/>
        <div className="middle-content">
          <TransactionHistoryTable/>
        </div>
        <div className="right-empty"/>
      </div>
    )
  }
}

export default TransactionHistory;
