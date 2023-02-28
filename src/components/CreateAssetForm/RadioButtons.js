import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import {createAssetStore} from "./CreateAssetStore";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Grid from "@material-ui/core/Grid/Grid";
import Box from "@material-ui/core/Box/Box";
import MultipleSelect from "./DropdownMultipleSelect";
import './RadioButton.css'



export default function RadioButtons(props) {
  const [selectedValue, setSelectedValue] = React.useState(createAssetStore.formData[props.step][props.id].value);

  const handleChange = event => {
    setSelectedValue(event.target.value);
    createAssetStore.formData[props.step][props.id].value = event.target.value.toString().toLowerCase();
    createAssetStore.formData[props.step].nationalities.label = event.target.value + " Nationalities";
    createAssetStore.formData[props.step].residences.label = event.target.value + " Residences";
    createAssetStore.formData[props.step].investorType.label = event.target.value + " InvestorType";
  };

  return (
    <Box borderColor="grey.500" border={1} borderRadius="borderRadius">
      <div style={{ paddingLeft: 20, paddingRight:20}}>
      <Grid container spacing={0} className="nationalities-residences" justify="center">
        <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    value="Permitted"
                    control={<Radio
                      checked={selectedValue === 'Permitted'}
                      onChange={handleChange}
                      value="Permitted"
                      color="default"
                      name="radio-button-demo"
                      inputProps={{'aria-label': 'A'}}
                    />}
                    label="Permitted"
                    labelPlacement="top"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControlLabel
                    value="Prohibited"
                    control={<Radio
                      checked={selectedValue === 'Prohibited'}
                      onChange={handleChange}
                      value="Prohibited"
                      color="default"
                      name="radio-button-demo"
                      inputProps={{'aria-label': 'B'}}
                    />}
                    label="Prohibited"
                    labelPlacement="top"
                  />
                </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={12}>
          <MultipleSelect
            id="nationalities"
            step="step3"
          />
        </Grid>
        <Grid item xs={12}>
          <MultipleSelect
            id="residences"
            step="step3"
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
            <MultipleSelect
            id="investorType"
            step="step3"
           />
        </Grid>
        <Grid item xs={12} />
      </Grid>
      </div>
    </Box>
  );
}
