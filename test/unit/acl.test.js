const {app, expect, request} = require('../common')

describe('ACL', function() {
    describe('Category', function() {
        it('should return 200 when listing Categories', function() {
            return request
            .get('/api/Categories')
            .expect(200);
        });

        it('should return 401 when creating categories', function() {
            return request
            .post('/api/Categories')
            .send({name: 'My Category'})
            .expect(401);
        });

        it('should return 401 when updating categories', function() {
            return request
            .patch('/api/Categories/1')
            .send({name: 'My Category'})
            .expect(401);
        });

        it('should return 401 when deleting categories', function() {
            return request
            .delete('/api/Categories/1')
            .expect(401);
        });
    })

    describe('Product', function() {
        it('should return 200 when listing Products', function() {
            return request
            .get('/api/Products')
            .expect(200);
        });

        it('should return 401 when creating a Product', function() {
            return request
            .post('/api/Products')
            .send({name: 'My Products', price: 299})
            .expect(401);
        });

        it('should return 401 when updating Products', function() {
            return request
            .patch('/api/Products/1')
            .send({name: 'My Products', price: 200})
            .expect(401);
        });

        it('should return 401 when deleting Products', function() {
            return request
            .delete('/api/Products/1')
            .expect(401);
        });

        it('should return 200 when buying a Product', function() {
            return app.models.Product.create({name: 'test', price: 200})
              .then(res => request
                .post(`/api/Products/${res.id}/buy`)
                .send({quantity: 100})
                .expect(200))
        });
    });

})

