//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

//
import ownerDocument from "./ownerDocument";

function ownerWindow(node, fallback = window) {
  const doc = ownerDocument(node);
  return doc.defaultView || doc.parentView || fallback;
}

export default ownerWindow;
