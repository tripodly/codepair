var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var app = express();
var router = require('./router');
var path = require('path');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '/')));

router(app);

var port = process.env.PORT || 3090;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(port);
console.log('Server listening on port:',port);

module.exports = {
	io: io
};

var socketController = require('./controllers/socketController');