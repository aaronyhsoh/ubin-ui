import React, { useState } from "react";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {createAssetStore} from "./CreateAssetStore";
import {observer} from "mobx-react";
import {Observer} from "mobx-react-lite";


function InlineDateTimePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(createAssetStore.formData.step2[props.id].value);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  function handleChange(event) {
    let couponFrequencyValue = createAssetStore.formData.step2.couponFrequency.value ? createAssetStore.formData.step2.couponFrequency.value: '0' ;
    let couponFrequencyUnit = createAssetStore.formData.step2.frequencyUnit.value;
    if (props.id === 'issueDate') {
      var date = new Date(createAssetStore.formData.step2.subscribeEndDate.value)
      if (event.getTime() < date.getTime()) {
        setError(true);
        setErrorMsg('Issue Date should be after subscription end')
      }
      else {
        handleDateChange(event);
        createAssetStore.formData[props.step][props.id].value = event.toISOString();
        createAssetStore.formData[props.step].nextCouponDate.value = createAssetStore.initDates(event, 1, couponFrequencyUnit)
        createAssetStore.formData[props.step].maturityDate.value = createAssetStore.initDates(event, parseInt(couponFrequencyValue), couponFrequencyUnit);
        console.log(createAssetStore.formData.step2.nextCouponDate.value);
        setError(false);
        props.dateUpdate();
      }
    }
    if (props.id === 'subscribeEndDate') {
      var date = new Date(createAssetStore.formData.step2.issueDate.value);
      var startDate = new Date(createAssetStore.formData.step2.subscribeStartDate.value);
      if (event.getTime() > date.getTime() && event.getTime() > startDate.getTime()) {
        handleDateChange(event);
        createAssetStore.formData[props.step][props.id].value = event.toISOString();
        let issueDate = createAssetStore.initDates(event, 1, 'daily');
        createAssetStore.formData[props.step].issueDate.value = issueDate;
        createAssetStore.formData[props.step].nextCouponDate.value = createAssetStore.initDates(new Date(issueDate), 1, couponFrequencyUnit);
        createAssetStore.formData[props.step].maturityDate.value = createAssetStore.initDates(new Date(issueDate), parseInt(couponFrequencyValue), couponFrequencyUnit);
        props.dateUpdate();
      }
      else if (event.getTime() <= startDate.getTime()) {
        setError(true)
        setErrorMsg('Subscription end date must be after start date')
      }
      else if (event.getTime() > startDate.getTime()) {
        handleDateChange(event);
        createAssetStore.formData[props.step][props.id].value = event.toISOString();
      }
    }

  }



  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        inputVariant="outlined"
        variant="inline"
        margin="dense"
        ampm={false}
        label={createAssetStore.formData[props.step][props.id].label}
        value={createAssetStore.formData[props.step][props.id].value}
        //onChange={val => handleDateChange(val)}
        onChange={handleChange}
        error={error}
        helperText={error ? errorMsg: ''}
        disablePast
        format="yyyy/MM/dd HH:mm"
        disabled={props.id === 'maturityDate' || props.id === 'nextCouponDate'}
      />
    </MuiPickersUtilsProvider>
  );
}

export default InlineDateTimePickerDemo;
