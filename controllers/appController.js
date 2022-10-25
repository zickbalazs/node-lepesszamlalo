const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const cfg = require('../config');
const mysql = require('mysql');
let connection = mysql.createPool(require('../config').pool);

router.get('/', (req,res)=>{
    ejs.renderFile('./views/pages/index.ejs', ({data:cfg.config, error:{message:req.app.locals.message, type:req.app.locals.type}}), (err,data)=>{
        if (err){
            console.log(err);
            res.status(500).send(err);
        } 
        else res.status(200).send(data);
    })
})
router.get('/reg', (req,res)=>{
    ejs.renderFile('./views/pages/register.ejs', ({data:cfg.config, errordata:{message:'', type:"danger"}}), (err,data)=>{
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    })
})
router.get('/newdata', (req,res)=>{
    if (req.session.loggedin){
        ejs.renderFile('./views/pages/newdata.ejs', ({data:cfg.config, user:req.session, error:{message:req.app.locals.message,type:req.app.locals.type}}), (err,data)=>{
            if (err) res.status(500).send(err.message);
            else res.status(200).send(data);
        })
    }
    else res.redirect('/')
})
router.get('/mod-profile', (req,res)=>{
    if (req.session.loggedin){
        ejs.renderFile('./views/pages/mod.ejs', ({data:cfg.config, user:req.session, error:{message:req.app.locals.message,type:req.app.locals.type}}), (err,data)=>{
            if (err) res.status(500).send(err.message);
            else res.status(200).send(data);
        })
    }
    else res.redirect('/')
})
router.get('/table', (req,res)=>{
    if (req.session.loggedin){
        console.log(req.session.loggedid)
        connection.query('select * from stepdatas where uid=?', [req.session.loggedid], (err,data)=>{
            if (err) res.status(500).send(err.sqlMessage);
            else{
                console.log(data)
                ejs.renderFile('./views/pages/table.ejs', ({data:cfg.config, tabledata:data, user:req.session, error:{message:req.app.locals.message, type:req.app.locals.type}}), (err, data)=>{
                    if (err) res.status(500).send(err.message)
                    else res.status(200).send(data);
                })
            }
        });
        
    }
    else res.redirect('/');
});
module.exports = router;