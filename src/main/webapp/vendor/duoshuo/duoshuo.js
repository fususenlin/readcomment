'use strict';

var duoshuoQuery = {
	short_name : "limaoshengcpp"
};

function toggleDuoshuoComments(container, id) {
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
