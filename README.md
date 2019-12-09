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

Express is used as the framework for the web application, express-handlebars is used as the view engine, nodemon automatically reloads the web server whenever a change is made to the code. body-parser is middleware used for parsing the body of HTTP requests, it is currently included with express and therefore we do not need to install it ourselves.

Remember to add a .gitignore file so that node_modules are not pushed up to github.