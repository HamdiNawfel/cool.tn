const Order = require("../models/order");

/**********************************************************************
            Request method  :  POST
            Route           :  /api/product/add
            Description     :  Add product
**************************************************************************/
exports.createOrder = (req, res, next) => {

    const email = req.body.email;
    const phone = req.body.phone;
    const location = req.body.location;
    const cart = req.body.cart;
    const total = req.body.total;
   
    const newOrder = new Order({
      email,
      phone,
      location,
      cart,
      total,
    });
    newOrder.save()
              .then(order => res.json(order))
              .catch(err => console.log(err));
  };