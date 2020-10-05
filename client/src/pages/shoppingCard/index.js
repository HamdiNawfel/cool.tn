import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router'

import axios from 'axios'
//Mui
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
//icons
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// components
import Filter from './components/Filter';
import Products from './components/Products';
import Cart from './components/Cart';
import ShippingDate from './components/ShippingDate';
import Paypal from './components/Paypal';
import Checkout from './components/Checkout';

//redux set up
import { connect } from 'react-redux';
import { getAllProducts } from '../../redux/actions/dataAction'
import { setStep} from '../../redux/actions/uiAction'


const drawerWidth = 360;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // minWidth:360,
    top:0,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    borderBottom: `1px solid ${theme.palette.divider}`,
    
    [theme.breakpoints.down('md')]: {
      width:'100%',
      marginRight: 0
    },
  },
  drawer: {
    width: drawerWidth,
    display:'flex',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      display:'none',
    },
    
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#FAFAFA'
  },
  Mobiledrawer: {
    width: drawerWidth,
    display:'none',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      display:'flex',
    },
    
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  produtList:{
    marginTop:100
  },
  bagItem:{
    margin:5,
    position:'relative',
    top:70,
    zIndex:0
  },
  bag:{
    display:'flex',
    justifyContent:'center',
    marginTop:20,
    marginBottom:9
  },
  price:{
  marginTop:10,
  marginLeft:5
  },
    commandeButton: {
    borderTop: `1px solid ${theme.palette.divider}`,
    display:'block',
    position:"fixed",textAlign:'center',
    justifyContent:'center',
    backgroundColor:"#fafafa",
    width:'320px',
    overflowY:'hidden',
    bottom:'0px',
    height:100,
  },
  logo: {
   fontWeight:900,
   padding:'0 10px 0 10px',
   color:' #fff',
   backgroundColor:'#ffa400',
   marginLeft:50,
   boxShadow: '0 0 10px #ffa400, 0 0 20px #ffa400, 0 0 60px #ffa400',
   [theme.breakpoints.down('sm')]: {
    display:'none',

  },
  },
  backHome: {
   display:'none',
   verticalAlign:'middle',
   [theme.breakpoints.down('sm')]: {
    display:'inline',
   
  },
  },
  mobileCartIcon: {
    display:'none',
    marginLeft:10,
    [theme.breakpoints.down('md')]: {
      display:'flex',
    },
  },
  date:{
    textAlign:'center',
    width:300,
    margin:'20px auto'
  },
  text: {
    fontWeight:600,
    marginTop:5,
    width:'65%',
    margin:'auto',
    textAlign:'center',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function ShoppingCard(props) {
  
  const classes = useStyles();
  const [ drawer, setDrawer ] = useState('temporary');
  const [ success, setSuccess ] = useState(false);
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };
  // shopping step
  const { getAllProducts, setStep } = props;
  useEffect(()=>{
    getAllProducts();
    setStep('shopping');
  },[getAllProducts]);

  const handleSetStep = (step) => {
    props.setStep(step);
}

useEffect(() => {
  if(props.location.search !== ''){
    axios.get(`http://localhost:8080/api/order/success${props.location.search}&total=${localStorage.getItem('total')}`)
      .then((res) =>{
        if(res.status === 200){
           setSuccess(true)
        }else{
          console.log('cancel')
        }
      })
      .catch((err) =>{
        console.log(err);
      })
  }
  if(props.shop.success){
    setSuccess(true)
  }
}, []);
  const { uiStep } = props.ui
  const shoppingMarkup = uiStep ==='shopping'?
  <div>
   <Filter/> 
   <Products />
  </div>:null
  // date step
  const dateMarkup = uiStep ==='shipping'?
  <div>
     <Typography component="h1" variant="h5" className={classes.text}color="textSecondary">
     Sélectionnez une date de livraison valide.
      </Typography>
      <Typography component="h1" variant="h5" className={classes.text}color="textSecondary">
      Le temps de livraison est estimé à <span style={{ color:'#edaf07'}}> 30 minute.</span>
      </Typography>
    <div className={classes.date}><ShippingDate  drawer={()=>setDrawer('permanent')}/></div>
  </div>:null
  //payment step
  const paymentMarkup = uiStep ==='payment'?
  <Grid>
    <Paypal />
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
    <Grid>
      <Checkout />
    </Grid>
  </Grid>:null
  // success
 const successMarkup = <div className={classes.root}>
 <Snackbar 
   open={props.ui.success || success} 
   anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
    onClose={handleClose}>
      <Link href="/shopping-card" style={{color:'inherit', textDecoration:'none'}} >
        <Alert onClose={handleClose} severity="success">
        Commande effectué avec succès
        </Alert>
   </Link>
 </Snackbar>
 </div>
  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="fixed" color="inherit" elevation={0} className={classes.appBar}>
        <Toolbar>
         <Link href="/" style={{color:'inherit', textDecoration:'none'}} >
         <Typography className={classes.logo} variant="h6">
            cool
          </Typography>
         </Link>
         <div style={{flexGrow:1}}/>
         <div>
         <Link href="/" style={{color:'inherit', textDecoration:'none'}}>
           <KeyboardBackspaceIcon className={classes.backHome} />
         </Link>
            {/* <ChevronRightIcon style={{ opacity:0.3, verticalAlign:'middle'}}/> */}
            <Button onClick={()=>handleSetStep('shopping')}>Menu</Button>
            <ChevronRightIcon style={{ opacity:0.3, verticalAlign:'middle'}}/>
            <Button disabled={ props.shop.shippingDate ===''} onClick={()=>handleSetStep('shipping')}>Date</Button>
            <ChevronRightIcon style={{ opacity:0.3, verticalAlign:'middle' }}/>
            <Button disabled={uiStep !== 'payment'}onClick={()=>handleSetStep('payment')}>Payer</Button>
         </div>
         <div style={{flexGrow:1}}/>
         <Badge badgeContent={props.data.count} color="primary" 
         invisible={props.data.total === 0?true:false}
         className={classes.mobileCartIcon}
         onClick={()=>setDrawer('permanent')}>
              <ShoppingBasketIcon fontSize="large"/>
            </Badge>
        </Toolbar>
      </AppBar>
      <main className={classes.content} >
        <div className={classes.toolbar} />
        { shoppingMarkup }
        { dateMarkup }
        { paymentMarkup }
        { successMarkup }
      </main>
      <Drawer
        className={classes.Mobiledrawer}
        variant={drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div style={{position:'fixed',backgroundColor:"#fff",width:350,zIndex:1,}}>
          <Grid container >
            <Grid item xs={6}>
              <IconButton style={{float:'left',marginLeft:10,marginTop:5}} onClick={()=>setDrawer('temporary')}>
                <ChevronRightIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}style={{marginTop:15, marginBottom:5}}>
              <Badge badgeContent={props.data.count} color="primary" invisible={props.data.total === 0?true:false}>
                <ShoppingBasketIcon fontSize="large"onClick={()=>setDrawer('temporary')}/>
              </Badge>
            </Grid> 
          </Grid>
          <Divider />
        </div>
        <div style={{position:'relative', top:80}}>
          <Cart drawer={()=>setDrawer('temporary')}/>
        </div>
      </Drawer>
      {/* desktop drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div style={{position:'fixed',backgroundColor:"#fff",width:350,zIndex:1,}}>
          <div  className={classes.bag}>
            <Badge badgeContent={props.data.count} color="primary" invisible={props.data.total === 0?true:false}>
              <ShoppingBasketIcon fontSize="large"/>
            </Badge>
              
          </div>
          <Divider />
        </div>
        <div style={{position:'relative', top:80}}>
          <Cart />
        </div>
      </Drawer>
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.data,
  ui : state.ui,
  shop: state.shop
});
const mapActionsToProps = {
  getAllProducts,
  setStep
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(ShoppingCard);