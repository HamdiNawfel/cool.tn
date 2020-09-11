const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config()

const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const subscriberRoutes = require("./routes/subscriber");

// Connect to MongoDB
  mongoose
  .connect(process.env.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex:true
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// upload file middlware -folder
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
const cors = require('cors');
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/subscriber", subscriberRoutes);



//
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  }

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Server running on port : ${port}`));