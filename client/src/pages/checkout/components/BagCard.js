import React from 'react'
//Mui
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


//icons
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ClearIcon from '@material-ui/icons/Clear';
//images
import img1 from '../../product/assets/viennoiseries/croissant_full.png'


const useStyles = makeStyles((theme) => ({
    Card:{
    //  margin:5,
    //  padding:5
    },
    imageContainer:{
        // verticalAlign:'middle',
        display: 'block',
        // padding:'auto',
        verticalAlign:'center',
      
    },
    image: {
        width:50,
        padding:'10px auto',
       
    },
    textContainer:{
        padding:'5px 0',
        // margin:'0 20px'

    },
    title: {
      textTransform:'uppercase',
      fontWeight:600
    },
    description: {
      fontSize:13
    },
    removeButton:{
        float: 'right',
        padding:'30px 0',
        
    }
    
  }));
export default function BagCard(props) {
  const classes = useStyles();

    return (
        <Card className={classes.Card} elevation={0} key={props.id}>
        <Grid container>
            <Grid item xs={2}className={classes.imageContainer}>
              <img src={props.image} alt='meal'className={classes.image} />
            </Grid>
            <Grid item xs={8} className={classes.textContainer}>
                <Typography className={classes.title}>
                  x{props.quantity}
                </Typography>
                <Typography className={classes.title}>
                {props.title}
                </Typography>
                <Typography className={classes.description}>
                {props.description}
                
                </Typography>
            </Grid>
            <Grid item xs={2}className={classes.removeButton}>
                <Typography className={classes.title}>
               25 DT
                </Typography>
                
            </Grid>
        </Grid>
        </Card>
    )
}
