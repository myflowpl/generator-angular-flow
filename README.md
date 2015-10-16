# generator-angular-flow

Improve productivity and consistency on your AngularJS projects.  
Designed for large multi-module ng apps.  
Uses: Webpack, sass, ui-router, ui-bootstrap.

## Features
- easily create multiple angular modules in your project
- each [module](#module) can have it's own states, components, services, directives, modals, filters etc. 
- angular-flow [components](#component) are based on web components so they group .js, .html, .scss files in one place.
- easy create nested ui-router [states](#state)
- start ```webpack-dev-server``` for development with live reload

## TODO
- generate doc-blocks
- generate tests
- generate mocks

Author: [Piotr Błaszczak](https://github.com/myflowpl)


# Instalation
install node.js with npm
then install yeoman
```
npm install -g yo
```

then run:
```
npm install -g generator-angular-flow
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project
cd my-new-project
```

Run `yo angular-flow`, with your application name:
```
yo angular-flow
```

Run `npm run server` to start the local server.

OR

Run `npm run watch` if you use your own web serwer (apache, nginx etc.)


# Development

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
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also installs Twitter Bootstrap and additional AngularJS modules.

Example:
```bash
yo angular-flow
```

### Module
`public/config/module-tpl.js` contains the applications main module definition. All dependancies for your application needs to be specified here.

### State
States are located under `public/states`. A state basically is a controller, with a view and state specific styling. Routes are specified using the powerful Angular-UI Route API in the config section in the controller.

Example:
```bash
yo angular-flow:state user
```

Produces `public/states/user/user-state.js`, `public/states/user/user-state.html` and `public/states/user/_user-state.scss`

### Component
A component is basically a element directive that by convention use a view located in `public/components/<component-name>/<component-name>.html`.
This helps keep complexity low, and makes it easy to separate parts of your application into smaller and more maintainable parts.

Example:
```bash
yo angular-flow:component awesomeUnicorn
```
Produces these files:
`public/components/navbar.js`:
```javascript
angular.module('yourModule')
    .directive('navbar', function () {
            return {
                restrict: 'E',
                restrict: true,
                templateUrl: '/components/navbar/navbar.html',
                controller: 'navbarComponent'
            };
        })

        .controller('navbarComponent', function ($scope) {

        });
```
`public/components/navbar/_navbar.scss` (and adds an import statement to it in `public/styles/_components.scss`)
`public/components/navbar/navbar.html`
```
<div class="navbar-comp">
    <p>This is the navbar component.</p>
</div>
```

Witch in turn lets you specify custom HTML tags like this to invoke a completely self contained component:
```
<navbar></navbar>
```

The view has specified a component name as a class, helping you avoid CSS collisions. Specify your styles specific for this component in SCSS under a ```.navbar-comp``` class wrapper, and only this component is targeted. This is an OK approach until shadow DOMs and web components become widely supported.

### Modal

### Service
Generates an AngularJS service.

Example:
```bash
yo angular-flow:service myService
```

Produces `public/scripts/services/my-service.js`:
```javascript
angular.module('myMod').service('myService', function () {
  // ...
});
```

### Resource
Generates an AngularJS $resource instance.

Example:
```bash
yo angular-flow:resource myResource
```

Produces `public/scripts/resources/my-resource.js`:
```javascript
angular.module('myMod').factory('MyResource', function ($resource, apiBaseUrl) {
  // ...
});
```
### Directive
Generates a directive in `public/scripts/directives`.

Example:
```bash
yo angular-flow:directive myDirective
```

Produces `public/scripts/directives/my-directive.js`:
```javascript
angular.module('myMod').directive('myDirective', function () {
  return {
    template: '<div></div>',
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      element.text('this is the myDirective directive');
    }
  };
});
```

### Filter
Generates a filter in `public/scripts/filters`.

Example:
```bash
yo angular-flow:filter myFilter
```

Produces `public/scripts/filters/my-filter.js`:
```javascript
angular.module('myMod').filter('myFilter', function () {
  return function (input) {
    return 'myFilter filter:' + input;
  };
});
```

## Externals

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
