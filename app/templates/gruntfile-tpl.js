// Generated using generator-angular-flow - https://github.com/myflowpl/generator-angular-flow
"use strict";
var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var includes = require('./resources.json');

    var yeomanConfig = {
        app: require('./bower.json').appPath || 'public',
        dist: require('./bower.json').distPath || 'public/dist'
    };

    var externalJsSrc = [];
    var externalJsMin = [];

    includes.javascript.external.map(function (path) {
        if (typeof path === 'object') {
            if(path.min) {
                externalJsMin.push(yeomanConfig.app + '/' + path.min);
            } else {
                externalJsSrc.push(yeomanConfig.app + '/' + path.src);
            }
            return path;
        }
        path = yeomanConfig.app + '/' + path;
        var pathMin = path.replace(/(\.js|\.src.js)/, ".min.js");
        if (fs.existsSync(pathMin)) {
            externalJsMin.push(pathMin);
        } else {
            externalJsSrc.push(path);
        }
        return path;
    });

    var externalJsExcludeFromBuild = includes.javascript.externalExcludeFromBuild.map(function (path) {
        return '!' + yeomanConfig.app + '/' + path;
    });

    var appJs = includes.javascript.app.map(function (path) {
        return yeomanConfig.app + '/' + path;
    });

    var appJsExcludeFromBuild = includes.javascript.appExcludeFromBuild.map(function (path) {
        return '!' + yeomanConfig.app + '/' + path;
    });

    var prototypeAppJs = appJs.slice(0); //copy appJs
    prototypeAppJs.splice(2, 0, (yeomanConfig.app + '/dev/**/*.js')); //insert dev stuff (mocks etc) after module.js

    var cssFiles = includes.css.map(function (path) {
        return yeomanConfig.app + '/' + path;
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}', '<%= yeoman.app %>/modals/**/*.{scss,sass}', '<%= yeoman.app %>/components/**/*.{scss,sass}', '<%= yeoman.app %>/states/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= yeoman.app %>/states/**/*.html',
                    '<%= yeoman.app %>/components/**/*.html',
                    '<%= yeoman.app %>/modals/**/*.html',
                    '<%= yeoman.app %>/scripts/**/*.html',
                    '<%= yeoman.app %>/css/**/*.css',
                    '<%= yeoman.app %>/**/*.js',
                    '<%= yeoman.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            sailslinker: {
                files: ['<%= yeoman.app %>/**/*.{scss,sass,js}'],
                tasks: ['link']
            }
        },
        connect: {
            options: {
                port: process.env.PORT || 9000,
                hostname: process.env.IP || 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/css/main.css': [
                        '<%= yeoman.app %>/css/**/*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: false,
                    removeOptionalTags: true,
                    removeEmptyElements: false
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: [
                            'views/**/*.html',
                            'states/**/*.html',
                            'components/**/*.html',
                            'modals/**/*.html'
                        ],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        'sails-linker': {

            devJs: {
                options: {
                    startTag: '<!--INJECT SCRIPTS-->',
                    endTag: '<!--/INJECT SCRIPTS-->',
                    fileTmpl: '<script src="/%s"></script>',
                    appRoot: '<%= yeoman.app %>',
                    relative: true
                },
                files: {
                    '<%= yeoman.app %>/index.html': externalJsSrc.concat(prototypeAppJs)
                }
            },

            prodJs: {
                options: {
                    startTag: '<!--INJECT SCRIPTS-->',
                    endTag: '<!--/INJECT SCRIPTS-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: '<%= yeoman.app %>',
                    relative: true
                },
                files: {
                    '<%= yeoman.app %>/index.html': ['<%= yeoman.dist %>/vendors.js','<%= yeoman.dist %>/app.js']
                }
            },

            devStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="/%s">',
                    appRoot: '<%= yeoman.app %>',
                    relative: true
                },

                files: {
                    '<%= yeoman.app %>/index.html': cssFiles
                }
            },

            prodStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '<%= yeoman.app %>',
                    relative: true
                },
                files: {
                    '<%= yeoman.app %>/index.html': ['<%= yeoman.dist %>/*.css']
                }
            }

        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/css/',
                        src: '**/*.css',
                        dest: '<%= yeoman.app %>/css/'
                    }
                ]
            }
        },

        //TODO: The manifest file must be served with the MIME type text/cache-manifest.
        manifest: {
            generate: {
                options: {
                    basePath: '/',
                    cache: ['/scripts/scripts.js', '/css/main.css'],
                    network: ['*', 'http://*', 'https://*'],
                    fallback: ['/ /offline.html'], //TODO: Add an offline fallback page
                    exclude: ['js/jquery.min.js'],
                    preferOnline: true,
                    verbose: true,
                    timestamp: true,
                    hash: true,
                    master: ['index.html']
                },
                src: [ //TODO: Rev images, fonts, icons etc. to bust cache
                    '**/*.html',
                    '/scripts/**/*.js',
                    '<%= yeoman.app %>/css**/*.css'//,
                    //'*.{ico,png,txt}',
                    //'assets/images/**/*',
                    //'assets/fonts/**/*'
                ],
                dest: 'manifest.appcache'
            }
        },
        ngdocs: {
            options: {
                dest: 'jsdoc',
                //scripts: ['../app.min.js'],
                html5Mode: false,
                //startPage: '/api',
                title: "JsDocs"
                //image: "path/to/my/image.png",
                //imageLink: "http://my-domain.com",
                //titleLink: "/api",
                //bestMatch: true,
                //analytics: {
                //    account: 'UA-08150815-0',
                //    domainName: 'my-domain.com'
                //},
                //discussions: {
                //    shortName: 'my',
                //    url: 'http://my-domain.com',
                //    dev: false
                //}
            },
            //tutorial: {
            //    src: ['content/tutorial/*.ngdoc'],
            //    title: 'Tutorial'
            //},
            components: {
                src: ['public/components/**/*.js'],
                title: 'Components'
            },
            modals: {
                src: ['public/modals/**/*.js'],
                title: 'Modals'
            },
            states: {
                src: ['public/states/**/*.js'],
                title: 'States'
            },
            scripts: {
                src: ['public/scripts/**/*.js'],
                title: 'Scripts'
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '<%= yeoman.app %>/css',
                generatedImagesDir: '<%= yeoman.app %>/assets/images/generated',
                imagesDir: '<%= yeoman.app %>/assets/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/assets/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/assets/images',
                httpGeneratedImagesPath: '/assets/images/generated',
                httpFontsPath: '/assets/fonts',
                relativeAssets: false,
                debugInfo: false
            },
            app: {
                options: {
                    cssDir: '.tmp/css',
                    noDebugInfo: true,
                    outputStyle: 'compressed' // nested, expanded, compact, compressed
                }
            },
            dev: {
                options: {
                    debugInfo: true
                }
            }
        },
        concat: {
            options: {
                // Replace all 'use strict' statements in the code with a single one at the top
                banner: "'use strict';\n",
                process: function (src, filepath) {
                    return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            // prepares all vendors with no *.min.js version for minification
            vendors_src: {
                options:{
                    banner: ""
                },
                files: {
                    '.tmp/vendors-src.js': externalJsSrc.concat([]).concat(externalJsExcludeFromBuild)
                }
            },
            // creates final vendors package, minified vednors + miniffied resutls from concat:vendors_src
            vendors: {
                options:{
                    banner: ""
                },
                src: externalJsMin.concat(['.tmp/vendors-src.min.js']).concat(externalJsExcludeFromBuild),
                dest: '<%= yeoman.dist %>/vendors.js'
            },
            css: {
                src: '.tmp/css/**/*.css',
                dest: '<%= yeoman.dist %>/app.css'
            }
        },
        uglify: {
            options: {
                banner: [
                    '/**',
                    ' * <%= pkg.description %>',
                    ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
                    ' * @link <%= pkg.homepage %>',
                    ' * @author <%= pkg.author %>',
                    ' * @license MIT License, http://www.opensource.org/licenses/MIT',
                    " */\n"
                ].join('\n')
            },
            app_js: {
                files: {
                    '<%= yeoman.dist %>/app.js': appJs.map(function (path) {
                        return '.tmp/' + path;
                    }).concat(['.tmp/app.templates.js'])
                }
            },
            // uglifies not minified vendors
            vendors_src: {
                options: {
                    banner:''
                },
                files: {
                    '.tmp/vendors-src.min.js': '.tmp/vendors-src.js'
                }
            }
        },
        clean: {
            tmp: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp'
                    ]
                }]
            },
            csstmp: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp/css'
                    ]
                }]
            }
        },
        copy: {
            index: {
                expand: true,
                cwd: '<%= yeoman.app %>/',
                dest: '<%= yeoman.dist %>/',
                src: ['./index.html']
            },
            app_templates: {
                expand: true,
                cwd: '<%= yeoman.app %>/',
                dest: '.tmp/templates',
                src: [
                    'views/**/*.html',
                    'states/**/*.html',
                    'components/**/*.html',
                    'modals/**/*.html'
                ]
            }
        },
        /**
         * grunt-angular-templates: copy all html templates of your app to .tmp, minifies it and concats to one file
         */
        ngtemplates:  {
            'app_templates': {
                options: {
                    module: 'slackmap',
                    prefix: '/',
                    htmlmin:  {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                },
                cwd:      '.tmp/templates',
                src:      '**/*.html',
                dest:     '.tmp/app.templates.js'
            }
        },
        /**
         * grunt-angular-annotate: copy to .tmp and annotate all app js scripts
         */
        ngAnnotate: {
            app_js: {
                files: [
                    {
                        expand: true,
                        src: appJs.concat(appJsExcludeFromBuild),
                        dest: '.tmp'
                    }
                ]
            }
        }

    });

    /**
     * builds app scripts form production
     */
    grunt.registerTask('build-js', [
        'ngAnnotate',// copy and annotate all js scripts
        'copy:app_templates', // copy all templates to one folder
        'ngtemplates:app_templates', // concat all templates to one file
        'uglify:app_js'     // uglify all scripts and templates and concat  it to one file
    ]);

    /**
     * builds bower_components form production
     */
    grunt.registerTask('build-vendors', [
        'concat:vendors_src',// copy all not minified vendors scripts to one
        'uglify:vendors_src', // minify the file
        'concat:vendors' // concat all minified vendors files
    ]);

    /**
     * builds css files for production
     */
    grunt.registerTask('build-css', [
        'clean:csstmp',// clear tmp dir
        'compass:app',// process scss to css
        'concat:css' // concat everything to one app.css
    ]);

    grunt.registerTask('build', [
        'clean:tmp',
        'build-css',
        'build-js',
        'build-vendors',
        'link-dist'
    ]);

    /**
     * ngdocs import
     */
    //grunt.loadNpmTasks('grunt-ngdocs');

    /**
     * link assets dev
     */
    grunt.registerTask('link', [
        'sails-linker:devStyles',
        'sails-linker:devJs'
    ]);

    /**
     * link assets prod
     */
    grunt.registerTask('link-dist', [
        'sails-linker:prodStyles',
        'sails-linker:prodJs'
    ]);

    /**
     * default task is to compile sass, link assets to head and watch for changes
     */
    grunt.registerTask('default', [
        'compass:dev',
        'link',
        'watch'
    ]);
};