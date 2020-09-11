import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
//util
import ProductCard from './ProductCard'

//Icons
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';


//images
import img1 from '../assets/viennoiseries/croissant_full.png'
import img2 from '../assets/viennoiseries/escargot choc_full.jpg'
import img3 from '../assets/viennoiseries/mini croissant amande _full.png'
import img4 from '../assets/viennoiseries/mini pain choc praliné_full.png'
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
   
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    objectFit: 'cover',
    backgroundSize: '100% 100%'
  },
  cardContent: {
    flexGrow: 1,
  },
  countContainer:{
    border: `1px solid ${theme.palette.divider}`,
    borderRadius:'25px',
    width:'100%',
    padding:'5px auto',
    [theme.breakpoints.up('md')]: {
      width:'50%',
    },
    [theme.breakpoints.down('sm')]: {
      width:'100%',
    },
    [theme.breakpoints.down('xs')]: {
      width:'100%',
    },
  },
  count:{
    textAlign:'center',
    padding:'0.3rem 0.3rem',
  },
  title:{
    textAlign:'center',
    fontWeight:600,
  },
  details:{
    display:'flex'
  },
  description: {
    margin:'auto'
  },
  price:{
    float:'right',
    fontWeight:600,
    color:'#054a29'
  }
}));
const productsData = [
  {
    id:1,
    title:'PAIN AU LAIT FENDU',
    categorie:'viennoiserires',
    description:'avec chocolat',
    price:'2000',
    img:img1
  },
  {
    id:2,
    title:'PAIN AU LAIT FENDU',
    categorie:'viennoiserires',
    description:'avec chocolat',
    price:2,
    img:img2
  },
  {
    id:3,
    title:'PAIN AU LAIT FENDU',
    categorie:'viennoiserires',
    description:'avec chocolat',
    price:1.5,
    img:img3
  },
  {
    id:4,
    title:'PAIN AU LAIT FENDU',
    categorie:'viennoiserires',
    description:'avec chocolat',
    price:1.2,
    img:img4
  },
  {
    id:5,
    title:'PAIN AU LAIT FENDU',
    categorie:'viennoiserires',
    description:'avec chocolat',
    price:'2000',
    img:img1
  },
  {
    id:6,
    title:'PAIN AU LAIT FENDU',
    categorie:'viennoiserires',
    description:'avec chocolat',
    price:2,
    img:img2
  },
  {
    id:7,
    title:'PAIN AU LAIT FENDU',
    categorie:'viennoiserires',
    description:'avec chocolat',
    price:1.5,
    img:img3
  },
  {
    id:8,
    title:'PAIN AU LAIT FENDU',
    categorie:'viennoiserires',
    description:'avec chocolat',
    price:1.2,
    img:img4
  },
]
export default function Album() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  const addToBag = (item) => {
   setProducts(products => [...products, item]);
   console.log(products)
  }
  return (
    <React.Fragment>
      <main>
          <Grid container spacing={2} style={{marginTop:16}}>
            {productsData.map((item) => (
              <Grid item key={item.id} xs={6} sm={4} md={3}>
                <Card className={classes.card} elevation={3}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.img}
                    title={item.title}
                  />
                  <div className={classes.description}>
                  </div>                  
                  <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                    <IconButton sise="small">
                      <IndeterminateCheckBoxIcon fontSize="large" style={{opacity:0.5}}/>
                     </IconButton>
                    <div className={classes.countContainer}>
                      <Typography className={classes.count}>2</Typography>
                    </div>
                     <IconButton onClick={()=>addToBag(item)}>
                       <AddBoxIcon fontSize="large" style={{color:'#ffa400'}}/>
                     </IconButton>
                  </CardActions>
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.title} style={{textAlign:'center'}}>
                    {item.title}
                    </Typography>
                    <div className={classes.details}>
                    <Typography className={classes.description}>
                      {item.description}
                    </Typography>
                    <Typography className={classes.price}>
                      {item.price}{' DT'}
                    </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
       
      </main>
     
    </React.Fragment>
  );
}



