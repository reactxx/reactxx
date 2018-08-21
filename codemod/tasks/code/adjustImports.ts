import * as Ast from '../../utils/ast'
import * as RegExp from '../../utils/regexp'

export const adjustImports = (code: string) => {
  return RegExp.processMatchAll(/from '\.\.\/([A-Z]\w+)/g, code, (match, res) => {
    const imp = code.substr(match.index, match[0].length) + '/' + match[1]
    res.push(imp)
  })
}
// export const adjustImports_ = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
//   const imports = Ast.astq().query(root, `// ImportDeclaration`)
//   imports.forEach(imp => {
//     if (imp.source.type != 'StringLiteral') return
//     // if (imp.source.value === 'classNames') {
//     //   Ast.removeNode(root, imp.$path)
//     //   return
//     // }
//     const newValue = importRepairs[imp.source.value]
//     if (newValue)
//       imp.source.value = newValue
//     return
//   })
// }
// const importRepairs = {
//   '../ButtonBase': '../ButtonBase/ButtonBase',
//   '../Paper': '../Paper/Paper',
//   '../ListItem': '../ListItem/ListItem',
//   '../Portal': '../Portal/Portal',
//   '../Input': '../Input/Input',
//   '../InputLabel': '../InputLabel/InputLabel',
//   '../FormLabel': '../FormLabel/FormLabel',
//   '../FormControl': '../FormControl/FormControl',
//   '../FormHelperText': '../FormHelperText/FormHelperText',
//   '../Select': '../Select/Select',
//   '../../SvgIcon': '../../SvgIcon/SvgIcon',
//   '../Popover': '../Popover/Popover',
//   '../MenuList': '../MenuList/MenuList',
//   '../Modal': '../Modal/Modal',
//   '../Grow': '../Grow/Grow',
//   '../List': '../List/List',
//   '../RootRef': '../RootRef/RootRef',
//   '../Backdrop': '../Backdrop/Backdrop',
//   '../Fade': '../Fade/Fade',
//   '../Typography': '../Typography/Typography',
//   '../FormGroup': '../FormGroup/FormGroup',
//   '../IconButton': '../IconButton/IconButton',
//   '../Button': '../Button/Button',
//   '../Slide': '../Slide/Slide',
//   '../Popper': '../Popper/Popper',
// }