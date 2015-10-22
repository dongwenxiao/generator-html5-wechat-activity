var generators = require('yeoman-generator');
var path = require('path');
// var util = require('util');
// var fs = require('fs');

module.exports = generators.Base.extend({

    userconfig: {},

    constructor: function() {
        generators.Base.apply(this, arguments);

        // this.sourceRoot(path.join(__dirname, 'app'));
    },

    initializing: function() {
        this.argument('appname', {
            type: String,
            required: false
        });
    },
    prompting: function() {
        // get current dir name
        var dirParts = process.cwd().split('\\');
        var currentDirName = dirParts[dirParts.length - 1];

        var done = this.async();
        this.prompt([{
                type: 'input',
                name: 'projectName',
                message: 'your project name',
                default: this.appname || currentDirName
            },
            /* {
                            type: 'list',
                            name: 'style',
                            message: 'choices you like style',
                            choices: ['css', 'less', 'sass'],
                            default: 'css'
                        }, */
            {
                type: 'list',
                name: 'cssResetLib',
                message: 'choices you like css reset function',
                choices: ['reset.css', 'normalize.css', 'none'],
                default: 'normalize.css'
            }, {
                type: 'list',
                name: 'jsLib',
                message: 'choices you like js lib',
                choices: ['jquery', 'zeptojs'],
                default: 'zeptojs'
            }
            // gulp 配置是否用一个文件模式
        ], function(answers) {
            this.userconfig.projectName = answers.projectName;
            this.userconfig.cssResetLib = answers.cssResetLib;
            this.userconfig.jsLib = answers.jsLib;
            this.userconfig.style = answers.style;
            done();
        }.bind(this));
    },
    configuring: {},

    default: {},
    writing: {
        generateProject: function() {
            // this.log('writing generateProject')
            // this.copy('hello.txt', process.cwd() + '/hello.txt');
        },

        initCss: function() {
            switch (this.userconfig.style) {
                default:
                    case 'css':
                    this.userconfig.cssLink = './assets/css/style.css';
                this.fs.copyTpl(
                    this.templatePath('./assets/css/css/style.css'),
                    this.destinationPath(this.userconfig.cssLink)
                );
                break;
                case 'less':
                        break;
                case 'sass':
                        break;
            }

            switch (this.userconfig.cssResetLib) {
                case 'reset.css':
                    this.userconfig.resetcssLink = './assets/css/resetcss-yui-3.18.1.min.css';
                    this.fs.copyTpl(
                        this.templatePath(this.userconfig.resetcssLink),
                        this.destinationPath(this.userconfig.resetcssLink)
                    );
                    break;
                case 'normalize.css':
                    this.userconfig.resetcssLink = './assets/css/normalize-3.0.2.css';
                    this.fs.copyTpl(
                        this.templatePath(this.userconfig.resetcssLink),
                        this.destinationPath(this.userconfig.resetcssLink)
                    );
                    break;
            }
        },
        initJS: function() {

            ///
            switch (this.userconfig.jsLib) {
                case 'jquery':
                    this.userconfig.jsLibLink = './assets/js/jquery-2.1.4.min.js';
                    this.fs.copyTpl(
                        this.templatePath(this.userconfig.jsLibLink),
                        this.destinationPath(this.userconfig.jsLibLink)
                    );
                    break;
                case 'zeptojs':
                    this.userconfig.jsLibLink = './assets/js/zepto-1.0rc.min.js';
                    this.fs.copyTpl(
                        this.templatePath(this.userconfig.jsLibLink),
                        this.destinationPath(this.userconfig.jsLibLink)
                    );
                    break;
            }


            ///
            this.userconfig.jsLink = './assets/js/script.js';
            this.fs.copyTpl(
                this.templatePath('./assets/js/js/script.js'),
                this.destinationPath(this.userconfig.jsLink)
            );

        },

        initHtml: function() {
            var projectName = this.userconfig.projectName,
                resetcssLink = this.userconfig.resetcssLink,
                cssLink = this.userconfig.cssLink,
                jsLibLink = this.userconfig.jsLibLink,
                jsLink = this.userconfig.jsLink;

            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('./index.html'), {
                    title: projectName,
                    resetcssLink: resetcssLink,
                    cssLink: cssLink,
                    jsLibLink: jsLibLink,
                    jsLink: jsLink
                }
            );
        },

        initGulp: function() {
            // this.fs.copyTpl(
            //     this.templatePath('./gulpfile.js'),
            //     this.destinationPath('./gulpfile.js')
            // );

            var projectName = this.userconfig.projectName;
            this.fs.copyTpl(
                this.templatePath('./gulpfile.js'),
                this.destinationPath('./gulpfile.js'), {
                    projectName: projectName
                }
            );
        },

        inptPkg: function() {
        	var projectName = this.userconfig.projectName;
            this.fs.copyTpl(
                this.templatePath('./package.json'),
                this.destinationPath('./package.json'), {
                    projectName: projectName
                }
            );
        }
    },
    conflicts: {},
    install: function() {
        this.log('install');
        // this.npmInstall(['lodash'], { 'saveDev': true });
        // this.bowerInstall(['jquery'], {'save': true });

        // this.installDependencies();
    },
    end: function() {

        this.log(this.userconfig)
    }
});
