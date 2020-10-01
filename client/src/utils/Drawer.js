import React, { useEffect } from 'react';
// import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
//list
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//icon
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 250
  },
  root: {
    width: 250,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title:{
   paddingLeft:20,
   fontSize: 15,
   fontWeight:600,
  },
  closeIcon: {
    margin:8,
    float:'right',
    '&:hover': {
      color: fade('#cf7500', 1),
    },
  },
  hover: {
    '&:hover': {
      color: fade('#cf7500', 1),
    },
  }
}));

function NestedList(props) {
  const classes = useStyles();
  const [isAuthenticated, setyIsAuthenticated] = React.useState(false);
 
  useEffect(()=>{
    if(localStorage.length !== 0){
      setyIsAuthenticated(true)
    }
  },[]) 

  return (
    <List
      component="nav"
      aria-labelledby=""
      subheader={
        <CloseIcon  className={classes.closeIcon} onClick={props.close} />
      }
      className={classes.root}
    > <Link href='/shopping-card'color="inherit" underline="none">
      <ListItem button>
          <ListItemText primary="MENU" className={classes.hover}/>
      </ListItem>
      </Link>
      <ListItem button>
        <Link href='/'color="inherit" underline="none">
          <ListItemText primary="FOR BUSINESS" className={classes.hover}/>
        </Link>
      </ListItem>
      <ListItem button>
        <Link href='/'color="inherit" underline="none">
          <ListItemText primary="CONTACT" className={classes.hover}/>
        </Link>
      </ListItem>
      <ListItem button>
       {!isAuthenticated? <Link href='/login'color="inherit" underline="none">
          <ListItemText primary="CONNECTION" className={classes.hover}/>
        </Link>:
        <Link href='/profile'color="inherit" underline="none">
          <ListItemText primary="PROFILE" className={classes.hover}/>
        </Link>}
      </ListItem>
      
    </List>
  );
}
export default function SwipeableTemporaryDrawer() {
  
const [open, setOpen] = React.useState(false)
  const toggleDrawer  = (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open)
  };
const handleClose = () => {
  setOpen(false)
}
  
  return (
    <div  >
      <React.Fragment>
        <IconButton   style={{marginRight:50, color:'#000'}} onClick={toggleDrawer}>
          <MenuIcon  style={{color:"#fff",opacity:0.9}}/>
        </IconButton>
        <Drawer
              anchor='left'
              open={open}
            >
              <NestedList close={handleClose}/>
            </Drawer>
        </React.Fragment>
    </div>
  );
}