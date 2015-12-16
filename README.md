# generator-angular-flow

Improve productivity and consistency on your AngularJS projects.  
Designed for large multi-module ng apps.  
Uses: angular, webpack, sass, ui-router, ui-bootstrap, angular-modals.

## Features
- easily create multiple angular modules in your project
- each [module](#module) can have it's own states, components, services, directives, modals, filters etc. 
- angular-flow [components](#component) are inspired by web components so they group .js, .html, .scss files in one place.
- easy create nested ui-router [states](#state) in modules
- use scripts for running dev server with live reload or for building for production


Author: [Piotr Błaszczak](https://github.com/myflowpl)


## Instalation
first make sure you have installed `NodeJS`(tested on v4.2.0) with `npm` (tested on v2.14.7)
then you have to install:

yeoman
```bash
npm install -g yo
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

Run `npm run start`  
and go to `localhost:8080/` to see the app running with live reload

Now you are ready to start developing your app.

## Scripts
Helpful scripts ready for you to start your work

    npm run start   to watch files for changes and build for dev.
    npm run watch    watch for changes and build it to /dist/.
    npm run build    build for production to /dist/.

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

This generator wil create the project and default module "app" with all basic configuration


### Module
When you generate your app with ```yo angular-flow``` command you will have "app" module created so you can put your states, components and other stuff there  
but when your application grows, it's better to separate some functionality to other modules  
for this task we can se ```yo angular-flow:module {moduleName}``` command

This generator creates new module in ```/public/src``` 

Example:
```bash
yo angular-flow:module user
```
will generate ```/public/src/user/user-module.js``` 

### State
Creates new ui-router state in module.  
The argument should require the path of the state

**notice: the path should start with module name, otherwise you will get module not found error**

Example:
```bash
yo angular-flow:state user user;
```
creates
```
public/src/user/_states/user/user-state.js
public/src/user/_states/user/user-state.html
public/src/user/_states/user/user-state.scss
```

you can create another nested state
```bash
yo angular-flow:state user user.login;
```
creates
```
public/src/user/_states/user/login/user-login-state.js
public/src/user/_states/user/login/user-login-state.html
public/src/user/_states/user/login/user-login-state.scss
```

### Component
A component is basically a element directive that by convention keeps all js,html and css files in one place.  
This helps keep complexity low, and makes it easy to separate parts of your application into smaller and more maintainable parts.

Example:
```bash
yo angular-flow:component user login
```
Produces these files:
```
public/src/user/components/login/login.js
public/src/user/components/login/login.html
public/src/user/components/login/login.scss
```

Witch in turn lets you specify custom HTML tags like this to invoke a completely self contained component:
```html
<login></login>
```

The view has specified a component name as a class, helping you avoid CSS collisions.  
Specify your styles specific for this component in SCSS under a ```.login``` class wrapper,
and only this component is targeted. 
This is an OK approach until shadow DOMs and web components become widely supported.

### Modal
Similar to components but uses ```angular-modals``` module to register ui-bootstrap modal
Example:
```bash
yo angular-flow:modal user login
```
Produces these files:
```
public/src/user/modals/login-modal/login-modal.js
public/src/user/modals/login-modal/login-modal.html
public/src/user/modals/login-modal/login-modal.scss
```
now to open the modal use `modal` directive
```html
<button modal="login">login</button>
```
or `$modals` service
```javascript
$modals.open('login').then(function(user){
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
yo angular-flow:service user auth
```

Produces `public/src/user/services/auth-srv.js`:

and you can inject it with name `authSrv`

### Resource
Generates an restmod resource in module.

Example:
```bash
yo angular-flow:resource user profile
```

Produces `public/src/user/resources/profile-res.js`:

and you can inject it with name `profileRes`

### Directive
Generates an AngularJS directive in module.

Example:
```bash
yo angular-flow:directive user status
```

Produces `public/src/user/directives/status-directive.js`:

and you can use it like `<div status="off"></div>`

### Filter
Generates an AngularJS filter in module.

Example:
```bash
yo angular-flow:service user user-name
```

Produces `public/src/user/filters/user-name-filter.js`:

and you can inject it with name `{{user.id|userName}}`


## TODO
- generate doc-blocks
- generate tests
- generate mocks

# License

[BSD license](http://opensource.org/licenses/bsd-license.php)
