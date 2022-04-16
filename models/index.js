const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.json');
const env = "development";
const dbSetting = dbConfig[env];

const sequelize = new Sequelize(
    dbSetting.database,
    dbSetting.username,
    dbSetting.password,
    dbSetting.dialectInformation
);

const db = {};

db.sequelize  = sequelize;
db.Sequelize = Sequelize;
db.category = require('./category_model')(sequelize, Sequelize);
db.product = require('./product_model')(sequelize, Sequelize);
db.user = require('./user_model')(sequelize, Sequelize);
db.role = require('./role_model')(sequelize, Sequelize);
db.cart = require('./cart_model')(sequelize, Sequelize);

db.role.belongsToMany(db.user,{
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["customer", "admin"];

db.user.hasMany(db.cart);
db.product.belongsToMany(db.cart, {
    through : "cart_products",
    foreignKey : "productId",
    otherKey : "cartId"
});
db.cart.belongsToMany(db.product, {
    through : "cart_products",
    foreignKey : "cartId",
    otherKey : "productId"
})


module.exports = db;