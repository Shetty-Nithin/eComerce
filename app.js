const express = require('express');
const app = express();
const serverConfig = require('./config/server.config');
const db = require('./models/index.js');

//----------------------------------category------------------------
var categoriesData = [
    {
        name : "Electronics",
        desciption : "electronics are available here"
    },
    {
        name : "vegetables",
        desciption : "this is vegetables"
    },
];

db.category.bulkCreate(categoriesData).then(() => {
    console.log('catergory table is initialized with catergory');
}).catch((err) => {
    console.log('error while initializing the catergory data table');
});

//-----------------------------Product-------------------------------------
var productData = [
    {
        name : "phones",
        desciption : "smart phones",
    },
    {
        name : "clothes",
        desciption : "brand new clothes",
    },
    {
        name : "shoes",
        desciption : "sports shoes",
    }
];

db.product.bulkCreate(productData).then(() => {
    console.log('products table is initialized with produts');
}).catch((err) => {
    console.log('error while initializing the product data table');
});

//-------------------------------------------------------------------------

db.sequelize.sync({force:true}).then(() => {
    console.log('models/tables are dropped and created');
});

app.listen(serverConfig.PORT, (req, res) => {
    console.log('my server is working');
});