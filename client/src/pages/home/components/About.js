import React from 'react';
//Mui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//
import Title from '../../../utils/Title'
//image 
import fruit from '../assets/fruit.jpg'

const useStyles = makeStyles((theme) => ({

 aboutSection: {
  textAlign:'center', 
  marginTop:'-100px',
  [theme.breakpoints.up('md')]: {
    marginTop:'-480px'
  },
 },
 about: {
  position:'relative',
  top:'-780px',
  left:'0px',
  textAlign:'start',
  display: 'inline-block',
 width:'60%',
 padding:'40px',
 backgroundColor:'#fff',

 [theme.breakpoints.down('md')]: {
   top:'-350px',
   width:'90%',
   left:'0',
 },
 [theme.breakpoints.down('sm')]: {
  top:'-200px',
  width:'90%',
  left:'0',
},
 [theme.breakpoints.down('xs')]: {
   top:'-100px',
   width:'80%',
   left:'0',
   margin:'auto'
 }
 },
 description: {
   marginBottom:20
 }
}));


export default function Menu() {
  const classes = useStyles();

  return (
    <div className={classes.aboutSection}id="tag">
      <img src={fruit} style={{width:'100%', height:'auto'}} alt="break fasty"/>
      <div className={classes.about}>
        <Title title="Nos Services" />
        <Typography variant="body2" color="textSecondary" component="p"className={classes.description}>
        Le petit-déjeuner d’entreprises est aujourd’hui un des nombreux ingrédients du bien-être au travail.
         cool Service a été le précurseur en proposant, dès 2020,
         un service exclusivement dédié à la livraison de petits-déjeuners,
         lunch et pauses gourmandes sur NABEUL.
        </Typography>
        <Title title="Livraison" />
        <Typography variant="body2" color="textSecondary" component="p"className={classes.description}>
           Notre service de livraison disponible maintenant dans NABEUL et prochenement en TUNIS.
        </Typography>
        <Title title="Paiement" />
        <Typography variant="body2" color="textSecondary" component="p"className={classes.description}>
        Le paiement se fait en espèces à la livraison.
        </Typography>
        {/* <img src={ creditCard } style={{ height:200}} /> */}
        {/* <ButtonContainer active style={{  
          margin:'5px auto',
          marginTop:30}}>
            Learn More
        </ButtonContainer> */}
      </div>
    </div>
  )}