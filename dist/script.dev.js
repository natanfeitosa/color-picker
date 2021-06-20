"use strict";

var _this2 = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var debug = true;

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return _this2.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

var Observer =
/*#__PURE__*/
function () {
  function Observer() {
    _classCallCheck(this, Observer);

    if (this.constructor == Observer) {
      throw new Error('Abstract classes can\'t be instantiated.');
    } else {
      this.observers = [];
    }
  }

  _createClass(Observer, [{
    key: "subscribe",
    value: function subscribe(func) {
      this.observers.push(func);
    }
  }, {
    key: "unsubscibe",
    value: function unsubscibe(func) {
      this.observers = this.observers.filter(function (subscriber) {
        return subscriber !== func;
      });
    }
  }, {
    key: "notify",
    value: function notify(data) {
      this.observers.forEach(function (func) {
        return func(data);
      });
    }
  }]);

  return Observer;
}();

var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: "toHex",
    value: function toHex(c) {
      return parseInt(c, 10).toString(16);
    }
  }, {
    key: "setBg",
    value: function setBg(e, _ref) {
      var r = _ref.r,
          g = _ref.g,
          b = _ref.b,
          a = _ref.a;
      var rgba = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a || 1, ")");
      e.style.background = rgba;
      console.log(rgba);
    }
  }]);

  return Utils;
}();
/**
 * 
 * @param { string } str 
 * @param { boolean } unique 
 * @returns { Element | NodeListOf.<Element> }
 */


var $ = function $(str) {
  var unique = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (/^\#/.test(str.trim()) || unique) {
    return document.querySelector(str);
  }

  return document.querySelectorAll(str);
};

var Picker =
/*#__PURE__*/
function (_Observer) {
  _inherits(Picker, _Observer);

  function Picker() {
    var _this3;

    _classCallCheck(this, Picker);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Picker).call(this)); // this.observer = new Observer();

    _this3.utils = new Utils();
    _this3.colors = {
      'r': 30,
      'g': 40,
      'b': 50,
      'a': 1
    };
    _this3.hex = '#ffffff';
    _this3.ranges = [];
    return _this3;
  }
  /**
   * 
   * @param { Array.<Array.<String>> } opts
   * @returns { void }
   */


  _createClass(Picker, [{
    key: "addEvent",
    value: function addEvent(opts) {
      var _this4 = this;

      var _this = this;

      opts.map(function (i) {
        $(".".concat(i[0])).forEach(function (el) {
          el.addEventListener('input', function () {
            var color = i[1] == 'a' ? parseFloat(el.value) : parseInt(el.value);
            _this4.colors[i[1]] = color;

            if (debug) {
              console.log("Array Item: ".concat(i));
              console.log("Color num: ".concat(color));
              console.log("Color code: ".concat(i[1]));
            }

            _this4.notify({
              'type': 'setValue',
              _this: _this,
              'data': [i[0], color]
            });
          });
        });
      });
    }
  }, {
    key: "rgba2hex",
    value: function rgba2hex() {
      var hexad = {
        'r': '',
        'g': '',
        'b': '',
        'a': ''
      };

      for (var k in this.colors) {
        var a = this.colors[k];
        hexad[k] = this.utils.toHex(k === 'a' ? parseFloat(a) * 255 : a);
      }

      ;

      if (hexad.a.toLowerCase() == 'ff') {
        delete hexad.a;
      }

      this.hex = "#".concat(Object.values(hexad).join(''));
    }
  }, {
    key: "adaptrgba2hex",
    value: function adaptrgba2hex(_ref2) {
      var _this = _ref2._this;

      _this.rgba2hex();
    }
  }, {
    key: "setValues",
    value: function setValues(_ref3) {
      var type = _ref3.type,
          data = _ref3.data;

      // console.log(type, _this, data)
      if (type == 'setValue') {
        $(".".concat(data[0])).forEach(function (i) {
          return i.value = data[1];
        });
      }
    }
  }, {
    key: "setEx",
    value: function setEx(_ref4) {
      var _this = _ref4._this;
      var p = $('#hex');
      p.innerText = _this.hex;

      _this.utils.setBg($('body', true), _this.colors);
    }
  }, {
    key: "init",
    value: function init() {
      this.subscribe(this.adaptrgba2hex);
      this.subscribe(this.setValues);
      this.subscribe(this.setEx);
      this.addEvent([['red', 'r'], ['green', 'g'], ['blue', 'b'], ['alpha', 'a']]);
    }
  }]);

  return Picker;
}(Observer);

var p = new Picker();
debug = !debug;
p.init();