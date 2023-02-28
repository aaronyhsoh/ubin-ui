import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {createAssetStore} from "./CreateAssetStore";


export default function OutlinedTextFields(props) {
  const [values, setValues] = React.useState({
    [props.id]: createAssetStore.formData[props.step][props.id].value
  });

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value});
    createAssetStore.formData[props.step][props.id].value = event.target.value;
  };

  return (

    <div>
    <TextField
      id={props.id}
      select
      label={createAssetStore.formData[props.step][props.id].label}
      className="text-field"
      value={values[props.id]}
      onChange={handleChange([props.id])}
      SelectProps={{
        MenuProps: {
          className: "MuiMenu",
        },
      }}
      // helperText={"Please Select " + createAssetStore.formData[props.currentStep][props.id].label}
      margin="dense"
      variant="outlined"
      fullWidth={true}
    >
      {createAssetStore.formData[props.step][props.id].availableValues.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    </div>

  );
}
