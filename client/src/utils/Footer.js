import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{marginBottom:20}}>
      {'Copyright © '}
      <Link color="inherit" href="https://modest-wright-77b253.netlify.app/">
        nawfel-hamdi.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',

    borderTop: `1px solid  #ffa400`,
    
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
       paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      display:'flex',
      justifyContent: 'center',
      marginTop:'40px',
    },
  },
  title: {
   fontSize: 15,
   fontWeight:600,
  },
  item: {
    fontSize: 12,
    textDecoration:'none',
    color:'inherit',
    '&:hover': {
      color: '#ffa400',
   },
    
  },
  social:{
    align:'center',
    
  }
}));


const footers = [
  {
    title: 'COMPANY',
    description: ['OUR STORY', 'LOCATION', 'CONTACT US', 'PRIVACY'],
  },
  {
    title: 'LEARN MORE',
    description: ['PLANS & MENU', 'WHY PETITDEJ?', 'FAQs', 'BLOG'],
  },
  {
    title: 'JOIN US',
    description: [],
  },
  
];

export default function Footer() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" component="footer" >
        <Grid container spacing={1} justify="space-evenly"className={classes.footer}>
          {footers.map((footer) => (
            <Grid item xs={4} sm={4} key={footer.title} >
              <Typography variant="h6" color="textPrimary" gutterBottom className={classes.title}>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.length !== 0?(
                 <Grid>
                   {footer.description.map((item) => (
                    <li key={item}>
                      <a href="/"  className={classes.item}>
                        {item}
                      </a>
                    </li>
                  ))}
                 </Grid>
                ):(<div className={classes.social}>
                  <a href="https://www.facebook.com/Breakfasty.tn" target="blank"className={classes.item}>
                    <FacebookIcon style={{margin:5}}/>
                  </a>
                  <a href="https://www.facebook.com/Breakfasty.tn" target="blank"className={classes.item}>
                    <InstagramIcon style={{margin:5}}/>
                  </a>
                 </div>) }
              </ul>
            </Grid>
          ))}
        
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
  );
}