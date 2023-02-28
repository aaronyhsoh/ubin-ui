import React from 'react';

import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import SignIn from "./pages/SignIn/SignIn";
import {userStore} from "./store/UserStore";
import {walletStore} from "./store/WalletStore";
import {transactionHistoryStore} from "./store/TransactionHistoryStore";
import {buyerPageStore} from "./store/BuyerPageStore";
// import {createAssetStore} from "./store/CreateAssetStore";
// import {Auth} from "aws-amplify";
import {Route, NavLink, BrowserRouter as Router, Redirect} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: userStore.isSignedIn,
      justLoggedIn: false,
      isAuthenticated: false,
      isAuthenticating: true,
      user: null,
      timeoutHandler: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.userTimeout = this.userTimeout.bind(this);
  }

  login() {
    //userStore.isSignedIn = true;
    this.setState({
      isLoggedIn: true,
      justLoggedIn: true
    })
    this.userTimeout();
    console.log("Login: ", new Date());

  }

  userTimeout() {
    this.setState({
      timeoutHander: setTimeout(this.logout, 840000)
    })
  }

  setAuthStatus = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    })
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  // async componentDidMount() {
  //   try {
  //     const session = await Auth.currentSession();
  //     this.setAuthStatus(true);
  //     console.log(session);
  //     const user = await Auth.currentAuthenticatedUser();
  //     this.setUser(user);
  //     console.log("user session persisting: ", session);
  //
  //   } catch (error) {
  //     console.log(error);
  //   }
  //
  //   this.setState({
  //     isAuthenticating: false
  //   })
  // }

  logout = () => {
    console.log("Logging out");
    console.log("Logout: ", new Date());
    this.setState({
      isLoggedIn: false
    })
    userStore.clearData();
    walletStore.clearData();
    transactionHistoryStore.clearData();
    buyerPageStore.clearData();
    // createAssetStore.clearData();
    clearTimeout(this.state.timeoutHander);
    // return (<Redirect to="/login"/>)
  }


  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    const {isLoggedIn, justLoggedIn} = this.state;

    let loginPage =
      <div className="App">
        <SignIn
          login={this.login}
        />
      </div>

    let contents =
      <div className="App">
        <div className="navbar-main">
          <Navbar
            logout={this.logout}
            justLoggedIn={justLoggedIn}
          />
        </div>
        {/*<div className="sidebar-main">*/}
        {/*  <Sidebar/>*/}
        {/*</div>*/}
      </div>

    return (
      //<Router>
        this.state.isLoggedIn ? contents : loginPage
      //</Router>
    );
  }
}

export default App;

