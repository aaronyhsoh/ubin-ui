import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {userStore} from "../../store/UserStore";
import * as api from '../../utils/Api';
import stacs from "../../images/stacs.png";
import stacs_ubin from "../../images/stacs_ubin.jpeg";
import ubin_stacs_white from "../../images/ubin_stacs_white.png"
import ubin from "../../images/ubin.png";
import './SignIn.css'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Project Ubin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const [username, setUsername] = React.useState(userStore.username);
  const [password, setPassword] = React.useState(userStore.password);
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  function verifyUser() {
    var authClient = {
      clientId: "gateway"
    }
    if (password !== "password123") {
      setPasswordError(true);
      return
    }

    api.verifyLogin(userStore.username)
      .then(data => {
        api.getUbinAuth2(authClient)
          .then(data => {
            console.log("UBIN token: ", data);
          })
        userStore.userDetails = data;
        userStore.isSignedIn = true;
        props.login();
        // if (data) {
        //   api.getUsers()
        //     .then(data => {
        //       for (let i = 0; i < data.length; i++) {
        //         if (data[i].username === userStore.username) {
        //           userStore.userDetails = data[i];
        //           userStore.isSignedIn = true;
        //           props.login();
        //           console.log("userDetails", userStore.userDetails);
        //         }
        //       }
        //     })
        //     .catch(error => {
        //       console.log(error)
        //     })
        // }
      })
      .catch(error => {
        console.log(error)
        setUsernameError(true);

      });

  }

  const handleChange = (event => {
    if (event.target.id === 'username') {
      setUsername(event.target.value)
      userStore.username = event.target.value;
    }
    if (event.target.id === 'password') {
      setPassword(event.target.value)
      userStore.password = event.target.value;
    }
  })

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <img className="signin-logos" src={ubin_stacs_white}/>

        {/*<img src="../../images/ubin.png"/>*/}
        {/*<Avatar className={classes.avatar}>*/}
        {/*  <LockOutlinedIcon/>*/}
        {/*</Avatar>*/}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="email"
            value={userStore.username}
            onChange={handleChange}
            error={usernameError}
            helperText={usernameError ? "Invalid username" : ""}
            // autoComplete="email"
            // autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={userStore.password}
            onChange={handleChange}
            error={passwordError}
            helperText={passwordError ? "Invalid password" : ""}
            //autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Remember me"
          />
          <Link href="localhost:3000/home">
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={verifyUser}
            >
              Sign In
            </Button>
          </Link>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright/>
      </Box>

    </Container>
  );
}
