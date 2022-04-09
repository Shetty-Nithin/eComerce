const catergoryController = require('../controllers/category_controller');
const {requestValidator, authJwt} = require('../middlewares/index');

module.exports = (app) => {

    app.post('/ecommerce/api/v1/categories', [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin], catergoryController.create);
    app.put('/ecommerce/api/v1/categories/:id', [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin], catergoryController.update);
    app.delete('/ecommerce/api/v1/categories/:id', [authJwt.verifyToken, authJwt.isAdmin], catergoryController.deleteCateg);
    app.get('/ecommerce/api/v1/categories/:id', catergoryController.findCateg);
    app.get('/ecommerce/api/v1/categories', catergoryController.findAllCateg);
    
}