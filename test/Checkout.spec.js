'use strict';

const expect = require('chai').expect;
const Checkout = require('../src/Checkout.js');

describe('Checkout', function() {
  it('should exist', function() {
    expect(Checkout).to.not.be.undefined;
  });

  const fakeCatalog = [
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

  const checkout = new Checkout();

  describe('#setProduct() and #getProduct()', function() {
    it('should set and get individual product detail and its price', function() {
      const fakeProduct = {
        sku: 'd',
        price: 12
      };

      checkout.setProduct(fakeProduct);

      expect(checkout.getProduct('d')).to.eql(fakeProduct);

      const replaceFakeProduct = {
        sku: 'a',
        price: 10,
        bulkPrices: [
          { min: 3, price: 28 }
        ]
      };

      checkout.setProduct(replaceFakeProduct);

      expect(checkout.getProduct('a')).to.eql(replaceFakeProduct);
    });
  });

  describe('#setCatalog() and #getCatalog()', function() {
    it('should set and get products and their prices', function() {
      checkout.setCatalog(fakeCatalog);

      const expectedCatalog = {};
      fakeCatalog.forEach(product => {
        expectedCatalog[product.sku] = product;
      });

      expect(checkout.getCatalog()).to.eql(expectedCatalog);
    });
  });

  describe('#addToCart() and #getCartContent()', function() {
    it('should add product to cart and returns cart content with getCartContent method', function() {
      checkout.addToCart('b', 2);
      checkout.addToCart('a', 1);

      const expectedCartContent = [
        { sku: 'b', quantity: 2 },
        { sku: 'a', quantity: 1 }
      ];

      expect(checkout.getCartContent()).to.eql(expectedCartContent);

      const updatedCartContent = [
        { sku: 'b', quantity: 1 },
        { sku: 'a', quantity: 1 }
      ];

      checkout.updateProductQuantity('b', 1);
      expect(checkout.getCartContent()).to.eql(updatedCartContent);

      const deletedCartContent = [
        { sku: 'b', quantity: 1 }
      ];

      checkout.removeFromCart('a');
      expect(checkout.getCartContent()).to.eql(deletedCartContent);

    });
  });

  describe('#clearCart()', function() {
    it('should clear cart content', function() {
      checkout.clearCart();

      expect(checkout.getCartContent()).to.eql([]);
    });
  });

  describe('#calculateLineItem', function() {
    it('should calculate total of a lineitem', function() {
      expect(checkout.calculateLineItem({ sku: 'b', quantity: 1 })).to.equal(9);
      expect(checkout.calculateLineItem({ sku: 'c', quantity: 2 })).to.equal(15);
      expect(checkout.calculateLineItem({ sku: 'c', quantity: 5 })).to.equal(35);
      expect(checkout.calculateLineItem({ sku: 'c', quantity: 8 })).to.equal(58);
      expect(checkout.calculateLineItem({ sku: 'c', quantity: 19 })).to.equal(135);
    });
  });

  describe('#calculateTotal', function() {
    it('should calculate total of whole content of cart', function() {
      checkout.clearCart();
      checkout.addToCart('b', 1);
      checkout.addToCart('c', 19);

      expect(checkout.calculateTotal()).to.equal(144);
    });
  });
});
