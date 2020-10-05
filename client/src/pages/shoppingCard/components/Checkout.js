import React, { useState, useEffect } from 'react';

//Mui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
//util
import InputText from '../../../utils/InputText'


//redux set up
import { connect } from 'react-redux';
import { checkout } from '../../../redux/actions/shopAction'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display:'block',
    margin:20
  },
  paymentMethod:{
    display:'flex'
  },
  text:{
    fontWeight:600,
    marginTop:5,
  },
  form:{
    width: '60%',
    margin:'0 auto',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
    width: '100%',
      },
  },
   firstname:{
      width:'87%'
     
    },
    Lastname:{
      width:'90%',
      marginLeft:25,
      [theme.breakpoints.down('md')]: {
        marginLeft:14,
        },
    },
   inputText:{
    marginTop:10,
   },
   checkoutBtn:{
     marginTop:20,
     padding:15,
    width:'100%'
   },
   backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },
}));

function Checkout( props) {
  const classes = useStyles();
  const [ open, setOpen ] = useState(false)

//input
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ phone, setPhone] = useState('');
  const [ email, setEmail ] = useState('')
  const [ shippingAddress, setShippingAddress] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  //errors
  
  const [ firstNameError, setfirstNameError ] = useState('');
  const [ lastNameError, setLastNameError ] = useState('');
  const [ phoneError, setPhoneError ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ shippingAddressError, setShippingAddressError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ password2Error, setPassword2Error ] = useState('');

  const handleCheckout = (e) => {
    e.preventDefault();
    const orderData = {
      itemList:props.data.addedItems,
      firstName,
      lastName,
      email,
      phone,
      shippingAddress,
      password,
      password2,
      total:props.data.total
    }
    props.checkout(orderData);
    if(props.ui.errors.length === 0 ){
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setShippingAddress('')
      setPassword('')
      setPassword2('')
      setOpen(true)
    }
    
  }

  useEffect(()=>{  
    setfirstNameError(props.ui.errors.firstName);
    setLastNameError(props.ui.errors.lastName);
    setEmailError(props.ui.errors.email);
    setPasswordError(props.ui.errors.password);
    setPassword2Error(props.ui.errors.password2);
    setShippingAddressError(props.ui.errors.shippingAddress);
    setPhoneError(props.ui.errors.phone);
    console.log(props)
  }) 
  return (
    <Grid className={classes.root}>
      
       <Grid className={classes.paymentMethod}>
        <Typography className={classes.text} color="textSecondary" component="h1" variant="h5">
        Paiement à la livraison
        </Typography>
       </Grid>
       <Grid >
       <form className={classes.form} onSubmit={handleCheckout}>
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
              helperText={phoneError}
              fullWidth
              placeholder="Télephone"
              className={classes.inputText}
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
             <InputText 
              error
              helperText={shippingAddressError}
              fullWidth
              placeholder="Adresse de livraison"
              className={classes.inputText}
              value={shippingAddress}
              onChange={(e)=>setShippingAddress(e.target.value)}
            />
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
            <Button variant="contained" color="primary"className={classes.checkoutBtn} type="submit">
              Passer votre commande
            </Button>
          </form>
          </Grid>
          <Backdrop className={classes.backdrop} open={open} >
            <CircularProgress color="inherit" />
         </Backdrop>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
  shop: state.shop,
  data: state.data
});
const mapActionsToProps = {
  checkout
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Checkout);