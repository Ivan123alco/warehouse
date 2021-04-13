require("dotenv").config()
const fs = require('fs');

const inventoryPath = process.env.INVENTORY_PATH;
const productsPath = process.env.PRODUCTS_PATH;

const writeInventory = items => {
  const inventory = fileExistsSync(inventoryPath) ? JSON.parse(fs.readFileSync(inventoryPath)) : {};
  const updatedItems = items.reduce((map, { art_id, name, stock }) => {
    if (!inventory[art_id]) {
      map[art_id] = { art_id, name, stock }
    } else {
      map[art_id] = { art_id, name, stock: parseInt(stock) + parseInt(inventory[art_id].stock) }
    }
    return map
  }, {})
  const inventorySaved = { ...inventory, ...updatedItems }
  fs.writeFileSync(inventoryPath, JSON.stringify(inventorySaved))
  return inventorySaved;
}

const updateInventory = items => {
  const inventory = fileExistsSync(inventoryPath) ? JSON.parse(fs.readFileSync(inventoryPath)) : {};
  const updatedItems = items.reduce((map, { art_id, name, stock }) => {
    map[art_id] = { art_id, name, stock }
    return map
  }, {})
  const inventorySaved = { ...inventory, ...updatedItems }
  fs.writeFileSync(inventoryPath, JSON.stringify(inventorySaved))
  return inventorySaved;
}

const writeProducts = newProducts => {
  const products = fileExistsSync(productsPath) ? JSON.parse(fs.readFileSync(productsPath)) : {};
  const updatedProducts = newProducts.reduce((map, product) => {
    map[product.name] = product
    return map
  }, {})
  const productSaved = { ...products, ...updatedProducts }
  fs.writeFileSync(productsPath, JSON.stringify(productSaved))
  return productSaved;
}

const readProducts = () => {
  return fileExistsSync(productsPath) ? JSON.parse(fs.readFileSync(productsPath)) : {};
}

const readInventory = () => {
  return fileExistsSync(inventoryPath) ? JSON.parse(fs.readFileSync(inventoryPath)) : {};
}

const fileExistsSync = (file) => {
  try {
    fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { writeInventory, writeProducts, readInventory, readProducts, updateInventory }