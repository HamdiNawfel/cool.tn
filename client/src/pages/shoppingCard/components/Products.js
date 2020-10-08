import React from 'react';

//Mui
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


//Icons
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

//redux set up
import { connect } from 'react-redux';
import { addToCart, subQuantity } from '../../../redux/actions/dataAction'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    objectFit: 'cover',
    backgroundSize: '100% 100%',
    transition: 'all 0.5s ease',
    '&:hover': {
      transform : 'scale(1.1)'
   },
  },
  countContainer:{
    border: `1px solid ${theme.palette.divider}`,
    borderRadius:'25px',
    width:'100%',
    padding:'5px auto',
    [theme.breakpoints.up('md')]: {
      width:'50%',
    },
    [theme.breakpoints.down('sm')]: {
      width:'100%',
    },
    [theme.breakpoints.down('xs')]: {
      width:'100%',
    },
  },
  count:{
    textAlign:'center',
    padding:'0.3rem 0.3rem',
  },
  title:{
    fontWeight:600,
    textTransform:'uppercase',
  },
  price:{
    float:'right',
    fontWeight:600,
    color:'#ffa400',
    border: `1px solid #ffa400`,
    padding: 5,
    borderRadius:'5px',
  }
}));


function Products(props) {
  const classes = useStyles();
  const handleAddToCart = (id)=>{
    props.addToCart(id); 
  }
 const handleSubQuantity = (id)=>{
    props.subQuantity(id)
 }

  const productMakup = props.data.loading? !props.data.filter?props.data.products.map(item =>
    <Grid item key={item._id} xs={12} sm={4} md={3}>
                <Card className={classes.card} elevation={3}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.imageUrl}
                    title={item.name}
                  />
                  <div className={classes.description}>
                  </div>                  
                  <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                    <IconButton sise="small"onClick={()=>handleSubQuantity(item._id) } disabled={item.quantity === 0}>
                      <IndeterminateCheckBoxIcon fontSize="large" style={{opacity:0.5}}/>
                     </IconButton>
                    <div className={classes.countContainer}>
                      <Typography className={classes.count}>{item.quantity}</Typography>
                    </div>
                    <IconButton onClick={()=>handleAddToCart(item._id)}>
                       <AddBoxIcon fontSize="large" style={{color:'#ffa400'}}/>
                       </IconButton>
                  </CardActions>
                  <Grid container style={{padding:10}}>
                    <Grid item xs={8}>
                      <Typography className={classes.title}>
                      {item.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.price}>
                        {item.price}{' DT'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
    ): props.data.filtredProducts.map(item =>
      <Grid item key={item._id} xs={12} sm={6} md={3}>
                  <Card className={classes.card} elevation={3}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={item.imageUrl}
                      title={item.name}
                    />
                    <div className={classes.description}>
                    </div>                  
                    <CardActions style={{display:'flex', justifyContent:'space-between'}}>
                      <IconButton sise="small"onClick={()=>handleSubQuantity(item._id) } disabled={item.quantity === 0}>
                        <IndeterminateCheckBoxIcon fontSize="large" style={{opacity:0.5}}/>
                       </IconButton>
                      <div className={classes.countContainer}>
                        <Typography className={classes.count}>{item.quantity}</Typography>
                      </div>
                      <IconButton onClick={()=>handleAddToCart(item._id)}>
                         <AddBoxIcon fontSize="large" style={{color:'#ffa400'}}/>
                         </IconButton>
                    </CardActions>
                    <Grid container style={{padding:10}}>
                      <Grid item xs={8}>
                        <Typography className={classes.title}>
                        {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className={classes.price}>
                          {item.price}{' DT'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
      ):<CircularProgress style={{margin:'200px auto'}}/>
  return (
    <Grid container spacing={2} style={{marginTop:16 }}>
      {productMakup}
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  data: state.data
});

const mapActionsToProps =   {
  addToCart,
  subQuantity
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Products);