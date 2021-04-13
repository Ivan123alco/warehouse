const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const { writeInventory, writeProducts } = require("./file-service")
const { getProductsWithStock, getProductsByName, updateInventory, sellProduct } = require("./products-service")
require('dotenv').config()

const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/inventory', async (req, res, next) => {
  try {
    if (!req.files && !req.files.inventory) {
      let err = new Error('Missing required param: inventory');
      err.statusCode = 400
      next(err);
    }
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    const { inventory: items } = JSON.parse(req.files.inventory.data);
    const inventory = writeInventory(items)

    //send response
    res.status(200).json(inventory);

  } catch (err) {
    console.error(err)
    let error = new Error('Internal server error')
    err.statusCode = 500
    next(error);
  }
});

app.post('/products', async (req, res, next) => {
  try {
    if (!req.files && !req.files.products) {
      let err = new Error('Missing required param: products');
      err.statusCode = 400
      next(err);
    }
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    const { products: items } = JSON.parse(req.files.products.data);
    const products = writeProducts(items)

    //send response
    res.status(200).json(products);

  } catch (err) {
    console.error(err)
    let error = new Error('Internal server error')
    err.statusCode = 500
    next(error);
  }
});

app.get('/products', async (_, res, next) => {
  try {
    //send response
    const products = getProductsWithStock()
    res.status(200).json(products);

  } catch (err) {
    console.error(err)
    let error = new Error('Internal server error')
    err.statusCode = 500
    next(error);
  }
});

app.put('/sell/:name', async (req, res, next) => {
  try {
    //send response
    if (!req.params && !req.params.name) {
      let err = new Error('Missing required param: name');
      err.statusCode = 400
      next(err);
    }
    const product = getProductsByName(req.params.name)
    const inventory = sellProduct(product);

    res.status(200).json(inventory);

  } catch (err) {
    console.error(err)
    let error = new Error('Internal server error')
    err.statusCode = 500
    next(error);
  }
});

app.listen(3000, function () {
  console.info('Running warehouse app on port 3000');
});