const express = require('express');
const app = express();
const serverConfig = require('./config/server.config.js');
const db = require('./models/index.js');
const cors = require('cors');

const bodyParser = require('body-parser');
const { ROLES } = require('./models/index.js');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(
    cors({
        origin : "*"
    })
)
app.use(express.static('public'));

function initialize(){

    db.role.create({ id : 1, name : db.ROLES[0] });
    db.role.create({ id : 2, name : db.ROLES[1] });

    // db.cart.create({id : 1, cost : 0});

    var categoriesData = [
        { name : "Electronics", desciption : "electronics are available here" },
        { name : "clothes", desciption : "be comfortable and look good" },
        { name : "books", desciption : "english novels" },
    ];

    var productData = [
        { name : "nokia", desciption : "old phone", price : "9999", categoryId : "1" },
        { name : "samsung", desciption : "smart phone", price : "18990", categoryId : "1" },
        { name : "google pixel", desciption : "slim phone", price : "30990", categoryId : "1" },
        { name : "xiomi", desciption : "made in china", price : "7990", categoryId : "1" },
        { name : "shirt", desciption : "brand new", price : "700", categoryId : "2" },
        { name : "pants", desciption : "jeans", price : "1299", categoryId : "2" },
        { name : "cap", desciption : "for summer", price : "199", categoryId : "2" },
        { name : "shorts", desciption : "home wear", price : "999", categoryId : "2" },
        { name : "think and grow rich", desciption : "napolean hill", price : "499", categoryId : "3" },
        { name : "harry potter", desciption : "j.k. rowlling", price : "399", categoryId : "3" },
        { name : "rich dad poor dad", desciption : "chinease", price : "199", categoryId : "3" }
    ];

    db.category.bulkCreate(categoriesData).then(() => {
        console.log('catergory table is initialized with catergory');
    }).catch((err) => {
        console.log('error while initializing the catergory data table');
    });
 
    db.product.bulkCreate(productData).then(() => {
        console.log('products table is initialized with produts');
    }).catch((err) => {
        console.log('error while initializing the product data table');
    });
     
}


db.category.hasMany(db.product);
db.sequelize.sync({force:true}).then(() => {
    initialize();
    console.log('old tables are dropped and new tables are created with bulkcreate data');
});

require('./routes/category_route')(app);
require('./routes/product_route')(app);
require('./routes/auth_route')(app);
require('./routes/cart_route')(app);

app.listen(serverConfig.PORT, (req, res) => {
    console.log(`listening at port ${serverConfig.PORT}`);
});