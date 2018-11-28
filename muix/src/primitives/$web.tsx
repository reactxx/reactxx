/** @jsx platform.createElement */

import { platform } from 'reactxx-sheeter'
import { TUseSheeter } from 'reactxx-typings'
import { useSheeter } from "reactxx-use"

import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TUseSheeter.GetComponent<TPrimitives.ViewShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode, classes, classNameX, styleX, $sheetQuery }
        = useSheeter<TPrimitives.ViewShape>(props, authorConfig, displayName, userConfig)
    $sheetQuery.pressable = hasPlatformEvents(props)
    return <div classNameX={toClassNames(classes.root, classNameX)} styleX={styleX} {...propsCode} />
}

export const getIcon: TUseSheeter.GetComponent<TPrimitives.IconShape> =null
export const getText: TUseSheeter.GetComponent<TPrimitives.TextShape> =null
export const getScrollView: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape> =null

// const icon: TComponents.SFCCode<TPrimitives.IconShape> = propsCode => {
//     const { styleX, classNameX, classes, toClassNames, children, data, url/*, onClick*/, ...rest } = propsCode
//     const svg = <svg
//         classNameX={toClassNames([classes.root, classNameX])}
//         styleX={styleX}
//         onClick={url ? undefined : undefined /*onClick*/} {...rest}>
//         {data ? <path d={data} /> : children}
//     </svg>
//     return url ? <a href={url}>{svg}</a> : svg
// }
// icon.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { pressable: hasPlatformEvents(props) }

// const scrollView: TComponents.SFCCode<TPrimitives.ScrollViewShape> = propsode => {
//     const { styleX, classNameX, classes, toClassNames, children, horizontal, ...rest } = propsode
//     return <div classNameX={toClassNames([classes.root, classNameX])} styleX={styleX} {...rest}>
//         <div classNameX={toClassNames([classes.container])}>
//             {children}
//         </div>
//     </div>
// }
// scrollView.setSheetQuery = (props, sheetQuery) => sheetQuery.$switch = { horizontal: props.horizontal }

// const text: TComponents.SFCCode<TPrimitives.TextShape> = propsCode => {
//     const { classNameX, styleX, classes, toClassNames, singleLine, url/*, onClick*/, ...rest } = propsCode
//     const tagProps = {
//         className: TPrimitives.Consts.textClassName,
//         classNameX: toClassNames([classes.root, classNameX]),
//         styleX,
//         ...rest,
//         onClick: url ? undefined : undefined /*onClick*/
//     }
//     return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
// }
