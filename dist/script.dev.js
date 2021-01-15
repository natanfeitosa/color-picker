"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*function altera(el) {
    let r = document.querySelectorAll('input[name=r]')[0].value,
        g = document.querySelectorAll('input[name=g]')[0].value,
        b = document.querySelectorAll('input[name=b]')[0].value,
        a = document.querySelectorAll('input[name=a]')[0].value
    let v = el.value, n = el.name;
    let rgba = `rgba(${r}, ${g}, ${b}, ${a})`
    let hex = rgbaToHex(rgba)
    console.log(rgba)
    n == 'a' ? $('#' + n).value = parseFloat(v) : $('#' + n).value = parseInt(v)
    bg($('.pr'), r, g, b, a)
    let p = $('#hex')
    p.innerText = `${hex}`
    hex == '#000000ff' ? p.style.color = '#fff' : p.style.color = '#000'
}*/
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
    key: "trim",
    value: function trim(str) {
      return toString(str).replace(/^\s+|\s+$/gm, '');
    }
  }, {
    key: "convert",
    value: function convert(c) {
      return parseInt(c, 10).toString(16);
    }
  }, {
    key: "setBg",
    value: function setBg(e, r, g, b, a) {
      var rgba = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a || 1, ")");
      e.style.background = rgba;
      console.log(rgba);
    }
  }]);

  return Utils;
}();

var Picker =
/*#__PURE__*/
function (_Observer) {
  _inherits(Picker, _Observer);

  function Picker() {
    var _this2;

    _classCallCheck(this, Picker);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Picker).call(this)); // this.observer = new Observer();

    _this2.utils = new Utils();
    _this2.colors = {
      'r': 255,
      'g': 255,
      'b': 255,
      'a': 1
    };
    _this2.hex = '#ffffff';
    _this2.$ = document.querySelectorAll.bind(document);
    return _this2;
  }

  _createClass(Picker, [{
    key: "addEvent",
    value: function addEvent(el) {
      var _this3 = this;

      var _this = this;

      el.map(function (i) {
        _this3.$(".".concat(i['class'])).forEach(function (item) {
          item.addEventListener('input', function (e) {
            var color = i["var"] === 'a' ? parseFloat(item.value) : parseInt(item.value);
            _this3.colors[i['var']] = color; // console.log(`\nEvent: ${color}`)

            _this3.notify({
              'type': 'setValue',
              _this: _this,
              'data': [i['class'], color]
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
        var con = this.utils.convert(this.colors[k]); // console.log(`${k} : ${con}`)

        hexad[k] = con;
      }

      ;

      if (this.colors['a'] != 1.0 || this.colors['a'] != 1) {
        var a = this.colors['a'];
        hexad['a'] = Math.round(parseFloat(a).toFixed(2) * 255).toString(16).substring(0, 2);
      } else {
        delete hexad.a;
      }

      hexad = Object.values(hexad);
      this.hex = "#".concat(hexad.join(''));
    }
  }, {
    key: "adaptrgba2hex",
    value: function adaptrgba2hex(data) {
      data._this.rgba2hex();
    }
  }, {
    key: "setValues",
    value: function setValues(_ref) {
      var type = _ref.type,
          _this = _ref._this,
          data = _ref.data;

      // console.log(type, _this, data)
      if (type == 'setValue') {
        _this.$(".".concat(data[0])).forEach(function (i) {
          return i.value = data[1];
        });
      }
    }
  }, {
    key: "setEx",
    value: function setEx(data) {
      var p = document.querySelector('#hex'),
          _this = data._this;
      p.innerText = _this.hex;
      var _this$colors = _this.colors,
          r = _this$colors.r,
          g = _this$colors.g,
          b = _this$colors.b,
          a = _this$colors.a;

      _this.utils.setBg(document.querySelector('.pr'), r, g, b, a);
    }
  }, {
    key: "init",
    value: function init() {
      this.subscribe(this.adaptrgba2hex);
      this.subscribe(this.setValues);
      this.subscribe(this.setEx);
      this.addEvent([{
        'class': 'red',
        'var': 'r'
      }, {
        'class': 'green',
        'var': 'g'
      }, {
        'class': 'blue',
        'var': 'b'
      }, {
        'class': 'alpha',
        'var': 'a'
      }]);
    }
  }]);

  return Picker;
}(Observer);

var p = new Picker();
p.init();