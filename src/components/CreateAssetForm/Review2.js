import React from 'react';
import {createAssetStore} from "./CreateAssetStore";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid/Grid";
import Box from '@material-ui/core/Box';

class Review2 extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    // console.log("review: ", createAssetStore.generateInfo())
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return(
      <div>
      <Grid container spacing={0} className="nationalities-residences" justify="center">
      <Grid item xs={12} sm={6}>
        <List component="nav" aria-label="General Information">
         <ListItem>
            <ListItemText primary="Security Name" secondary={createAssetStore.generateInfo().securityName}/>
         </ListItem>
         <ListItem>
             <ListItemText primary="Ticker Code" secondary={createAssetStore.generateInfo().tickerCode}/>
          </ListItem>
         <ListItem>
            <ListItemText primary="Currency" secondary={createAssetStore.generateInfo().currency} />
         </ListItem>
         <ListItem>
            <ListItemText primary="Amount" secondary={createAssetStore.generateInfo().totalCirculatingAmount} />
         </ListItem>
         </List>
         
         </Grid>
       {/* <Grid item xs={12} sm={6}>
       <List component="nav" aria-label="Eligibility Criteria">
       <h1>Eligibility Criteria</h1>
               <ListItem>
                   <ListItemText primary="Issuer Size" secondary={createAssetStore.generateInfo().totalCirculatingAmount} />
                </ListItem>
               <ListItem>
                    <ListItemText primary="Issuance Price (USD)" secondary={parseFloat(Math.round(createAssetStore.generateInfo().issuancePrice * 100) / 100).toFixed(2)}/>
                 </ListItem>
                <ListItem>
                     <ListItemText primary="Face Value (USD)" secondary={parseFloat(Math.round(createAssetStore.generateInfo().faceValue * 100) / 100).toFixed(2)} />
                  </ListItem>
                 <ListItem>
                      <ListItemText primary="Coupon Frequency" secondary={createAssetStore.generateInfo().couponFrequency} />
                   </ListItem>
                   
                
                </List>
      </Grid> */}
      </Grid>
      </div>
    )
  }
}

export default Review2;
