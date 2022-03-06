# OurRecipes

A Node.js MVC web application where users can share their favorite recipes. The application allows authenticated users to do basic CRUD operations on their recipes as well as make comments on others' recipes. Unauthenticated users can view all recipes shared on the application.


## Requirements

For development, you will need to have the followings installed:
* Node.js
* npm
* MongoDB


## Install

    $ git clone https://github.com/niubuihong1/recipe-app
    $ cd recipe-app
    $ npm install


## Running the project
To run the project in development mode with debug logs and auto-restart on file change (recommended):

    $ npm run serverstart

Or, with auto-restart and no debug logs:

    $ npm run devstart

Or, with no auto-restart and no debug logs:

    $ npm start
    

## Project structure
* App
  * **bin/www** application entry point
  * **app.js** Express entry point (application "real" entry point)
  * **routes/** routes folder
    * **index.js**
    * **recipes.js**
    * **reviews.js**
    * **users.js**
  * **controllers/** controller folder
    * **recipes.js**
    * **reviews.js**
    * **users.js**
  * **views/** view template folder
    * **home.ejs** 
    * **error.ejs**
    * **recipes/**
      * **index.ejs**
      * **show.ejs**
      * **new.ejs**
      * **edit.ejs**
    * **users/**
      * **register.ejs**
      * **login.ejs**
    * **layouts/** boilerplate view template
      * **boilerplate.ejs**
    * **partials/** partials to be included in boilerplate
      * **flash.ejs**
      * **footer.ejs**
      * **navbar.ejs**
  * **models/** model folder
    * **recipe.js**
    * **review.js**
    * **user.js**

  * **public/**
    * **javascripts/validateForms.js** script needed to run Bootstrap front-end form validation logic
  * **utils/** utility folder
    * **catchAsync.js** function to catch database async error
  * **middleware.js** middleware functions for authentication, authorization, and form data validation
  * **schemas.js** Joi validation schemas

* Configuration files
  * **package.json** npm options and scripts