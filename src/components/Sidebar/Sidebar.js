import React from 'react';
import _ from '../../utils/Constants';
import DistributeDividends from '../../pages/DistributeDividends/DistributeDividends';
import Home from '../../pages/Home/Home';
import {Route, NavLink, BrowserRouter as Router} from 'react-router-dom';
import Placeholder from '../Placeholder';
import './Sidebar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faMoneyCheckAlt, faUserFriends, faPhone} from "@fortawesome/free-solid-svg-icons";
import Ubin from "../../pages/Ubin/Ubin";
import BuyerPage from "../../pages/BuyerPage/BuyerPage";
import TransactionHistory from "../../pages/TransactionHistory/TransactionHistory";

const routes = [
  {
    path: _.URLS.HOMEPAGE,
    title: 'Home',
    img: <FontAwesomeIcon icon={faHome} style={{color: 'white', fontSize: '22px'}}/>,
    exact: true,
    component: () => <Home/>,
    breadcrumb: 'Home',
    display: true,
  },
  {
    path: _.URLS.TRANSACTION_HISTORY,
    title: 'Payment',
    img: <FontAwesomeIcon icon={faMoneyCheckAlt} style={{color: 'white', fontSize: '22px'}}/>,
    //component: () => <DistributeDividends/>,
    component: () => <TransactionHistory/>,
    breadcrumb: 'TransactionHistory',
    display: true,
  },
  {
    path: _.URLS.CREATE_BOND,
    title: 'Test',
    img: <FontAwesomeIcon icon={faUserFriends} style={{color: 'white', fontSize: '22px'}}/>,
    component: () => <Ubin/>,
    breadcrumb: 'Create Bond',
    display: true,
  },
  {
    path: _.URLS.HOMEPAGE,
    title: 'Test',
    img: <FontAwesomeIcon icon={faPhone} style={{color: 'white', fontSize: '22px'}}/>,
    component: () => <BuyerPage/>,
    breadcrumb: 'User Management',
    display: true,
  },
  {
    path: _.URLS.PLACE_HOLDER3,
    title: 'Test',
    img: <FontAwesomeIcon icon={faMoneyCheckAlt} style={{color: 'white', fontSize: '22px'}}/>,
    component: () => <TransactionHistory/>,
    breadcrumb: 'Profile',
    display: true,
  },
  {
    path: _.URLS.PLACE_HOLDER4,
    title: 'Test',
    img: <FontAwesomeIcon icon={faMoneyCheckAlt} style={{color: 'white', fontSize: '22px'}}/>,
    component: () => <Placeholder/>,
    breadcrumb: 'Guide',
    display: true,
  },
];

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.setState({
      active: item
    })

    console.log(item);
  }

  render() {
    const {active} = this.state;

    return (
      <Router>
        <div className="sidebar">
          <ul className="sidebar-objects">
            {routes.map((route, i) =>
              route.display && (
                <li key={i}>
                  <NavLink
                    to={route.path}
                    className={'sidebar-link'}
                  >
                    <div className="icon-objects" style={{display: 'inline-block', width: 20}}>
                      {route.img}
                    </div>
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="content">
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              //exact={route.exact}
              component={route.component}

            />
          ))}
        </div>
      </Router>
    )
  }
}

export default Sidebar;
