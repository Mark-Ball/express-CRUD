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