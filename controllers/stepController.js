const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cfg = require('../config');
let connection = mysql.createPool(require('../config').pool);

router.post('/newdata', (req,res)=>{
    let dt = {
        steps: req.body.stepC,
        date: req.body.date
    }
    connection.query('select id from stepdatas where date=? and uid=?', [dt.date, req.session.loggedin], (err,data)=>{
        if (err) res.status(500).send(err.sqlMessage);
        else if (data.length==0) connection.query(`insert into stepdatas values (null,?,?,?)`, [req.session.loggedid, dt.date, dt.steps], (err,data)=>{
            if (err) res.status(500).send(err.sqlMessage);
            req.app.locals.message = ['Successful post!'];
            req.app.locals.type = 'success';
            res.redirect('/newdata');
        });
        else connection.query('update stepdatas set stepcount=stepcount+? where date=? and uid=?', [dt.steps, dt.date, req.session.loggedid], (err,data)=>{
                req.app.locals.message = ['Successfull modification!'];
                req.app.locals.type='warning';
                res.redirect('/newdata');
        });
    })
    
})


module.exports = router;