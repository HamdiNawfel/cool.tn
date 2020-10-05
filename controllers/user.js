require('dotenv').config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// Load input validation
const validateSignupInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");
/*************************************************************************
            Request method  : POST
            Route           :  api/signup
            Description     :  Signup user and return JWT token
**************************************************************************/
exports.createUser = (req, res, next) => {
    const { errors, isValid } = validateSignupInput(req.body);
    // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user =>{
        if(user){
            return res.status(400).json({ email: "Cette adresse e-mail est déjà utilisée" });
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
                  .then(result => {
                    const token = jwt.sign(
                      { email: user.email, userId: user._id },
                      process.env.SECRET_OR_KEY,
                      { expiresIn: "1d" }
                    );
                    res.status(201).json({
                      success: true,
                      token: "Bearer " + token,
                      result: result
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      message: "Invalid authentication credentials!"
                    });
                  });
              });
        //
            }
    })
}

/*************************************************************************
            Request method  :  POST
            Route           :  api/login
            Description     :  Login user and return JWT token
**************************************************************************/
exports.loginUser = (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(404).json({ email: "Email non trouvé" });
          }else{
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                       jwt.sign(
                            { email: user.email, userId: user._id },
                            process.env.SECRET_OR_KEY,
                            { expiresIn: "1d" },(err, token)=>{
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                      );
                }else{
                    return res.status(400).json({ password: "Le mot de passe est incorrect" });
                }
             })
          }
    })
  }

  /*************************************************************************
            Request method  : POST
            Route           :  api/auth
            Description     :  auth with google || facebook button and return JWT token
**************************************************************************/
exports.authUser = (req, res, next) => {
User.findOne({ email: req.body.email })
  .then(user =>{
      if(user){
            jwt.sign(
              { email: user.email, userId: user._id },
              process.env.SECRET_OR_KEY,
              { expiresIn: "1d" },(err, token)=>{
                  res.json({
                      success: true,
                      token: "Bearer " + token
                  });
              }
            );
      }else{
          const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              imageUrl: req.body.imageUrl
              });
              user
                .save()
                .then(result => {
                  const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    process.env.SECRET_OR_KEY,
                    { expiresIn: "1d" }
                  );
                  res.status(201).json({
                    success: true,
                    token: "Bearer " + token,
                    result: result
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    message: "Invalid authentication credentials!"
                  });
                });
          }
  })
}
/*************************************************************************
            Request method  : GET
            Route           :  api/user/:id
            Description     :  git the user by id 
**************************************************************************/
exports.getUser = (req, res) => {
  User.findOne({  _id: req.params.id })
     .populate('orders')
     .then((result) => {
       res.json(result)
     })
     .catch((error) => {
       res.status(500).json({ error })
     });
 };
  
 