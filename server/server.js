var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var router = require ('./router');
var path = require('path');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '/')));


router(app);

var port = process.env.PORT || 3090;
app.listen(port);
console.log('Server listening on port:',port);
