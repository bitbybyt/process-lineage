const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// app.use(express.bodyParser({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
const router = require('./route/router');
const mongoose = require('mongoose');
mongoose
	.connect('mongodb://localhost/demomanufacture', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Connected to mongodb....'))
	.catch((err) => console.log('Error:' + err));

app.use('/api', router);
app.listen(5000);
