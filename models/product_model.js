module.exports = (sequelize, Sequelize) => {

    const product = sequelize.define("product",{
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
            type : Sequelize.STRING,
        },
        price : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    },
    {
        tableName : "products",
    });
    
    return product;
}