const express = require('express');
const app = express();
const Sequelize = require('sequelize');

const dbConfig = require('./config/db.config.json');
const env = "development";
const dbSetting = dbConfig[env];

const serverConfig = require('./config/server.config');

const sequelize = new Sequelize(
    dbSetting.database,
    dbSetting.username,
    dbSetting.password,
    dbSetting.dialectInformation
);

app.get('/', (req, res) => {
    res.send('welcome to ecomerce app');
})

app.listen(serverConfig.PORT, async (req, res) => {
      console.log('my server is working');
      try{
          await sequelize.authenticate();
          console.log('connected to db');
      }catch(error){
        console.log('unable to connect to db');
      }
})