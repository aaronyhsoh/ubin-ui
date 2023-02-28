import React from 'react';
import {createAssetStore} from "./CreateAssetStore";
import CustomizedSelects from "./MultifieldSelector";
import Grid from "@material-ui/core/Grid";
import InlineDateTimePickerDemo from "./DateTimePicker";

class AutoDateSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }



  render() {
    return (
      <div>
      <Grid item xs={12}>
        <CustomizedSelects
          // key={key}
          id1={this.props.id1}
          id2={createAssetStore.formData[this.props.step][this.props.id1].secondaryInput}
          step={this.props.step}
          value={this.state[this.props.step][this.props.id1].value}

        />
      </Grid>
        <Grid item xs={12} sm={6}>
          <InlineDateTimePickerDemo
            // key={key}
            id={d}
            step={this.props.step}
          />
        </Grid>
      </div>

    )
  }
}