import React, { useEffect } from 'react'
//MUI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//utils
import Appbar from '../utils/Appbar'


//redux set up
import { connect } from 'react-redux';
import { getUser, logoutUser } from '../redux/actions/userAction'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:40,
        display:'flex',
        padding:20,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: ' column-reverse',
          },
    },
    profile: {
      marginTop:40,
    },
    order: {
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
        fontWeight:600,
    },
    userInfo: {
        margin:'20px auto'
    },
    logoutBtn: {
        margin:'20px auto'
    }
  }));
function Profile(props) {
  const classes = useStyles();
  const handleLogout = () => {
      props.logoutUser()
  }
    return (
    <div>
        <CssBaseline />
        <Appbar />
      <Grid container className={classes.root}>
        <Grid item sm={12} md={8}   className={classes.order}>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                VOS COMMANDES RECENTES
                </Typography>
                <Divider />
                
                
                </CardContent>
            </Card>
        </Grid>
        <Grid item sm={12} md={4}  className={classes.profile}>
            <Card className={classes.card} variant="outlined">
               
                <CardContent>
                <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                PROFILE
                </Typography>
                <Divider />
                <Grid>
                    <Typography className={classes.userInfo}>
                        HAMDI NAWFEL
                    </Typography>
                    <Typography className={classes.userInfo}>
                        email
                    </Typography>
                    <Typography className={classes.userInfo}>
                        USER_id 5DGSHIHCI56C6666Q6CCC
                    </Typography>
                    <Button 
                       variant="contained" 
                       className={classes.logoutBtn} 
                       onClick={handleLogout}
                       >
                           Déconnecter
                    </Button>
                </Grid>
            
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </div>
    )
}
const mapStateToProps = (state) => ({
   user: state.user
  });
  
  const mapActionsToProps = {
    getUser,
    logoutUser
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Profile);