import React from 'react';
import * as api from '../../utils/Api';
import {buyerPageStore} from "../../store/BuyerPageStore";
import {userStore} from "../../store/UserStore";
import moment from "moment";

class TextList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(buyerPageStore.selectedRow)
    let list = Object.keys(buyerPageStore.selectedRow).map((d, key) => {
      let labels = Object.keys(buyerPageStore.expandableRowInfo);
      if (labels.includes(d)) {
        if (buyerPageStore.expandableRowInfo[d] === "Subscription End Date") {
          let formattedDate = moment(buyerPageStore.selectedRow[d], 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY hh:mm a');
          return (
            this.props.type === "value" ?
              <p key={key}>{formattedDate}</p>
              : <p key={key}>{buyerPageStore.expandableRowInfo[d]}</p>
          )
        } else if (buyerPageStore.expandableRowInfo[d] === "Face Value Price (USD)") {
          let formattedFaceValue = parseFloat(Math.round(buyerPageStore.selectedRow[d] * 100) / 100).toFixed(2);
          return (
            this.props.type === "value" ?
              <p key={key}>{formattedFaceValue}</p>
              : <p key={key}>{buyerPageStore.expandableRowInfo[d]}</p>
          )
        } else if (buyerPageStore.expandableRowInfo[d] === "Coupon Frequency") {
          var value = buyerPageStore.selectedRow[d].split(" ");

          return (
            this.props.type === "value" ?
              <div key={key}>
                <p key={key}>{value[0]}</p>
                <p>{value[1]}</p>
              </div>
              : <div key={key}>
                <p>Coupon Frequency</p>
                <p>Coupon Periods</p>
              </div>
          )

        } else {
          if ((buyerPageStore.expandableRowInfo[d] === " Nationalities") || (buyerPageStore.expandableRowInfo[d] === " Residencies")) {
            let temp = (buyerPageStore.selectedRow.kycListType === "permitted" ? "Permitted" : "Prohibited") + buyerPageStore.expandableRowInfo[d];
            buyerPageStore.expandableRowInfo[d] = temp;
          }
          return (
            this.props.type === "value" ?
              <p key={key}>{buyerPageStore.selectedRow[d]}</p>
              : <p key={key}>{buyerPageStore.expandableRowInfo[d]}:</p>
          )
        }
      }
    })

    return (
      <div>
        {list}
      </div>
    );
  }
}

export default TextList;
