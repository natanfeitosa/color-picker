"use strict";var _this2=void 0;function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _possibleConstructorReturn(t,e){return!e||"object"!==_typeof(e)&&"function"!=typeof e?_assertThisInitialized(t):e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),t}var debug=!0;String.prototype.trim||(String.prototype.trim=function(){return _this2.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});var Observer=function(){function t(){if(_classCallCheck(this,t),this.constructor==t)throw new Error("Abstract classes can't be instantiated.");this.observers=[]}return _createClass(t,[{key:"subscribe",value:function(t){this.observers.push(t)}},{key:"unsubscibe",value:function(e){this.observers=this.observers.filter(function(t){return t!==e})}},{key:"notify",value:function(e){this.observers.forEach(function(t){return t(e)})}}]),t}(),Utils=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"toHex",value:function(t){return parseInt(t,10).toString(16)}},{key:"setBg",value:function(t,e){var r=e.r,o=e.g,n=e.b,s=e.a,i="rgba(".concat(r,", ").concat(o,", ").concat(n,", ").concat(s||1,")");t.style.background=i,console.log(i)}}]),t}(),$=function(t,e){var r=1<arguments.length&&void 0!==e&&e;return/^\#/.test(t.trim())||r?document.querySelector(t):document.querySelectorAll(t)},Picker=function(){function e(){var t;return _classCallCheck(this,e),(t=_possibleConstructorReturn(this,_getPrototypeOf(e).call(this))).utils=new Utils,t.colors={r:30,g:40,b:50,a:1},t.hex="#ffffff",t.ranges=[],t}return _inherits(e,Observer),_createClass(e,[{key:"addEvent",value:function(t){var o=this,n=this;t.map(function(r){$(".".concat(r[0])).forEach(function(e){e.addEventListener("input",function(){var t=("a"==r[1]?parseFloat:parseInt)(e.value);o.colors[r[1]]=t,debug&&(console.log("Array Item: ".concat(r)),console.log("Color num: ".concat(t)),console.log("Color code: ".concat(r[1]))),o.notify({type:"setValue",_this:n,data:[r[0],t]})})})})}},{key:"rgba2hex",value:function(){var t={r:"",g:"",b:"",a:""};for(var e in this.colors){var r=this.colors[e];t[e]=this.utils.toHex("a"===e?255*parseFloat(r):r)}"ff"==t.a.toLowerCase()&&delete t.a,this.hex="#".concat(Object.values(t).join(""))}},{key:"adaptrgba2hex",value:function(t){t._this.rgba2hex()}},{key:"setValues",value:function(t){var e=t.type,r=t.data;"setValue"==e&&$(".".concat(r[0])).forEach(function(t){return t.value=r[1]})}},{key:"setEx",value:function(t){var e=t._this;$("#hex").innerText=e.hex,e.utils.setBg($("body",!0),e.colors)}},{key:"init",value:function(){this.subscribe(this.adaptrgba2hex),this.subscribe(this.setValues),this.subscribe(this.setEx),this.addEvent([["red","r"],["green","g"],["blue","b"],["alpha","a"]])}}]),e}(),p=new Picker,debug=!debug;p.init();