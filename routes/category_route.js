const catergoryController = require('../controllers/category_controller/')
const app = require('../app');
post('/ecommerce/api/v1/categories', catergoryController.create);
put('/ecommerce/api/v1/categories/:id', catergoryController.update);
delete('/ecommerce/api/v1/categories/:id', catergoryController.deleteCateg);
get('/ecommerce/api/v1/categories/:id', catergoryController.findCateg);
get('/ecommerce/api/v1/categories', catergoryController.findAllCateg);