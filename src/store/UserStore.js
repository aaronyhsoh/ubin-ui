import * as api from '../utils/Api';

class UserStore {
  username = '';
  password = '';
  userDetails = {};
  isSignedIn = false;

  clearData() {
    //clear all data and go to login page
    this.userDetails= {};
    // this.username = '';
    // this.password = '';
    this.isSignedIn = false;
  }


}

export const userStore = new UserStore();
