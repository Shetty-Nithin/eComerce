const { category } = require("../models/index");

const validateCategoryRequest = (req, res, next) => {
    if(!req.body.name){
        res.status(400).send({
            message : "Name cannot be empty."
        });
        return;
    }
    next();
}

const validateProductRequest = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        res.status(400).send({
            message : "Name and Pirce cannot be empty😑"
        });
        return;

    }else{
        if(req.body.categoryId){
            category.findByPk(req.body.categoryId).then(response => {
                if(!response){
                    res.status(400).send({
                        message : 'category id is not available.'
                    });
                    return;
                }else{
                    if(!req.body.price || req.body.price <= 0){
                        res.status(400).send({
                            message : 'price should be greater than 0.'
                        })
                        return;
                    }
                    next();
                }
            });
        }else{
            res.status(400).send({
                message : "Provide category id."
            });
            return;
        }
    }
}

const validateCategoryInRequestParams = (req, res, next) => {
    const categoryId = req.params.categoryId;

    if(categoryId){
        category.findByPk(categoryId).then(response => {
            if(!response){
                res.status(400).send({
                    message : 'category id is not correct.'
                });
                return;
            }
            next();
        }).catch(err => {
            res.status(500).send({
                message : 'some internal error occured'
            });
        })
    }else{
        res.status(400).send({
            message : 'category id is not passed'
        });
    }
}

module.exports = {validateCategoryRequest, validateProductRequest, validateCategoryInRequestParams};