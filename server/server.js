const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.port || 3000;

app.use(morgan('short'));
app.listen(port);
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

var routes = require("./router");
routes(app)