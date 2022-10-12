const express = require('express');
const mysql = require('mysql');
const router = express.Router();
let connection = mysql.createPool(require('../config').pool);


router.get('/', (req,res)=>{
    connection.query('select * from users', (err, result)=>{
        if (err) res.status(500).send(err);
        else res.status(200).json(result);
    })
})



module.exports = router;