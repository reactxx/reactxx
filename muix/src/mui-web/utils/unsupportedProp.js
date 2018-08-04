//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

//
function unsupportedProp(
  props,
  propName,
  componentName,
  location,
  propFullName
) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const propFullNameSafe = propFullName || propName;

  if (typeof props[propName] !== "undefined") {
    return new Error(
      `The property \`${propFullNameSafe}\` is not supported. Please remove it.`
    );
  }

  return null;
}

export default unsupportedProp;
