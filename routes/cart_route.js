const cartController = require('../controllers/cart_controller');
const { authJwt } = require('../middlewares');

module.exports = function(app){
    app.post('/ecommerce/api/v1/carts', [authJwt.verifyToken], cartController.create);
    app.put('/ecommerce/api/v1/carts/:id', [authJwt.verifyToken], cartController.update )
}