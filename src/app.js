const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exampleRouter = require('./routers/example.router');
const AmazonTracking = require('./services/AmazonTracking')
const app = express();
const port = 3000;


dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const amazonTracking = new AmazonTracking(process.env.TIME)


// cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
/*app.use('/', exampleRouter);*/

app.listen(port, (err) => {
	if (err) {
		return console.error(err);
	}
	return console.log(`server is listening on ${port}`);
});



amazonTracking.checkProducts()
