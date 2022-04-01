const { response } = require('express');
const db = require('../models/index.js');
const Category = db.category;

exports.create = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message : "Name cannot be empty."
        });
        return;
    }

    const createCategory = {
        name : req.body.name,
        description : req.body.description,
    }

    Category.create(createCategory).then(response => {
        console.log(`${response} has been stored in the database.`);
        res.status(201).send(`${response} has been saved to the database.`);
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        });
    })
}

exports.update = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message : "Name cannot be empty."
        });
        return;
    }
    
    const updateCategory = {
        name : req.body.name,
        description : req.body.description
    }

    const categoryId = req.parmas.id;
    Category.update(updateCategory, {
        where : {
            id : categoryId
        }
    }).then(response => {
        res.status(200).send('Category has been updated successfully');
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        })
    })
}

exports.deleteCateg = (req, res) => {
    const categoryId = req.parmas.id;
    Category.destroy({
        where : {id : categoryId}
    }).then(response => {
        res.status(200).send('Category has been deleted successfully');
    }).catch(err => {
        res.status(500).send({
            message : "Its not you, its us."
        })
    })
}

exports.findCateg = (req, res) => {
    const categoryId = req.parmas.id;
    Categorya.findByPk(categoryId).then(response => {
        res.status(200).send(`the data is ${response}`)
    }).catch(err => {
        res.status(500).send({
            message : `${categoryId} is not present in the database`
        })
    })
}

exports.findAllCateg = (req, res) => {
    let catergoryName = req.querry.name;
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

    Promise.then(response =>{
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message : 'this is not you, its us.'
        })
    })
}
