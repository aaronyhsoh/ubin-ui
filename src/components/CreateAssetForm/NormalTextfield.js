import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {createAssetStore} from "./CreateAssetStore";

class NormalTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.id]: createAssetStore.formData[this.props.step][this.props.id].value
    }
  }

  handleChange(event) {

    createAssetStore.formData[this.props.step][event.target.id].value = event.target.value;
    let newValue = createAssetStore.formData[this.props.step];
    this.setState({ [this.props.step]: newValue });

  }
  render() {
    return (

      <TextField
        id={this.props.id}
        label={createAssetStore.formData[this.props.step][this.props.id].label}
        className="input-field"
        value={this.state[this.props.id]}
        onChange={this.handleChange}
        margin="dense"
        variant="outlined"
      />

    );
  }
}
export default NormalTextFields;
