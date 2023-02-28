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
        <h1>General Information</h1>
         <ListItem>
            <ListItemText primary="Security Name" secondary={createAssetStore.generateInfo().securityName}/>
         </ListItem>
         <ListItem>
             <ListItemText primary="Ticker Code" secondary={createAssetStore.generateInfo().tickerCode}/>
          </ListItem>
         <ListItem>
            <ListItemText primary="Unique Identifier" secondary={createAssetStore.generateInfo().uniqueIdentifier} />
         </ListItem>
         </List>
         <List component="nav" aria-label="Issuance Parameters">
         <h1>Issuance Parameters</h1>
           <ListItem>
                <ListItemText primary={createAssetStore.generateInfo().permittedOrProhibited + " Nationalities" }  secondary={createAssetStore.generateInfo().nationalities.toString()} />
             </ListItem>
           <ListItem>
              <ListItemText primary={createAssetStore.generateInfo().permittedOrProhibited + " Residences"}  secondary={createAssetStore.generateInfo().residences.toString()} />
           </ListItem>
           <ListItem>
              <ListItemText primary="Investor Type" secondary={createAssetStore.generateInfo().investorType.toString()} />
           </ListItem>
           <ListItem>
              <ListItemText primary="KYC cleared by " secondary={createAssetStore.generateInfo().investorsClearedFrom} />
           </ListItem>
          </List>
         </Grid>
       <Grid item xs={12} sm={6}>
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
               <ListItem>
                    <ListItemText primary="Subscription Start Date" secondary={new Intl.DateTimeFormat('en-GB', {
                                                                                                      month: 'long',
                                                                                                      day: '2-digit',
                                                                                                      year: 'numeric',
                                                                                                      hour: '2-digit',
                                                                                                      minute: '2-digit',
                                                                                                      second: '2-digit',
                                                                                                      timeZoneName: 'long'
                                                                                                  }).format(new Date(createAssetStore.generateInfo().subscribeStartDate))} />
                 </ListItem>
                <ListItem>
                     <ListItemText primary="Subscription End Date" secondary={new Intl.DateTimeFormat('en-GB', {
                                                                                             month: 'long',
                                                                                             day: '2-digit',
                                                                                             year: 'numeric',
                                                                                             hour: '2-digit',
                                                                                             minute: '2-digit',
                                                                                             second: '2-digit',
                                                                                             timeZoneName: 'long'
                                                                                         }).format(new Date(createAssetStore.generateInfo().subscribeEndDate))}
                     />
                  </ListItem>
                <ListItem>
                      <ListItemText primary="Minimum Purchase Amount" secondary={createAssetStore.generateInfo().minPurchaseAmount} />
                   </ListItem>
                  <ListItem>
                       <ListItemText primary="Maximum Purchase Amount" secondary={createAssetStore.generateInfo().maxPurchaseAmount} />
                    </ListItem>
                  <ListItem>
                   <ListItemText primary="Annual Coupon Rate (% p.a.)" secondary={parseFloat(Math.round(createAssetStore.generateInfo().annualisedInterestRate * 100) / 100).toFixed(2)} />
                </ListItem>
                </List>
      </Grid>
      </Grid>
      </div>
    )
  }
}

export default Review2;
