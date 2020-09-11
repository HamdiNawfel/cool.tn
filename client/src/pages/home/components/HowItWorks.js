import React from 'react'
//Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
//utils
import Title from '../../../utils/Title'
//Images
import img1 from '../assets/meals.svg';
import img2 from '../assets/delevery.svg';
import img3 from '../assets/eating.svg';
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
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    media: {
      height: 150,
      margin:'auto',
     
      width:200,
      objectFit: 'cover',
      backgroundSize: '140px 140px'
    },
    title:{
      fontWeight: 600,
      opacity:'0.95',
     textAlign:'center',
    
    },
    description:{
      fontSize:'1.2em',
    }
  }));
  function Item(props) {
    const classes = useStyles();
    return (
        <Grid item  xs={12} md={4}  style={{ margin: '40px 0 80px 0'}}>
            <Card className={classes.card} variant="outlined">
                <CardMedia
                  className={classes.media}
                  image={props.img}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                  {props.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p"className={classes.description}>
                  {props.description}
                  </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
//end item
const services = [
    {
        id:1,
        title:"CHOISISSEZ VOS REPAS",
        description:"30+ produits pour votre petit-déjeuner.",
        img:img1
    },
    {
        id:2,
        title:"NOUS CUISINONS & LIVRONS",
        description:"Préparé par des chefs et envoyé frais..",
        img:img2
    },
    {
        id:3,
        title:"MANGER & RÉPÉTER",
        description:"Commander facillement, annulez à tout moment.",
        img:img3
    },
]

export default function HowItWorks() {
    return (
        
        <Grid>
        <Title title="Comment Ça Marche?" />
        <Grid container>
            {services.map(item => <Item key={item.id} title={item.title} description={item.description} img={item.img}/>)}
        </Grid>
    </Grid>
    )
}
