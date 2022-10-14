const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const ejs = require('ejs');
const cfg = require('../config');
const sha1 = require('sha1')
let connection = mysql.createPool(require('../config').pool);


router.get('/', (req,res)=>{
    connection.query('select * from users', (err, result)=>{
        if (err) res.status(500).send(err);
        else res.status(200).json(result);
    })
})
router.get('/login', (req,res)=>{
    ejs.renderFile('./views/pages/dash.ejs', ({data:cfg.config}), (err,data)=>{
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    });
})
router.get('/logout', (req,res)=>{
    res.redirect('/')
})

router.post('/reg', (req,res)=>{
    let userdata = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.passwd,
        password2: req.body.passwd2
    };
    let list_of_errors = [];
})


module.exports = router;