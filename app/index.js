var generators = require('yeoman-generator');
var path = require('path');
var util = require('./util');

module.exports = generators.Base.extend({

    // use to save user config
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
            name: 'style',
            message: 'choices you like css write function(TODO)',
            choices: ['css', 'less', 'sass'],
            default: 'css'
        }, {
            type: 'list',
            name: 'cssResetLib',
            message: 'choices you like css reset function',
            choices: ['reset.css', 'normalize.css', 'none'],
            default: 'normalize.css'
        }, {
            type: 'checkbox',
            name: 'cssLib',
            message: 'choices you like css lib',
            choices: [{
                name: 'animate.css',
                val: 'animate.css',
                checked: true
            }],
            default: 'animate.css'
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
                // 翻页效果
                name: 'pageSwitch',
                val: 'pageSwitch',
                checked: true
            }, { // Q js
                name: 'Q js',
                val: 'Q js',
                checked: false
            }, { // 微信分享
                name: 'wxShare',
                val: 'wxShare',
                checked: true
            }, { // 百度统计
                name: 'baiduAnalysis',
                val: 'baiduAnalysis',
                checked: false
            }, { // 资源预加载
                name: 'preload',
                val: 'preload',
                checked: true
            }, { // 屏幕旋转提示
                name: 'screenRotateTip',
                val: 'screenRotateTip',
                checked: true
            }]
        }], function(answers) {

            this.userconfig.projectName = answers.projectName;

            // stylesheet write function TODO: css/less/sass
            this.userconfig.style = answers.style;

            // css reset lib
            this.userconfig.useResetCss = false;
            this.userconfig.useNormalizeCss = false;
            switch (answers.cssResetLib) {
                case 'reset.css':
                    this.userconfig.useResetCss = true;
                    break;
                case 'normalize.css':
                    this.userconfig.useNormalizeCss = true;
                    break;
                default:
                    break;
            }
            // css lib choose
            this.userconfig.useAnimateCss = util.checkContain(answers.cssLib, 'animate.css');

            // js lib choose
            this.userconfig.useZeptoJs = false;
            this.userconfig.useJquery = false;
            switch (answers.jsLib) {
                case 'zeptojs':
                    this.userconfig.useZeptoJs = true;
                    break;
                case 'jquery':
                    this.userconfig.useJquery = true;
                    break;
                default:
                    break;
            }

            // js plugin choose

            console.log(answers)

            this.userconfig.usePageSwitch = util.checkContain(answers.plugins, 'pageSwitch');
            this.userconfig.useQjs = util.checkContain(answers.plugins.toString().toLowerCase(), 'q js');
            this.userconfig.useWxShare = util.checkContain(answers.plugins, 'wxShare');
            this.userconfig.useBaiduAnalysis = util.checkContain(answers.plugins, 'baiduAnalysis');
            this.userconfig.usePreload = util.checkContain(answers.plugins, 'preload');
            this.userconfig.useScreenRotateTip = util.checkContain(answers.plugins, 'screenRotateTip');

            done();
        }.bind(this));
    },
    configuring: {

    },

    default: {},
    writing: {
        generateProject: function() {},
        initCss: function() {

            // css script
            switch (this.userconfig.style) {
                // TODO: use less and sass
                case 'less':
                    break;
                case 'sass':
                    break;
                case 'css':
                default:
                    this.userconfig.cssLink = './assets/css/style.css';
                    this.fs.copyTpl(
                        this.templatePath('./assets/css/css/style.css'),
                        this.destinationPath(this.userconfig.cssLink)
                    );
                    break;
            }

        },
        initJS: function() {

            if (this.userconfig.usePreload) {
                this.fs.copyTpl(
                    this.templatePath('./assets/js/js/preload.js'),
                    this.destinationPath('./assets/js/preload.js')
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
                this.destinationPath('./index.html'),
                config
            );
        },
        initGulp: function() {

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
                this.destinationPath('./bower.json'),
                config
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
