/**
 * Checkout object for managing simple cashier tasks:
 * - Manage catalog
 * - Manage shopping cart
 * - Calculate shopping total
 * @public
 * @class
 */
class Checkout {
  constructor() {
    /**
     * Set of Product informations and pricings
     */
    this.catalog = {};

    /**
     * Shopping cart
     */
    this.cart = [];
  }

  /**
   * Set catalog dictionary (product detail and prices)
   * @param {Array} newCatalog Array of product detail and price
   */
  setCatalog(newCatalog) {
    // Clear catalog
    this.catalog = {};

    newCatalog.forEach(product => this.setProduct(product));
  }

  /**
   * Get catalog dictirionary
   * @return {Object} Object of products detail and price keyed by sku
   */
  getCatalog() {
    return this.catalog;
  }

  /**
   * Inert product into catalog
   * @param {Object} product product detail and prices
   */
  setProduct(product) {
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
      product.bulkPrices = this.sortBulkPrices(product.bulkPrices);
    }

    if (!this.catalog.hasOwnProperty(product.sku)) {
      this.catalog[product.sku] = {};
    }

    this.catalog[product.sku] = product;
  }

  /**
   * Get product from catalog by SKU
   * @param  {String} sku SKU of the product to get
   * @return {Object} Specific product
   */
  getProduct(sku) {
    return this.catalog[sku]?this.catalog[sku]:null;
  };

  /**
   * Add product to cart
   * @param {String} sku SKU of product to be added
   * @param {Number} quantity Quantity to be added
   */
  addToCart(sku, quantity = 1) {
    this.updateProductQuantity(sku, quantity + this.getProductQuantityInCart(sku));
  }

  /**
   * Update product quantity in cart
   * @param {String} sku SKU of product to be updated
   * @param {Number} quantity Quantity to be updated
   */
  updateProductQuantity(sku, quantity) {
    let inCart = false;
    const updatedCart = [];

    this.cart.forEach((cartItem) => {
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

    this.cart = updatedCart;
  }

  /**
   * Remove product from cart
   * @param {String} sku SKU of product to be removed
   */
  removeFromCart(sku) {
    this.updateProductQuantity(sku, 0);
  }

  /**
   * Get content of the cart
   * @return {Array}
   */
  getCartContent() {
    return this.cart;
  }

  /**
   * Get number of product in cart
   * @param {String} sku SKU of product in cart
   * @return {Number}
   */
  getProductQuantityInCart(sku) {
    const productInCart = this.cart.filter(cartItem => cartItem.sku === sku);

    if (productInCart.length > 0) {
      return productInCart[0].quantity;
    }

    return 0;
  }

  /**
   * Clear the cart
   */
  clearCart() {
    this.cart = [];
  }

  /**
   * Calculate total of lineitem
   * @param  {String} sku Product SKU
   * @param  {Number} quantity Quantity of product
   * @return {Number} Lineitem total
   */
  calculateLineItem({ sku, quantity }) {
    const product = this.getProduct(sku);

    if (product === null) {
      throw new Error("Product with given SKU is not found in catalog.");
    }

    let total = 0;
    let singlePrice = parseFloat(product.price);
    let remainingQuantity = quantity;

    if (product.hasOwnProperty('bulkPrices')) {
      product.bulkPrices.forEach(({ min, price }) => {
        while (remainingQuantity >= min) {
          total += parseFloat(price);
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
  calculateTotal() {
    let total = 0;

    this.cart.forEach(cartItem => {
      total += this.calculateLineItem(cartItem);
    });

    return total;
  }

  /**
   * Helper function to order bulkPrices by "min" in descending order
   * @private
   * @param  {Array} bulkPrices
   * @return {Array} Sorted bulkPrices
   */
  sortBulkPrices(bulkPrices) {
    const sortedBulkPrices = bulkPrices.sort((a, b) => b.min - a.min);

    return sortedBulkPrices;
  }
};

module.exports = Checkout;
