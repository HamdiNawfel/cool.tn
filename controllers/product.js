const fs = require('fs');
const Product = require("../models/product");

/**********************************************************************
            Request method  :  POST
            Route           :  /api/product/add
            Description     :  Add product
**************************************************************************/
exports.createProduct = (req, res, next) => {

  const title = req.body.title;
  const categorie = req.body.categorie;
  const price = req.body.price;
  const quantity = req.body.quantity;

  const newProduct = new Product({
    title,
    categorie,
    price,
    quantity,
     imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  });
  newProduct.save()
            .then(product => res.json(product))
            .catch(err => console.log(err));

};
/*************************************************************************
            Request method  :  GET
            Route           :  api/products
            Description     :  get all products
**************************************************************************/
exports.getAllProducts = (req, res) => {
  Product.find().then(
    (archives) => {
      res.status(200).json(archives);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
/*************************************************************************
            Request method  :  GET
            Route           :  api/products/:id
            Description     :  get  product by id
**************************************************************************/
exports.getProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
   .then(product =>{
    res.status(200).json(product);
   })
   .catch(err =>{
    res.status(200).json({error: err});
   })
};
/*************************************************************************
            Request method  :  PUT
            Route           :  api/posts/update/:id
            Description     :  Modify post 
**************************************************************************/
exports.updateProduct = (req, res, next) => {
  const productUpdate =
    {
      title: req.body.title,
      categorie: req.body.categorie,
      price: req.body.price,
      quantity:req.body.quantity,
     
    } ;
  Product.updateOne({ _id: req.params.id }, { ...productUpdate, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Product modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

/*************************************************************************
            Request method  :  DELETE
            Route           :  api/posts/delete/:id
            Description     :  Delete post 
**************************************************************************/
exports.deleteProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      const filename = product.imageUrl.split('/uploads/')[1];
      fs.unlink(`uploads/${filename}`, () => {
        Product.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Product supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error })); 
};
