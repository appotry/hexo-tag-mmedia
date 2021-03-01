"use strict";var merge=require("deepmerge"),JSON5=require("json5"),config_default_source=require("../config/config_default").config_default,config_default=require("../config/config_default").config_default,Config=function(){function t(t){this.hexo=t,this.root=t.config.root||"/",this.public_dir=t.config.public_dir||"public",t.config.mmedia&&this._parse(this.clone(t.config.mmedia))}return t.prototype.clone=function(t){return JSON5.parse(JSON5.stringify(t))},t.prototype._parse=function(t){config_default=merge(config_default_source,t)},t}(),utils=require("utility"),log=require("hexo-log")({name:"hexo-tag-mmedia",debug:!1});module.exports=function(t,e,n){switch(e[0]){case"audio":return new Audio0(t,e,n).generate();case"video":return new Video(t,e,n).generate();case"meting":return new Meting(t,e,n).generate();case"aplayer":return new Aplayer(t,e,n).generate();case"dplayer":return new Dplayer(t,e,n).generate();case"bilibili":return new Bilibili(t,e,n).generate();case"xigua":return new Xigua(t,e,n).generate();case"artplayer":return new ArtPlayer(t,e,n).generate();default:log.warn("can not resolve "+e[0])}};var BaseConfig=function(){},BaseMmedia=function(){function t(t,e,n){this.contents=JSON5.parse("{}"),this.hexo=t,this.args=e,this.config=new Config(t),n&&(this.contents=JSON5.parse(n))}return t.prototype.generate=function(){return""},t.prototype.extractOption=function(t){var e=t.indexOf(":"),n=t.indexOf("=");return-1==e?[t.slice(0,t.indexOf("=")),t.slice(t.indexOf("=")+1)]:-1==n||e<n?[t.slice(0,t.indexOf(":")),t.slice(t.indexOf(":")+1)]:n<e?[t.slice(0,t.indexOf("=")),t.slice(t.indexOf("=")+1)]:void 0},t}(),BaseTag=function(){function t(t,e,n){this.mmedia_id=utils.randomString(16,"qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"),this.contents=merge(e.data.contents,n),this.tag_id="mmedia-"+this.mmedia_id,this.hexo=t,this.css=t.extend.helper.get("css").bind(t),this.js=t.extend.helper.get("js").bind(t)}return t.prototype.parse=function(t){var e,n="";for(e in t)""!=e&&null!=e&&(""!=t[e]&&null!=t[e]?"true"===t[e]||"false"===t[e]||Number(t[e])+""!="NaN"?n+=e+"="+t[e]+" ":n+=e+'="'+t[e]+'" ':n+=e+" ");return n},t.prototype.injector=function(t,e,n){this.hexo.extend.injector.register(t,e,n)},t}(),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),Aplayer=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.aplayer_config=new AplayerConfig,n}return __extends(t,r),t.prototype.generate=function(){var e=this;return this.args.forEach(function(t){t=e.extractOption(t);t&&(e.aplayer_config.data[t[0]]=t[1])}),new AplayerTag(this.hexo,this.aplayer_config,this.contents).generate()},t}(BaseMmedia),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),AplayerConfig=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.aplayer_css=config_default.aplayer.css,t.aplayer_js=config_default.aplayer.js,t.data=config_default.aplayer.default||{},t}return __extends(t,e),t}(BaseConfig),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),AplayerTag=function(r){function t(t,e,n){t=r.call(this,t,e,n)||this;return t.config=e,t.result="",t.contents=n,t}return __extends(t,r),t.prototype.a_parse=function(t){var e,n={},r={};for(e in t)if(""!=e&&null!=e)switch(e){case"name":r.name=t[e];break;case"artist":r.artist=t[e];break;case"url":r.url=t[e];break;case"cover":r.cover=t[e];break;case"lrc":r.lrc=t[e];break;case"theme":r.theme=t[e];break;case"type":r.type=t[e];break;case"autoplay":n.autoplay="false"!=t[e];break;case"loop":n.loop=t[e];break;case"order":n.order=t[e];break;case"volume":n.volume=Number(t[e]);break;case"tlistMaxHeight":n.listMaxHeight=Number(t[e])}return n.audio=[r],n},t.prototype.generate=function(){this.result+='<link rel="stylesheet" href="'+this.config.aplayer_css+'">',this.result+='<script src="'+this.config.aplayer_js+'"><\/script>',this.result+='<div id="'+this.tag_id+'"></div>';var t=this.config.data,t=utils.assign({},[t.contents,this.a_parse(t),this.contents]),t="var "+this.mmedia_id+"_options = JSON.parse('"+JSON.stringify(t).replace(/"([^"]*)"/g,'\\"$1\\"')+"'); "+this.mmedia_id+'_options.container = document.getElementById("'+this.tag_id+'"); ';return t+="const ap_"+this.mmedia_id+" = new APlayer("+this.mmedia_id+"_options);",this.result+="<script> "+t+" <\/script>",this.result},t}(BaseTag),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),ArtPlayer=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.artplayer_config=new ArtPlayerConfig,n}return __extends(t,r),t.prototype.generate=function(){var e=this;return this.args.forEach(function(t){t=e.extractOption(t);t&&(e.artplayer_config.data[t[0]]=t[1])}),new ArtPlayerTag(this.hexo,this.artplayer_config,this.contents).generate()},t}(BaseMmedia),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),ArtPlayerConfig=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.artplayer_js=config_default.artplayer.js,t.hls_js=config_default.artplayer.hls_js,t.dash_js=config_default.artplayer.dash_js,t.shaka_dash_js=config_default.artplayer.shaka_dash_js,t.flv_js=config_default.artplayer.flv_js,t.webtorrent_js=config_default.artplayer.webtorrent_js,t.data=config_default.artplayer.default||{},t}return __extends(t,e),t}(BaseConfig),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),ArtPlayerTag=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.config=e,n.result="",n}return __extends(t,r),t.prototype.art_parse=function(t){var e,n={};for(e in t)if(""!=e&&null!=e)switch(e){case"url":n.url=t[e];break;case"type":n.type=t[e];break;case"title":n.title=t[e];break;case"poster":n.poster=t[e];break;case"autoplay":n.autoplay="false"!=t[e];break;case"loop":n.loop="false"!=t[e];break;case"volume":n.volume=Number(t[e]);break;case"style":n.style=t[e]}return n},t.prototype.art_js=function(t){var e,n=[];for(e in t)if(""!=e&&null!=e)switch(e){case"hls":n.push(t[e]||this.config.hls_js);break;case"dash":n.push(t[e]||this.config.dash_js);break;case"shaka_dash":n.push(t[e]||this.config.shaka_dash_js);break;case"flv":n.push(t[e]||this.config.flv_js);break;case"webtorrent":n.push(t[e]||this.config.webtorrent_js)}return n},t.prototype.generate=function(){var e=this;this.result+='<script src="'+this.config.artplayer_js+'"><\/script>';var t=this.config.data,n=utils.assign(this.art_parse(t),this.contents);this.art_js(t).forEach(function(t){t&&""!=t&&null!=t&&(e.result+='<script src="'+t+'"><\/script>')}),this.result+='<div id="'+this.tag_id+'" style="'+n.style+'"></div>';n="var "+this.mmedia_id+"_options = JSON.parse('"+JSON.stringify(n).replace(/"([^"]*)"/g,'\\"$1\\"')+"'); "+this.mmedia_id+'_options.container = "#'+this.tag_id+'"; ';return n+="const art_"+this.mmedia_id+" = new Artplayer("+this.mmedia_id+"_options);",this.result+="<script> "+n+" <\/script>",this.result},t}(BaseTag),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),Audio0=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.audio_config=new AudioConfig,n}return __extends(t,r),t.prototype.generate=function(){var e=this;return this.args.forEach(function(t){t=e.extractOption(t);t&&(e.audio_config.data[t[0]]=t[1])}),new AudioTag(this.hexo,this.audio_config,this.contents).generate()},t}(BaseMmedia),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),AudioConfig=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.data=config_default.audio.default||{},t}return __extends(t,e),t}(BaseConfig),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),AudioTag=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.config=e,n.result="",n}return __extends(t,r),t.prototype.generate=function(){var t=merge(this.config.data,this.contents),t='<audio id="'+this.tag_id+'" '+this.parse(t)+"></audio>";return this.result+=t,this.result},t}(BaseTag),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),Bilibili=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.bilibili_config=new BilibiliConfig,n}return __extends(t,r),t.prototype.generate=function(){var e=this;return this.args.forEach(function(t){t=e.extractOption(t);t&&(e.bilibili_config.data[t[0]]=t[1])}),new BilibiliTag(this.hexo,this.bilibili_config,this.contents).generate()},t}(BaseMmedia),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),BilibiliConfig=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.data=config_default.bilibili.default||{},t}return __extends(t,e),t}(BaseConfig),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),BilibiliTag=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.config=e,n.result="",n}return __extends(t,r),t.prototype.b_parse=function(t){var e,n={};for(e in t)if(""!=e&&null!=e)switch(e){case"aid":n.aid=t[e];break;case"bvid":n.bvid=t[e];break;case"page":n.page=t[e];break;case"danmaku":n.danmaku=t[e];break;case"allowfullscreen":n.allowfullscreen=t[e];break;case"sandbox":n.sandbox=t[e];break;case"width":n.width=t[e];break;case"max_width":n.max_width=t[e];break;case"margin":n.margin=t[e]}return n},t.prototype.generate=function(){var t=merge(this.config.data,this.contents),t=this.b_parse(t);this.result+="<style>.bbplayer{width: "+t.width+"; max-width: "+t.max_width+"; margin: "+t.margin+"}</style>",this.result+='<div class="bbplayer"><iframe class="bbplayer" id="'+this.tag_id+'" src="https://player.bilibili.com/player.html?'+(t.bvid?"bvid="+t.bvid:"aid="+t.aid)+"&page="+t.page+"&high_quality=1&danmaku="+t.danmaku+'" allowfullscreen="'+("allowfullscreen"==t.allowfullscreen||"true"==t.allowfullscreen?"allowfullscreen":"no")+'" scrolling="no" border="0" frameborder="0" framespacing="0" sandbox="'+t.sandbox+'"></iframe></div>';t='document.getElementById("'+this.tag_id+'").style.height=document.getElementById("'+this.tag_id+'").scrollWidth*0.76+"px";\n    window.onresize = function(){\n      document.getElementById("'+this.tag_id+'").style.height=document.getElementById("'+this.tag_id+'").scrollWidth*0.76+"px";\n    };';return this.result+="<script> "+t+" <\/script>",this.result},t}(BaseTag),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),Dplayer=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.dplayer_config=new DplayerConfig,n}return __extends(t,r),t.prototype.generate=function(){var e=this;return this.args.forEach(function(t){t=e.extractOption(t);t&&(e.dplayer_config.data[t[0]]=t[1])}),new DplayerTag(this.hexo,this.dplayer_config,this.contents).generate()},t}(BaseMmedia),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),DplayerConfig=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.dplayer_js=config_default.dplayer.js,t.hls_js=config_default.dplayer.hls_js,t.dash_js=config_default.dplayer.dash_js,t.shaka_dash_js=config_default.dplayer.shaka_dash_js,t.flv_js=config_default.dplayer.flv_js,t.webtorrent_js=config_default.dplayer.webtorrent_js,t.data=config_default.dplayer.default||{},t}return __extends(t,e),t}(BaseConfig),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),DplayerTag=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.config=e,n.result="",n}return __extends(t,r),t.prototype.d_parse=function(t){var e,n={video:{}};for(e in t)if(""!=e&&null!=e)switch(e){case"url":n.video.url=t[e];break;case"pic":n.video.pic=t[e];break;case"thumbnails":n.video.thumbnails=t[e];break;case"type":n.video.type=t[e];break;case"autoplay":n.autoplay="false"!=t[e];break;case"loop":n.loop="false"!=t[e];break;case"logo":n.logo=t[e];break;case"volume":n.volume=Number(t[e]);break;case"screenshot":n.listMaxHeight="false"!=t[e];break;case"id":n.danmaku||(n.danmaku={}),n.danmaku.id=t[e];case"api":n.danmaku||(n.danmaku={}),n.danmaku.api=t[e]}return n},t.prototype.d_js=function(t){var e,n=[];for(e in t)if(""!=e&&null!=e)switch(e){case"hls":n.push(t[e]||this.config.hls_js);break;case"dash":n.push(t[e]||this.config.dash_js);break;case"shaka_dash":n.push(t[e]||this.config.shaka_dash_js);break;case"flv":n.push(t[e]||this.config.flv_js);break;case"webtorrent":n.push(t[e]||this.config.webtorrent_js)}return n},t.prototype.generate=function(){var e=this;this.result+='<script src="'+this.config.dplayer_js+'"><\/script>';var t=this.config.data,n=utils.assign(this.d_parse(t),this.contents);this.d_js(t).forEach(function(t){t&&""!=t&&null!=t&&(e.result+='<script src="'+t+'"><\/script>')}),this.result+='<div id="'+this.tag_id+'"></div>';n="var "+this.mmedia_id+"_options = JSON.parse('"+JSON.stringify(n).replace(/"([^"]*)"/g,'\\"$1\\"')+"'); "+this.mmedia_id+'_options.container = document.getElementById("'+this.tag_id+'"); ';return n+="const dp_"+this.mmedia_id+" = new DPlayer("+this.mmedia_id+"_options);",this.result+="<script> "+n+" <\/script>",this.result},t}(BaseTag),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),Video=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.video_config=new VideoConfig,n}return __extends(t,r),t.prototype.generate=function(){var e=this;return this.args.forEach(function(t){t=e.extractOption(t);t&&(e.video_config.data[t[0]]=t[1])}),new VideoTag(this.hexo,this.video_config,this.contents).generate()},t}(BaseMmedia),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),VideoConfig=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.data=config_default.video.default||{},t}return __extends(t,e),t}(BaseConfig),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),VideoTag=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.config=e,n.result="",n}return __extends(t,r),t.prototype.generate=function(){var t=merge(this.config.data,this.contents),t='<video id="'+this.tag_id+'" '+this.parse(t)+"></video>";return this.result+=t,this.result},t}(BaseTag),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),Xigua=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.xigua_config=new XiguaConfig,n}return __extends(t,r),t.prototype.generate=function(){var e=this;return this.args.forEach(function(t){t=e.extractOption(t);t&&(e.xigua_config.data[t[0]]=t[1])}),new XiguaTag(this.hexo,this.xigua_config,this.contents).generate()},t}(BaseMmedia),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),XiguaConfig=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.data=config_default.xigua.default||{},t}return __extends(t,e),t}(BaseConfig),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),XiguaTag=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.config=e,n.result="",n}return __extends(t,r),t.prototype.x_parse=function(t){var e,n={};for(e in t)if(""!=e&&null!=e)switch(e){case"xid":n.xid=t[e];break;case"id":n.id=t[e];break;case"autoplay":n.autoplay=t[e];break;case"startTime":n.danmaku=t[e];break;case"allowfullscreen":n.allowfullscreen=t[e];break;case"sandbox":n.sandbox=t[e];break;case"width":n.width=t[e];break;case"max_width":n.max_width=t[e];break;case"margin":n.margin=t[e]}return n},t.prototype.generate=function(){var t=merge(this.config.data,this.contents),t=this.x_parse(t);this.result+="<style>.xgplayer{width: "+t.width+"; max-width: "+t.max_width+"; margin: "+t.margin+"}</style>",this.result+='<div class="xgplayer"><iframe class="xgplayer" id="'+this.tag_id+'" src="https://www.ixigua.com/iframe/'+t.xid+"?"+(t.id?"id="+t.id+"&":"")+"autoplay="+("true"==t.autoplay?1:0)+"&startTime="+t.startTime+'" allowfullscreen="'+("allowfullscreen"==t.allowfullscreen||"true"==t.allowfullscreen?"allowfullscreen":"no")+'" scrolling="no" border="0" frameborder="0" framespacing="0" sandbox="'+t.sandbox+'"></iframe></div>';t='document.getElementById("'+this.tag_id+'").style.height=document.getElementById("'+this.tag_id+'").scrollWidth*0.7+"px";\n    window.onresize = function(){\n      document.getElementById("'+this.tag_id+'").style.height=document.getElementById("'+this.tag_id+'").scrollWidth*0.7+"px";\n    };';return this.result+="<script> "+t+" <\/script>",this.result},t}(BaseTag),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),Meting=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.meting_config=new MetingConfig,n}return __extends(t,r),t.prototype.generate=function(){var e=this;return this.args.forEach(function(t){t=e.extractOption(t);t&&(e.meting_config.data[t[0]]=t[1])}),new MetingTag(this.hexo,this.meting_config,this.contents).generate()},t}(BaseMmedia),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),MetingConfig=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.aplayer_css=config_default.aplayer.css,t.aplayer_js=config_default.aplayer.js,t.meting_js=config_default.meting.js,t.meting_api=config_default.meting.api,t.data=config_default.meting.default||{},t}return __extends(t,e),t}(BaseConfig),__extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}(),MetingTag=function(r){function t(t,e,n){n=r.call(this,t,e,n)||this;return n.config=e,n.result="",n}return __extends(t,r),t.prototype.generate=function(){this.result+='<link rel="stylesheet" href="'+this.config.aplayer_css+'">',this.result+='<script src="'+this.config.aplayer_js+'"><\/script>',this.result+='<script src="'+this.config.meting_js+'"><\/script>',""!=this.config.meting_api&&(t="var meting_api='"+this.config.meting_api+"?server=:server&type=:type&id=:id&auth=:auth&r=:r';",this.result+="<script> "+t+" <\/script>");var t=merge(this.config.data,this.contents),t="<meting-js "+this.parse(t)+"></meting-js>";return this.result+=t,this.result},t}(BaseTag);