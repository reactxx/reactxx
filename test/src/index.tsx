import * as React from "react";
import { render } from "react-dom";

const enum Consts {
  Drawer = 'AnyPropName'
}
interface Shapes {
  [Consts.Drawer]: string
}
const X: Shapes = { AnyPropName: '' }


render(<div>Hallo world</div>, document.getElementById("root"));
