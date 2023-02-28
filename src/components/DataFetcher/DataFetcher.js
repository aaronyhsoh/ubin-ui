import React from 'react';
import DateSelector from '../DateSelector/DateSelector';
import TokenForm from '../TokenForm/TokenForm';
import './DataFetcher.css'

class DataFetcher extends React.Component {

  render() {
    return(
      <div className="data-fetcher">
        <div className="start-date">
          <DateSelector
            type="start"
          />
        </div>
        <div className="end-date">
          <DateSelector
            type="end"
          />
        </div>
        <div className="token-form">
          <TokenForm
            update = {this.props.update}
          />
        </div>
      </div>
    )
  }
}

export default DataFetcher;
