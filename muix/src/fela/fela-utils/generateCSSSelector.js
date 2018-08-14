'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateCSSSelector;
function generateCSSSelector(className) {
  // PATCH
  var pseudo = arguments.length > 1 && arguments[1]
  className = '.' + className
  if (!pseudo) return className
  return pseudo.replace(replAmpersand, className)
  
  //var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  //return '.' + className + pseudo;
}

var replAmpersand = /&&|&/g
//var replAmpersand = /&/g