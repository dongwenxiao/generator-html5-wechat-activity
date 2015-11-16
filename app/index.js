var generators = require('yeoman-generator');
var path = require('path');

module.exports = generators.Base.extend({

    userconfig: {},

    constructor: function() {
        generators.Base.apply(this, arguments);
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
        }, {
            type: 'list',
            name: 'cssResetLib',
            message: 'choices you like css reset function',
            choices: ['reset.css', 'normalize.css', 'none'],
            default: 'normalize.css'
        }, {
            type: 'list',
            name: 'jsLib',
            message: 'choices you like js lib',
            choices: ['zeptojs', 'jquery', 'none'],
            default: 'zeptojs'
        }, {
            type: 'checkbox',
            name: 'plugins',
            message: 'choices js plugins',
            choices: [{
                name: 'pageSwitch',
                val: 'pageSwitch',
                checked: true
            }, {
                name: 'Q',
                val: 'qjs',
                checked: false
            }, {
                name: 'wxShare',
                val: 'wxShare',
                checked: true
            }],
            default: 'pageSwitch'
        }, {
            type: 'checkbox',
            name: 'page',
            message: 'choices page config',
            choices: [{
                name: 'pageLoading',
                val: 'pageLoading',
                checked: true
            }, {
                name: 'screenRotateTip',
                val: 'screenRotateTip',
                checked: true
            }]
        }], function(answers) {
            this.userconfig.projectName = answers.projectName;
            this.userconfig.cssResetLib = answers.cssResetLib;
            this.userconfig.jsLib = answers.jsLib;
            this.userconfig.style = answers.style;

            function check(all, item) {
                if (all.indexOf(item) > -1)
                    return true;
                return false;
            }

            // use PageSwitch lib
            this.userconfig.pageSwitch = check(answers.plugins, 'pageSwitch');

            // use Q js file
            this.userconfig.qjs = check(answers.plugins, 'qjs');

            // wechat share api js
            this.userconfig.wxShare = check(answers.plugins, 'wxShare');

            // page loading
            this.userconfig.pageLoading = check(answers.page, 'pageLoading');

            // page screen rotate tip
            this.userconfig.screenRotateTip = check(answers.page, 'screenRotateTip');

            done();
        }.bind(this));
    },
    configuring: {

    },

    default: {},
    writing: {
        generateProject: function() {},
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
                default:
                    this.userconfig.resetcssLink = './assets/css/myrest.css';
                    this.fs.copyTpl(
                        this.templatePath(this.userconfig.resetcssLink),
                        this.destinationPath(this.userconfig.resetcssLink)
                    );
            }
        },
        initJS: function() {
            /// move to bower
            switch (this.userconfig.jsLib) {
                case 'jquery':
                    this.userconfig.jsLibLink = './bower_components/jquery/dist/jquery.min.js';
                    break;
                case 'zeptojs':
                    this.userconfig.jsLibLink = './bower_components/zeptojs/src/zepto.js';
                    break;
                default:
                    // none
                    this.userconfig.jsLibLink = '';
                    break;
            }

            ///
            this.userconfig.jsLink = './assets/js/script.js';
            this.fs.copyTpl(
                this.templatePath('./assets/js/js/script.js'),
                this.destinationPath(this.userconfig.jsLink)
            );

            // 
            if (this.userconfig.wxShare) {
                this.fs.copyTpl(
                    this.templatePath('./assets/js/wx-share.js'),
                    this.destinationPath('./assets/js/wx-share.js')
                );
            }
        },
        initImg: function() {
            this.fs.copyTpl(
                this.templatePath('./assets/img/'),
                this.destinationPath('./assets/img/')
            );
        },
        initAudio: function() {
            this.fs.copyTpl(
                this.templatePath('./assets/audio/'),
                this.destinationPath('./assets/audio/')
            );
        },
        initHtml: function() {
            var projectName = this.userconfig.projectName,
                resetcssLink = this.userconfig.resetcssLink,
                cssLink = this.userconfig.cssLink,
                jsLibLink = this.userconfig.jsLibLink,
                jsLink = this.userconfig.jsLink;

            var config = this.userconfig;


            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('./index.html'), {
                    title: projectName,
                    resetcssLink: resetcssLink,
                    cssLink: cssLink,
                    jsLibLink: jsLibLink,
                    jsLink: jsLink,
                    jsWxShare: config.wxShare
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
        },

        bowerJson: function() {
            var config = this.userconfig;
            this.fs.copyTpl(
                this.templatePath('./bower.json'),
                this.destinationPath('./bower.json'), {
                    projectName: config.projectName,
                    zeptojs: config.jsLib == 'zeptojs',
                    jquery: config.jsLib == 'jquery',
                    pageSwitch: config.pageSwitch,
                    qjs: config.qjs
                }
            );
        }
    },
    conflicts: {},
    install: function() {
        this.log('install');
        // this.npmInstall(['lodash'], { 'saveDev': true });
        // this.bowerInstall([
        //     'jquery',
        //     'https://github.com/qiqiboy/pageSwitch.git'
        // ], {
        //     'save': true
        // });

        // this.installDependencies();
    },
    end: function() {

        this.log(this.userconfig)
    }
});
