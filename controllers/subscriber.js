const Subscriber = require("../models/subscriber");

/**********************************************************************
            Request method  :  POST
            Route           :  /api/subscribe
            Description     :  Add Subscribers
**************************************************************************/
exports.createSubscriber = (req, res, next) => {

    const email = req.body.email;
    
   
    const newSubscriber = new Subscriber({
      email,
    });
    newSubscriber.save()
              .then(subsriber => res.json(subsriber))
              .catch(err => console.log(err));
  };