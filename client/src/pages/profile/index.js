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
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//utils
import Appbar from '../../utils/Appbar'
//componenst
import RecentOrder from './components/RecentOrder'

//redux set up
import { connect } from 'react-redux';
import { getUser, logoutUser } from '../../redux/actions/userAction'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:40,
        display:'flex',
        // padding:20,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: ' column-reverse',
          },
    },
    profile: {
      marginTop:40,
      [theme.breakpoints.down('sm')]:{
        maxWidth:360
     }
    },
    order: {
        marginTop:40,
        position:'relative',
        top:0,
        [theme.breakpoints.down('sm')]:{
            top:10,
            maxWidth:360,
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
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
       
    },
    avatar: {
       margin:'20px auto',
       width:100,
       height:100
    }, 
    userInfo: {
        margin:'20px 0',
        textAlign:'center'
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    logoutBtn: {
        margin:'20px 0',
    }
  }));
function Profile(props) {
  const classes = useStyles();
  useEffect(() => {
    props.getUser()
    
}, []);
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
                
                <RecentOrder />
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
                <Grid > 
                <Avatar 
                   src={props.user.credentials.imageUrl}
                   alt={props.user.credentials.firstName}
                   className={classes.avatar}/>
                    <Typography className={classes.userInfo}>
                        {props.user.credentials.firstName} {props.user.credentials.lastName}
                    </Typography>
                    <Typography className={classes.userInfo}>
                    {props.user.credentials.email}
                    </Typography>
                    <Typography className={classes.userInfo}>
                        USER_ID : {props.user.credentials._id}
                    </Typography>
                 <div className={classes.buttonContainer}>
                    <Button 
                        variant="contained" 
                        className={classes.logoutBtn} 
                        onClick={handleLogout}
                        >
                            Déconnecter
                        </Button>
                 </div>
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