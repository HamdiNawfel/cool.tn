const Order = require("../models/order");
const User = require("../models/user");

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

