const productController = require('../controllers/product_controller');
const app = require('../app');
const {requestValidator, authJwt} = require('../middlewares/index');

module.exports = (app) => {

    app.post('/ecommerce/api/v1/products', [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin], productController.create);
    app.put('/ecommerce/api/v1/products/:id', [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin], productController.update);
    app.delete('/ecommerce/api/v1/products/:id', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProd);
    app.get('/ecommerce/api/v1/products/:id', productController.findProd);
    app.get('/ecommerce/api/v1/products', productController.findAllProd);
    
    app.get('/ecommerce/api/v1/categories/:categoryId/products', [requestValidator.validateCategoryInRequestParams], productController.getProductsUnderCatergory);
}