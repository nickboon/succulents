(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var SvgFactory = require('./svg');

var PlantFactory = require('./plantFactory');

var goldenAngleDegrees = 137.5077640500378546463487; // svg varaiables

var svgContainerElementId = 'succulents';
var h = 400;
var w = 1000;
var x = 100;
var y = 100;
var svgFactory = new SvgFactory();
var plantFactory = new PlantFactory({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  leafCount: 20,
  stemRadius: 10,
  angle: goldenAngleDegrees - 1
});
document.getElementById(svgContainerElementId).innerHTML = [svgFactory.openSvg(x + w + x, y + h + y), plantFactory.build(), svgFactory.closeSvg()].join('');

},{"./plantFactory":3,"./svg":4}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultLeaf = {
  build: function build(transformation) {
    return "<path d=\"M10.55,1.92a3.55,3.55,0,0,0,2.67,2.44s10.49,2.28,6.44,9.9c0,0-2.94,4.13-4.71,13-.38-1.72-2.1-1.57-4.36-2.15-2.26.58-4.06.43-4.45,2.15-1.76-8.88-4.71-13-4.71-13-4-7.62,6.44-9.9,6.44-9.9A3.55,3.55,0,0,0,10.55,1.92Z\" transform=\" ".concat(transformation, "\" />");
  },
  w: 20.093,
  h: 25.349
};

var LeafFactory =
/*#__PURE__*/
function () {
  function LeafFactory() {
    _classCallCheck(this, LeafFactory);
  }

  _createClass(LeafFactory, [{
    key: "buildLeaf",
    value: function buildLeaf(_ref) {
      var translation = _ref.translation,
          rotation = _ref.rotation;
      var leaf = defaultLeaf;
      var halfW = leaf.w / 2;
      return leaf.build(["translate(".concat(translation.x - halfW, ",").concat(translation.y - leaf.h, ")"), "rotate(".concat(rotation.angle, ", ").concat(halfW, ", ").concat(leaf.h + rotation.offsetY, ")")].join(' '));
    }
  }]);

  return LeafFactory;
}();

module.exports = LeafFactory;

},{}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LeafFactory = require('./leafFactory');

var goldenAngleDegrees = 137.5077640500378546463487;

var PlantFactory =
/*#__PURE__*/
function () {
  function PlantFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        _ref$leafCount = _ref.leafCount,
        leafCount = _ref$leafCount === void 0 ? 1 : _ref$leafCount,
        _ref$stemRadius = _ref.stemRadius,
        stemRadius = _ref$stemRadius === void 0 ? 10 : _ref$stemRadius,
        _ref$angle = _ref.angle,
        angle = _ref$angle === void 0 ? goldenAngleDegrees : _ref$angle;

    _classCallCheck(this, PlantFactory);

    this.x = x;
    this.y = y;
    this.leafCount = leafCount;
    this.stemRadius = stemRadius;
    this.angle = angle;
    this.leafFactory = new LeafFactory();
  }

  _createClass(PlantFactory, [{
    key: "build",
    value: function build() {
      var plant = '';

      for (var i = this.leafCount; i > 0; i--) {
        plant += this.leafFactory.buildLeaf({
          translation: {
            x: this.x,
            y: this.y - this.stemRadius
          },
          rotation: {
            angle: this.angle * i,
            offsetY: this.stemRadius
          }
        });
      }

      return plant;
    }
  }]);

  return PlantFactory;
}();

module.exports = PlantFactory;

},{"./leafFactory":2}],4:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaults = new WeakMap();

var Elements =
/*#__PURE__*/
function () {
  function Elements() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$opacity = _ref.opacity,
        opacity = _ref$opacity === void 0 ? 0.5 : _ref$opacity,
        _ref$stroke = _ref.stroke,
        stroke = _ref$stroke === void 0 ? '#000' : _ref$stroke,
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === void 0 ? 10 : _ref$fontSize,
        _ref$textAnchor = _ref.textAnchor,
        textAnchor = _ref$textAnchor === void 0 ? 'left' : _ref$textAnchor,
        _ref$fill = _ref.fill,
        fill = _ref$fill === void 0 ? '#fff' : _ref$fill;

    _classCallCheck(this, Elements);

    defaults.set(this, {
      opacity: opacity,
      stroke: stroke,
      fontSize: fontSize,
      textAnchor: textAnchor,
      fill: fill
    });
  }

  _createClass(Elements, [{
    key: "openSvg",
    value: function openSvg(width, height) {
      var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaults.get(this).opacity;
      var stroke = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaults.get(this).stroke;
      var fill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaults.get(this).fill;
      return ['<?xml version="1.0" encoding="UTF-8" standalone="no"?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', '<svg', ['\tversion="1.1"', 'xmlns="http://www.w3.org/2000/svg"', 'xmlns:xlink="http://www.w3.org/1999/xlink"', "width=\"".concat(width, "\" height=\"").concat(height, "\" stroke=\"").concat(stroke, "\" fill=\"").concat(fill, "\" opacity=\"").concat(opacity, "\"")].join('\n\t'), '>'].join('\n');
    }
  }, {
    key: "closeSvg",
    value: function closeSvg() {
      return '</svg>';
    }
  }, {
    key: "text",
    value: function text(_text, point) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref2$opacity = _ref2.opacity,
          opacity = _ref2$opacity === void 0 ? defaults.get(this).opacity : _ref2$opacity,
          _ref2$colour = _ref2.colour,
          colour = _ref2$colour === void 0 ? defaults.get(this).colour : _ref2$colour,
          _ref2$fontSize = _ref2.fontSize,
          fontSize = _ref2$fontSize === void 0 ? defaults.get(this).fontSize : _ref2$fontSize,
          _ref2$textAnchor = _ref2.textAnchor,
          textAnchor = _ref2$textAnchor === void 0 ? defaults.get(this).textAnchor : _ref2$textAnchor;

      return "<text x=\"".concat(point.x, "\" y=\"").concat(point.y, "\" fill=\"").concat(colour, "\" opacity=\"").concat(opacity, "\" text-anchor=\"").concat(textAnchor, "\" font-size=\"").concat(fontSize, "\">").concat(_text, "</text>");
    }
  }, {
    key: "line",
    value: function line(pointA, pointB) {
      var colour = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaults.get(this).colour;
      var opacity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaults.get(this).opacity;
      return "<path d=\"M".concat(pointA.x, " ").concat(pointA.y, " L").concat(pointB.x, " ").concat(pointB.y, "\" stroke=\"").concat(colour, "\" opacity=\"").concat(opacity, "\" />");
    }
  }, {
    key: "polygon",
    value: function polygon(points) {
      var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults.get(this).fill;
      var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaults.get(this).opacity;
      return "<polygon points=\"".concat(points.map(function (p) {
        return "".concat(p.x, ",").concat(p.y);
      }).join(' '), "\" fill=\"").concat(fill, "\" opacity=\"").concat(opacity, "\" />");
    }
  }, {
    key: "quadraticBezier",
    value: function quadraticBezier(pointA, pointB, pointC) {
      var colour = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaults.get(this).colour;
      var opacity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaults.get(this).opacity;
      return "<path d=\"M".concat(pointA.x, " ").concat(pointA.y, " Q").concat(pointB.x, " ").concat(pointB.y, ", ").concat(pointC.x, " ").concat(pointC.y, "\" stroke=\"").concat(colour, "\" fill=\"none\" opacity=\"").concat(opacity, "\" />");
    }
  }, {
    key: "cubicBezier",
    value: function cubicBezier(pointA, pointB, pointC, pointD) {
      var colour = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaults.get(this).colour;
      var opacity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : defaults.get(this).opacity;
      return "<path d=\"M".concat(pointA.x, " ").concat(pointA.y, " C").concat(pointB.x, " ").concat(pointB.y, ", ").concat(pointC.x, " ").concat(pointC.y, ", ").concat(pointD.x, " ").concat(pointD.y, "\" stroke=\"").concat(colour, "\" fill=\"none\" opacity=\"").concat(opacity, "\" />");
    }
  }]);

  return Elements;
}();

module.exports = Elements;

},{}]},{},[1]);
