'use strict';

module.exports = function(Product) {
    Product.search = function(name, cb) {        
        Product.find({where: {name: { like: `%${name}%`}}, limit: 10}, cb)
    }

    Product.remoteMethod('search', {
        accepts: {arg: 'name', type: 'string'},
        returns: {arg: 'product', type: 'Array'},
        http: {verb: 'get' }
  });
};
