import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import {createAssetStore} from "./CreateAssetStore";
import TextField from "@material-ui/core/TextField/TextField";

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    [props.id1]: createAssetStore.formData[props.step][props.id1].value,
    [props.id2]: createAssetStore.formData[props.step][props.id2].value
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    createAssetStore.formData[props.step][name].value = event.target.value;
    let couponFrequencyValue = createAssetStore.formData.step2.couponFrequency.value;
    let couponFrequencyUnit = createAssetStore.formData.step2.frequencyUnit.value;
    let issueDate = new Date(createAssetStore.formData.step2.issueDate.value);
    if (couponFrequencyValue) {
      createAssetStore.formData[props.step].nextCouponDate.value = createAssetStore.initDates(issueDate, 1, couponFrequencyUnit)
      createAssetStore.formData[props.step].maturityDate.value = createAssetStore.initDates(issueDate, parseInt(couponFrequencyValue), couponFrequencyUnit);
      props.dateUpdate();
    }
    //console.log(createAssetStore.formData.step2[name].value);
  };
  return (
    <div>
      {}
      <TextField
        id={props.id1}
        label={createAssetStore.formData[props.step][props.id1].label}
        className="text-select-box"
        value={values[props.id1]}
        onChange={handleChange([props.id1])}
        margin="dense"
        variant="outlined"
        error={isNaN(values[props.id1])}
        helperText={isNaN(values[props.id1]) ? 'Only integers allowed' : ''}
      />
      <TextField
        id={props.id2}
        select
        label={createAssetStore.formData[props.step][props.id2].label}
        className="text-dropdown-box"
        value={values[props.id2]}
        onChange={handleChange([props.id2])}
        SelectProps={{
          MenuProps: {
            className: "MuiMenu",
          },
        }}
        margin="dense"
        variant="outlined"

      >
        {createAssetStore.formData[props.step][props.id2].availableValues.map(option => (
          <MenuItem id={props.id2} key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    </div>
  );
}
