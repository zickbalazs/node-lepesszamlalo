const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const cfg = require('../config')

router.get('/', (req,res)=>{
    ejs.renderFile('./views/pages/index.ejs', ({data:cfg.config}), (err,data)=>{
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    })
})
router.get('/reg', (req,res)=>{
    ejs.renderFile('./views/pages/register.ejs', ({data:cfg.config}), (err,data)=>{
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    })
})


module.exports = router;