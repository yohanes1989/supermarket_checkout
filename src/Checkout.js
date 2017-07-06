/**
 * Checkout object for managing simple cashier tasks:
 * - Manage catalog
 * - Manage shopping cart
 * - Calculate shopping total
 * @public
 * @class
 */
function Checkout() {
  /**
   * Set of Product informations and pricings
   * @private
   */
  let catalog = {};

  /**
   * Shopping cart
   * @private
   */
  let cart = [];

  /**
   * Set catalog dictionary (product detail and prices)
   * @param {Array} newCatalog Array of product detail and price
   */
  this.setCatalog = (newCatalog) => {
    // Clear catalog
    catalog = {};

    newCatalog.forEach(product => this.setProduct(product));
  }

  /**
   * Get catalog dictirionary
   * @return {Object} Object of products detail and price keyed by sku
   */
  this.getCatalog = () => {
    return catalog;
  }

  /**
   * Inert product into catalog
   * @param {Object} product product detail and prices
   */
  this.setProduct = (product) => {
    // Check required properties
    if (!product.hasOwnProperty('sku')) {
      throw new Error("SKU is not defined.");
    }

    if (!product.hasOwnProperty('price')) {
      throw new Error("Price is not defined.");
    }

    if (product.hasOwnProperty('bulkPrices')) {
      product.bulkPrices.forEach((bulkPrice) => {
        if (!bulkPrice.hasOwnProperty('min')) {
          throw new Error("Minimum quantity is not defined.");
        }

        if (!bulkPrice.hasOwnProperty('price')) {
          throw new Error("Price is not defined.");
        }
      });

      // Order bulkPrices by "min" in descending order for future price calculation
      product.bulkPrices = orderBulkPrices(product.bulkPrices);
    }

    if (!catalog.hasOwnProperty(product.sku)) {
      catalog[product.sku] = {};
    }

    catalog[product.sku] = product;
  }

  /**
   * Get product from catalog by SKU
   * @param  {[type]} sku SKU of the product to get
   * @return {Object} Specific product
   */
  this.getProduct = (sku) => {
    return catalog[sku]?catalog[sku]:null;
  };

  /**
   * Add product to cart
   * @param {String} sku SKU of product to be added
   * @param {Number} quantity Quantity to be added
   */
  this.addToCart = (sku, quantity) => {
    this.updateProductQuantity(sku, quantity + this.getProductQuantityInCart(sku));
  }

  /**
   * Update product quantity in cart
   * @param {String} sku SKU of product to be updated
   * @param {Number} quantity Quantity to be updated
   */
  this.updateProductQuantity = (sku, quantity) => {
    let inCart = false;
    const updatedCart = [];

    cart.forEach((cartItem) => {
      if (cartItem.sku === sku) {
        inCart = true;

        if (quantity > 0) {
          updatedCart.push({ sku, quantity });
        }
      } else {
        updatedCart.push(cartItem);
      }
    });

    if (!inCart) {
      updatedCart.push({ sku, quantity });
    }

    cart = updatedCart;
  }

  /**
   * Remove product from cart
   * @param {String} sku SKU of product to be removed
   */
  this.removeFromCart = (sku) => {
    this.updateProductQuantity(sku, 0);
  }

  /**
   * Get content of the cart
   * @return {Array}
   */
  this.getCartContent = () => {
    return cart;
  }

  /**
   * Get number of product in cart
   * @param {String} sku SKU of product in cart
   * @return {Number}
   */
  this.getProductQuantityInCart = (sku) => {
    const productInCart = cart.filter(cartItem => cartItem.sku === sku);

    if (productInCart.length > 0) {
      return productInCart[0].quantity;
    }

    return 0;
  }

  /**
   * Clear the cart
   */
  this.clearCart = () => {
    cart = [];
  }

  /**
   * Calculate total of lineitem
   * @param  {String} sku Product SKU
   * @param  {Number} quantity Quantity of product
   * @return {Number} Lineitem total
   */
  this.calculateLineItem = ({ sku, quantity }) => {
    const product = this.getProduct(sku);

    if (product === null) {
      throw new Error("Product with given SKU is not found in catalog.");
    }

    let total = 0;
    let singlePrice = product.price;
    let remainingQuantity = quantity;

    if (product.hasOwnProperty('bulkPrices')) {
      product.bulkPrices.forEach(({ min, price }) => {
        while (remainingQuantity >= min) {
          total += price;
          remainingQuantity -= min;
        }
      });
    }

    total += remainingQuantity * singlePrice;

    return total;
  }

  /**
   * Calculate total of the cart
   * @return {Number} Total price
   */
  this.calculateTotal = () => {
    let total = 0;

    cart.forEach(cartItem => {
      total += this.calculateLineItem(cartItem);
    });

    return total;
  }

  /**
   * Helper function to order bulkPrices by "min" in descending order
   * @param  {Array} bulkPrices
   * @return {Array} Sorted bulkPrices
   */
  orderBulkPrices = (bulkPrices) => {
    const sortedBulkPrices = bulkPrices.sort((a, b) => b.min - a.min);

    return sortedBulkPrices;
  }
};

module.exports = Checkout;
