import React from 'react';
import TextField from "@material-ui/core/TextField";
import './Steps.css';
import {createAssetStore} from "./CreateAssetStore";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {makeStyles} from "@material-ui/core";

import CustomizedSelects from "./MultifieldSelector";
import MultiFieldAnySelect from "./MultiFieldAnySelector";
import RadioButtons from "./RadioButtons";
import OutlinedTextFields from "./DropdownSingleSelect";
import InlineDateTimePickerDemo from "./DateTimePicker";
import Grid from "@material-ui/core/Grid/Grid";


class Steps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: createAssetStore.formData,
      update: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.dateUpdater = this.dateUpdater.bind(this);
  }

  handleChange(event) {
    createAssetStore.formData[this.props.step][event.target.id].value = event.target.value;
    let newValue = createAssetStore.formData[this.props.step];

    this.setState({[this.props.step]: newValue});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.step !== this.props.step) {
      this.setState({currentStep: this.props.step});
      createAssetStore.formData.currentStep = this.props.step;
    }
  }

  dateUpdater() {
    let currentState = this.state.update
    this.setState({
      update: !currentState
    })
  }

  render() {
    let components = Object.keys(this.state.data[this.props.step]).map((d, key) => {
      switch (this.state.data[this.props.step][d].inputType) {
        case 'text':
          return (
            <Grid item xs={12} key={key}>
              <TextField
                // key={key}
                id={d}
                label={this.state.data[this.props.step][d].label}
                className="input-field"
                value={this.state.data[this.props.step][d].value}
                onChange={this.handleChange}
                margin="dense"
                variant="outlined"
              /></Grid>); break;
        case 'number':
          return (
            <Grid item xs={12} key={key}>
              <TextField
                // key={key}
                id={d}
                label={this.state.data[this.props.step][d].label}
                className="input-field"
                value={this.state.data[this.props.step][d].value}
                onChange={this.handleChange}
                margin="dense"
                variant="outlined"
                error={isNaN(this.state.data[this.props.step][d].value)}
                helperText={isNaN(this.state.data[this.props.step][d].value) ? 'Only integers allowed' : ''}
              /></Grid>); break;
        case 'dropdown':
          return (
            <Grid item xs={12} key={key}>
              <OutlinedTextFields
                // key={key}
                id={d}
                step={this.props.step}
                value={this.state.data[this.props.step][d].value}
              />
            </Grid>

          ); break;
        case 'multifieldSelect':
          return (
            <Grid item xs={12} key={key}>
            <CustomizedSelects
              // key={key}
              id1={d}
              id2={createAssetStore.formData[this.props.step][d].secondaryInput}
              step={this.props.step}
              value={this.state.data[this.props.step][d].value}
              dateUpdate={this.dateUpdater}

            />
            </Grid>); break;
        case 'multifieldAnySelect':
            return (
            <Grid item xs={12} key={key}>
            <MultiFieldAnySelect
                id1={d}
                id2={createAssetStore.formData[this.props.step][d].secondaryInput}
                step={this.props.step}
                value={this.state.data[this.props.step][d].value}
            />
             </Grid>); break;
        case 'date':
          return (
            <Grid item xs={12} sm={6} key={key}>
              <InlineDateTimePickerDemo
                // key={key}
                id={d}
                step={this.props.step}
                dateUpdate={this.dateUpdater}
              />
            </Grid>); break;
        case 'selector':
          return (
            <Grid item xs={12} key={key}>
              <RadioButtons
                // key={key}
                step="step3"
                id="permittedOrProhibited"
              />
            </Grid>); break;
        default: break;
      }
    })

    return (
      <form className="input-form" noValidate autoComplete="off">
        <Grid container spacing={0} className="nationalities-residences">
          {components}
        </Grid>

      </form>
    )
  }
}

export default Steps;
