
const express = require('express'), path = require('path'), fs = require('fs'), mysql = require('mysql'), cors = require('cors'), sha1 = require('sha1'), config = require('./config'), moment = require('moment');
let app = express(),
    session = require('express-session'),
    pool = mysql.createPool(config.pool);





app.listen(config.port, console.log('listening on http://localhost:8080'));