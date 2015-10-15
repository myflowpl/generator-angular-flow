GENERATOR-ANGULAR-FLOW

Avoid boilerplate and improve productivity and consistency.

NOTICE
to use 1 beta version besed on grunt install:
```
npm install -g generator-angular-flow@0.0.3

```
to use 2 beta version based on gulp install:
```
npm install -g generator-angular-flow@0.1.1

```

currently at master we develop 0.2.0 beta version based on webpack
```
npm install -g generator-angular-flow@0.2.*

```

<br><br><br>
<br>
<br><br><br>
<br>
## Features
- All scripts in `public/scrips`, `public/components`, `public/modals` and `public/states` and styles in `public/styles` will be automatically included in minifiers, index.html and tests. Specify configuration once and share it between *all the things*. Need more control? Check out [resources.json](#resources.json).
- Controllers, views and styling are grouped on a per component and state basis to facilitate high cohesion.
- Use [components](#component) as syntactic sugar to use directives as web components with a convention over configuration approach
- Start a server with live reload, easily monitoring your progress with ```grunt server```

### Roadmap:
- generate docs
- generate tests

Maintainer: [Piotr Błaszczak](https://github.com/myflowpl)
inspired by [angular-xl](https://github.com/kennethlynne/generator-angular-xl).

-----

## Quick start
FIRST!!!
install node.js with npm
install ruby, sass, compass
then install yeoman
```
npm install -g yo

```
then install bower
```
npm install -g bower

```
then install grunt
```
npm install -g grunt-cli

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
yo angular-flow app-name
```

Run `grunt server` to start the local server.

OR

Run `grunt` if you use your own web serwer (apache, nginx etc.)


# Developing with the generator

## Available Grunt tasks

```shell
grunt (default)     to watch files for compass and live reload.
grunt server        to run a test server with live reload.
grunt server-dist   to run a test server of builded version of your app.
grunt link          links newly added files (css, js) to index.html
```

## Generators

Available generators:

* [angular-flow](#app) (aka [angular-flow:app](#app))
* [angular-flow:controller](#controller)
* [angular-flow:directive](#directive)
* [angular-flow:component](#component)
* [angular-flow:modal](#modal)
* [angular-flow:filter](#filter)
* [angular-flow:state](#state)
* [angular-flow:service](#service)
* [angular-flow:resource](#resource)

**Note: Generators are to be run from the root directory of your app.**

### Module
`public/config/module.js` contains the applications main module definition. All dependancies for your application needs to be specified here.

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also installs Twitter Bootstrap and additional AngularJS modules.

Example:
```bash
yo angular-flow
```

### State
States are located under `public/states`. A state basically is a controller, with a view and state specific styling. Routes are specified using the powerful Angular-UI Route API in the config section in the controller.

Example:
```bash
yo angular-flow:state user
```

Produces `public/states/user/user-state.js`, `public/states/user/user-state.html` and `public/states/user/_user-state.scss`

### Routing
Routes are configured in `public/config/routes.js`. Each individual controller registers its own route.

### Controller
Generates a controller in `public/scripts/controllers`.

Example:
```bash
yo angular-flow:controller user
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

### Resources
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

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* [log](http://adamschwartz.co/log/)
* angular-animate
* angular-ui-router
* angular-promise-tracker
* angular-loading-bar
* angular-ui-bootstrap

The following additional modules are optional:

* angular-cookies
* angular-loader
* angular-touch
* angular-resource
* angular-sanitize
* ngStorage

All of these can be updated with `bower update` as new versions of AngularJS are released.
When you install new dependancies you have to add a reference to the script files in `resources.json` under ```external```. The build task will inject this into `index.html` during runtime, and when you build the project it will by convention use the minified version of the source file, that should be located in the same folder, with the exact same filename with a `.min` suffix. This will be concatenated without minification.

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

### Output
You can change the `app` directory by adding a `appPath` property to `bower.json`. For instance, if you wanted to easily integrate with Express.js, you could add the following:

```json
{
  "name": "yo-test",
  "version": "0.0.0",
  ...
  "appPath": "public"
}

```
This will cause Yeoman-generated client-side files to be placed in `public`.

## Resources.json
All configuration about what files and in what order the files are supposed to be loaded is specified in ```resources.json```.
This configuration is shared between both jasmine, minifiers and index.html.

Resource.json contains two sections. One for JS and one for SCSS.
```
"config/routes.js",
"scripts/**/*.js"
```
Files will be matched only once, so in the aforementioned example the routes config will be loaded before everything else is included.

Add a reference in resource to the **unminified** version of the library you want to use, as it will automatically use the library suffixed with `.min` during build time.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
