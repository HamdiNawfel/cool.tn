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
        "cancel_url": "http://localhost:8080/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 2
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "50.00"
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

/**********************************************************************
            Request method  :  GET
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
            "total": "50.00"
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
                shipping_address: payment.payer.payer_info.shipping_address,
                item_list:  payment.transactions.item_list,
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
                          shipping_address: payment.payer.payer_info.shipping_address,
                          item_list:  payment.transactions.item_list,
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