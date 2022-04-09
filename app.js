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

    var categoriesData = [
        { name : "Electronics", desciption : "electronics are available here" },
        { name : "vegetables", desciption : "this is vegetables" },
    ];
    var productData = [
        { name : "phones", desciption : "smart phones", price : "400" },
        { name : "clothes", desciption : "brand new clothes", price : "700" }
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

//-------------------------------------------------------------------------

db.category.hasMany(db.product);
db.sequelize.sync({force:true}).then(() => {
    console.log('models/tables are dropped and created');
    initialize();
});

require('./routes/category_route')(app);
require('./routes/product_route')(app);
require('./routes/auth_route')(app);

app.listen(serverConfig.PORT, (req, res) => {
    console.log(`listening at port ${serverConfig.PORT}`);
});