import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  { Redirect } from 'react-router-dom';
import isLoging from '../helper/isloged';


const useStyles = makeStyles(theme => ({
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
  err: {
    color: 'red'
  }
}));
// Admin Login Component
export default function AdminLogin() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [isLoged, setIsLoged] = useState(false);
  
  
  
  const adminLog = async () => {
    
    const result = await fetch('/api/admin/login', {
      body: JSON.stringify({ name: username, password: password }),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const body = await result.json();
    if (body.token) {
      localStorage.setItem('token', body.token);
      setStatus('');
      setIsLoged(isLoging())
    } else {
      setStatus('Username or Password is wrong')
    }

  }
  useEffect(() => {
    setIsLoged(isLoging())
    
  },[isLoged]);

  if (isLoged) return <Redirect to='/admin/Add-Post' />
 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <p className={classes.err}>{status}</p>
        <form className={classes.form} noValidate>
          <TextField
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Admin Username"
            name="username"
            type="text"
            autoFocus
          />
          <TextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            onClick={() => adminLog()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

        </form>
      </div>

    </Container>
  );
}