
const Models = require("../../../models");
const User = Models.user;
const Role = Models.role;

const authController = require("../../../controllers/auth_controller")
const {mockRequest, mockResponse} = require("../interceptor");

const newUser = require("../mockData/newUser.json");
const newUserWithoutRole = require("../mockData/newUserWithoutRole.json");
const userWithInvalidRole = require("../mockData/userWithInvalidRole.json");
const userData = require("../mockData/userData.json");

const { JsonWebTokenError } = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../../../models");
const config = require("../../../config/auth_config")

beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
})

describe("<--- testing sign up method --->", () => {
    
    it("Successfull sign up with provided role", async() => {   
        req.body = newUser;

        const resFromCreate = {
            setRoles : async() => Promise.resolve()
        }
        const spyOnCreate = jest.spyOn(User, "create").mockImplementation(() => Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, "findAll").mockImplementation(() => Promise.resolve());
        
        await authController.signup(req, res);

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        await expect(Role.findAll).toHaveBeenCalled();

        await expect(res.status).toHaveBeenCalledWith(201);
        await expect(res.send).toHaveBeenCalledWith({message : "User registered successfully with provided role."});
    });  

    it("Successfull sign up without role", async() => {   
        req.body = newUserWithoutRole;

        const resFromCreate = {
            setRoles : async() => Promise.resolve()
        }
        const spyOnCreate = jest.spyOn(User, "create").mockImplementation(() => Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, "findAll").mockImplementation(() => Promise.resolve());
        
        await authController.signup(req, res);

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        await expect(Role.findAll).toHaveBeenCalled();

        await expect(res.status).toHaveBeenCalledWith(201);
        await expect(res.send).toHaveBeenCalledWith({message : "user registered successfully with default role"});
    }); 

    it("Signing up with wrong role", async() => {   
        req.body = userWithInvalidRole;

        const resFromCreate = {
            setRoles : async() => Promise.resolve()
        }
        const spyOnCreate = jest.spyOn(User, "create").mockImplementation(() => Promise.reject(Error("this is the error")));
         
        await authController.signup(req, res);

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();

        await expect(res.status).toHaveBeenCalledWith(500);
        await expect(res.send).toHaveBeenCalledWith({message : "this is the error"});
    }); 
})

describe("<--- testing sign in method --->", () => {

    beforeEach(() => {
        req.body = userData;
    })

    const userHashedPassword = bcrypt.hashSync(userData.password, 10);   
    const roles = [
        {
        id : 1,
        name : "customer"
        }
    ];
    const resFromFindOne = {
        ...userData,
        id : userData.id,
        password : userHashedPassword,
        getRoles : async() => Promise.resolve(roles)
    };
    var token = jwt.sign({id : userData.id}, config.secretKey, {
        expiresIn : 86400
    });

    const resFromSignIn = {
        id : userData.id,
        username : userData.username,
        email : userData.email,
        roles : ["ROLE_CUSTOMER"],
        accessToken : token
    };

    it("returning user info with access token", async() => {

        const spyOnFindOne = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve(resFromFindOne));

        await authController.login(req, res);
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalledTimes(1);
        await expect(res.status).toHaveBeenCalledWith(200);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith(resFromSignIn);
    })

    it("user not found", async() => {

        const spyOnFindOne = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve(null));

        await authController.login(req, res);
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();

        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(404);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith({ message: "user not found!!"});
    })

    it("invalid password", async() => {

        const spyOnFindOne = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve(resFromFindOne));

        req.body.password = "somerandompassword";
        await authController.login(req, res);
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();

        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(401);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith({ message: "Invalid password"});
    })

    it("error message from catch block", async() => {

        const spyOnFindOne = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.reject(Error("this is an error")));

        await authController.login(req, res);
        await expect(spyOnFindOne).toHaveBeenCalled();
        await expect(User.findOne).toHaveBeenCalled();

        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(500);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith({ message: "this is an error"});
    })
})