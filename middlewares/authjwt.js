//verify the token

const jwt = require("jsonwebtoken");
const config = require('../config/auth_config');
const { user } = require("../models");


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message : "token not provided."
        });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message : 'Unauthorised'
            });
        }

        req.userId = decoded.id;
        next();
    })
}

isAdmin = (req, res, next) => {
    user.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === 'admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message : 'require admin role'
            });
            return;
        })
    })
}

const authJwt = {verifyToken, isAdmin};
module.exports = authJwt; 