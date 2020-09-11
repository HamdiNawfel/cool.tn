
import React from 'react'
//Mui
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//utils
import Title from '../../../utils/Title'

//Start Item
const useStyles = makeStyles(theme => ({
    cardGrid: {
      padding: theme.spacing(2),
      
    },
    card: {
     display:'flex',
     margin:'0 auto',
      height: '100%',
      textAlign:'center',
      flexDirection: 'column',
      maxWidth:300,
    },
    title:{
      fontWeight: 600,
      opacity:'0.95',
     textAlign:'center',
     marginBottom:20
    },
    description:{
      fontSize:'1.2em',
    },
    customer: {
       
        fontWeight:600
    }
  }));
  function Item(props) {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
    return (
        <Grid item  xs={12} md={4}  style={{ margin: '20px 0'}}>
            <Grid className={classes.card} variant="outlined">
            <Rating name="half-rating-read" defaultValue={5} readOnly style={{
            margin:'0 auto',
           }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                  {props.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p"className={classes.description}>
                  {props.description}
                  </Typography>
                </CardContent>
                <Link href="#" onClick={preventDefault} color="inherit"className={classes.customer}>
                 {'@'} {props.customer} via {props.source}
                </Link>
            </Grid>
        </Grid>
    )
}
//end item
const services = [
    {
        id:1,
        title:"Delicious! So yummy!",
        description:"Nous aimons cool car il faut deux minutes à préparer, la nourriture est excellente et nous n'avons pas à passer du temps à nettoyer.",
        customer:"NABIL",
        link:"#",
        source:"Facebook"
    },
    {
        id:2,
        title:"Amazing",
        description:"Je suis abonné à cool depuis environ un mois maintenant et j'adore! Leurs options de menu sont excellentes et tout ce que j'ai essayé est si bon.",
        customer:"RAMI",
        link:"#",
        source:"Instagram"
    },
    {
        id:3,
        title:"10 stars! Awesome! Love it!",
        description:"Avec cool, je n’ai pas à penser à ce que je vais manger au déjeuner chaque jour et je me sens bien en sachant que je mange un repas sain",
        customer:"ANIS",
        link:"#",
        source:"TikTok"
    },
]

export default function CustomerRating() {
    return (
        
        <Grid>
        <Title title="Qu'est-ce que disent les autres?" />
        <Grid container style={{marginTop:40}}>
            {services.map(item => <Item 
            key={item.id} 
            title={item.title}
            description={item.description}
             img={item.img}
             source={item.source}
             customer={item.customer}/>)}
        </Grid>
    </Grid>
    )
}
