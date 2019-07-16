'use strict';

module.exports = function(Product) {

  Product.observe('before save', function(ctx, next) {
      if(ctx.instance && ctx.instance.categoryId) {
          return Product.app.models.Category
          .count({id: ctx.instance.categoryId})
          .then(res => {
              if (res < 1) {
                  return Promise.reject('Error adding product to non-existing category')
              }
          })
      }
      return next()
  });
/**
 * Return if the input is larger than zero
 * @param {number} quantity Number to validate
 */

  const validQuantity = quantity => Boolean(quantity > 0);

/**
 * Buy this product
 * @param {number} quantity Number of products to buy
 * @param {Function(Error, object)} callback
 */

  Product.prototype.buy = function(quantity, callback) {
    if (!validQuantity(quantity)) {
      return callback(`Invalid quantity: ${quantity}`);
    }
    var result;
    if (quantity == 1) {
      result = {
        status: `You bought ${quantity} item`,
      };
    } else {
      result = {
        status: `You bought ${quantity} items`,
      };
    }
    // TODO
    callback(null, result);
  };

  //   Validate minimal length of the name
  Product.validatesLengthOf('name', {
    min: 3,
    message: {
      min: 'Name should be at least 3 characters',
    },
  });
  //   Validate name to be unique
  Product.validatesUniquenessOf('name')
  
  const positiveInteger = /^[0-9]*s/;
  const validatePositiveInteger = function(err) {
    if (!positiveInteger.test(this.price)) {
      err();
    }
  };
  Product.validate('price', validatePositiveInteger, {
    message: 'Price should be a valid integer',
  });
  function validateMinimalPrice(err, done) {
    const price = this.price;
    process.nextTick(() => {
      const minimalPriceFromDB = 99;
      if (price < minimalPriceFromDB) {
        err();
      }
      done();
    });
  };
  Product.validateAsync('price', validateMinimalPrice, {
    message: 'Price should not be lower than the minimal price in the DB',
  });
};
