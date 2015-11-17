(function(win) {

    var doc = win.document;
    var cmcm = win.cmcm = win.cmcm || {};
    cmcm.preload = function(callback) {

        // resources 预加载资源路径列表
        // 下面是列子，可以删除
        // TODO: 填写资源列表
        var resources = [
            './assets/img/logo.svg',
            './assets/audio/wechat-tip/m.ogg',
            './assets/audio/wechat-tip/m.mp3',
            './assets/audio/wechat-tip/m.m4a'
        ];

        var myLoader = html5Preloader();
        for (var i = 0, count = resources.length; i < count; i++) {
            myLoader.addFiles(resources[i]);
        }

        myLoader.on('finish', function(data) {
            console.log('All assets loaded.');            

            // 资源全部加载完成后回调此方法
            // 此时开始应用逻辑代码
            // TODO: 应用初始化

            // eg.
            callback && callback();
        });

        myLoader.on('error', function(e) {
            console.error(e);
        });

        var siProgress = setInterval(function() {
            var preloadRate = myLoader.getProgress();
            console.log(preloadRate);
            (preloadRate == 1) && clearInterval(siProgress);

            // preloadRate 是预加载率，0~1,1表示100%加载完成
            // 用于进度条变化显示
            // TODO: 编写预加载进度条逻辑

            // eg.
            var loadingEl = doc.getElementsByClassName('loading')[0];
            loadingEl.innerHTML = Math.round(preloadRate * 100) + '%';

        }, 100);
    }

})(window);
