import React , { useState }from 'react'
import axios from 'axios';
//MUI
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { ButtonContainer } from '../../../utils/Button';


const useStyles = makeStyles((theme) => ({
  subsribe:{
    width:'25%',
    minWidth:230,
    top:90,
    backgroundColor:'#fff',
    padding:30,
    position:'relative',
    left:'70%',
    border: `1px solid #ffa400`,
    [theme.breakpoints.down('xs')]: {
      top:'50px',
      width:'100%',
      left:0,
      marginBottom:50,
      border: `0px solid #ffa400`,
      
    },
  },
  callToAction:{
    fontSize:15,
    fontWeight:900,
    marginBottom:10,
    color:'#2a2a72'
  },
  social: {
    margin:'0 auto',
    marginTop:10
  }
}));

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
export default function Subscribe() {
  const [email , setEmail ] = useState('');
  const handleSubsribe = (e) =>{
     e.preventDefault();
    const subscribeData = {
      email
    }
     axios.post('/api/subscriber', subscribeData);
     setEmail('')
    
  }
    const classes = useStyles();
    return (
      <Grid  container className={classes.subsribe}>
         <Grid> 
         <Typography className={classes.callToAction}>
         Subscribe à notre newsletter GRATUIT
         </Typography>
                <form onSubmit={handleSubsribe}>
                 <RedditTextField
                    style={{margin:'10px auto', width:'100%'}}
                    placeholder="Email..."
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <ButtonContainer active type="submit"style={{  
                    display:'block',
                    margin:'5px auto',
                    textAlign:'center',
                    marginTop:20}}>
                      SUBSRIBE
                  </ButtonContainer>
                </form>
               
            </Grid>
           </Grid>
    )
}
