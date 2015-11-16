var Share={
    type:'pc',
    data:{
        title:'猎豹移动5周年',
        img:'http://cn.cmcm.com/activity/anniversary/5/assets/img/poster-5.jpg',
        desc:'猎豹移动高管群邀您加入，有史以来最让人紧张的来电...',
        url:location.href,
        success:function(){},
        fail:function(){},
        complete:function(){}
    },
    init:function(){
        var self=this,
            ua=navigator.userAgent,
            menus="menu:share:appmessage menu:share:timeline menu:share:qq menu:share:weiboApp".split(" ");

        document.addEventListener('WeixinJSBridgeReady',function(){
            self.type='weixin';
            var xhr=new XMLHttpRequest;
            xhr.open('GET','http://www.ijinshan.com/wxjs/?type=liebao&url='+encodeURIComponent(location.href.replace(/#.*$/,'')),true);
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4 && xhr.status==200){
                    var ret=JSON.parse(xhr.responseText),
                        params={verifyJsApiList:menus};
                    params.appId=ret.appId;
                    params.verifyAppId=ret.appId;
                    params.verifySignType="sha1";
                    params.verifyTimestamp=ret.timestamp+"";
                    params.verifyNonceStr=ret.nonceStr;
                    params.verifySignature=ret.signature;

                    WeixinJSBridge.invoke("preVerifyJSAPI",params,function(resp){
                        //alert(JSON.stringify(resp));
                    });
                }
            }
            xhr.send();

            menus.forEach(function(prop){
                WeixinJSBridge.on(prop,function(e){
                    var data=self.data,
                        sdata={
                            "img_url": data.img,
                            "desc": data.desc,
                            "title": data.title,
                            "link": data.url,
                        },
                        name;

                    switch(prop.split(":")[2]){
                        case 'appmessage':
                            name='sendAppMessage';
                            break;
                        case 'timeline':
                            sdata.title=data.desc;
                            sdata.desc=data.title;
                            name='shareTimeline';
                            break;
                        case 'qq':
                            name='shareQQ';
                            break;
                        case 'weiboApp':
                            name='shareWeiboApp';
                            break;
                    }

                    WeixinJSBridge.invoke(name,sdata,function(resp){
                        if(/\:(confirm|ok)$/i.test(resp.err_msg)){
                            data.success && data.success(resp);
                        }else{
                            data.fail && data.fail(resp);
                        }
                        data.complete && data.complete(resp);
                    });
                });
            });
        },false);

        if(typeof android!='undefined'){
            this.type='cm';
        }

        return this;
    },
    update:function(_data){
        var data=this.data,
            key;
        for(key in _data){
            data[key]=_data[key];
        }
        
        switch(this.type){
            case 'cm':
                try{
                    android.updatesharedata(data.title, data.img, data.desc, data.url);
                }catch(e){}
                break;
            //case 'weixin':break;
        }
    },
    share:function(data){
        typeof data!='undefined' && this.update(data);
        switch(this.type){
            case 'cm':
                try{android.sharescore()}catch(e){}
                break;
        }
    }
}.init();
