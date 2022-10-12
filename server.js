//modules
const express = require('express');
const path = require('path');
const session = require('express-session');

//server data
const port = require('./config').port,
      appconfig = require('./config').config;

//controllers
const userController = require('./controllers/userController'),
      stepController = require('./controllers/stepController'),
      appController = require('./controllers/appController')

let app = express();

app.use(session({secret:'secret',resave:true,saveUninitialized:true}));
app.use(express.urlencoded({extended:true}));
app.use('/js', express.static(path.join(__dirname, './web/js/')))
app.use('/bootstrap', express.static(path.join(__dirname, './node_modules/bootstrap/dist')))
app.use('/assets', express.static(path.join(__dirname, './assets/')))
app.use('/users', userController);
app.use('/stepdatas', stepController);
app.use('/', appController);

app.listen(port, console.log('listening on http://localhost:'+port));