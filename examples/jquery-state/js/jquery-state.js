// DeepDiff - deep-diff https://github.com/flitbit/diff
(function(global,e){typeof exports==="object"&&typeof module!=="undefined"?module.exports=e():typeof define==="function"&&define.amd?define(e):global.DeepDiff=e()})(this,function(){"use strict";var e;var t;var n=[];if(typeof global==="object"&&global){e=global}else if(typeof window!=="undefined"){e=window}else{e={}}t=e.DeepDiff;if(t){n.push(function(){if("undefined"!==typeof t&&e.DeepDiff===c){e.DeepDiff=t;t=undefined}})}function r(e,t){e.super_=t;e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})}function i(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:true});if(t&&t.length){Object.defineProperty(this,"path",{value:t,enumerable:true})}}function a(e,t,n){a.super_.call(this,"E",e);Object.defineProperty(this,"lhs",{value:t,enumerable:true});Object.defineProperty(this,"rhs",{value:n,enumerable:true})}r(a,i);function f(e,t){f.super_.call(this,"N",e);Object.defineProperty(this,"rhs",{value:t,enumerable:true})}r(f,i);function l(e,t){l.super_.call(this,"D",e);Object.defineProperty(this,"lhs",{value:t,enumerable:true})}r(l,i);function u(e,t,n){u.super_.call(this,"A",e);Object.defineProperty(this,"index",{value:t,enumerable:true});Object.defineProperty(this,"item",{value:n,enumerable:true})}r(u,i);function h(e,t,n){var r=e.slice((n||t)+1||e.length);e.length=t<0?e.length+t:t;e.push.apply(e,r);return e}function s(e){var t=typeof e;if(t!=="object"){return t}if(e===Math){return"math"}else if(e===null){return"null"}else if(Array.isArray(e)){return"array"}else if(Object.prototype.toString.call(e)==="[object Date]"){return"date"}else if(typeof e.toString==="function"&&/^\/.*\//.test(e.toString())){return"regexp"}return"object"}function o(e,t,n,r,i,c,p){i=i||[];p=p||[];var d=i.slice(0);if(typeof c!=="undefined"){if(r){if(typeof r==="function"&&r(d,c)){return}else if(typeof r==="object"){if(r.prefilter&&r.prefilter(d,c)){return}if(r.normalize){var b=r.normalize(d,c,e,t);if(b){e=b[0];t=b[1]}}}}d.push(c)}if(s(e)==="regexp"&&s(t)==="regexp"){e=e.toString();t=t.toString()}var y=typeof e;var v=typeof t;var g=y!=="undefined"||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(c);var k=v!=="undefined"||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(c);if(!g&&k){n(new f(d,t))}else if(!k&&g){n(new l(d,e))}else if(s(e)!==s(t)){n(new a(d,e,t))}else if(s(e)==="date"&&e-t!==0){n(new a(d,e,t))}else if(y==="object"&&e!==null&&t!==null){if(!p.filter(function(t){return t.lhs===e}).length){p.push({lhs:e,rhs:t});if(Array.isArray(e)){var m,w=e.length;for(m=0;m<e.length;m++){if(m>=t.length){n(new u(d,m,new l(undefined,e[m])))}else{o(e[m],t[m],n,r,d,m,p)}}while(m<t.length){n(new u(d,m,new f(undefined,t[m++])))}}else{var j=Object.keys(e);var D=Object.keys(t);j.forEach(function(i,a){var f=D.indexOf(i);if(f>=0){o(e[i],t[i],n,r,d,i,p);D=h(D,f)}else{o(e[i],undefined,n,r,d,i,p)}});D.forEach(function(e){o(undefined,t[e],n,r,d,e,p)})}p.length=p.length-1}else if(e!==t){n(new a(d,e,t))}}else if(e!==t){if(!(y==="number"&&isNaN(e)&&isNaN(t))){n(new a(d,e,t))}}}function c(e,t,n,r){r=r||[];o(e,t,function(e){if(e){r.push(e)}},n);return r.length?r:undefined}function p(e,t,n){if(n.path&&n.path.length){var r=e[t],i,a=n.path.length-1;for(i=0;i<a;i++){r=r[n.path[i]]}switch(n.kind){case"A":p(r[n.path[i]],n.index,n.item);break;case"D":delete r[n.path[i]];break;case"E":case"N":r[n.path[i]]=n.rhs;break}}else{switch(n.kind){case"A":p(e[t],n.index,n.item);break;case"D":e=h(e,t);break;case"E":case"N":e[t]=n.rhs;break}}return e}function d(e,t,n){if(e&&t&&n&&n.kind){var r=e,i=-1,a=n.path?n.path.length-1:0;while(++i<a){if(typeof r[n.path[i]]==="undefined"){r[n.path[i]]=typeof n.path[i]==="number"?[]:{}}r=r[n.path[i]]}switch(n.kind){case"A":p(n.path?r[n.path[i]]:r,n.index,n.item);break;case"D":delete r[n.path[i]];break;case"E":case"N":r[n.path[i]]=n.rhs;break}}}function b(e,t,n){if(n.path&&n.path.length){var r=e[t],i,a=n.path.length-1;for(i=0;i<a;i++){r=r[n.path[i]]}switch(n.kind){case"A":b(r[n.path[i]],n.index,n.item);break;case"D":r[n.path[i]]=n.lhs;break;case"E":r[n.path[i]]=n.lhs;break;case"N":delete r[n.path[i]];break}}else{switch(n.kind){case"A":b(e[t],n.index,n.item);break;case"D":e[t]=n.lhs;break;case"E":e[t]=n.lhs;break;case"N":e=h(e,t);break}}return e}function y(e,t,n){if(e&&t&&n&&n.kind){var r=e,i,a;a=n.path.length-1;for(i=0;i<a;i++){if(typeof r[n.path[i]]==="undefined"){r[n.path[i]]={}}r=r[n.path[i]]}switch(n.kind){case"A":b(r[n.path[i]],n.index,n.item);break;case"D":r[n.path[i]]=n.lhs;break;case"E":r[n.path[i]]=n.lhs;break;case"N":delete r[n.path[i]];break}}}function v(e,t,n){if(e&&t){var r=function(r){if(!n||n(e,t,r)){d(e,t,r)}};o(e,t,r)}}Object.defineProperties(c,{diff:{value:c,enumerable:true},observableDiff:{value:o,enumerable:true},applyDiff:{value:v,enumerable:true},applyChange:{value:d,enumerable:true},revertChange:{value:y,enumerable:true},isConflict:{value:function(){return"undefined"!==typeof t},enumerable:true},noConflict:{value:function(){if(n){n.forEach(function(e){e()});n=null}return c},enumerable:true}});return c});

(function( $ ) {

	var stateData = {};

	function index(obj,i) {
		return obj[i];
	}

    $.state = $.extend($({}),(function(o) {

    	o.get = function() {
			return $.extend(true, {}, stateData); // return a copy of state
		};

		o.set = function(data) {
			var allDiffs = DeepDiff(stateData, data),
				diffs = {};

			if (typeof allDiffs != 'undefined') {
				// reduce diffs
				$.each(allDiffs, function(i, diffData) {
					if (typeof diffData.path != 'undefined') {
						diffs[diffData.path.join('.')] = diffData.path.reduce(index, data);
					}
				});
				// trigger event for each diff
				$.each(diffs, function(key, value) {
					o.trigger('state.'+key, value);
				});

				stateData = $.extend(stateData,data);

				// send state change event
				o.trigger('state',stateData);
			}
		};
		
		return o;

	})($({})));
 
}( jQuery ));