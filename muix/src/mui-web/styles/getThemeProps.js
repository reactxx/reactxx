//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

function getThemeProps(params) {
  const { theme, name } = params;

  if (!name || !theme.props || !theme.props[name]) {
    return {};
  }

  return theme.props[name];
}

export default getThemeProps;
