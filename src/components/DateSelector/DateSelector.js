import React from  'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { distributeDividendStore } from '../../store/DistributeDividendStore';
import './DateSelector.css';
import moment from 'moment';

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    if (this.props.type === "start") {
      // console.log(moment(date));
      // console.log(distributeDividendStore.endDate);
      if (moment(date).isSameOrBefore(distributeDividendStore.endDate)) {
        distributeDividendStore.startDate = date;
        this.setState({ date: date });
      }
    }
    else if (this.props.type === "end") {
      if (moment(date).isSameOrAfter(distributeDividendStore.startDate)) {
        distributeDividendStore.endDate = date;
        this.setState({ date: date });
      }
    }
  }

  render() {
    const title = this.props.type === "start" ? "From:" : "To:";
    return (
      <div>
        <div className="title">
          { title }
        </div>
        <div className="date-textbox">
          <DatePicker
            selected = { this.state.date }
            onChange = { this.handleChange }
          />
        </div>
      </div>
    );
  }
}

export default DateSelector;
