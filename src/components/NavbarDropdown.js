import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {userStore} from "../store/UserStore";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretDown, faHome} from "@fortawesome/free-solid-svg-icons";
import ListItem from "@material-ui/core/ListItem";
import './NavbarDropdown.css'
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="user-info" onClick={handleClick}>Welcome, {userStore.username} <FontAwesomeIcon icon={faCaretDown} style={{color: 'white', fontSize: '22px'}}/></div>
      {/*<Button*/}
      {/*  aria-controls="customized-menu"*/}
      {/*  aria-haspopup="true"*/}
      {/*  variant="contained"*/}
      {/*  color="primary"*/}
      {/*  onClick={handleClick}*/}
      {/*>*/}
      {/*  Open Menu*/}
      {/*</Button>*/}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        //keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListItem>
          <ListItemText>Ubin ID: </ListItemText>
          <ListItemText>{" " + userStore.userDetails.ubinUserId}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Ubin Address: </ListItemText>

          <ListItemText><a href={"https://iinlab.iinconnect.com"} target='_blank'>
          {" " + userStore.userDetails.ubinAddress}</a></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>STACS Address: </ListItemText>
          <ListItemText><a href={"https://browser.stacs.io/addressDetail?address=" +userStore.userDetails.stacsAddress} target="_blank">{" " + userStore.userDetails.stacsAddress}</a></ListItemText>
        </ListItem>
      </StyledMenu>
    </div>
  );
}
