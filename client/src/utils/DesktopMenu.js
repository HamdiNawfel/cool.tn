import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  menuContainer: {
    // marginTop: theme.spacing(0),
    // paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  title: {
   fontSize: 15,
   fontWeight:600,
  },
  titleBackground:{
    backgroundColor:'#ffa400',
    color:'#2a2a72',
    padding:5
  },
  item: {
    fontSize: 12,
    '&:hover': {
        color: fade('#cf7500', 1),
      },
  },
  
}));


const menus = [
  {
    categorie: 'VIENNOISERIES',
    products: [
        'PAIN AU LAIT FENDU',
        'CROISSANT AUX AMANDES',
        'PAIN AUX RAISINS',
        'PAIN AU CHOCOLAT',
        'CROISSANT AU BEURRE']
  },
  {
    categorie: 'BOULANGERIE',
    products: [
        'PAIN CAMPAGNE ',
        'PAIN MI BLANC',
        'PAIN MULTI CÉRÉALE',
        'MINI BAGUETTE FARINÉE',
        'PAIN TESSINOIS',
    ]
  },
  {
    categorie: 'DÉLICES SALÉS',
    products: [
        'QUICHE LORRAINE (13 CM)',
        'QUICHE POIREAUX (13 CM)',
        'QUICHE ÉPINARDS SAUMON (13 CM)',
        'VIENNE EN CAGE',
        'PTIT RAMEQUIN FROMAGE (9 CM)',
        'CROISSANT JAMBON'
    ]
  },
  {
    categorie: 'BOISSONS FRAÎCHES',
    products: [
        'JUS ORANGE ABRICOT PÊCHE (33CL)',
        'CHOCOLAT FROID CHOKY (25CL)',
        'JUS MULTI VITAMINE GRANINI (33CL)',
        'JUS DE FRAISE (25CL)',
        'JUS ORANGE GRANINI (33CL)'
    ]
  }
];

export default function Menu() {
  const classes = useStyles();

  return ( 
    <Container  className={classes.menuContainer} >
        <Grid container spacing={0} justify="space-evenly">
          {menus.map((item) => (
            <Grid item xs={12} sm={3} key={item.categorie}>
              <Typography variant="h6" color="textPrimary" gutterBottom className={classes.title}>
                <span className={classes.titleBackground}>{item.categorie}</span>
              </Typography>
              <ul>
                {item.products.map((item) => (
                  <li key={item}>
                    <Link href="/products" variant="subtitle1" color="textSecondary" className={classes.item}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
  );
}