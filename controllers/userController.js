const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const ejs = require('ejs');
const cfg = require('../config');
const sha1 = require('sha1');
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
    if (userdata.username==null||userdata.email==null||userdata.password==null||userdata.password2==null) list_of_errors.push("Empty fields");
    if (userdata.password!=userdata.password2) list_of_errors.push("Passwords don't match!");
    connection.query('select * from users where email=?', [userdata.email], (err,data)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else if (data.length!=0) list_of_errors.push("Another user was registered with this e-mail address!");
    })
    if (list_of_errors.length!=0) {
        res.status(206).send(list_of_errors)
    }
    else connection.query('insert into users values (null, ?, ?, ?, current_timestamp, null, 1)', [userdata.username, userdata.email, sha1(userdata.password)], (err,data) =>{
        if (err) res.status(500).send(err.sqlMessage);
        else {
            res.redirect('/');
        }
    })

})


module.exports = router;