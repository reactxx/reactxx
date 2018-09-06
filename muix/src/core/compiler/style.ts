// import { TCompiler, TSheeter, TExtends } from '../typings'
// import { isObject } from '../utils/deep-merge'

// export const compileStyle = (style: TSheeter.Style) => {
//     if (!style) return []
//     const { $before, $web, $native, $after } = style

//     const list: TCompiler.ValueNatives = []

//     const parts = [$before, style, window.isWeb ? $web : $native, $after].filter(p => p[1]) as TSheeter.StyleLow[]
//     parts.forEach(part => compileTree(list, part, []))

//     return list
// }

// let compileTree = (list: TCompiler.ValueNatives, style: TSheeter.StyleLow, pseudoPrefixes: string[]) => {
//     for (const p in style) {
//         if (p.charAt(0) === '$') continue
//         const value = style[p]
//         const newPseudos = [...pseudoPrefixes, p]
//         if (isObject(value))
//             compileTree(list, value as TSheeter.StyleLow, newPseudos)
//         else {
//             list.push({
//                 propId: newPseudos.join('/'),
//                 value,
//                 [TCompiler.TypedInterfaceProp]: TCompiler.TypedInterfaceTypes.nativeValue
//             })
//         }
//     }

// }

// //export const styles = (styles: )