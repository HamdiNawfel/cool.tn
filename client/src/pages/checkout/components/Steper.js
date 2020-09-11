import React, { useState, useEffect} from 'react';
import {  fade, makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//component
import DatePicker from './DatePicker'
import Payment from './Payment'
// import Map from './Map'
//Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from '../assets/new-google-favicon-512.webp'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  loginContainer: {
    margin:'20px auto'
  },
  loginButton: {
    width:'100%',
    margin:'10px 0'
  },
  loginInput: {
    width:'100%',
    marginBottom:10
  },
  adressContainer: {
    width:'60%',
    [theme.breakpoints.down('sm')]:{
      width:'100%'
    }
  }
}));
//form
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


export default function VerticalLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-08-18T06:00:00'));

  const customerData = {}
  const handleDateChange = (date) => {
    setSelectedDate(date);
    
  };
  
  useEffect(() => {
   console.log(selectedDate)
   console.log(email)
  },[selectedDate],[email]);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
   const customerData = {
        email,
        password
    }
      console.log(customerData)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setEmail('')
      setPassword('')
  }
  const handleSubmitDate = () => {
   
   
      console.log('date')
    //   console.log(selectedDate)
      
  }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {/* step 1: auth */}
          <Step>
            <StepLabel>Se connecter</StepLabel>
            <StepContent>
            <form onSubmit={handleSubmit}>
                <Grid container className={classes.loginContainer}>
                    <Grid item xs={12} sm={5}>
                            <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="primary"
                            startIcon={<FacebookIcon />}
                        >
                        VIA FACEBOOK
                        </Button>
                    </Grid>
                    <Grid item sm={2} />
                    <Grid item xs={12} sm={5}>
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="default"
                            startIcon={<img src={GoogleIcon} style={{width:25}} alt="google" />}
                        >
                        VIA GOOGLE
                        </Button>
                    </Grid>
                </Grid>
                <Grid container style={{margin:'30px 0'}}>
                    <Grid item xs={2} sm={5} style={{marginTop:8}}>
                        <Divider />
                    </Grid>
                    <Grid item xs={8}sm={2}>
                       <Typography style={{verticalAlign:'top', textAlign:'center'}}>OR</Typography>
                    </Grid>
                    <Grid item xs={2} sm={5} style={{marginTop:8}}>
                      <Divider />
                    </Grid>
                </Grid>
                <Grid container style={{margin:'10px auto'}}>
                    <Grid item xs={12}sm={5}>
                        <RedditTextField
                            className={classes.loginInput}
                            placeholder="Email..."
                            id="email"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                    </Grid>
                    <Grid item sm = {2}/>
                    <Grid item xs={12} sm={5}>
                        <RedditTextField
                            className={classes.loginInput}
                            placeholder="Mots de passe..."
                            id="password"
                        />
                        
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
            <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    {activeStep === 4 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
          {/* step2 : date de livraison*/}
          <Step>
            <StepLabel>Date de livraison</StepLabel>
            <StepContent>
            <DatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} handleSubmitDate={handleSubmitDate} />
            <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === 4 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
          {/* step 3 : shipping*/}
          <Step>
            <StepLabel>Adresse de livraison</StepLabel>
            <StepContent>
            <div className={classes.adressContainer}>
              <RedditTextField
                            className={classes.loginInput}
                            placeholder="Adresse de livraison..."
                            id="adress"
                        />
		       	</div>
            <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === 4 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
           {/* step 4 : payment*/}
           <Step>
            <StepLabel>Methode de paiement</StepLabel>
            <StepContent>
                <Payment />
            <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === 3 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
          {/* finish*/}
        
      </Stepper>
      {activeStep === 4 && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}