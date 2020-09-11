import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
//EXP
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// //Icons
import PhoneIcon from '@material-ui/icons/Phone';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
//
import DesktopMenu from './DesktopMenu'
import Drawer from './Drawer'
//redux
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        flexGrow: 1,
        backgroundColor:'#000'
      },
  grow: {
     flexGrow: 1,
     maxWidth: '100%',
     overflowX: 'hidden',
  },
  shippingInfo: {
    width:'100%',
    background:'#000',
    color:'#fff',
    textAlign:'center',
    padding:5,
    fontWeight:600,
    opacity:0.8
  },
  menuButton: {
     marginRight: theme.spacing(2),
  },
  title: {
   fontWeight:900,
   padding:'0 10px 0 10px',
   color:' #fff',
   backgroundColor:'#ffa400',
   marginLeft:-50,
   boxShadow: '0 0 40px #ffa400, 0 0 20px #ffa400, 0 0 60px #ffa400',
   [theme.breakpoints.up('md')]: {
    marginLeft:50,
  },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mainNav:{
      marginLeft: 20,
      cursor:'pointer',
  },
  link: {
      margin:'10px 0 0 30px',
      color:'#fff',
      fontWeight:600,
      opacity:0.9,
      fontSize:16
  },
  notDisplay: {
  //  display:'none',
  //  transition: 'display 5s'
  },
  display: {
    // display:'inline-block',
    // transition: 'display 5s'
   },
   expandIcon:{
    verticalAlign: 'middle',
    marginLeft:5,
    color:'#fff',
   },
   hover:{
    '&:hover': {
        color: fade('#ffa400', 1),
      },
   }
}));
//
function ControlledAccordions(props) {
    const classes = useStyles();
    
    return (
      <div className={props.expanded? classes.dispaly: classes.notDisplay}>
        
        <Accordion expanded={props.expanded}>
        <Collapse in={props.expanded} collapsedHeight={0}>
          <AccordionDetails>
            
           <DesktopMenu />
          </AccordionDetails>
          </Collapse>
        </Accordion>
       
      </div>
    );
  }
  //
function NavBar() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className={classes.grow}>
         <CssBaseline />
      
      <AppBar position="fixed" color="inherit" elevation={0} className={classes.appBar}>
      {/* <div className={classes.shippingInfo}>Livraison gratuite !</div> */}
        <Toolbar>
          {/* DRAWER */}
          <div className={classes.sectionMobile}>
            <Drawer />
          </div>
          <Typography className={classes.title} variant="h6">
            cool
          </Typography>
          <div className={classes.sectionDesktop}>
            <nav >
                <div className={classes.mainNav}>
                <Link 
                     onClick={()=>setExpanded(!expanded)}
                    variant="button" 
                    color="textPrimary" 
                    href="#" 
                    className={classes.link } 
                    style={{textDecoration:'none'}}>
                    Menus
                </Link>
                {!expanded? <ExpandMoreIcon onClick={()=>setExpanded(!expanded)} className={classes.expandIcon }/>:
                    <ExpandLessIcon onClick={()=>setExpanded(!expanded)} className={classes.expandIcon}/>
                    }
                </div>
                {/* <Link variant="button" color="textPrimary" href="#" className={classes.link} style={{textDecoration:'none'}}>
                    for Entreprise
                </Link> */}
               
            </nav>
          </div>
          <div className={classes.grow} />
          
          {/* <div >
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </div> */}
          <div style={{dispaly:'flex'}}>
          <Chip size="small"  icon={<PhoneIcon />} label="21 456 073"style={{margin:5, float:'right'}}/>
            <Chip size="small"  icon={<LocalShippingIcon />} label="Livraison gratuite !"style={{margin:5, float:'right'}}/>
          </div>
        </Toolbar>
       <div  >
          <ControlledAccordions expanded={expanded}/>  
       </div>
      </AppBar>
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionsToProps =   {
  
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(NavBar);