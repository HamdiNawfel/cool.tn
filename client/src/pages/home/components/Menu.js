import React from 'react';
import Link from '@material-ui/core/Link';

//Mui
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Util
import {ButtonContainer} from '../../../utils/Button';
import Title from '../../../utils/Title'

//image 
import backgoundMenu from '../assets/breakfast-1869132_1280.jpg'

import img1 from '../assets/cappuccino.jpg'
import img2 from '../assets/pizza.jpg'
import img3 from '../assets/hero-image.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 210,
    margin:'auto',
    [theme.breakpoints.down('sm')]: {
      width:180,
    },
    [theme.breakpoints.down('xs')]: {
      width:220,
    },
  },
  media: {
    height: 100,
  },
  backgroudImage: {
  width:'100%',
 },
 menu: {
  position:'relative',
  top:'-800px',
  left:'10%',
  textAlign:'start',
 display: 'inline-block',
 width:'70%',
 padding:'20px',
 backgroundColor:'#fff',
 
 [theme.breakpoints.down('md')]: {
   top:'-500px',
   width:'95%',
   left:'0',
 },
 [theme.breakpoints.down('xs')]: {
   top:'-100px',
   width:'80%',
   left:'0',
 }
 },
 description: {
   marginBottom:20
 },
 title: {
   textDecoration: 'none',
   fontWeight:900,
   textAlign:'center'
 }
}));
 function Item(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4} style={{marginBottom:10}}>
      
        <Card className={classes.root} onClick={()=>console.log(props.id)}>
            <CardMedia
              className={classes.media}
              image={props.img}
              // title={props.title}
            />
            <CardContent>
              <Link href="/products" style={{textDecoration:'none', color:'#ffa400'}}>
                <Typography className={classes.title}>
                  {props.title}
                </Typography>
              </Link>
            </CardContent>
        </Card>
      

    </Grid>
    
  );
}
const menus = [
  {
      id:1,
      title:"Viennoiseries",
      img:img1
  },
  {
    id:2,
    title:"Délices Salés & Pizza",
    img:img2
  },
  {
    id:3,
    title:"Boulangerie",
    img:img3
  }
]

export default function Menu() {
  const classes = useStyles();

  return (
    <div className={classes.menuSection}>
      <img src={backgoundMenu} className={classes.backgroudImage} alt="healthy"/>
      <div className={classes.menu}>
        <Title title="Notre Menu" />
        <Typography variant="body2" color="textSecondary" component="p"className={classes.description}>
        Nous proposons les meilleurs produits pour votre petit-déjeuner,
        </Typography>
        <Grid container className={classes.actions}> 
          {menus.map(item => <Item 
            key={item.id} 
            title={item.title} 
           
            img={item.img}
            id={item.id} />)}
        </Grid>
        <Link href="/products" style={{textDecoration:'none'}}>
          <ButtonContainer active style={{  
            display:'block',
            margin:'5px auto',
            textAlign:'center',
            marginTop:30}}>
              VOIR TOUT LES PRODUITS
          </ButtonContainer>
        </Link>
      </div>
    </div>
  )}