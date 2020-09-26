import React, { useState, useEffect } from 'react';
import axios from 'axios'
//mui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

//imgage
import image from './assets/success-image.svg'

//redux set up
import { connect } from 'react-redux';

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
    // height:'100%',
    [theme.breakpoints.down('xs')]: {
    //   height:'30%',
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
      top:-550,
      },
   },
   text: {
     fontWeight:600,
     marginTop:60,
     color:'#edaf07',
     [theme.breakpoints.down('xs')]: {
      marginTop:-10,
      },
   }
}));

function Success(props) {
  const classes = useStyles();
  
  useEffect(() => {
      axios.get(`http://localhost:8080/success${props.location.search}`)
      .then((res) =>{
        console.log(res);
      })
      .catch((err) =>{
        console.log(err);
      })
    
  }, []);
  
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={5}  className={classes.image} />
      <Grid item xs={12} sm={7}  component={Paper} elevation={6} square className={classes.background}>
        <div className={classes.paper}>
            <Link href="/" style={{color:'inherit', textDecoration:'none'}} >
                <Typography component="h1" variant="h5" className={classes.logo}>
                cool
                </Typography>
            </Link>
            <div >
                <Typography component="h1" variant="h5" className={classes.text}color="textSecondary">
                  Paiement effectué avec succès
                </Typography>
            </div>
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

};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Success);