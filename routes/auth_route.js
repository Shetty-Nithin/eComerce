const authController = require('../controllers/auth_controller');
const { verifySignUp } = require('../middlewares')

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    });
    app.post('/ecommerce/api/v1/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExists], authController.signup);
    app.post('/ecommerce/api/v1/auth/login', authController.login);


    // app.post('/ecommerce/api/v1/auth/logout', authController.logout); 

}
