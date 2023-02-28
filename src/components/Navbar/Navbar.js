import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import {properties} from "../../utils/Properties";
import {distributeDividendStore} from "../../store/DistributeDividendStore";
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Popper from 'popper.js';
import {Route, NavLink, BrowserRouter as Router, Redirect} from 'react-router-dom';
import _ from "../../utils/Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faMoneyCheckAlt, faPhone, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import Home from "../../pages/Home/Home";
import TransactionHistory from "../../pages/TransactionHistory/TransactionHistory";
import Ubin from "../../pages/Ubin/Ubin";
import BuyerPage from "../../pages/BuyerPage/BuyerPage";
import Placeholder from "../Placeholder";
import {userStore} from "../../store/UserStore";
import SignIn from "../../pages/SignIn/SignIn";
import App from "../../App";
import WalletBalance from "../../pages/WalletBalance/WalletBalance";
//import stacs_ubin_transparent from "../../images/stacs_ubin_transparent.png";
import stacs_ubin_navbar from "../../images/ubin_stacs_navbar_logo.png"
import ubin_stacs_white from "../../images/ubin_stacs_white.png";
import CustomizedMenus from "../NavbarDropdown";

const routes = [
  {
    path: _.URLS.HOMEPAGE,
    title: 'Home',
    img: <FontAwesomeIcon icon={faHome} style={{color: 'white', fontSize: '22px'}}/>,
    exact: true,
    component: () => <Home/>,
    breadcrumb: 'Home',
    display: true,
    access: "all"
  },
  {
    path: _.URLS.TRANSACTION_HISTORY,
    title: 'Order Status',
    img: <FontAwesomeIcon icon={faMoneyCheckAlt} style={{color: 'white', fontSize: '22px'}}/>,
    //component: () => <DistributeDividends/>,
    component: () => <TransactionHistory/>,
    breadcrumb: 'TransactionHistory',
    display: true,
    access: "buyer"
  },
  {
    path: _.URLS.CREATE_BOND,
    title: 'Configure Bond',
    img: <FontAwesomeIcon icon={faUserFriends} style={{color: 'white', fontSize: '22px'}}/>,
    component: () => <Ubin/>,
    breadcrumb: 'Create Bond',
    display: true,
    access: "seller"
  },
  {
    path: _.URLS.PLACE_HOLDER4,
    title: 'Test',
    img: <FontAwesomeIcon icon={faPhone} style={{color: 'white', fontSize: '22px'}}/>,
    component: () => <BuyerPage/>,
    breadcrumb: 'User Management',
    display: false,
    access: "all"
  },
  {
    path: _.URLS.WALLET_BALANCE,
    title: 'Account Balance',
    img: <FontAwesomeIcon icon={faMoneyCheckAlt} style={{color: 'white', fontSize: '22px'}}/>,
    component: () => <WalletBalance/>,
    breadcrumb: 'Profile',
    display: true,
    access: "all"
  }, //buyer
];

const activeStyle = {
  color: "red"
}
const style = {
  padding: "20px",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: "white",
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {collapsed: true, dropdown: false, language: "en"}
  }

  setLanguage() {
    switch (this.state.language) {
      case "en" :
        return properties.en;
      case "sp" :
        return properties.sp;
      case "ch" :
        return properties.ch;
      case "fr" :
        return properties.fr;
      default :
        return properties.en;
    }
  }

  redirect = () => {
    if (this.props.justLoggedIn === true) {
      return (
        <Redirect to="/home"/>
      )
    }
  }

  toggleNavbar() {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const testing = "en";
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <img className="signin-logos" style={{width: '90px'}} src={stacs_ubin_navbar}/>
          <div className="navbar-header">
            <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className={`${classOne}`} id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {routes.map((route, i) =>
                route.display &&
                ((userStore.userDetails.organization === route.access) ||
                  route.access === "all") &&
                (
                  <li key={i}>
                    <NavLink
                      to={route.path}
                      style={style}
                      activeStyle={activeStyle}
                    >{route.title}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
            {/*<ul className="nav navbar-nav navbar-right">*/}
            {/*  <p className="sign-out"*/}
            {/*     style={{*/}
            {/*      fontWeight: "bold",*/}
            {/*      textTransform: "uppercase",*/}
            {/*      color: "white",*/}
            {/*      paddingTop: "20px"*/}
            {/*    }}*/}
            {/*    onClick={this.props.logout}*/}
            {/*  >Sign Out</p>*/}
            {/*</ul>*/}
            <ul className="nav navbar-nav navbar-right">
              <CustomizedMenus />
              <NavLink
                to="/login"
                style={{
                  color: 'white',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  paddingLeft: '20px'
                }}
                onClick={this.props.logout}
              >Sign Out
              </NavLink>
            </ul>
          </div>

        </nav>
        < div className="content">
          {
            routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                //exact={route.exact}
                component={route.component}
              />
            ))
          }
          <Route
            path="/login"
            // component={App}
          />
        </div>
        {this.redirect()}
      </Router>
    )
  }
}

export default Navbar;
