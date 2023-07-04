"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_unsupportedIterableToArray(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,a,o,i,u=[],c=!0,l=!1;try{if(o=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=o.call(r)).done)&&(u.push(n.value),u.length!==e);c=!0);}catch(t){l=!0,a=t}finally{try{if(!c&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw a}}return u}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function _createForOfIteratorHelper(t,e){var r,n,a,o,i="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(i)return n=!(r=!0),{s:function(){i=i.call(t)},n:function(){var t=i.next();return r=t.done,t},e:function(t){n=!0,a=t},f:function(){try{r||null==i.return||i.return()}finally{if(n)throw a}}};if(Array.isArray(t)||(i=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length)return i&&(t=i),o=0,{s:e=function(){},n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:e};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){var r;if(t)return"string"==typeof t?_arrayLikeToArray(t,e):"Map"===(r="Object"===(r=Object.prototype.toString.call(t).slice(8,-1))&&t.constructor?t.constructor.name:r)||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var destination=function(){function o(t,e,r){e in t?n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r}function s(t,e){for(var r in e=e||{})u.call(e,r)&&o(t,r,e[r]);if(i){var n,a=_createForOfIteratorHelper(i(e));try{for(a.s();!(n=a.n()).done;){r=n.value;c.call(e,r)&&o(t,r,e[r])}}catch(t){a.e(t)}finally{a.f()}}return t}var n=Object.defineProperty,i=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;function f(t,o,e){var i=2<arguments.length&&void 0!==e?e:0,u={};return Object.entries(t).forEach(function(t){var e,r,n,t=_slicedToArray(t,2),a=t[0],t=t[1],t=("string"==typeof t?e=t:(e=t.key,r=t.default),t=o,n=i,e.split(".").reduce(function(t,e){if("*"==e&&(e=String(n)),t instanceof Object)return t[e]},t)||r);t&&(u[a]=t)}),!!Object.keys(u).length&&u}t=function(){r={config:{custom:{measurementId:""}},init:function(t){var e=window,r=t.custom||{},n={};return!!r.measurementId&&(r.transport_url&&(n.transport_url=r.transport_url),!1===r.pageview&&(n.send_page_view=!1),t.loadScript&&function(t,e){var e=1<arguments.length&&void 0!==e?e:"https://www.googletagmanager.com/gtag/js?id=",r=document.createElement("script");r.src=e+t,document.head.appendChild(r)}(r.measurementId),e.dataLayer=e.dataLayer||[],e.gtag||(e.gtag=function(){e.dataLayer.push(arguments)},e.gtag("js",new Date)),e.gtag("config",r.measurementId,n),!0)},push:function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},n=t.custom,a=r.custom||{};if(n&&n.measurementId){for(var o={},t=a.include||n.include||["data"],i=((t=t.includes("all")?["context","data","event","globals","user"]:t).forEach(function(r){var t=e[r];"event"==r&&(t={id:e.id,timing:e.timing,trigger:e.trigger,entity:e.entity,action:e.action,group:e.group,count:e.count}),Object.entries(t).forEach(function(t){var t=_slicedToArray(t,2),e=t[0],t=t[1];"context"==r&&(t=t[0]),o["".concat(r,"_").concat(e)]=t})}),Object.assign(o,f(s(s({},n.params),a.params),e)),[]),u=0,c=e.nested.length||1;u<c;u++){var l=f(s(s({},n.items&&n.items.params),a.items&&a.items.params),e,u);l&&i.push(l)}i.length&&(o.items=i);t=e.event;r.name||!1===n.snakeCase||(t=t.replace(" ","_").toLowerCase()),o.send_to=n.measurementId,n.debug&&(o.debug_mode=!0),window.gtag("event",t,o)}}}};var r,t,e,a,l,d=function(){return e=t?t(t=0):e};return a=function(t,e){d(),e.exports=r},l||a((l={exports:{}}).exports,l),l.exports}();