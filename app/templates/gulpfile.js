/**
 * <%= projectName %>
 */

var
    gulp       = require('gulp'),
    rimraf     = require('gulp-rimraf'),
    usemin     = require('gulp-usemin'),
    uglify     = require("gulp-uglify"),
    minifyHtml = require('gulp-minify-html'),
    minifycss  = require("gulp-minify-css"),
    rev        = require('gulp-rev');

/**
 * 自定义部署目录
 */
var config = {
    devDeployPath: 'dist',
    qaDeployPath: '',
    stageDeplyPath: ''
};

var DEPLOY_PATH = config.devDeployPath;

/**
 * 清理发布目录
 */
gulp.task('clean', function() {
    return gulp.src(DEPLOY_PATH, {
            read: false
        })
        .pipe(rimraf());
});

/**
 * 静态资源拷贝
 */
gulp.task('copy-assets', ['copy-assets-img', 'copy-assets-audio']);
gulp.task('copy-assets-img', function() {
    return gulp.src(['assets/img/**/*'])
        .pipe(gulp.dest(DEPLOY_PATH + '/assets/img'));
});
gulp.task('copy-assets-audio', function() {
    return gulp.src(['assets/audio/**/*'])
        .pipe(gulp.dest(DEPLOY_PATH + '/assets/audio'));
});

/**
 * 源代码压缩、合并、替换引用
 */
gulp.task('usemin', function() {
    return gulp.src('./*.html')
        .pipe(usemin({
            html: [function() {
                return minifyHtml({ // 压缩html
                    empty: true,
                    conditionals: true,
                    spare: true,
                    cdata: true
                });
            }],
            js: [uglify()], // 压缩js
            css: [minifycss()] // 压缩css
        }))
        .pipe(rev()) // md5后缀
        .pipe(gulp.dest(DEPLOY_PATH));
});

/**
 * 配置默认gulp任务
 */
gulp.task('default', ['clean'], function() {
    gulp.start('usemin');
    gulp.start('copy-assets');
});
