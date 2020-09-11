import React from 'react';
import {  fade, makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
//Icons
import visacardIcon from '../assets/visacardIcon.svg'
import mastercardIcon from '../assets/mastercard.svg'
import discoverIcon from '../assets/discovericon.svg'
const useStyles = makeStyles((theme) => ({
    creditCartContainer: {
        marginTop:20,
        
    },
    creditCartDetail: {
        width:'60%',
        [theme.breakpoints.down('md')]: {
            width:'100%',
          },
    },
    creditCartNumber: {
        width:'100%',
    },
    title: {
        margin:'10px 0'
    }
  }));
//input text begin
const useStylesReddit = makeStyles((theme) => ({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      padding:6,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade('#ffa400', 0.25)} 0 0 0 2px`,
        borderColor: '#ffa400',
        
      },
    },
    focused: {},
  }));
  function RedditTextField(props) {
    const classes = useStylesReddit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

export default function CheckboxLabels() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    cashMethod: false,
    creditCardMethod: false,
   
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(state.cashMethod)
  };
//end input text
  return (
    <FormGroup row>
        <Grid container>
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                    <Checkbox 
                        checked={state.cashMethod}
                        onChange={handleChange}
                        name="cashMethod"
                        color="primary" />}
                        label="Comptant à la livraison"
                        disabled={state.creditCardMethod}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.creditCardMethod}
                                onChange={handleChange}
                                name="creditCardMethod"
                                color="primary"
                                disabled={state.cashMethod}
                            />
                            }
                            label="Par carte bancaire"
                        />
                    </Grid>
                    <Grid item style={{marginTop:10}}>
                        <img src={visacardIcon} style={{width:35,verticalAlign:'middle', marginLeft:5}} alt="google" />
                        <img src={mastercardIcon} style={{width:35,verticalAlign:'middle', marginLeft:5}} alt="google" />
                        <img src={discoverIcon} style={{width:35,verticalAlign:'middle', marginLeft:5}} alt="google" />
                    </Grid>
                </Grid>
            </Grid>
            {state.creditCardMethod ? <Grid item xs={12} className={classes.creditCartContainer}>
                <Divider />
                <Grid container className={classes.creditCartDetail}>
                    <Grid item xs={12}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Credit Card Number
                        </Typography>
                        <RedditTextField
                                className={classes.creditCartNumber}
                                placeholder="1234 1234 1234 1234"
                                id="creditCartNumber"
                                
                                // value={email}
                                // onChange={handleChangeEmail}
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          Expiration
                        </Typography>
                        <RedditTextField
                                    className={classes.loginInput}
                                    placeholder="MM / AA"
                                    id="expirationDate"
                                    // value={email}
                                    // onChange={handleChangeEmail}
                                />
                    </Grid>
                    <Grid item xs={6}>
                       <Typography className={classes.title} color="textSecondary" gutterBottom style={{marginLeft:10}}>
                            CVC
                        </Typography>
                        <RedditTextField
                                    className={classes.loginInput}
                                    placeholder="CVC"
                                    style={{marginLeft:10}}
                                    id="cvc"
                                    // value={email}
                                    // onChange={handleChangeEmail}
                                />
                    </Grid>
                </Grid>
            </Grid>: null}
        </Grid>
    </FormGroup>
  );
}