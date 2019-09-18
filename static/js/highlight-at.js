function encode(s){
		return s.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/([\\\.\*\[\]\(\)\$\^])/g,"\\$1");
	}
	function decode(s){
		return s.replace(/\\([\\\.\*\[\]\(\)\$\^])/g,"$1").replace(/>/g,">").replace(/</g,"<").replace(/&/g,"&");
	}
	function highlight(s){
		s=encode(s);
		var obj=document.getElementsByClassName("content")[0];
		var t=obj.innerHTML.replace(/<span\s+class=.?highlight-at.?>([^<>]*)<\/span>/gi,"$1");
		var cnt=loopSearch(s,obj);
		t=obj.innerHTML
		var r=/{searchHL}(({(?!\/searchHL})|[^{])*){\/searchHL}/g
		t=t.replace(r,"<span class='highlight-at'>$1</span>");
		obj.innerHTML=t;
	}
	function loopSearch(s,obj){
		var cnt=0;
		if (obj.nodeType==3){
			cnt=replace(s,obj);
			return cnt;
		}
		for (var i=0,c;c=obj.childNodes[i];i++){
			if (!c.className||c.className!="highlight-at")
				cnt+=loopSearch(s,c);
		}
		return cnt;
	}
	function replace(s,dest){
		var r=new RegExp(/@\w+/,"g");
		var tm=null;
		var t=dest.nodeValue;
		var cnt=0;
		if (tm=t.match(r)){
			cnt=tm.length;
			t=t.replace(r,"{searchHL}"+tm[0]+"{/searchHL}")
			dest.nodeValue=t;
		}
		return cnt;}

