import * as React from "react";
import { render } from "react-dom";
import { localNumber } from "./Hello";
import PackageDef from './package-def'

const enum globals2 {
  global = 'hallo'
}

const glob = globals.global
const glob2 = globals2.global

render(<h2>Global scope example: {localNumber}</h2>, document.getElementById("root"));
