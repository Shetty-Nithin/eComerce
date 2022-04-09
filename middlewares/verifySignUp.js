const db = require("../models")

const checkDuplicateUserNameOrEmail = (req, res, next) => {
    db.user.findOne({
        where : {
            username : req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message : "user already exists"
            });
            return;
        }
        db.user.findOne({
            where : {
                email : req.body.email
            }
        }).then(user => {
            if(user){
                res.status(400).send({
                    message : "email already exists"
                });
                return;
            }
            next();
        })
    })
}

const checkRolesExists = (req, res, next) => {
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length; i++){
            if(!db.ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message : "role does not exists"
                })
                return;
            }
        }
        next();
    }
}

const verifySignUp = { checkDuplicateUserNameOrEmail, checkRolesExists }
module.exports = verifySignUp;