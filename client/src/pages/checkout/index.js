import React, { useEffect } from 'react'
//MUI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//components
// import BagCard from './components/BagCard';
import Steper from './components/Steper';

//redux set up
import { connect } from 'react-redux';
// import { getCheckoutCard } from '../../redux/actions/dataAction'
const useStyles = makeStyles((theme) => ({
    appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    
    },
    logo: {
       fontWeight:900,
       marginLeft:50,
       [theme.breakpoints.down('md')]: {
        marginLeft:5,
      },
    },
    container: {
        marginTop:50,
        // padding:10,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: ' column-reverse',
          },
    },
    orderSummary: {
      marginTop:40,
      
    },
    checkout: {
        marginTop:40,
        position:'relative',
        top:0,
        [theme.breakpoints.down('sm')]:{
            top:-80,
            marginTop:0,
        }
    },
    card: {
        margin:5,
        
    },
    title: {
        textAlign:'center',
        fontWeight:600
    }
  }));
function Checkout(props) {
  const classes = useStyles();
  useEffect(()=>{
    // props.getCheckoutCard()
  },[])
    return (
    <div>
        <CssBaseline />
      <AppBar position="fixed" color="inherit" elevation={0} className={classes.appBar}>
        <Toolbar>
         <Link href="/" style={{color:'inherit', textDecoration:'none'}} >
          <Typography className={classes.logo} variant="h6">
            BreakFasty
          </Typography>
         </Link>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.container}>
        <Grid item sm={12} md={8}   className={classes.checkout}>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                CHECKOUT
                </Typography>
                <Divider />
                
                <Steper />
                </CardContent>
            </Card>
        </Grid>
        <Grid item sm={12} md={4}  className={classes.orderSummary}>
            <Card className={classes.card} variant="outlined">
               
                <CardContent>
                <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                ORDER SUMMARY
                </Typography>
                <Divider />
                {/* {props.data.card.length >0 ? props.data.card.map(item =><BagCard quantity={item.quantity}
                title={item.title} description={item.description}image={item.image}
                />):null} */}
                <Divider />
                <Grid container>
                    <Grid item xs={10}>
                        <Typography >
                            SUBTOTAL 
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography >
                            25 DT 
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography >
                          SHIPPING
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography >
                            -- 
                        </Typography>
                    </Grid>
                </Grid>
               
                <Divider />
                <Grid container>
                    <Grid item xs={10}>
                        <button onClick={()=>console.log(props.data.card)}>
                           test
                        </button>
                        <Typography >
                        TOTAL
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography >
                            50 DT
                        </Typography>
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </div>
    )
}
const mapStateToProps = (state) => ({
    data: state.data
  });
  
  const mapActionsToProps = {
    // getCheckoutCard
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Checkout);