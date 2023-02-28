import React from 'react';
import {userStore} from "../../store/UserStore";
import Button from "react-bootstrap/Button";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import BuyerPage from "../BuyerPage/BuyerPage";
import AssetTable from "../../components/AssetTable/AssetTable";
import {buyerPageStore} from "../../store/BuyerPageStore";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Home.css'
import Grid from "@material-ui/core/Grid";
import {Route, NavLink, BrowserRouter as Router} from 'react-router-dom';
import ViewProjects from "../ViewProjects/ViewProjects";
import ViewProjectsTable from "../../components/ViewProjectsTable/ViewProjectsTable";


class Home extends React.Component {
  constructor(props) {
    buyerPageStore.initData();
    super(props);
  }


  render() {

    const userType =
      userStore.userDetails.organization === 'seller' ?
        <div className="main-content">
          <div className="left-empty"/>
          <div className="middle-content">
          <ViewProjectsTable/>
          </div>
          <div className="right-empty"/>
          {/*<h1>Welcome SELLER_A</h1>*/}
          {/*<div>*/}
          {/*  <Button>Create Bonds</Button>*/}
          {/*  <Button>Create Funds</Button>*/}
          {/*  <Button>View Projects</Button>*/}
          {/*</div>*/}
        </div>
        :
        <div className="main-content">
          <div className="left-empty"/>
          <div className="middle-content">
              {/*<Grid item xs={1}>*/}
              {/*    <FontAwesomeIcon*/}
              {/*      className="user-icon"*/}
              {/*      icon={faUser}*/}
              {/*      onClick={() => {*/}
              {/*        console.log("hello")*/}
              {/*      }}*/}
              {/*      style={{color: 'black', fontSize: '30px'}}*/}
              {/*    />*/}
              {/*</Grid>*/}

                <AssetTable/>


          </div>
          <div className="right-empty"/>

        </div>

    return (
      userType
    )
  }
}

export default Home;
