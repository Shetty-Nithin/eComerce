const db = require('../models/index.js');
const Category = db.category;

exports.create = (req, res) => {
    const createCategory = {
        name : req.body.name,
        description : req.body.description,
    }

    Category.create(createCategory).then(response => {
        res.status(201).send(response);
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        });
    })
}

exports.update = (req, res) => {
    const updateCategory = {
        name : req.body.name,
        description : req.body.description
    }

    const categoryId = req.params.id;
    Category.update(updateCategory, {
        where : {
            id : categoryId
        }
    }).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        })
    })
}

exports.deleteCateg = (req, res) => {
    const categoryId = req.params.id;
    Category.destroy({
        where : {id : categoryId}
    }).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        })
    })
}

exports.findCateg = (req, res) => {
    const categoryId = req.params.id;
    Category.findByPk(categoryId).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : `${categoryId} is not present in the database`
        })
    })
}

exports.findAllCateg = (req, res) => {
    let catergoryName = req.query.name;
    let promise;
    if(catergoryName){
        promise = Category.findAll({
            where : {
                name : catergoryName
            }
        })
    }else{
        promise = Category.findAll();
    }

    promise.then(response =>{
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : 'this is not you, its us.'
        })
    })
}
