import React , { useState }from 'react'
import axios from 'axios';
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
//icons
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
//redux set up
import { connect } from 'react-redux';
import { addToCart, subQuantity, removeItem, clearAll} from '../../../redux/actions/dataAction'



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
        margin:5,
        width:'95%',
        color:'#ffa400',
        backgroundColor:'#fff',
        borderRadius:'2rem',
        border: `1px solid #ffa400`,
    },
    checkoutBtn:{
        padding:12,
        marginTop:15,
        marginBottom:15,
        margin:5,
        width:'95%',
        color:'#fff',
        backgroundColor:'#ffa400',
        '&:hover': {
            boxShadow: '0 0 10px #ffa400, 0 0 20px #ffa400, 0 0 60px #ffa400',
         },
        borderRadius:'2rem',
        border: `1px solid #ffa400`,
        textTransform:'uppercase',
        fontWeight:600,
        transition: '0.2s',
        outline: 'none',
        cursor:'pointer',
    },
    checkoutIcon:{
        verticalAlign:'sub',
        marginTop:5
    },
    inputText: {
        margin: 10,
        width:'93%',
        
    }
  }));
function Cart(props) {
  const classes = useStyles();
 const [visible, setVisible ] = useState(false);
 const [email, setEmail ] = useState('');
 const [phone, setPhone ] = useState('');
 const [location, setLocation ] = useState('');
 const [success, setSuccess ] = useState(false);
 const [sended, setSended ] = useState(false);

  const handleAddToCart = (id)=>{
    props.addToCart(id); 
  }
 const handleSubQuantity = (id)=>{
    props.subQuantity(id)
 }
 const handleRemoveItem = (id)=>{
    props.removeItem(id)
    console.log(email)
 }
 const handleClearAll = ()=>{
    props.clearAll()
 }
 const handleSubmit = (e) => {
    e.preventDefault();
   let orderData = {
        email,
        phone,
        location,
        cart:props.data.addedItems,
        total:props.data.total
    }
    axios.post("/api/order", orderData)
     .then(res =>setSuccess(true))
     .catch(err =>setSuccess(false))
    setEmail('');
    setPhone('');
    setLocation('');
    setSended(true);
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
        <button className={classes.checkoutBtn} onClick={()=>setVisible(true)} style={{display:`${visible?"none":"inline"}`}}>
            commander
        </button>
        <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
        <div>
            <form onSubmit={handleSubmit}>
                <InputText  
                   type="email"
                    autoFocus
                    required
                    placeholder="Entrer Votre Email..."
                    className={classes.inputText}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    
                />
                <InputText  
                    type="tel"
                    required
                    placeholder="Entrer Votre Télephone..."
                    className={classes.inputText}
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                />
                <InputText  
                    required
                    placeholder="Entrer Votre Adresse..."
                    className={classes.inputText}
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                />
           
                <button className={classes.checkoutBtn} type="submit">
                    Envoyer
                </button>
            </form>
        </div>
        </Slide>
        <Slide direction="up" in={sended} mountOnEnter unmountOnExit>
        {success?<Alert severity="success" onClose={handleClearAll}>
                <AlertTitle>Merci</AlertTitle>
                Votre commande a été envoyé avec<strong> succès</strong>
                </Alert>:
                <Alert severity="error">
                <AlertTitle>Désolé</AlertTitle>
                Veuillez vérifier votre connexion Internet et <strong>réessayer</strong>
            </Alert>}
        </Slide>
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
    data: state.data
  });
  
  const mapActionsToProps =   {
    addToCart,
    subQuantity,
    removeItem,
    clearAll
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(Cart);