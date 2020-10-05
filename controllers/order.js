const Order = require("../models/order");
const User = require("../models/user");
const validateCheckout = require("../validation/order");
require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const paypal = require('paypal-rest-sdk');

/**********************************************************************
            Request method  :  POST
            Route           :  /api/order
            Description     :  ADD ORDER
**************************************************************************/
exports.createOrder = (req, res, next) => {
   
    const customer_id = req.body.customer_id;
    const email = req.body.email;
    const phone = req.body.phone;
    const shipping_address = req.body.shipping_address;
    const cart = req.body.cart;
    const total = req.body.total;
   
    const newOrder = new Order({
      customer_id,
      email,
      phone,
      shipping_address,
      cart,
      total,
    });
    newOrder.save()
     .then((result) => {
      User.findOne({ _id: result.customer_id }, (err, customer) => {
          if (customer) {
              // The below two lines will add the newly saved review's 
              // ObjectID to the the Author's reviews array field
              customer.orders.push(result);
              customer.save();
              res.json({ message: 'Order created!' });
          }
      });
    })
    
    .catch((error) => {
      res.status(500).json({ error });
    });
  };

/**********************************************************************
            Request method  :  POST
            Route           :  /api/order/pay
            Description     :  PAYMENT WITH PAYPAL METHOD
**************************************************************************/

exports.postPaypal = (req, res, next) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/shopping-card",
        "cancel_url": "http://localhost:3000/"
    },
    "transactions": [{
        "item_list": {
            "items": req.body.items
        },
        "amount": {
            "currency": "USD",
            "total": req.body.items[0].price
        },
        "description": "Hat for the best team ever"
    }]
};
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log(req.body.items[0].price)
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.json({forwardLink: payment.links[i].href});
          }
        }
    }
  });
}

/**********************************************************************
            Request method  :  get
            Route           :  /api/order/success
            Description     :  a callback returned by paypal when the payment is successful
**************************************************************************/

exports.paypalSuccess = (req, res, next) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
 
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total":req.query.total
        }
    }]
  };
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
      User.findOne({ email: payment.payer.payer_info.email })
        .then(user =>{
            if(user){
              const newOrder = new Order({
                customer_id: user._id,
                email: user.email,
                shippingAddress: payment.payer.payer_info.shipping_address,
                itemList:  payment.transactions.item_list,
                total: payment.transactions[0].amount.total
              });
              newOrder.save()
                .then((result) => {
                  user.orders.push(result);
                  user.save();
                  res.json({ message: 'Order created!' });
                })
            }else{
                const user = new User({
                    firstName: payment.payer.payer_info.first_name,
                    lastName: payment.payer.payer_info.last_name,
                    email: payment.payer.payer_info.email,
                    });
                    user
                      .save()
                      .then(user => {
                        const newOrder = new Order({
                          customer_id: user._id,
                          email: user.email,
                          shippingAddress: payment.payer.payer_info.shipping_address,
                          itemList:  payment.transactions.item_list,
                          total: payment.transactions[0].amount.total
                        });
                        newOrder.save()
                          .then((result) => {
                            user.orders.push(result);
                            user.save();
                            res.json({ message: 'Order created!' });
                          })
                      })
                      .catch(err => {
                        console.log(err);
                        res.status(500).json({
                          message: "something is failed!"
                        });
                      });
                }
      })
    }
});
}

/**********************************************************************
            Request method  :  POST
            Route           :  /api/order/cash
            Description     :  PAYMENT WITH cash METHOD
**************************************************************************/

exports.checkout = (req, res, next) => {
  const { errors, isValid } = validateCheckout(req.body);
    // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user){
        const newOrder = new Order({
          customer_id: user._id,
          email: user.email,
          shippingAddress: req.body.shippingAddress,
          shippingDate: req.body.shippingDate,
          itemList:  req.body.itemList,
          total: req.body.total
        });
        newOrder.save()
          .then((result) => {
            user.orders.push(result);
            user.save();
            res.json({ message: 'Order created!' });
          })
      }else{
        bcrypt.hash(req.body.password, 10).then(hash => {
          const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash, 
              imageUrl: req.body.imageUrl
          });
          user
            .save()
            .then(user =>{
              const newOrder = new Order({
                
                email: user.email,
                customer_id: user._id,
                shippingAddress: req.body.shippingAddress,
                shippingDate: req.body.shippingDate,
                itemList:  req.body.itemList,
                total: req.body.total
              });
              newOrder.save()
                .then((result) => {
                  user.orders.push(result);
                  user.save();
                  res.json({ message: 'Order created!' });
                })
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: "Invalid authentication credentials!"
              });
            });
        });
      }
    })
}