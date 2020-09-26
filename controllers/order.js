const Order = require("../models/order");
const User = require("../models/user");
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
    const location = req.body.location;
    const cart = req.body.cart;
    const total = req.body.total;
   
    const newOrder = new Order({
      customer_id,
      email,
      phone,
      location,
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
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:8080/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
};
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.json({forwardLink: payment.links[i].href});
          }
        }
    }
  });

}