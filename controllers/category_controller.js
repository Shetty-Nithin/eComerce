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

    // const categoryId = req.params.id;
    Category.update(updateCategory, {
        where : {
            // id : categoryId
            id : req.params.id
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
    // const categoryId = req.params.id;
    Category.destroy({
        // where : {id : categoryId}
        where : {id : req.params.id}
    }).then(response => {
        // res.sendStatus(200).send(response);
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        })
    })
}

exports.findCateg = (req, res) => {
    // const categoryId = req.params.id;
    Category.findByPk(req.params.id).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : `${req.params.id} is not present in the database`
        })
    })
}

exports.findAllCateg = (req, res) => {
    // let catergoryName = req.query.name;
    let promise;
    if(req.query.name){
        promise = Category.findAll({
            where : {
                name : req.query.name
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
