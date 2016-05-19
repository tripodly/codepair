const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require ('./router');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(path.join(__dirname, '../client')));

router(app);

const port = process.env.PORT || 3090;
app.list(port);
console.log('Server listening on port:',port);
