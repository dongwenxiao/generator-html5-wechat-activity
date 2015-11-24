// 文档加载完成后执行
// 应用程序入口
$(function() {
    cmcm.app.init();
    cmcm.preload(function() {
        $(".loading").hide();
        $(".container").show();
        cmcm.app.start();
    });
});

// 应用程序逻辑实现部分
(function(win) {
    "use strict";

    var doc = win.document;
    var cmcm = win.cmcm = win.cmcm || {};
    var app = cmcm.app = {};

    app.init = function() {
        // js加载完成执行初始化逻辑
        // TODO: 初始化逻辑代码

        // eg.
        console.log('app init()');

        var pages = doc.querySelectorAll('#scenes .scene'),
            /**
             * 翻页初始化，参数详情 https://github.com/qiqiboy/pageSwitch
             */
            pw = new pageSwitch('scenes', {
                start: 0,
                transition: 'scroll',
                mouse: true
            });

        // 页面切换 active样式处理
        // 
        pw.on('after', function(a, b) {
            pages[b].classList.remove('active');
            pages[a].classList.add('active');
        });

        // 阻止页面默认滑动
        win.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
    };

    app.start = function() {
        // 静态资源加载完成后执行
        // TODO: 应用程序开始执行逻辑代码

        // eg.
        console.log('app start()');
    };

})(window);
