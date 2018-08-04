//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

export const reflow = node => node.scrollTop;
export function getTransitionProps(props, options) {
  const { timeout, style = {} } = props;
  return {
    duration:
      style.transitionDuration || typeof timeout === "number"
        ? timeout
        : timeout[options.mode],
    delay: style.transitionDelay
  };
}
