const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const routes = require('./routes')
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/CRUDinExpress", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", error => console.log(error));

const methodOverride = require('method-override');
app.use(methodOverride('_method', { methods: ["POST", "GET"] }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => { console.log(`Listening on port ${port}`) })