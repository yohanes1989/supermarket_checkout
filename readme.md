## Get started
```javascript
// Array of products. Please follow the same format
var catalog = [
  {
    bulkPrices: [
      { min: 3, price: 28 }
    ],
    price: 10.5,
    sku: 'a'
  },
  {
    price: 9,
    sku: 'b'
  },
  {
    bulkPrices: [
      { min: 2, price: 15 },
      { min: 5, price: 35 }
    ],
    price: 8,
    sku: 'c'
  }
];

// Initialize new Checkout object
var checkout = new Checkout();

// Tell checkout to use catalog
checkout.setCatalog(catalog);

// Add item to cart
checkout.addToCart('a', 1);

// Calculate total
console.log(checkout.calculateTotal());
```

<a name="Checkout"></a>

## Checkout
**Kind**: global class  
**Access**: public  

* [Checkout](#Checkout)
    * [new Checkout()](#new_Checkout_new)
    * [.setCatalog(newCatalog)](#Checkout+setCatalog)
    * [.getCatalog()](#Checkout+getCatalog) ⇒ <code>Object</code>
    * [.setProduct(product)](#Checkout+setProduct)
    * [.getProduct(sku)](#Checkout+getProduct) ⇒ <code>Object</code>
    * [.addToCart(sku, quantity)](#Checkout+addToCart)
    * [.updateProductQuantity(sku, quantity)](#Checkout+updateProductQuantity)
    * [.removeFromCart(sku)](#Checkout+removeFromCart)
    * [.getCartContent()](#Checkout+getCartContent) ⇒ <code>Array</code>
    * [.getProductQuantityInCart(sku)](#Checkout+getProductQuantityInCart) ⇒ <code>Number</code>
    * [.clearCart()](#Checkout+clearCart)
    * [.calculateLineItem(sku, quantity)](#Checkout+calculateLineItem) ⇒ <code>Number</code>
    * [.calculateTotal()](#Checkout+calculateTotal) ⇒ <code>Number</code>

<a name="new_Checkout_new"></a>

### new Checkout()
Checkout object for managing simple cashier tasks:
- Manage catalog
- Manage shopping cart
- Calculate shopping total

<a name="Checkout+setCatalog"></a>

### checkout.setCatalog(newCatalog)
Set catalog dictionary (product detail and prices)

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  

| Param | Type | Description |
| --- | --- | --- |
| newCatalog | <code>Array</code> | Array of product detail and price |

<a name="Checkout+getCatalog"></a>

### checkout.getCatalog() ⇒ <code>Object</code>
Get catalog dictirionary

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  
**Returns**: <code>Object</code> - Object of products detail and price keyed by sku  
<a name="Checkout+setProduct"></a>

### checkout.setProduct(product)
Inert product into catalog

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  

| Param | Type | Description |
| --- | --- | --- |
| product | <code>Object</code> | product detail and prices |

<a name="Checkout+getProduct"></a>

### checkout.getProduct(sku) ⇒ <code>Object</code>
Get product from catalog by SKU

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  
**Returns**: <code>Object</code> - Specific product  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of the product to get |

<a name="Checkout+addToCart"></a>

### checkout.addToCart(sku, quantity)
Add product to cart

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of product to be added |
| quantity | <code>Number</code> | Quantity to be added |

<a name="Checkout+updateProductQuantity"></a>

### checkout.updateProductQuantity(sku, quantity)
Update product quantity in cart

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of product to be updated |
| quantity | <code>Number</code> | Quantity to be updated |

<a name="Checkout+removeFromCart"></a>

### checkout.removeFromCart(sku)
Remove product from cart

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of product to be removed |

<a name="Checkout+getCartContent"></a>

### checkout.getCartContent() ⇒ <code>Array</code>
Get content of the cart

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  
<a name="Checkout+getProductQuantityInCart"></a>

### checkout.getProductQuantityInCart(sku) ⇒ <code>Number</code>
Get number of product in cart

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | SKU of product in cart |

<a name="Checkout+clearCart"></a>

### checkout.clearCart()
Clear the cart

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  
<a name="Checkout+calculateLineItem"></a>

### checkout.calculateLineItem(sku, quantity) ⇒ <code>Number</code>
Calculate total of lineitem

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  
**Returns**: <code>Number</code> - Lineitem total  

| Param | Type | Description |
| --- | --- | --- |
| sku | <code>String</code> | Product SKU |
| quantity | <code>Number</code> | Quantity of product |

<a name="Checkout+calculateTotal"></a>

### checkout.calculateTotal() ⇒ <code>Number</code>
Calculate total of the cart

**Kind**: instance method of [<code>Checkout</code>](#Checkout)  
**Returns**: <code>Number</code> - Total price  
