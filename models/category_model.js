module.exports = (sequelize, Sequelize) => {
    // const { sequelize, Sequelize } = require("./index.js");
        
    const catergory = sequelize.define('catergory',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false,
        },
        description : {
            type : Sequelize.STRING
        }
    }, 
    {
        tableName : "categories",
    });
    
    return catergory;
}