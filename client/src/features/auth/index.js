import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router'
//mui
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//components
import LoginWithGoogle from './components/LoginWithGoogle'
import LoginWithFacebook from './components/LoginWithFacebook'
//imgage
import image from './assets/background.jpg'
//util
import InputText from '../../utils/InputText'

//redux set up
import { connect } from 'react-redux';
import { signupUser,loginUser, } from '../../redux/actions/userAction'
import { clearErrors } from '../../redux/actions/uiAction'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height:'100%',
    [theme.breakpoints.down('xs')]: {
      height:'30%',
    },
  },
  background: {
    position:'relative',
    top:0,
    width: '100%',
    
  },
  paper: {
    position:'relative',
    top:0,
    margin: theme.spacing(4, 12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(8, 4),
      top:-50,
      },
  },
  logo: {
    position:'relative',
    top:10,
    fontWeight:900,
    padding:'0 10px 0 10px',
    color:' #fff',
    backgroundColor:'#ffa400',
    boxShadow: '0 0 40px #ffa400, 0 0 20px #ffa400, 0 0 60px #ffa400',
    [theme.breakpoints.down('xs')]: {
      top:-130,
      },
   },
   text: {
     fontWeight:600,
     marginTop:60,
     color:'#edaf07',
     [theme.breakpoints.down('xs')]: {
      marginTop:-10,
      },
   },
   inputText:{
    marginTop:10,
   },
    checkoutBtn:{
        padding:12,
        marginTop:15,
        marginBottom:10,
        
        width:'100%',
        color:'#fff',
        backgroundColor:'#ffa400',
        '&:hover': {
            boxShadow: '0 0 10px #ffa400, 0 0 20px #ffa400, 0 0 60px #ffa400',
         },
        borderRadius:'3px',
        border: `1px solid #ffa400`,
        textTransform:'uppercase',
        fontWeight:600,
        transition: '0.2s',
        outline: 'none',
        cursor:'pointer',
    },
    firstname:{
      width:'90%'
     
    },
    Lastname:{
      width:'90%',
      marginLeft:15,
      [theme.breakpoints.down('md')]: {
        marginLeft:17,
        },
    },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AuthUser(props) {
  const classes = useStyles();
  const [ newUser, setNewUser ] = useState(false);
  //input fields
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
//errors
  
  const [ firstNameError, setfirstNameError ] = useState('');
  const [ lastNameError, setLastNameError ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ password2Error, setPassword2Error ] = useState('');
 
//LOGIN
  const handleLoginUser = (e) => {
    e.preventDefault();
    const userData = {
      email, 
      password
    };
    props.loginUser(userData, props.history)
    
   if(props.ui.errors.length === 0 ){
     setEmail('');
     setPassword('')
   }
  }
  //SIGNUP
  const handleSignupUser = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email, 
      password,
      password2,
    };
    props.signupUser(userData)
   if(props.ui.errors.length === 0 ){
     setFirstName('');
     setLastName('');
     setEmail('');
     setPassword('');
     setPassword2('');
   }
  }

  useEffect(()=>{  
    setfirstNameError(props.ui.errors.firstName);
    setLastNameError(props.ui.errors.lastName);
    setEmailError(props.ui.errors.email);
    setPasswordError(props.ui.errors.password);
    setPassword2Error(props.ui.errors.password2);
  });

  const handleSignup = () => {
    setNewUser(true)
    props.clearErrors()
  }
  const handleLogin = () => {
    setNewUser(false)
    props.clearErrors()
   
  }
  
  return (
    <Grid container component="main" className={classes.root}>
      {!props.user.isAuthenticated?null:<Redirect to='/'/>}
      <CssBaseline />
      <Grid item xs={12} sm={5} md={7} className={classes.image} />
      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square className={classes.background}>
        <div className={classes.paper}>
          <Link href="/" style={{color:'inherit', textDecoration:'none'}} >
            <Typography component="h1" variant="h5" className={classes.logo}>
              cool
            </Typography>
          </Link>
          {!newUser?
            <div >
              <Typography component="h1" variant="h5" className={classes.text}color="textSecondary">
                Se connecter
              </Typography>
                <form className={classes.form} onSubmit={handleLoginUser}>
                
                <LoginWithFacebook />
                <LoginWithGoogle />
                <Grid container style={{margin:'30px 0'}}>
                    <Grid item xs={2} sm={5} style={{marginTop:8}}>
                        <Divider />
                    </Grid>
                    <Grid item xs={8}sm={2}>
                       <Typography style={{verticalAlign:'top', textAlign:'center'}}>Ou</Typography>
                    </Grid>
                    <Grid item xs={2} sm={5} style={{marginTop:8}}>
                      <Divider />
                    </Grid>
                </Grid>
                <div style={{marginBottom: 20}} onClick={handleSignup} >
                  <Link variant="body2"color="textSecondary" style={{ cursor:'pointer',marginTop:10}}>
                    Vous êtes un nouveau utilisateur? <span style={{ color:'#edaf07'}}> Créez un compte</span>
                  </Link>
                </div>
                <InputText 
                  error
                  helperText={emailError}
                  fullWidth
                  autoFocus
                  placeholder="Email"
                  className={classes.inputText}
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <InputText  
                  inputProps={{
                    autoComplete: 'new-password',
                    form: {
                      autoComplete: 'off',
                    },
                  }}
                  error
                  helperText={passwordError}
                  type="password"
                  fullWidth
                  placeholder="Password"
                  className={classes.inputText}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <button className={classes.checkoutBtn} type="submit">
                   Se connecter
                </button>  
              </form>
            </div>:
            <div>
              <Typography component="h1" variant="h5" className={classes.text}>
                 Créer un nouveau compte
              </Typography>
              <div style={{marginBottom: 20}} onClick={handleLogin}>
                <Link  variant="body2"color="textSecondary" style={{ cursor:'pointer'}}>
                  Vous avez déjà un compte! <span style={{ color:'#edaf07'}}> Se connecter</span>
                </Link>
              </div>
              <form className={classes.form} onSubmit={handleSignupUser}>
              <Grid container>
              <Grid item xs={6}>
                <InputText 
                  error
                  helperText={firstNameError}
                  type="text"
                  autoFocus
                  fullWidth
                  placeholder="Nom"
                  className={classes.firstName}
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}                     
                />
              </Grid>
              <Grid item xs={6}>
                <InputText 
                  error
                  helperText={lastNameError}
                  type="text"
                  fullWidth
                  placeholder="Prénon"
                  className={classes.Lastname}
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  />
              </Grid>
            </Grid>
            <InputText 
              error
              helperText={emailError}
              fullWidth
              placeholder="Email"
              className={classes.inputText}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <InputText  
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              error
              helperText={passwordError}
              type="password"
              fullWidth
              placeholder="Mot de passe"
              className={classes.inputText}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}  
            />
            <InputText  
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              error
              helperText={password2Error}
              type="password"
              fullWidth
              placeholder="Confirmer le mot de passe"
              className={classes.inputText}
              value={password2}
              onChange={(e)=>setPassword2(e.target.value)}
            />
            <button className={classes.checkoutBtn} type="submit">
              Créez un compte
            </button>
          </form>
        </div>}
      </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});
const mapActionsToProps = {
 signupUser,
 loginUser,
 clearErrors
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(AuthUser);