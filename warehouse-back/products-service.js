const { readProducts, readInventory, updateInventory } = require("./file-service")

const getProductsWithStock = () => {
  const products = readProducts()
  const inventory = readInventory()
  return Object.values(products).map(({ contain_articles, ...restProduct }) => {
    const stock = calculateStock(contain_articles, inventory);
    return { ...restProduct, contain_articles, stock }
  })
}

const getProductsByName = name => {
  const products = readProducts()
  return products[name]
}

const sellProduct = ({ contain_articles }) => {
  const inventory = readInventory()
  const updatedInventory = contain_articles.map(({ art_id, amount_of }) =>
    ({ ...inventory[art_id], stock: inventory[art_id].stock - amount_of }))
  return updateInventory(updatedInventory)
}

const calculateStock = (articles, inventory) => {
  return articles.reduce((stock, { art_id, amount_of }) => {
    const availableProducts = Math.floor(+inventory[art_id].stock / +amount_of);
    return availableProducts > stock ? availableProducts : stock
  }, 0)
}

module.exports = {
  getProductsWithStock,
  getProductsByName,
  sellProduct
}