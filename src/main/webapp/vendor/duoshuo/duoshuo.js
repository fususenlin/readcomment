'use strict';

var duoshuoQuery = {
	short_name : "limaoshengcpp",
	sso: { 
	       login: "http://localhost:8080/readcomment/index.html#/authorize",
	       logout: "http://localhost:8080/readcomment/index.html#/logout"
	}
};

(function() {
    var ds = document.createElement('script');
    ds.type = 'text/javascript';ds.async = true;
    ds.src = 'http://static.duoshuo.com/embed.js';
    ds.charset = 'UTF-8';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
})();

function duoshuo_box(container, id) {
	if (DUOSHUO) {
		jQuery("#" + container).empty();
		var el = document.createElement('div');
		el.setAttribute('data-thread-key', id);//必选参数
		el.setAttribute('data-url', location.href);//必选参数
		DUOSHUO.EmbedThread(el);
		jQuery("#" + container).append(el);
	}
}

In.add('duoshuo', {
	path : "vendor/duoshuo/embed.js",
	type : 'js',
	charset : 'utf-8'
});

In.add('duoshuo_embed', {
	path : "vendor/duoshuo/embed.compat.js?24f8ca3f.js",
	type : 'js',
	charset : 'utf-8'
});



