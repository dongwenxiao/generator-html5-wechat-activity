$(function() {
    cmcm.app.init();
    cmcm.preload(function() {
        cmcm.app.start();
    });
});


(function(win) {
    var cmcm = win.cmcm = win.cmcm || {};
    var app = cmcm.app = {};

    app.init = function() {
        // js加载完成执行初始化逻辑
        // TODO: 初始化逻辑代码

        // eg.
        console.log('app init()');
    };

    app.start = function() {
        // 静态资源加载完成后执行
        // TODO: 应用程序开始执行逻辑代码

        // eg.
        console.log('app start()');
    };

})(window);
