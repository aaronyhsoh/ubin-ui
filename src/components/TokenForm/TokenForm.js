import React from 'react';
import { distributeDividendStore } from '../../store/DistributeDividendStore';
import './TokenForm.css';
import * as api from '../../utils/Api';
import moment from 'moment';


class TokenForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const tokenName = this.state.value;
    api.getTokenHistory({ tokenCode: tokenName })
      .then(data => {
        // const keyNames = Object.keys(data.txHistList.issueTxHistory[0]);
        // console.log(keyNames[2]);
        if (data.txHistList._rawRespCode === "000000") {
          if (data.txHistList.issueTxHistory.length > 0) {
            // const header = keyNames;
            var header = ["creationTime", "payeeWalletAddress", "issuerName", "smartContractType", "status", "subscriptionStartDate", "subscriptionEndDate", "tokenUnitCurrency", "tokenUnitPrice"];
            console.log("result: ", data);
            distributeDividendStore.testData = [];
            distributeDividendStore.testData.push(header);
            var result = data.txHistList.issueTxHistory;
            for (let i = 0; i < result.length; i++) {
              if (result[i].status == "SUCCESS") {
                var formattedDate = moment(result[i].creationTime).format("DD-MMMM-YYYY")
                const row = [
                  formattedDate,
                  // result[i].creationTime,
                  result[i].tokenCustodyAddress,
                  result[i].issuerName,
                  result[i].smartContractType,
                  result[i].status,
                  result[i].subscriptionStartDate,
                  result[i].subscriptionEndDate,
                  result[i].tokenUnitPrice._currency,
                  result[i].tokenUnitPrice._amount
                ]
                // console.log("Object.values: ", Object.values(result));
                // const row = Object.values(result)

                distributeDividendStore.testData.push(row);
              }
            }
            distributeDividendStore.tokenName = tokenName;
            distributeDividendStore.updatedData = distributeDividendStore.testData;
            distributeDividendStore.initHeaderRow();
            distributeDividendStore.tableData.destroy();
            distributeDividendStore.tableData.columns.adjust().draw();
            this.props.update();
          }
          else {
            alert("Token not issued");
          }
        }
        else {
          alert("Token name invalid");
        }
      })
      .catch(function(error) {console.log("Error fetching data. Error: ", error)});

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Token:
        </div>
        <label className="text-box">
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Fetch" />
      </form>
    );
  }
}

export default TokenForm;
