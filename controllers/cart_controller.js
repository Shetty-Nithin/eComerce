const db = require('../models');


exports.create = (req, res) => {
    const cartObj = {
        userId : req.userId
    }

    db.cart.create(cartObj)
    .then(cart => {
        res.status(201).send(cart);
    }).catch(err => {
        res.status(500).send({
            message : "catch from create cart_controller"
        })
    })
}

exports.update = (req, res) => {
    const cartId = req.params.id;

    db.cart.findByPk(cartId).then(cart => {
        db.product.findAll({
            where : {
                id : req.body.productIds
            }
        }).then(productList => {
            if(!productList){
                res.status(400).send({
                    message : 'product does not exists'
                });
                return;
            }

            cart.setProducts(productList).then(() => {
                let selectedProducts = [];
                let totalCost = 0;
                cart.getProducts.then(products => {
                    for(let i=0; i<products.length; i++){
                        totalCost = totalCost + products[i].price
                        selectedProducts.push({
                            id : products[i].id,
                            name : products[i].name,
                            cost : products[i].price
                        })
                    }
                })

                res.status(200).send({
                    id : cart.id,
                    selectedProducts : selectedProducts,
                    cost : totalCost
                })
            })
        })
    })
}