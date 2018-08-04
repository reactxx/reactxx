//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

//
export default function createMixins(breakpoints, spacing, mixins) {
  return {
    gutters: (styles = {}) => {
      return {
        paddingLeft: spacing.unit * 2,
        paddingRight: spacing.unit * 2,
        ...styles,
        [breakpoints.up("sm")]: {
          paddingLeft: spacing.unit * 3,
          paddingRight: spacing.unit * 3,
          ...styles[breakpoints.up("sm")]
        }
      };
    },
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up("xs")} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    },
    ...mixins
  };
}
