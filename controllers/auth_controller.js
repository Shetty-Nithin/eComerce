//sign up
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/auth_config');
const db = require('../models');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;  

exports.signup = (req, res) => {
    console.log('creating the user here')
    User.create({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10)
    }).then(user => {
        console.log('deciding here')
        if(req.body.roles){
            Role.findAll({
                where : {
                    name : {
                        [Op.or] : req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() =>{
                    res.send({
                        message : "User registered successfully with provided role."
                    })
                })
            })
        }else{
            user.setRoles(db.ROLES[0]).then(response => {
                console.log('enterign the default statement')
                res.status(201).send({
                    message : 'user registered successfully with default role'
                })
            })
        }
    }).catch(err => {
        res.status(500).send({
            message : err.message
        })
    })
}


//sign in
exports.signin = (req, res) => {
    User.findOne({
        where : {
            username : req.body.username
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({
                message : "user not found!!"
            });
        }

        var isValidPassword =  bcrypt.compareSync(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(401).send({
                message : 'Invalid password'
            })
        }
        
        var token  = jwt.sign({id : user.id}, config.secretKey, {expiresIn : 60})

        var authorities = [];
        user.getRoles().then(roles => {
            for(let i=0; i<roles.length; i++){
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id : user.id,
                username : user.username,
                email : user.email,
                roles : authorities,
                accessToken : token
            })
        })
    }).catch(err => {
        return res.status(500).send({
            message : err.message
        });
    })
}