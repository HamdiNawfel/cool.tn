import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
//icon
import FilterListIcon from '@material-ui/icons/FilterList';
//redux set up
import { connect } from 'react-redux';
import { setFilter } from '../../../redux/actions/dataAction'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    [theme.breakpoints.down('md')]: {
      display:'none'
    },
  },
  Mobileroot: {
   
    display:'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  selectStyle: {
    color:"#ffa400",
    borderColor:'#ffa400'
  },
  selectIconStyle : {
    color:"#ffa400",
    
  },
  iconHidden: {
    display:'none'
  }
}));
const categories = [
  { categorie: 'Tout'},
  { categorie: 'Viennoiseries'},
  { categorie: 'Délices Salés'},
  { categorie: 'Boulangerie'},
  { categorie: 'Boissons'},
];
 function Filter(props) {
  const classes = useStyles();
  const [ seleted, setSelected ] = useState('Tout')


  const handleClick = (categorie) => {
    setSelected(categorie)
    props.setFilter(categorie)
    setOpen(false)
  };
    //
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
  return (
    <div>
    <div className={classes.root}>
      {categories.map(value => 
        <Chip
        key={value.categorie}
        variant="outlined"
        size="small"
        label={value.categorie}
        onClick={()=>handleClick(value.categorie)}
        className={seleted === value.categorie?classes.selectStyle:null}
        icon={<DoneIcon className={seleted === value.categorie?classes.selectIconStyle:classes.iconHidden}/>}
      />
       )}
    </div>

       <div className={classes.Mobileroot}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <FilterListIcon fontSize="large" />
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {categories.map(value=><MenuItem 
                      key={value.categorie}
                      onClick={()=>handleClick(value.categorie)}>
                        {value.categorie}
                    </MenuItem>)}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionsToProps =   {
  setFilter
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Filter);