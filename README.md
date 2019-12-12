# Express from Scratch

## 1. Install dependencies

Begin by creating the package-json file.
```Javascript
npm init -y
```
Then install the dependencies: express, express-handlebars, nodemon, body-parser, forever, mongoose, and method-override. The syntax for installing express is provided below.
```Javascript
npm i express
```

Express is used as the framework for the web application, express-handlebars is used as the view engine, nodemon automatically reloads the web server whenever a change is made to the code, forever restarts the server if it crashes. body-parser is middleware used for parsing the body of HTTP requests, it is currently included with express and therefore we do not need to install it ourselves.

Remember to add a .gitignore file so that node_modules are not pushed up to github.

## 2. Set up app.js

App.js is set up so that our server can communicate with traffic from the internet. Our first step is to create the app.js file. As we are calling our main file app.js, not index.js, we must change the "main": in line 5 of package.json.
```
"main": "app.js"
```

Then we set up app.js with the following required by our web server, express.
```Javascript
const express = require("express");
const app = express();
const port = 3000;
```

Next we must set up our middleware, which sits between the functions in our app and the database. These have been installed in Step 1 of the setup, and now must be required into app.js and set up.
```Javascript
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

mongoose.connect("mongodb://localhost/CRUDinExpress", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", error => console.log(error));

app.use(methodOverride('_method', { methods: ["POST", "GET"] }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

## 3. Set up the schema and model

Create the directories which will hold our schema and model: 'database' directory in the root, 'models' and 'schemas' directory inside it.

### 3.1 The schema

Create the schema file inside the schemas directory. For a collection called tweets, the schema would be called ```tweets_schema.js```.

The schema file should look like this. Don't forget to export the schema.
```Javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  message: {
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

### 3.2 The model

Create the model file inside the models directory. For a collection called tweets, the model would be called ```tweets_model.js```.

The model file should look like this. Don't forget to export the model. In the variable declaration for TweetModel, the first argument ('tweet') refers to the name of the collection this is a model for.
```Javascript
const mongoose = require("mongoose");
const TweetSchema = require("./../schemas/tweets_schema");

const TweetModel = mongoose.model("tweet", TweetSchema);

module.exports = TweetModel;
```

## 4. Setting up the structure

Our application will use MVC architecture. This section will focus on setting up the controller and routes, which are necessary for every function. Views and the logic specific to each function will be described in the following section.

### 4.1 The controller

First we create a new directory to hold our controller, then the controller ```tweets_controller.js``` itself.

Before we write any functions, we must require in any models we will be using. For the tweets controller, we will be using the tweets model at the very least.
```Javascript
const TweetModel = require("./../database/models/tweets_model");
```

### 4.2  The routes

Create a file called routes.js in the root of the project. We must require express into this file and set up a variable called router. We must also require in the controller(s) we will be using to have access to their methods. For now we only have a tweets controller, but if we had more we would require those too.
```Javascript
const express = require('express');
const router = express.Router();
const TweetsController = require("./controllers/tweets_controller");
```

Although we do not have any routes yet, we export them for use later.
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

## 8. Normalising

Normalising is the process of linking two collections. Although MongoDB is a document (i.e. non-relational) database, collections may still be linked so that one collection can be called via another using syntax similar to relational databases. E.g.

> tweet.user.name

The logic of normalising is:
- add the users into the tweets schema
- update controller to pass users to the view
- add a dropdown of users to the form to create tweets
- update create function to accept the new user information from the form
- update show to display the new user information

### 8.1 Add key to schema

A key for the second collection must be added to the first. In our example above, we want to associate the user collection with the tweet collection, so we must add the user key into the tweet schema.

```Javascript
user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
}
```

### 8.2 Update tweetForm method to pass users information to the view

We want the view to be able to render a dropdown of all users in our database, so that new tweets can be associated with an existing user.

The method we are using to display our form should look like the following:
```Javascript
const tweetForm = async (req, res) => {
    const users = await UserModel.find().select("_id name");
    res.render('tweets/form', { users });
}
```

### 8.3 Add dropdown of users to the form

We iterate over the user object passed from the controller and show the names in a dropdown. Note that the value passed back to the controller from the form is the _id of the user, not the user's name itself.
```HTML
<div>
    <label for="user">User</label>
    <select name="user">
        {{#each users}}
        <option value="{{this._id}}">{{this.name}}</option>
        {{/each}}
    </select>
</div>
```

### 8.4 Update create function to use the new user information

We must now update the ```create``` method in the ```tweets_controller``` to enter the user information.

```Javascript
const create = async (req, res) => {
    let { message, user } = req.body;
    await TweetModel.create({ message, user });
    res.redirect('/tweets');
}
```

### 8.5 Update show method in the tweets controller

We must pass the user information to the view from the controller so we can show the user on the show page for tweets. To do this we use  ```.populate("user")``` to make an additional query for the user related to the tweet found with ```.findByIdP(id)```.

```Javascript
const show = async (req, res) => {
    let id = req.params.id;
    let tweet = await TweetModel.findById(id).populate("user");
    res.render('tweets/show', { tweet, id });
}
```

### 8.6 Update the show view to display the user information

The final step is to display the user on the view for tweets. Because we have set up the association in the tweet schema, we can call for the user through the tweet like so:
```Javascript
{{tweet.user.name}}
```
Note that we only passed tweet to the view from the show, not user, but because of normalisation we have access to the user associated with tweet.

## 9. Denormalising

Denormalising is the process of embedding one schema inside another. This is useful when one collection will never be accessed without another. In our example, we are embedding a comments schema inside tweets because comments will never be accessed independently of tweets.

### 9.1 Set up the schema for the embedded resource

As we will be creating a new collection, we must create a new schema. In our case the schema is simple as our comments will only have a single key, called comment.

```Javascript
const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    }
})
```

### 9.2 Embed the secondary schema in the primary schema

Comments will be embedded within tweets. The following is placed in the tweets schema file:
```Javascript
comments: [CommentSchema]
```

### 9.3 Create form for comments

This form exists on the show page for tweets. The form consists of a single textarea which passes its value under the key 'comment' to the create function.

```HTML
<h3>Write a comment</h3>
<form method="POST" action="/tweets/comments/{{tweet._id}}">
    <textarea name="comment"></textarea>
    <input type="submit" value="Post"/>
</form>
```

### 9.4 Create a comments controller and create method for comments

Firstly create a comments controller in the controllers directory with the other controllers. As there is no comments model, we require in the tweets model because our comments are embedded in tweets.

The create method must find the correct tweet because each comment is associated with an individual tweet. Then each comment is pushed onto the comments array. This is possible because we set up the comments in the tweets schema as an array: ```comments: [CommentSchema]```.

```Javascript
const create = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const tweet = await TweetModel.findById(id);

    tweet.comments.push({ comment });
    await tweet.save();

    res.redirect(`/tweets/${id}`);
}
```

### 9.5 Create the route

The route must lead to the create method in the step above. It must also correspond with the ```action``` in the form from step 9.3. Don't forget to export the create method in the comments controller.

```Javascript
router.post("/tweets/comments/:id", CommentsController.create);
```

### 9.6 Display the comments

The last step is to show the comments. As our comments are embedded inside tweets, we do not need to modify the show method in the tweets controller because the tweets object is already being passed. We can simply iterate over the object and read off the new 'comments' key.

```Javascript
<ul>
    {{#each tweet.comments}}
    <li>{{this.comment}}</li>
    {{/each}}
</ul>
```