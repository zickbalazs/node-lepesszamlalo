const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const cfg = require('../config')
router.get('/', (req,res)=>{
    console.log(req.app.locals.message)
    console.log(req.app.locals.type)
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


module.exports = router;