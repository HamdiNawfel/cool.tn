import React from 'react';

//Mui
//
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

//components
import HowItWorks from '../home/components/HowItWorks'
import CustomerRating from '../home/components/CustomerRating'
import About from './components/About'
import Menu from '../home/components/Menu'
import CommonQuestions from '../home/components/CommonQuestions'
import Subscribe from '../home/components/Subscribe'
//utils
import Title from '../../utils/Title'
import Appbar from '../../utils/Appbar'
import Footer from '../../utils/Footer'
//images
import heroImage from './assets/heroImage.jpg'


const useStyles = makeStyles((theme) => ({
    hero: {
    textAlign:'center',  
    [theme.breakpoints.up('md')]: {
      marginTop:'-180px'
    },
  },
  cta: {
    position:'relative',
     top:'-400px',
     textAlign:'start',
    display: 'inline-block',
    margin:'0 auto',
    padding:'20px',
    backgroundColor:'#fff',
    opacity:1,
    width:'40%',
    [theme.breakpoints.down('sm')]: {
      top:'-150px',
      width:'60%',
    },
    [theme.breakpoints.down('xs')]: {
      top:'-70px',
      width:'90%',
    }
  },
  ctaButton:{
    padding:12,
      marginTop:15,
      marginBottom:10,
      
      width:'100%',
      color:'#fff',
      backgroundColor:'#ffa400',
      '&:hover': {
          boxShadow: '0 0 10px #ffa400, 0 0 20px #ffa400, 0 0 60px #ffa400',
       },
      borderRadius:'2rem',
      border: `1px solid #ffa400`,
      textTransform:'uppercase',
      fontWeight:600,
      transition: '0.2s',
      outline: 'none',
      cursor:'pointer',
  },
  actions: {
    marginTop:40
  },
  howItWorks: {
    position:'relative',
    background:'#F8F7F4',
    zIndex:1,
    top:'-150px',
    display:'block',
    margin:'0 auto',
    textAlign:'center',
    [theme.breakpoints.down('md')]: {
      top:'-50px',
      marginBottom:50,
    },
   },
   menu: {
    position:'relative',
    background:'#F8F7F4',
    top:'-120px',
    display:'block',
    margin:'0 auto',
    textAlign:'center',
    [theme.breakpoints.down('md')]: {
      top:'-50px',
      marginBottom:50,
    },
   },
   rating:{
    position:'relative',
    zIndex:1,
    background:'#F8F7F4',
    top:'-400px',
    display:'block',
    textAlign:'center',
    [theme.breakpoints.down('md')]: {
      top:'-400px',
     
    },
    [theme.breakpoints.down('sm')]: {
      top:'-400px',
     
    },
    [theme.breakpoints.down('xs')]: {
      top:'-100px',
    
    },
   },
    about : {
    position:'relative',
    top:'200px',
    zIndex:0,
    display:'block',
    margin:'0 auto',
    textAlign:'center',
   [theme.breakpoints.down('md')]: {
    top:'200px',
  },
  [theme.breakpoints.down('sm')]: {
    top:'-200px',
  },
  [theme.breakpoints.down('xs')]: {
    top:'100px',
  },
  },
  commonQuestions:{
    position:'relative',
    top:'-120px',
    display:'block',
    margin:'0 auto',
    textAlign:'center',
    [theme.breakpoints.down('md')]: {
      top:'-50px',
    },
    [theme.breakpoints.down('sm')]: {
      top:'-200px',
    },
    [theme.breakpoints.down('xs')]: {
      top:'100px',
      marginBottom:200
    },
  },
 
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Appbar />
      <div className={classes.hero}>
        <img src={heroImage} style={{width:'100%', height:'auto'}} alt="cool"/>
        <div className={classes.cta}>
          <Title title="Se protéger de Covid-19, Restez chez vous et commander petit déjeuner." />
          <Link href="/shopping-card">
            <button className={classes.ctaButton}>
                VOIR NOTRE MENU!
            </button>
          </Link>
        </div>
    </div>
    <div className={classes.howItWorks}>
      <HowItWorks />
    </div>
    <div className={classes.menu}>
      <Menu />
    </div>
    <div className={classes.rating}>
       <CustomerRating />
    </div>
    <div className={classes.about}>
      <About />
    </div>
    <div className={classes.commonQuestions}>
       <CommonQuestions />
    </div>
    <Subscribe className={classes.subscribe} />
    <Footer />
    </div>
  );
}

