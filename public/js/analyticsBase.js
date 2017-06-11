!function t(e,i,n){function o(s,a){if(!i[s]){if(!e[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(r)return r(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var u=i[s]={exports:{}};e[s][0].call(u.exports,function(t){var i=e[s][1][t];return o(i||t)},u,u.exports,t,e,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e,i){"use strict";function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}t("./autotrack.custom.js");var o={TRACKING_VERSION:"dimension1",CLIENT_ID:"dimension2",WINDOW_ID:"dimension3",HIT_ID:"dimension4",HIT_TIME:"dimension5",HIT_TYPE:"dimension6"},r={RESPONSE_END_TIME:"metric1",DOM_LOAD_TIME:"metric2",WINDOW_LOAD_TIME:"metric3"},s=function t(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,t)},a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};ga("send","event",Object.assign({eventCategory:"Script",eventAction:"error",eventLabel:t&&t.stack||"(not set)",nonInteraction:!0},e))};window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)},ga("create","UA-99079083-1","auto"),ga("set","transport","beacon"),ga("set",o.TRACKING_VERSION,"v1"),ga("set",o.WINDOW_ID,s()),ga(function(t){var e=t.get("clientId");t.set(o.CLIENT_ID,e)}),ga(function(t){var e=t.get("buildHitTask");t.set("buildHitTask",function(t){t.set(o.HIT_ID,s(),!0),t.set(o.HIT_TIME,(new Date).toISOString().replace(/[TZ]/g," "),!0),t.set(o.HIT_TYPE,t.get("hitType"),!0),e(t)})}),ga("require","maxScrollTracker",{maxScrollMetricIndex:4}),ga("require","urlChangeTracker"),function t(){if(window.performance&&window.performance.timing)if("complete"==document.readyState){var e=performance.timing,i=e.navigationStart,o=Math.round(e.responseEnd-i),s=Math.round(e.domContentLoadedEventStart-i),a=Math.round(e.loadEventStart-i);if(function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];return e.every(function(t){return t>0&&t<1e6})}(o,s,a)){var c;ga("send","event",(c={eventCategory:"Navigation Timing",eventAction:"track",nonInteraction:!0},n(c,r.RESPONSE_END_TIME,o),n(c,r.DOM_LOAD_TIME,s),n(c,r.WINDOW_LOAD_TIME,a),c))}}else window.addEventListener("load",t)}(),function(){var t=window.__e&&window.__e.q||[],e={eventAction:"uncaught error"},i=!0,n=!1,o=void 0;try{for(var r,s=t[Symbol.iterator]();!(i=(r=s.next()).done);i=!0){var c=r.value;a(c.error,e)}}catch(t){n=!0,o=t}finally{try{!i&&s.return&&s.return()}finally{if(n)throw o}}window.addEventListener("error",function(t){a(t.error,e)})}(),ga("require","pageVisibilityTracker",{sendInitialPageview:!0,visibleMetricIndex:5})},{"./autotrack.custom.js":2}],2:[function(t,e,i){(function(t){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){function i(){i=function(){},R.Symbol||(R.Symbol=n)}function n(t){return"jscomp_symbol_"+(t||"")+W++}function o(){i();var t=R.Symbol.iterator;t||(t=R.Symbol.iterator=R.Symbol("iterator")),"function"!=typeof Array.prototype[t]&&U(Array.prototype,t,{configurable:!0,writable:!0,value:function(){return r(this)}}),o=function(){}}function r(t){var e=0;return s(function(){return e<t.length?{done:!1,value:t[e++]}:{done:!0}})}function s(t){return o(),t={next:t},t[R.Symbol.iterator]=function(){return this},t}function a(t){if(!(t instanceof Array)){o();var e=t[Symbol.iterator];t=e?e.call(t):r(t);for(var i=[];!(e=t.next()).done;)i.push(e.value);t=i}return t}function c(t){if(t=t&&"."!=t?t:location.href,J[t])return J[t];if(G.href=t,"."==t.charAt(0)||"/"==t.charAt(0))return c(G.href);var e="0"==(e="80"==G.port||"443"==G.port?"":G.port)?"":e,i=G.host.replace(Z,"");return J[t]={hash:G.hash,host:i,hostname:G.hostname,href:G.href,origin:G.origin?G.origin:G.protocol+"//"+i,pathname:"/"==G.pathname.charAt(0)?G.pathname:"/"+G.pathname,port:e,protocol:G.protocol,search:G.search}}function h(t,e){var i=this;this.context=t,this.u=e,this.f=(this.c=/Task$/.test(e))?t.get(e):t[e],this.b=[],this.a=[],this.g=function(t){for(var e=[],n=0;n<arguments.length;++n)e[n-0]=arguments[n];return i.a[i.a.length-1].apply(null,[].concat(a(e)))},this.c?t.set(e,this.g):t[e]=this.g}function u(t,e,i){(t=f(t,e)).b.push(i),d(t)}function l(t,e,i){-1<(i=(t=f(t,e)).b.indexOf(i))&&(t.b.splice(i,1),0<t.b.length?d(t):-1<(i=K.indexOf(t))&&(K.splice(i,1),t.c?t.context.set(t.u,t.f):t.context[t.u]=t.f))}function d(t){t.a=[];for(var e,i=0;e=t.b[i];i++){var n=t.a[i-1]||t.f.bind(t.context);t.a.push(e(n))}}function f(t,e){var i=K.filter(function(i){return i.context==t&&i.u==e})[0];return i||(i=new h(t,e),K.push(i)),i}function p(t,e,i,n){if("function"==typeof n){var o=i.get("buildHitTask");return{buildHitTask:function(i){i.set(t,null,!0),i.set(e,null,!0),n(i,void 0,void 0),o(i)}}}return B({},t,e)}function v(t){var e;return function(i){for(var n=[],o=0;o<arguments.length;++o)n[o-0]=arguments[o];clearTimeout(e),e=setTimeout(function(){return t.apply(null,[].concat(a(n)))},500)}}function g(t,e){function i(){clearTimeout(o.timeout),o.send&&l(t,"send",o.send),delete Y[n],o.w.forEach(function(t){return t()})}var n=t.get("trackingId"),o=Y[n]=Y[n]||{};clearTimeout(o.timeout),o.timeout=setTimeout(i,0),o.w=o.w||[],o.w.push(e),o.send||(o.send=function(t){return function(e){for(var n=[],o=0;o<arguments.length;++o)n[o-0]=arguments[o];i(),t.apply(null,[].concat(a(n)))}},u(t,"send",o.send))}function m(t,e){var i=window.GoogleAnalyticsObject||"ga";window[i]=window[i]||function(t){for(var e=[],n=0;n<arguments.length;++n)e[n-0]=arguments[n];(window[i].q=window[i].q||[]).push(e)},window.gaDevIds=window.gaDevIds||[],0>window.gaDevIds.indexOf("i5iSjo")&&window.gaDevIds.push("i5iSjo"),window[i]("provide",t,e),window.gaplugins=window.gaplugins||{},window.gaplugins[t.charAt(0).toUpperCase()+t.slice(1)]=e}function b(){this.a={}}function y(t,e){(t.a.externalSet=t.a.externalSet||[]).push(e)}function w(t,e){e=void 0===e?{}:e,this.a={},this.b=t,this.l=e,this.i=null}function I(t,e,i){return t=["autotrack",t,e].join(":"),Q[t]||(Q[t]=new w(t,i),X||(window.addEventListener("storage",O),X=!0)),Q[t]}function T(){if(null!=z)return z;try{window.localStorage.setItem("autotrack","autotrack"),window.localStorage.removeItem("autotrack"),z=!0}catch(t){z=!1}return z}function S(t){if(t.i={},T())try{window.localStorage.removeItem(t.b)}catch(t){}}function E(t){delete Q[t.b],Object.keys(Q).length||(window.removeEventListener("storage",O),X=!1)}function O(t){var e=Q[t.key];if(e){var i=B({},e.l,x(t.oldValue));t=B({},e.l,x(t.newValue)),e.i=t,e.D("externalSet",t,i)}}function x(t){var e={};if(t)try{e=JSON.parse(t)}catch(t){}return e}function j(t,e,i){this.f=t,this.timeout=e||et,this.timeZone=i,this.b=this.b.bind(this),u(t,"sendHitTask",this.b);try{this.c=new Intl.DateTimeFormat("en-US",{timeZone:this.timeZone})}catch(t){}this.a=I(t.get("trackingId"),"session",{hitTime:0,isExpired:!1}),this.a.get().id||this.a.set({id:$()})}function k(t,e,i){var n=t.get("trackingId");return tt[n]?tt[n]:tt[n]=new j(t,e,i)}function D(t){return t.a.get().id}function _(t){l(t.f,"sendHitTask",t.b),E(t.a),delete tt[t.f.get("trackingId")]}function M(t,e){t.set("&_av","2.4.1");var i=t.get("&_au");if((i=parseInt(i||"0",16).toString(2)).length<nt)for(var n=nt-i.length;n;)i="0"+i,n--;e=nt-e,i=i.substr(0,e)+1+i.substr(e+1),t.set("&_au",parseInt(i||"0",2).toString(16))}function L(t,e){M(t,it.A),window.addEventListener&&(this.b=B({increaseThreshold:20,sessionTimeout:et,fieldsObj:{}},e),this.f=t,this.c=C(this),this.g=v(this.g.bind(this)),this.j=this.j.bind(this),this.a=I(t.get("trackingId"),"plugins/max-scroll-tracker"),this.h=k(t,this.b.sessionTimeout,this.b.timeZone),u(t,"set",this.j),A(this))}function A(t){100>(t.a.get()[t.c]||0)&&window.addEventListener("scroll",t.g)}function C(t){return(t=c(t.f.get("page")||t.f.get("location"))).pathname+t.search}function N(t,e){var i=this;M(t,it.B),document.visibilityState&&(this.a=B({sessionTimeout:et,visibleThreshold:5e3,sendInitialPageview:!1,fieldsObj:{}},e),this.b=t,this.h=document.visibilityState,this.o=null,this.v=!1,this.j=this.j.bind(this),this.f=this.f.bind(this),this.m=this.m.bind(this),this.s=this.s.bind(this),this.c=I(t.get("trackingId"),"plugins/page-visibility-tracker"),y(this.c,this.s),this.g=k(t,this.a.sessionTimeout,this.a.timeZone),u(t,"set",this.j),window.addEventListener("unload",this.m),document.addEventListener("visibilitychange",this.f),g(this.b,function(){if("visible"==document.visibilityState)i.a.sendInitialPageview&&(q(i,{F:!0}),i.v=!0),i.c.set({time:+new Date,state:"visible",pageId:ot,sessionId:D(i.g)});else if(i.a.sendInitialPageview&&i.a.pageLoadsMetricIndex){var t=((t={}).transport="beacon",t.eventCategory="Page Visibility",t.eventAction="page load",t.eventLabel="(not set)",t["metric"+i.a.pageLoadsMetricIndex]=1,t.nonInteraction=!0,t);i.b.send("event",p(t,i.a.fieldsObj,i.b,i.a.hitFilter))}}))}function H(t){var e=t.c.get();return"visible"==t.h&&"hidden"==e.state&&e.pageId!=ot&&(e.state="visible",e.pageId=ot,t.c.set(e)),e}function P(t,e,i){var n=((n={hitTime:i=(i||{}).hitTime})||{}).hitTime;(e=e.time?(n||+new Date)-e.time:0)&&e>=t.a.visibleThreshold&&(e=Math.round(e/1e3),n={transport:"beacon",nonInteraction:!0,eventCategory:"Page Visibility",eventAction:"track",eventValue:e,eventLabel:"(not set)"},i&&(n.queueTime=+new Date-i),t.a.visibleMetricIndex&&(n["metric"+t.a.visibleMetricIndex]=e),t.b.send("event",p(n,t.a.fieldsObj,t.b,t.a.hitFilter)))}function q(t,e){e=(i=e||{}).hitTime;var i=i.F,n={transport:"beacon"};e&&(n.queueTime=+new Date-e),i&&t.a.pageLoadsMetricIndex&&(n["metric"+t.a.pageLoadsMetricIndex]=1),t.b.send("pageview",p(n,t.a.fieldsObj,t.b,t.a.hitFilter))}function F(t,e){M(t,it.C),history.pushState&&window.addEventListener&&(this.a=B({shouldTrackUrlChange:this.shouldTrackUrlChange,trackReplaceState:!1,fieldsObj:{},hitFilter:null},e),this.g=t,this.h=location.pathname+location.search,this.c=this.c.bind(this),this.f=this.f.bind(this),this.b=this.b.bind(this),u(history,"pushState",this.c),u(history,"replaceState",this.f),window.addEventListener("popstate",this.b))}function V(t,e){setTimeout(function(){var i=t.h,n=location.pathname+location.search;i!=n&&t.a.shouldTrackUrlChange.call(t,n,i)&&(t.h=n,t.g.set({page:n,title:document.title}),(e||t.a.trackReplaceState)&&t.g.send("pageview",p({transport:"beacon"},t.a.fieldsObj,t.g,t.a.hitFilter)))},0)}var U="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,i){if(i.get||i.set)throw new TypeError("ES3 does not support getters and setters.");t!=Array.prototype&&t!=Object.prototype&&(t[e]=i.value)},R="undefined"!=typeof window&&window===this?this:void 0!==t&&null!=t?t:this,W=0,Z=/:(80|443)$/,G=document.createElement("a"),J={},K=[],Y={},B=Object.assign||function(t,e){for(var i=[],n=1;n<arguments.length;++n)i[n-1]=arguments[n];for(var n=0,o=i.length;n<o;n++){var r,s=Object(i[n]);for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r])}return t},$=function t(e){return e?(e^16*Math.random()>>e/4).toString(16):"10000000-1000-4000-8000-100000000000".replace(/[018]/g,t)};b.prototype.D=function(t,e){for(var i=[],n=1;n<arguments.length;++n)i[n-1]=arguments[n];(this.a[t]=this.a[t]||[]).forEach(function(t){return t.apply(null,[].concat(a(i)))})};var z,Q={},X=!1;!function(t,e){function i(){}i.prototype=e.prototype,t.N=e.prototype,t.prototype=new i,t.prototype.constructor=t;for(var n in e)if(Object.defineProperties){var o=Object.getOwnPropertyDescriptor(e,n);o&&Object.defineProperty(t,n,o)}else t[n]=e[n]}(w,b),w.prototype.get=function(){if(this.i)return this.i;if(T())try{this.i=x(window.localStorage.getItem(this.b))}catch(t){}return this.i=B({},this.l,this.i)},w.prototype.set=function(t){if(this.i=B({},this.l,this.i,t),T())try{var e=JSON.stringify(this.i);window.localStorage.setItem(this.b,e)}catch(t){}};var tt={};j.prototype.isExpired=function(t){if((t=void 0===t?D(this):t)!=D(this))return!0;if((t=this.a.get()).isExpired)return!0;var e=t.hitTime;return!!(e&&(t=new Date,e=new Date(e),t-e>6e4*this.timeout||this.c&&this.c.format(t)!=this.c.format(e)))},j.prototype.b=function(t){var e=this;return function(i){t(i),i="start"==(n=i.get("sessionControl"))||e.isExpired();var n="end"==n,o=e.a.get();o.hitTime=+new Date,i&&(o.isExpired=!1,o.id=$()),n&&(o.isExpired=!0),e.a.set(o)}};var et=30,it={G:1,H:2,I:3,J:4,K:5,L:6,B:7,M:8,C:9,A:10},nt=Object.keys(it).length;L.prototype.g=function(){var t=document.documentElement,e=document.body,t=Math.min(100,Math.max(0,Math.round(window.pageYOffset/(Math.max(t.offsetHeight,t.scrollHeight,e.offsetHeight,e.scrollHeight)-window.innerHeight)*100)));if((e=D(this.h))!=this.a.get().sessionId&&(S(this.a),this.a.set({sessionId:e})),this.h.isExpired(this.a.get().sessionId))S(this.a);else if(e=this.a.get()[this.c]||0,t>e&&(100!=t&&100!=e||window.removeEventListener("scroll",this.g),e=t-e,100==t||e>=this.b.increaseThreshold)){var i={};this.a.set((i[this.c]=t,i.sessionId=D(this.h),i)),t={transport:"beacon",eventCategory:"Max Scroll",eventAction:"increase",eventValue:e,eventLabel:String(t),nonInteraction:!0},this.b.maxScrollMetricIndex&&(t["metric"+this.b.maxScrollMetricIndex]=e),this.f.send("event",p(t,this.b.fieldsObj,this.f,this.b.hitFilter))}},L.prototype.j=function(t){var i=this;return function(n,o){t(n,o);var r={};("object"==(void 0===n?"undefined":e(n))&&null!==n?n:(r[n]=o,r)).page&&(n=i.c,i.c=C(i),i.c!=n&&A(i))}},L.prototype.remove=function(){_(this.h),window.removeEventListener("scroll",this.g),l(this.f,"set",this.j)},m("maxScrollTracker",L);var ot=$();N.prototype.f=function(){var t=this;if("visible"==document.visibilityState||"hidden"==document.visibilityState){var e=H(this),i={time:+new Date,state:document.visibilityState,pageId:ot,sessionId:D(this.g)};"visible"==document.visibilityState&&this.a.sendInitialPageview&&!this.v&&(q(this),this.v=!0),"hidden"==document.visibilityState&&this.o&&clearTimeout(this.o),this.g.isExpired(e.sessionId)?(S(this.c),"hidden"==this.h&&"visible"==document.visibilityState&&(clearTimeout(this.o),this.o=setTimeout(function(){t.c.set(i),q(t,{hitTime:i.time})},this.a.visibleThreshold))):(e.pageId==ot&&"visible"==e.state&&P(this,e),this.c.set(i)),this.h=document.visibilityState}},N.prototype.j=function(t){var i=this;return function(n,o){var r={};(r="object"==(void 0===n?"undefined":e(n))&&null!==n?n:(r[n]=o,r)).page&&r.page!==i.b.get("page")&&"visible"==i.h&&i.f(),t(n,o)}},N.prototype.s=function(t,e){t.time!=e.time&&(e.pageId!=ot||"visible"!=e.state||this.g.isExpired(e.sessionId)||P(this,e,{hitTime:t.time}))},N.prototype.m=function(){"hidden"!=this.h&&this.f()},N.prototype.remove=function(){E(this.c),_(this.g),l(this.b,"set",this.j),window.removeEventListener("unload",this.m),document.removeEventListener("visibilitychange",this.f)},m("pageVisibilityTracker",N),F.prototype.c=function(t){var e=this;return function(i){for(var n=[],o=0;o<arguments.length;++o)n[o-0]=arguments[o];t.apply(null,[].concat(a(n))),V(e,!0)}},F.prototype.f=function(t){var e=this;return function(i){for(var n=[],o=0;o<arguments.length;++o)n[o-0]=arguments[o];t.apply(null,[].concat(a(n))),V(e,!1)}},F.prototype.b=function(){V(this,!0)},F.prototype.shouldTrackUrlChange=function(t,e){return!(!t||!e)},F.prototype.remove=function(){l(history,"pushState",this.c),l(history,"replaceState",this.f),window.removeEventListener("popstate",this.b)},m("urlChangeTracker",F)}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);