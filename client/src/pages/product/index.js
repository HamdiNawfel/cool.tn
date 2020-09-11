import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';



import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
//icons
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
//
import Filter from './components/Filter'
import Products from './components/Products'
import Cart from './components/Cart'
//redux set up
import { connect } from 'react-redux';
import { getAllProducts } from '../../redux/actions/dataAction'
import { Grid } from '@material-ui/core';
const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth:360,
    // overflowY:'hidden'
    // position:'fixed',
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
  //logo
  logo: {
    fontWeight:900,
   marginLeft:50,
   [theme.breakpoints.down('md')]: {
    marginLeft:5,
  },
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
  title: {
   fontWeight:900,
   padding:'0 10px 0 10px',
   color:' #fff',
   backgroundColor:'#ffa400',
   marginLeft:10,
   boxShadow: '0 0 40px #ffa400, 0 0 20px #ffa400, 0 0 60px #ffa400',
   [theme.breakpoints.up('md')]: {
    marginLeft:50,
  },
  },
  mobileCartIcon: {
    display:'none',
    marginLeft:10,
    [theme.breakpoints.down('md')]: {
      display:'flex',
    },
  }
}));

function PermanentDrawerRight(props) {
  const classes = useStyles();
  const [ drawer, setDrawer ] = useState('temporary')
  const { getAllProducts } = props;
  useEffect(()=>{
    getAllProducts()
  },[getAllProducts])
  
  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="fixed" color="inherit" elevation={0} className={classes.appBar}>
        <Toolbar>
         <Link href="/" style={{color:'inherit', textDecoration:'none'}} >
         <Typography className={classes.title} variant="h6">
            cool
          </Typography>
         </Link>
         <div style={{flexGrow:1}}/>
         <Filter/> 
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
       
        <Products />
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
          <Cart />
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
  
});



const mapActionsToProps = {
  getAllProducts
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(PermanentDrawerRight);