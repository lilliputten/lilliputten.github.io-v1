window.Fonticons||(window.Fonticons={}),
function(e,n,t) {
	function i(e,t) {
		var i,
			o='IE',
			d=n.createElement('B'),
			s=n.documentElement;
		return e&&(o+=' '+e,t&&(o=t+' '+o)),
			d.innerHTML='<!--[if '+o+']><b id="fitest"></b><![endif]-->',
			s.appendChild(d),
			i=!!n.getElementById('fitest'),
			s.removeChild(d),
			i;
	}
	function o() {
		var e=n.createElement('link'),
			t=i(8,'lte')?'ffe176a3-sd':'ffe176a3';
		e.href='https://fonticons-free-fonticons.netdna-ssl.com/kits/ffe176a3/'+t+'.css',
			e.media='all',
			e.rel='stylesheet',
			n.getElementsByTagName('head')[0].appendChild(e);
	}
	e.Fonticons.load=o;
} (this,document),
	window.Fonticons.load();

