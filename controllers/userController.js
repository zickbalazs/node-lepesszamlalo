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
    if (req.session.loggedin){
        ejs.renderFile('./views/pages/dash.ejs', ({data:cfg.config, user:req.session}), (err,data)=>{
            if (err) res.status(500).send(err);
            else res.status(200).send(data);
        });
    }
    else res.redirect('/');
})
router.get('/logout', (req,res)=>{
    req.session.loggedin=false;
    res.redirect('/')
})
router.post('/login', (req,res)=>{
    let userD = {
        email: req.body.email,
        passwd: sha1(req.body.passwd)
    }
    if (userD.email==''||userD.passwd==''||userD.email==null||userD.passwd==null){
        req.app.locals.message = ['Empty fields!'];
        res.redirect('/');
    }
    connection.query('select * from users where email=? and passwd=? and status=1', [userD.email, userD.passwd], (err,data)=>{
        if (err) res.status(500).send(err);
        else {
            if (data.length==0){
                req.app.locals.message = ['No such registration!']
                req.app.locals.type='danger';
                res.redirect('/')
            }
            else{
                req.session.loggeduser = data[0].name;
                req.session.loggedemail = data[0].email;
                req.session.loggedid = data[0].id;
                req.session.loggedin = true;
                req.app.locals.message = ['Successful login!'];
                req.app.locals.type='success';
                res.redirect('/users/login')
            }
        }
    })
})
router.post('/reg', (req,res)=>{
    let userdata = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.passwd,
        password2: req.body.passwd2
    };
    let list_of_errors = [];
    if (userdata.username==''||userdata.email==''||userdata.password==''||userdata.password2=='') list_of_errors.push("Empty fields");
    if (userdata.password!=userdata.password2) list_of_errors.push("Passwords don't match!");
    connection.query('select * from users where email=?', [userdata.email], (err,data)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else if (data.length!=0) list_of_errors.push("Another user was registered with this e-mail address!");
    })
    if (list_of_errors.length!=0) {
        req.app.locals.message = list_of_errors;
        req.app.locals.type = 'danger';
        res.redirect('/')
    }
    else connection.query('insert into users values (null, ?, ?, ?, current_timestamp, null, 1)', [userdata.username, userdata.email, sha1(userdata.password)], (err,data) =>{
        if (err) res.status(500).send(err.sqlMessage);
        else {
            req.app.locals.message = 'Successful registration!';
            req.app.locals.type = 'success';
            res.redirect('/');
        }
    })

})
router.get('/passmod', (req,res)=>{
    if (req.session.loggedin){
        ejs.renderFile('./views/pages/passmod.ejs', ({data:cfg.config, error:{message:req.app.locals.message, type:req.app.locals.type}}), (err, data)=>{
            if (err) res.status(500).send(err);
            else res.status(200).send(data);
        })
    }
    else res.redirect('/');
})

module.exports = router;