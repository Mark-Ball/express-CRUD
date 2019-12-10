# Express from Scratch

## 1. Install dependencies

Begin by creating the package-json file.
```Javascript
npm init -y
```
Then install the dependencies: express, express-handlebars, nodemon, body-parser, and forever. The syntax for installing express is provided below.
```Javascript
npm i express
```

Express is used as the framework for the web application, express-handlebars is used as the view engine, nodemon automatically reloads the web server whenever a change is made to the code, forever restarts the server if it crashes. body-parser is middleware used for parsing the body of HTTP requests, it is currently included with express and therefore we do not need to install it ourselves.

Remember to add a .gitignore file so that node_modules are not pushed up to github.

## 2. Set up app.js for basic functionality

App.js is set up so that our server can communicate with traffic from the internet. Our first step is to create the app.js file. As we are calling our main file app.js, not index.js, we must change the "main": in line 5 of package.json.
```JSON
"main": "app.js"
```

Then we set up app.js with the following:
```Javascript
const express = require("express");
const app = express();
const port = 3000;
```

Then set up a basic route at the root to send back "Hello world":
```Javascript
app.get("/", (req, res) => {res.send("Hello world")})
```

Then set up the app to listed on a port:
```Javascript
app.listen(port, () => { console.log(`Listening on port ${port}`) })
```

Lastly, modify package.json with the script which will be used to run the server.
```JSON
"scripts": {
    "dev": "forever -c \"nodemon --exitcrash -L\" app.js"
},
```
The server can be run using:
```Javascript
npm run dev
```

## 3. Setting up the structure

Our application will use MVC architecture. For this we need to create:
- routes
- models
- views
- controller(s)

For now, we will set up our app without a database, and add MongoDB later. This means we will not worry about the models for now.

### 3.1 Routes

Create a file called routes.js. To start with, we will set up an 'index route' to show all of our tweets (although right now we don't have any).

Firstly we must require some files into routes.js:
```Javascript
const express = require('express');
const router = express.Router();
const TweetsController = require("./controllers/tweets_controller");
```
Note that we have not created tweets_controller yet, but we will.

We set up our routes using the same basic formula:
```
router.{verb}({path}, {method})
```
For our index route, we will use:
```Javascript
router.get("/tweets", TweetsController.index)
```

We export our routes so they may be used in app.js.
```Javascript
module.exports = router;
```

Lastly we must modify app.js to use the routes. Firstly we require the routes in.
```Javascript
const routes = require('./routes')
```
Secondly we use the routes.
```Javascript
app.use(routes)
```

### 3.2 Controller

First we create a new directory to hold our controller, then the controller (tweets_controller.js) itself.

In tweets_controller.js we declare the variable which will hold all our tweets.
```Javascript
let tweets = [];
```
Then we can write the functions which will be called by routes.js. For now, we need to write an index function to display all our tweets.
```Javascript
const index = (req, res) => {
    res.render('tweets/index', { tweets });
}
```
Lastly we must export the index function so it is available in the routes.
```Javascript
module.exports = {
    index
}
```

### 3.3 Views

For views, we are implementing handlebars. In app.js, include the following at the top of the script.
```Javascript
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
```
And below that, include the following:
```Javascript
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```
We also need to add the directory structure required by handlebars:
app.js
└── views
    ├── tweets
    |   └──index.handlebars
    └── layouts
        └── main.handlebars

Main.handlebars is filled with the following boilerplate:
```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    {{{body}}}
</body>

</html>
```

## 4. Show method

Setting up the show method is more complex than index because we must handle the params variable to make sure we are showing the correct tweet. We need to create the following:
- a route
- the show page (with handlebars)
- the show method in the controller

### 4.1 The route

In router.js:
```Javascript
router.get("/tweets/:id", TweetsController.show);
```

### 4.2 The Show method

Our show method uses the params which are automatically passed in the req object. In this case, our route has a wildcard (:id) which is intended to be a number. We have used the name id, so the value will come through in params as a key-value pair with the key of id:
```
params: { id: 1 }
```

The id value in params can then be used to access the correct object inside the tweets array. Lastly, the tweet and the id are passed to the view.

In tweets_controller.js:
```Javascript
const show = (req, res) => {
    let tweet = tweets[req.params.id];
    let id = req.params.id;
    res.render('tweets/show', { tweet, id });
}
```

Remember to add 'show' to the list of exported functions.

### 4.3 The Show page

The most basic implementation of the show page simply displays the information from the tweet which was passed to it from the Show method of the tweets controller. Handlebars double-curly-brace notation is used to access the variables passed, like so:
```
{{tweet.tweet}} - {{tweet.name}}
```

## 5. Delete method

Setting up the delete the put/patch methods is more complex than setting up the show method because we must handle overriding methods in our HTML forms. We must do this because HTML5 does not recognise DELETE, PUT or PATCH has methods.



## 6. Update method

## 7. Implement MongoDB

To implement MongoDB we will follow these steps:
- create the database (use CRUDinExpress)
- install the mongoose dependency and add the extra code into app.js
- create the schema
- create the model
- set up the controller to use the model

### 7.1 Create the database

I did this in the shell, although it could be done programatically.

> mongod
> mongo
> use CRUDinExpress

### 7.2 Install mongoose

Install mongoose dependencies
> npm i mongoose --save

Add code to app.js
```Javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contact_app", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", error => console.log(error));
```

### 7.3 Create the schema

Create the database directory, with the schemas directory inside of it, with the schema file inside of that.
> tweets_schema.js

Inside tweets_schema.js:

```Javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  tweet: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = ContactSchema;
```

### 7.4 Create the model

Create a directory for models inside the database directory. Inside the new directory, create the model file tweets_model.js.

Put the following inside tweets_model.js.

```Javascript
const mongoose = require("mongoose");
const TweetSchema = require("./../schemas/tweets_schema");

const TweetModel = mongoose.model("tweet", TweetSchema);

module.exports = TweetModel;
```

### 7.5 Set up the controller to use the model

Require in the model:
```Javascript
const TweetModel = require("./../database/models/tweets_model");
```

Modify the methods to read, create, update, or delete from the database instead of an array.