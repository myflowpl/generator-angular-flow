# generator-angular-flow

Improve productivity and consistency on your AngularJS projects.  
Designed for large multi-module ng apps.  
Uses: angular, webpack, sass, ui-router, ui-bootstrap, angular-modals.

## Features
- easily create multiple angular modules in your project
- each [module](#module) can have it's own states, components, services, directives, modals, filters etc. 
- angular-flow [components](#component) are based on web components so they group .js, .html, .scss files in one place.
- easy create nested ui-router [states](#state) in modules
- start ```webpack-dev-server``` for development with live reload

## TODO
- generate doc-blocks
- generate tests
- generate mocks

Author: [Piotr Błaszczak](https://github.com/myflowpl)


## Instalation
first make sure you have installed node.js with npm
then you have to install:

yeoman
```bash
npm install -g yo
```

webpack
```bash
npm install webpack -g
npm install webpack-dev-server -g
```

angular-flow generaotr
```bash
npm install -g generator-angular-flow
```

## create new project
Make a new directory, and `cd` into it
```
mkdir my-new-project
cd my-new-project
```

generate new app
```
yo angular-flow
```

Run `npm run watch` and go to localhost:8080 to see the app running with live relad

Now you are ready to start developing your app.

## Scripts
Helpful scripts ready for you to start your work

    npm run watch   to watch files for changes and build for dev.
    npm run server  to run a dev server.
    npm build       build for production.

## Generators

Available generators:

* [angular-flow](#app) (aka [angular-flow:app](#app))
* [angular-flow:module](#module)
* [angular-flow:state](#state)
* [angular-flow:component](#component)
* [angular-flow:modal](#modal)
* [angular-flow:service](#service)
* [angular-flow:resource](#resource)
* [angular-flow:directive](#directive)
* [angular-flow:filter](#filter)

**Note: Generators are to be run from the root directory of your app.**

### App
Sets up a new AngularJS app, 
generating all the boilerplate you need to get started. 
The app generator will gide you through the process with questions.

Example:
```bash
yo angular-flow
```
it will generate files required to develop, build and run your app  
you should look to ```/public/src``` becourse there you will be doing your work

### Module
This generator creates new module in ```/public/src``` 

Example:
```bash
yo angular-flow:module user
```
will generate ```/public/src/user/user-module.js``` 

### State
Creates new ui-router state in module.  
The argument should require the path of the state

*notice: the path should start with module name, otherwise you will get module not found error*

Example:
```bash
yo angular-flow:state user;
```
creates
```
public/src/user/_states/user-state.js
public/src/user/_states/user-state.html
public/src/user/_states/user-state.scss
```

you can create another nested state
```bash
yo angular-flow:state user/login;
```
creates
```
public/src/user/_states/login/user-login-state.js
public/src/user/_states/login/user-login-state.html
public/src/user/_states/login/user-login-state.scss
```

### Component
A component is basically a element directive that by convention keeps all js,html and css files in one place.  
This helps keep complexity low, and makes it easy to separate parts of your application into smaller and more maintainable parts.

Example:
```bash
yo angular-flow:component user/login
```
Produces these files:
```
public/src/user/login/user-login.js
public/src/user/login/user-login.html
public/src/user/login/user-login.scss
```

Witch in turn lets you specify custom HTML tags like this to invoke a completely self contained component:
```html
<user-login></user-login>
```

The view has specified a component name as a class, helping you avoid CSS collisions.  
Specify your styles specific for this component in SCSS under a ```.user-login``` class wrapper,   
and only this component is targeted. 
This is an OK approach until shadow DOMs and web components become widely supported.

### Modal
Similar to components but uses ```angular-modals``` module to register ui-bootstrap modal
Example:
```bash
yo angular-flow:modal user/login
```
Produces these files:
```
public/src/user/login-modal/user-login-modal.js
public/src/user/login-modal/user-login-modal.html
public/src/user/login-modal/user-login-modal.scss
```
now to open the modal use `modal` directive
```html
<button modal="user-login">login</button>
```
or `$modals` service
```javascript
$modals.open('user-login').then(function(user){
    // user was logged in
}, function(error){
    // modal closed or dismised
});
```
check the [angular-modals](https://github.com/myflowpl/angular-modals) documentation for more info how to use it

### Service
Generates an AngularJS service in module.

Example:
```bash
yo angular-flow:service user/auth
```

Produces `public/src/user/_services/auth-srv.js`:

and you can inject it with name `authSrv`

### Resource
Generates an restmod resource in module.

Example:
```bash
yo angular-flow:resource user/profile
```

Produces `public/src/user/_resource/profile-res.js`:

and you can inject it with name `profileRes`

### Directive
Generates an AngularJS directive in module.

Example:
```bash
yo angular-flow:directive user/status
```

Produces `public/src/user/_directives/status-directive.js`:

and you can use it like `<div status></div>`

### Filter
Generates an AngularJS filter in module.

Example:
```bash
yo angular-flow:service user/user-name
```

Produces `public/src/user/_filters/user-name-filter.js`:

and you can inject it with name `{{user.id|userStatus}}`

## Externals TODO

The following packages can be required by the [module](#module) generator:

* angular-animate
* angular-ui-router
* angular-promise-tracker
* angular-loading-bar
* angular-ui-bootstrap
* angular-cookies
* angular-loader
* angular-touch
* angular-resource
* angular-sanitize
* ngStorage

# License

[BSD license](http://opensource.org/licenses/bsd-license.php)
