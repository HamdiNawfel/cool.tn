import React , { useEffect } from 'react';
//Mui
import { fade, makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Drawer from './Drawer'

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        flexGrow: 1,
        backgroundColor:'#000'
      },
  grow: {
     flexGrow: 1,
     maxWidth: '100%',
     overflowX: 'hidden',
  },
  shippingInfo: {
    width:'100%',
    background:'#000',
    color:'#fff',
    textAlign:'center',
    padding:5,
    fontWeight:600,
    opacity:0.8
  },
  menuButton: {
     marginRight: theme.spacing(2),
  },
  title: {
   fontWeight:900,
   padding:'0 10px 0 10px',
   color:' #fff',
   backgroundColor:'#ffa400',
   marginLeft:-50,
   boxShadow: '0 0 5px #ffa400, 0 0 20px #ffa400, 0 0 60px #ffa400',
   [theme.breakpoints.up('md')]: {
    marginLeft:50,
  },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mainNav:{
      marginLeft: 20,
      cursor:'pointer',
  },
  link: {
      margin:'10px 0 0 30px',
      color:'#fff',
      fontWeight:300,
      opacity:0.9,
      fontSize:15,
      padding:2,
      '&:hover': {
       borderBottom:'5px solid #ffa400',
        opacity:0.96,
  }
},
  notDisplay: {
  //  display:'none',
  //  transition: 'display 5s'
  },
  chip: {
   margin:5,
   [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
   },
   expandIcon:{
    verticalAlign: 'middle',
    marginLeft:5,
    color:'#fff',
   },
   hover:{
    '&:hover': {
        color: fade('#ffa400', 1),
      },
   },
   
}));

  export default function NavBar(props) {
  const classes = useStyles()
  const [isAuthenticated, setyIsAuthenticated] = React.useState(false);
 
  useEffect(()=>{
    if(localStorage.length !== 0){
      setyIsAuthenticated(true)
    }
  },[]) 
  return (
    <div className={classes.grow}>
         <CssBaseline />
      
      <AppBar position="fixed" color="inherit" elevation={0} className={classes.appBar}>
      {/* <div className={classes.shippingInfo}>Livraison gratuite !</div> */}
        <Toolbar>
          {/* DRAWER */}
          <div className={classes.sectionMobile}>
            <Drawer />
          </div>
          <div className={classes.sectionDesktop}>
            <Grid container>
              <Grid item>
                <Link 
                  variant="button" 
                  color="textPrimary" 
                  href="/shopping-card" 
                  className={classes.link } 
                  style={{textDecoration:'none'}}>
                  MENU
                </Link>
              </Grid>
              <Grid item>
                <Link 
                  variant="button" 
                  color="textPrimary" 
                  href="#" 
                  className={classes.link } 
                  style={{textDecoration:'none'}}>
                  FOR BUSINESS
                </Link>
              </Grid>
            </Grid>
          </div>
          <div className={classes.grow} />
          <Typography className={classes.title} variant="h6">
            cool
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Grid container>
              <Grid item>
                <Link 
                  variant="button" 
                  color="textPrimary" 
                  href="#" 
                  className={classes.link } 
                  style={{textDecoration:'none'}}>
                  CONTACT
                </Link>
              </Grid>
              <Grid item>
                <Link 
                  variant="button" 
                  color="textPrimary" 
                  href="#" 
                  className={classes.link } 
                  style={{textDecoration:'none'}}>
                  BLOG
                </Link>
              </Grid>
              <Grid item>
                {!isAuthenticated?<Link
              variant="button" 
              color="textPrimary" 
              href="/login" 
              className={classes.link } 
              style={{textDecoration:'none'}}>
              CONNECTER
            </Link>:
              <Link
              variant="button" 
              color="textPrimary" 
              href="#" 
              className={classes.link } 
              style={{textDecoration:'none'}}>
              PROFILE
            </Link>}
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
