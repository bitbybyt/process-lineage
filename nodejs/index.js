const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const router = require('./route/router');
const mongoose = require('mongoose');
mongoose
	.connect('mongodb://localhost/demomanufacture')
	.then(() => console.log('Connected to mongodb....'))
	.catch((err) => console.log('Error:' + err));

app.use('/api', router);
app.listen(5000);
