import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  export default function InputText(props) {
    const classes = useStylesReddit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }
