const db = require('../models/index.js');
const Product = db.product;


exports.create = (req, res) => {
    const createProduct = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        categoryId : req.body.categoryId
    }
    Product.create(createProduct).then(response => {
        res.status(201).send(response);
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        });
    })
}

exports.update = (req, res) => {

    const updateProduct = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    }

    const productId = req.params.id;
    Product.update(updateProduct, {
        where : {
            id : productId
        }
    }).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        })
    })
}

exports.deleteProd = (req, res) => {
    const productId = req.params.id;
    Product.destroy({
        where : {id : productId}
    }).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        })
    })
}

exports.findProd = (req, res) => {
    const productId = req.params.id;
    Product.findByPk(productId).then(response => {
        res.status(200).send(response)
    }).catch(err => {
        res.status(500).send({
            message : `${productId} is not present in the database`
        })
    })
}

exports.findAllProd = (req, res) => {
    let productName = req.query.name;
    let promise;
    if(productName){
        promise = Product.findAll({
            where : {
                name : productName
            }
        })
    }else{
        promise = Product.findAll();
    }

    promise.then(response =>{
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : 'this is not you, its us.'
        })
    })
}

exports.getProductsUnderCatergory = (req, res) => {
    const category_ID = req.params.categoryId;
    Product.findAll({
        where : {
            categoryId : category_ID
        }
    }).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : 'some internal error occured based on categoryId'
        })
    })
}