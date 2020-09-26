import React from 'react';
//Mui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//util
import InputText from '../../../utils/InputText'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display:'block',
    margin:20
  },
  paymentMethod:{
    display:'flex'
  },
  text:{
    fontWeight:600,
    marginTop:5,
  },
  form:{
    width: '60%',
    margin:'0 auto',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
    width: '100%',
      },
  },
   firstname:{
      width:'87%'
     
    },
    Lastname:{
      width:'90%',
      marginLeft:25,
      [theme.breakpoints.down('md')]: {
        marginLeft:14,
        },
    },
   inputText:{
    marginTop:10,
   },
}));

export default function Cach() {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
       <Grid className={classes.paymentMethod}>
        <Typography className={classes.text} color="textSecondary" component="h1" variant="h5">
        Paiement à la livraison
        </Typography>
       </Grid>
       <Grid >
       <form className={classes.form}>
              <Grid container>
              <Grid item xs={6}>
                <InputText 
                  error
                //   helperText={firstNameError}
                  type="text"
                  autoFocus
                  fullWidth
                  placeholder="Nom"
                  className={classes.firstName}
                //   value={firstName}
                //   onChange={(e)=>setFirstName(e.target.value)}                     
                />
              </Grid>
              <Grid item xs={6}>
                <InputText 
                  error
                //   helperText={lastNameError}
                  type="text"
                  fullWidth
                  placeholder="Prénon"
                  className={classes.Lastname}
                //   value={lastName}
                //   onChange={(e)=>setLastName(e.target.value)}
                  />
              </Grid>
            </Grid>
            <InputText 
              error
              // helperText={emailError}
              fullWidth
              placeholder="Télephone"
              className={classes.inputText}
            //   value={email}
            //   onChange={(e)=>setEmail(e.target.value)}
            />
             <InputText 
              error
              // helperText={emailError}
              fullWidth
              placeholder="Adresse de livraison"
              className={classes.inputText}
            //   value={email}
            //   onChange={(e)=>setEmail(e.target.value)}
            />
            <InputText 
              error
              // helperText={emailError}
              fullWidth
              placeholder="Email"
              className={classes.inputText}
            //   value={email}
            //   onChange={(e)=>setEmail(e.target.value)}
            />
            <InputText  
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              error
            //   helperText={passwordError}
              type="password"
              fullWidth
              placeholder="Mot de passe"
              className={classes.inputText}
            //   value={password}
            //   onChange={(e)=>setPassword(e.target.value)}  
            />
            <InputText  
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              error
            //   helperText={password2Error}
              type="password"
              fullWidth
              placeholder="Confirmer le mot de passe"
              className={classes.inputText}
            //   value={password2}
            //   onChange={(e)=>setPassword2(e.target.value)}
            />
            <Button variant="contained" className={classes.paypalBtn}>
              ENVOYER
            </Button>
          </form>
          </Grid>
      
    </Grid>
  );
}
