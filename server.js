require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
// paypal set up
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
//Load routes
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const subscriberRoutes = require("./routes/subscriber");
const userRoutes = require("./routes/user");


// Connect to MongoDB
  mongoose
  .connect('mongodb://localhost/breakfasty', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex:true
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
  });
//middleware setup


// upload file middlware -folder
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
// cors middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*',);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//paypal set up
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': `${process.env.PAYPAL_CLIENT_ID}`,
  'client_secret': `${process.env.PAYPAL_CLIENT_SECRET}`
});

//success route
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "50.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(payment.transactions[0].total);
        res.send('Success');
    }
});

});
app.get('/cancel', (req, res) => res.send('Cancelled'));
// Routes
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.use("/api", userRoutes);


// Production set up
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  }
// posrt

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Server running on port : ${port}`));