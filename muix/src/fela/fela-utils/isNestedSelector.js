"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNestedSelector;

// PATCH
//var regex = /^(:|\[|>|&)/;

var regex = /^(:|\[|>|.*&)/;

function isNestedSelector(property) {
  return regex.test(property);
}