import React from 'react';
import GoogleLogin from 'react-google-login';

//mui
import { makeStyles } from '@material-ui/core/styles';
//set up redux
import { connect } from 'react-redux';
import { authUser } from '../../../redux/actions/userAction';
const useStyles = makeStyles((theme) => ({
    loginButton: {
        width:'100%',
        margin:'10px 0',
        backgroundColor:'#000'
        
      }
  }));

  const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
function LoginWithGoogle(props) {
    const classes = useStyles();
    const responseGoogle = (res) => {
         const userData = {
           firstName: res.profileObj.givenName,
           lastName: res.profileObj.familyName,
           email: res.profileObj.email,
           imageUrl : res.profileObj.imageUrl
         }
        props.authUser(userData);
        
      }
    
    return (
         <GoogleLogin
            clientId={REACT_APP_GOOGLE_CLIENT_ID}
            className={classes.loginButton}
            buttonText="Se connecter avec Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
const mapActionsToProps = {
 authUser
};
export default connect(
  null,
  mapActionsToProps
)(LoginWithGoogle);