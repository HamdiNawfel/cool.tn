import React , { useState }from 'react'
import axios from 'axios';
import moment from 'moment'
//Mui
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Alert, AlertTitle } from '@material-ui/lab';
//util
import InputText from '../../../utils/InputText'
//components
import ShippingDate from './ShippingDate';
//icons
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
//redux set up
import { connect } from 'react-redux';
import { addToCart, subQuantity, removeItem, clearAll} from '../../../redux/actions/dataAction'
import { nextStep } from '../../../redux/actions/uiAction'

const useStyles = makeStyles((theme) => ({
    Card:{
     margin:5,
     padding:5,
     paddinTop:60
    },
    imageContainer:{
        // verticalAlign:'middle',
        display: 'block',
        padding:'auto',
        verticalAlign:'center',
      
    },
    image: {
        width:50,
        padding:'20px 0',
       
    },
    quatity:{
        textAlign:'center'
    },
    textContainer:{
        padding:'20px 0',
        margin:'auto'

    },
    title: {
      textTransform:'uppercase',
      fontWeight:600,
      fontSize:13
    },
    removeButton:{
       padding:'30px 0'
    },
    clearAllBtn:{
       marginLeft:180
    },
    total: {
        padding:10,
        marginTop:20,
        marginBottom:20,
        margin:5,
        width:'95%',
        backgroundColor:'#fff',
        borderRadius:'2rem',
        border: `1px solid #ffa400`,
    },
    nextBtn:{
        padding:12,
        marginTop:15,
        marginBottom:15,
        margin:5,
        width:'95%',
        color:'#fff',
        backgroundColor:'#ffa400',
        borderRadius:'2rem',
        border: `1px solid #ffa400`,
        textTransform:'uppercase',
        fontWeight:600,
        transition: '0.2s',
        outline: 'none',
        cursor:'pointer',
    },
    desabledBtn:{
      opacity:0.3,
      padding:12,
        marginTop:15,
        marginBottom:15,
        margin:5,
        width:'95%',
        color:'#fff',
        backgroundColor:'#ffa400',
        borderRadius:'2rem',
        border: `1px solid #ffa400`,
        textTransform:'uppercase',
        fontWeight:600,
        transition: '0.2s',
        outline: 'none',
       
    },
    checkoutIcon:{
        verticalAlign:'sub',
        marginTop:5
    },
    date:{
        width:'95%',
        backgroundColor:'#fff',
        padding:10,
        border: `1px solid #ffa400`,
        borderRadius:'2rem',
        margin:5,
    }
  }));
function Cart(props) {
  const classes = useStyles();

  const handleAddToCart = (id)=>{
    props.addToCart(id); 
  }
 const handleSubQuantity = (id)=>{
    props.subQuantity(id)
 }
 const handleRemoveItem = (id)=>{
    props.removeItem(id)
 }
 const handleClearAll = ()=>{
    props.clearAll()
 }

 const handleNextStep = () => {
     props.nextStep();
     if(props.drawer){
         props.drawer();
     }
 }
  
  const { addedItems} = props.data
  const cartMarkup = addedItems.length > 0? 
  <div>
      <Button size="small" className={classes.clearAllBtn} onClick={handleClearAll}>
          Supprimer tout
        </Button>
      {
          addedItems.map(item => 
            <Card className={classes.Card} elevation={3} key={item._id}>
                <Grid container>
                    <Grid item>
                        <IconButton size="small" onClick={()=>handleAddToCart(item._id)}>
                            <AddIcon style={{color:'#ffa400'}}/>
                        </IconButton>
                        <Typography className={classes.quatity} color="textSecondary">
                            {item.quantity}
                        </Typography>
                        <IconButton size="small" onClick={()=>handleSubQuantity(item._id)}>
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                    <Grid item className={classes.imageContainer}>
                        <img src={item.imageUrl} alt='meal'className={classes.image} />
                    </Grid>
                    <Grid item className={classes.textContainer}>
                        <Typography className={classes.title}>
                            {item.title}
                        </Typography>
                      
                    </Grid>
                    <Grid item  className={classes.removeButton}>
                        <IconButton size="small" onClick={()=>handleRemoveItem(item._id)}>
                                <ClearIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
           )
      }
      {/* <Divider style={{marginTop:20}}/> */}
        
        <Grid container className={classes.total}>
            <Grid item xs={6}>
                <Typography style={{textTransform:'uppercase',fontWeight:600, textAlign:'start'}}>
                Total : 
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography style={{textTransform:'uppercase',fontWeight:600, textAlign:'end'}}>
                {props.data.total} DT
                </Typography>
            </Grid>
        </Grid>
        {props.shop.shippingDate !==''?<Grid container className={classes.date}>
            <Grid item xs={3}>
               <Typography style={{textTransform:'uppercase',fontWeight:'600', textAlign:'start'}}>
               Délivré: 
                </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography style={{textTransform:'uppercase',fontWeight:'600', textAlign:'end'}}>
            {moment(props.shop.shippingDate).calendar()}
                </Typography>
            
            </Grid>
        </Grid>:null}
        <button 
           className={props.ui.uiStep==='shipping' && props.shop.shippingDate ===''?classes.desabledBtn: classes.nextBtn}
           disabled={props.ui.uiStep==='shipping' && props.shop.shippingDate ===''} 
           onClick={()=>handleNextStep()}>
          continuer
        </button>
  </div>:<Typography style={{fontWeight:600, margin:'100px auto',textAlign:'center'}}>
    Votre pannier est vide!
  </Typography>
    return (
        <div>
            {cartMarkup}     
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.data,
    ui : state.ui,
    shop: state.shop
  });
  
  const mapActionsToProps =   {
    addToCart,
    subQuantity,
    removeItem,
    clearAll,
    nextStep
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Cart);