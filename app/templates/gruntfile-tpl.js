// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var path = require('path');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var includes = require('./resources.json');

    var yeomanConfig = {
        app: require('./bower.json').appPath || 'public',
        dist: require('./bower.json').distPath || 'public-dist'
    };

    var externalJsSrc = includes.javascript.external.map(function (path) {
        if (typeof path === 'object') {
            return yeomanConfig.app + '/' + path.src;
        }
        return yeomanConfig.app + '/' + path;
    });

    var externalJsMin = includes.javascript.external.map(function (path) {
        if (typeof path === 'object') {
            return yeomanConfig.app + '/' + path.min;
        }
        path = path.replace(/(\.js|\.src.js)/, ".min.js");
        return yeomanConfig.app + '/' + path;
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
                files: ['<%%= yeoman.app %>/styles/**/*.{scss,sass}', '<%%= yeoman.app %>/modals/**/*.{scss,sass}', '<%%= yeoman.app %>/components/**/*.{scss,sass}', '<%%= yeoman.app %>/states/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%%= yeoman.app %>/states/**/*.html',
                    '<%%= yeoman.app %>/components/**/*.html',
                    '<%%= yeoman.app %>/modals/**/*.html',
                    '<%%= yeoman.app %>/scripts/**/*.html',
                    '<%%= yeoman.app %>/css/**/*.css',
                    '<%%= yeoman.app %>/**/*.js',
                    '<%%= yeoman.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            sailslinker: {
                files: ['<%%= yeoman.app %>/**/*.{scss,sass,js}'],
                tasks: ['linkAssets-dev']
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
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%%= yeoman.dist %>'
                }
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%%= yeoman.dist %>/**/*',
                            '!<%%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        coffee: {
            options: {
                sourceMap: true,
                sourceRoot: ''
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= yeoman.app %>/scripts',
                        src: '**/*.coffee',
                        dest: '.tmp/scripts',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/spec',
                        src: '**/*.coffee',
                        dest: '.tmp/spec',
                        ext: '.js'
                    }
                ]
            }
        },
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '<%%= yeoman.app %>/css',
                generatedImagesDir: '<%%= yeoman.app %>/assets/images/generated',
                imagesDir: '<%%= yeoman.app %>/assets/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/assets/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                httpImagesPath: '/assets/images',
                httpGeneratedImagesPath: '/assets/images/generated',
                httpFontsPath: '/assets/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/**/*.js',
                        '<%%= yeoman.dist %>/css/**/*.css'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= yeoman.app %>/assets/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%%= yeoman.dist %>/assets/images'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/css/main.css': [
                        '<%%= yeoman.app %>/css/**/*.css'
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
                        cwd: '<%%= yeoman.app %>',
                        src: ['*.html', '!index.html', '../.tmp/index.html', 'views/**/*.html', 'states/**/*.html', 'components/**/*.html', 'modals/**/*.html'],
                        dest: '<%%= yeoman.dist %>'
                    }
                ]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= yeoman.app %>',
                        dest: '<%%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'assets/images/**/*.{gif,webp}',
                            'assets/fonts/**/*',
                            'CNAME',
                            'package.json'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/assets/images',
                        dest: '<%%= yeoman.dist %>/assets/images',
                        src: [
                            'generated/*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '<%%= yeoman.app %>/css/',
                src: '**/*.css'
            },
            tmpStyles2dist: {
                expand: true,
                cwd: '<%%= yeoman.app %>/css/',
                dest: '<%%= yeoman.dist %>/css/',
                src: '**/*.css'
            },
            dev: {
                expand: true,
                cwd: '<%%= yeoman.app %>/dev',
                dest: '<%%= yeoman.dist %>/dev',
                src: '**/*.js'
            },
            indexHTML: {
                expand: true,
                cwd: '<%%= yeoman.app %>/',
                dest: '<%%= yeoman.dist %>/',
                src: ['./index.html']
            },
            app: {
                expand: true,
                cwd: '<%%= yeoman.app %>/',
                dest: '<%%= yeoman.dist %>/',
                src: ['**/*', '!**/*.{scss,sass,coffee}', '!dev/**/*']
            }
        },
        concurrent: {
            server: [
                'compass:server'
            ],
            dist: [
                'coffee',
                'compass:dist',
                'copy:styles',
                'imagemin',
                'htmlmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: appJs.concat(appJsExcludeFromBuild),
                        dest: '.tmp/app_js/'
                    }
                ]
            }
        },
        concat: {
            options: {
                // Replace all 'use strict' statements in the code with a single one at the top
                banner: "'use strict';\n",
                process: function (src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                    src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            js: {
                src: externalJsMin.concat(['.tmp/scripts/app.js']).concat(externalJsExcludeFromBuild),
                dest: '<%%= yeoman.dist %>/scripts/scripts.js'
            },
            css: {
                src: '<%%= yeoman.app %>/css/**/*.css',
                dest: '<%%= yeoman.dist %>/css/main.css'
            }
        },
        uglify: {
            options: {
                banner: [
                    '/**',
                    ' * <%%= pkg.description %>',
                    ' * @version v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %>',
                    ' * @link <%%= pkg.homepage %>',
                    ' * @author <%%= pkg.author %>',
                    ' * @license MIT License, http://www.opensource.org/licenses/MIT',
                    ' */'
                ].join('\n')
            },
            dist: {
                files: {
                    '.tmp/scripts/app.js': appJs.map(function (path) {
                        return '.tmp/app_js/' + path;
                    })
                }
            }
        },
        'sails-linker': {

            devJs: {
                options: {
                    startTag: '<!--INJECT SCRIPTS-->',
                    endTag: '<!--/INJECT SCRIPTS-->',
                    fileTmpl: '<script src="/%s"></script>',
                    appRoot: '<%%= yeoman.app %>',
                    relative: true
                },
                files: {
                    '<%%= yeoman.app %>/index.html': externalJsSrc.concat(prototypeAppJs)
                }
            },

            prodJs: {
                options: {
                    startTag: '<!--INJECT SCRIPTS-->',
                    endTag: '<!--/INJECT SCRIPTS-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: '<%%= yeoman.dist %>',
                    relative: true
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.dist %>/scripts/*.js']
                }
            },

            devStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="/%s">',
                    appRoot: '<%%= yeoman.app %>',
                    relative: true
                },

                files: {
                    '<%%= yeoman.app %>/index.html': cssFiles
                }
            },

            prodStyles: {
                options: {
                    startTag: '<!--INJECT STYLES-->',
                    endTag: '<!--/INJECT STYLES-->',
                    fileTmpl: '<link rel="stylesheet" href="%s">',
                    appRoot: '<%%= yeoman.dist %>',
                    relative: true
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.dist %>/css/*.css']
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
        protractor: {
            options: {
                configFile: "protractor.conf.js",
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'dist',
                tag: 'v' + require('./bower.json').version,
                message: 'Auto-generated build from v' + require('./bower.json').version
            },
            src: ['**']
        },
        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                versionFile: 'package.json'
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
                        cwd: '<%%= yeoman.app %>/css/',
                        src: '**/*.css',
                        dest: '<%%= yeoman.app %>/css/'
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
                    '<%%= yeoman.app %>/css**/*.css'//,
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
        }

    });

    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'linkAssets-dev',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('test-e2e', [
        'protractor'
    ]);

    grunt.registerTask('build', function (target) {

        if (target === 'dev') {
            console.log('Building using development profile');
            grunt.task.run([
                'clean',
                'compass:server',
                'autoprefixer',
                'copy:styles',
                'copy:tmpStyles2dist',
                'copy:app',
                'linkAssets-dev'
            ]);
        }
        else if (target === 'prototype') {
            console.log('Building using prototype profile');
            grunt.task.run([
                'clean',
                'concurrent:server',
                'autoprefixer',
                'copy',
                'linkAssets-dev'
            ]);
        }
        else {
            console.log('Building using production profile');
            grunt.task.run([
                'test-e2e',
                'test',
                'clean',
                'concurrent:dist',
                'autoprefixer',
                'ngmin',
                'uglify',
                'concat:js',
                'concat:css',
                'copy:dist',
                'cssmin',
                'rev',
                'copy:indexHTML',
                'linkAssets-production',
                'htmlmin'//,'manifest'
            ]);
        }
    });

    grunt.registerTask('changelog', [
        'changelog',
        'bump'
    ]);

    grunt.registerTask('deploy', [
        'gh-pages'
    ]);

    grunt.registerTask('linkAssets-dev', [
        'sails-linker:devStyles',
        'sails-linker:devJs'
    ]);
    grunt.registerTask('link', [
        'sails-linker:devStyles',
        'sails-linker:devJs'
    ]);

    grunt.registerTask('linkAssets-production', [
        'sails-linker:prodStyles',
        'sails-linker:prodJs'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};