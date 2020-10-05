import React from 'react';
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@material-ui/icons/Facebook';
//set up redux
import { connect } from 'react-redux';
import { authUser } from '../../../redux/actions/userAction';

const REACT_APP_FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID
function LoginWithFacebook(props) {
    const responseFacebook = (res) => {

        const userData = {
            firstName: res.name.split(' ')[0],
            lastName: res.name.split(' ')[1],
            email: res.email,
            imageUrl : res.picture.data.url
          }
         props.authUser(userData);
      }
     
    return (
        <FacebookLogin
        size={"medium"}
        textButton={"Se connecter avec Facebook"}
        cssClass="btnFacebook"
        icon={<FacebookIcon style={{marginRight:20,verticalAlign:"middle"}} />}
        appId={REACT_APP_FACEBOOK_APP_ID}
        // autoLoad={true} REACT_APP_FACEBOOK_APP_ID
        fields="email, name, picture"
        // onClick={componentClicked}
        callback={responseFacebook} />
    )
}
const mapActionsToProps = {
    authUser
   };
   export default connect(
     null,
     mapActionsToProps
   )(LoginWithFacebook);