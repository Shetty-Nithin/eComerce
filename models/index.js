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

module.exports = db;