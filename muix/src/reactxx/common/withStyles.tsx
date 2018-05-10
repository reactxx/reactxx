import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { TCommonStyles, TCommon, toPlatformEvents, deepMerges, ThemeProvider, ThemeConsumer, theme, Cascading, renderAddIn, withStyles, Types as TypesBasic, TRenderState as TRenderStateBasic } from 'reactxx-basic'
import { animations, TAnimation } from 'reactxx-animation'
import { mediaQFlags, TMediaQ, MediaQ_AppContainer, mediaQProviderExists, mediaQSheet } from 'reactxx-mediaq'
import { activeFlag, activeSheet, TActivable } from 'reactxx-activable'

import { toPlatformSheet, toPlatformRuleSet } from './to-platform'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

const DEV_MODE = process.env.NODE_ENV === 'development'

/************************
* TYPINGS
*************************/
export interface TRenderState extends TRenderStateBasic {
  $props?: TAddIn.PropX
  $classes?: TAddIn.SheetX
  codeSystemProps?: Types.CodeSystemProps
}


renderAddIn.toPlatformSheet = toPlatformSheet
renderAddIn.toPlatformRuleSet = toPlatformRuleSet

renderAddIn.addInHOCsX = (state: TRenderState, next) => mediaQFlags(
  () => ({ $mediaq: state.$props.$mediaq, theme: state.themeContext.theme }),
  mediaqFlags => mediaqFlags && state.propsPatch.push({ mediaqFlags }),
  next)
renderAddIn.addInHOCs = (state: TRenderState, next) => mediaQSheet(
  () => state.codeClasses as TMediaQ.MediaQSheet,
  mediaSheetPatch => mediaSheetPatch && state.codeClassesPatch.push(mediaSheetPatch as Types.Sheet),
  animations(
    () => state.$classes.$animations,
    animations => state.codeSystemProps.animations = animations,
    next
  )
)


/************************
* WITH STYLES
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (name: TCommon.getNameType<R>, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(name, sheetCreator, options, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

//export const withStyles = <R extends Types.Shape, TStatic extends {} = {}>(name: TCommon.getNameType<R>, sheetCreator: Types.SheetCreatorX<R>, _options?: Types.WithStyleOptions_ComponentX<R>, overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => (Component: Types.CodeComponentType<R>) => {

//  type TPropsX = Types.PropsX<R>

//  //*** OPTIONS
//  const options: Types.WithStyleOptions_ComponentX = _options && overrideOptions ? deepMerges({}, _options, overrideOptions) : (overrideOptions ? { ...overrideOptions } : (_options ? { ..._options } : {}))
//  options.withTheme = fromOptions(typeof sheetCreator === 'function', options && options.withTheme)

//  //**** PROPERTY CASCADING 

//  const { cascading, provider } = Cascading<TPropsX>(options)

//  //**** TO PLATFORM
//  const toPlatform = (input: () => { inputProps: Types.PropsX; themeContext: TCommon.ThemeContext, propsPatch: TAddIn.CodeProps[] }, output: (outputPar: { codeProps: Types.CodeProps, codeClasses: Types.Sheet, codeSystemProps: Types.CodeSystemProps }) => void, next: () => React.ReactNode) => {
//    const res = () => {
//      const { inputProps, themeContext, propsPatch } = input()
//      output(prepareSheet(name, sheetCreator, options, inputProps, themeContext, propsPatch))
//      return next()
//    }
//    return res
//  }

//  //****************************
//  // Styled COMPONENT
//  //****************************
//  class Styled extends React.Component<TPropsX> {

//    themeContext: TCommon.ThemeContext = {}
//    inputProps: Types.PropsX

//    propsPatch: TAddIn.CodeProps[] = []

//    codeProps: Types.CodeProps
//    codeSystemProps: Types.CodeSystemProps
//    codeClasses: Types.Sheet
//    codeClassesPatch: Types.Sheet[] = []


//    render() {
//      if (DEV_MODE && this.props.developer_flag)
//        debugger
//      return this.renderer()
//    }

//    renderCodeComponent = () => {
//      const { codeClassesPatch, codeProps, codeClasses, codeSystemProps } = this

//      if (DEV_MODE && codeSystemProps.developer_flag) console.log(
//        `### withStyles AFTER_ANIMATION for ${name}`,
//        '\ntheme: ', this.themeContext.theme,
//        '\ninputProps: ', this.inputProps,
//        '\ncodeProps: ', this.codeProps,
//        '\ncodeClasses: ', codeClasses,
//        '\ncodeClassesPatch: ', this.codeClassesPatch,
//        '\npropsPatch: ', this.propsPatch,
//        '\ncodeSystemProps: ', this.codeSystemProps,
//        //':\n', this.,
//      )

//      // apply patches
//      let classes = codeClasses as Types.Sheet<R>
//      if (codeClassesPatch.length > 0) classes = deepMerges({}, codeClasses, ...codeClassesPatch)

//      // call component code
//      return <Component {...codeProps as Types.CodeProps<R>} system={{ ...codeSystemProps, classes }} />
//    }

//    //TODO: separate $animations from codeClasses and $mediaq from codeProps
//    renderer =
//      cascading(
//        () => this.props,
//        inputProps => this.inputProps = inputProps,
//        theme(
//          () => ({ withTheme: options.withTheme }),
//          themeContext => this.themeContext = themeContext || {},
//          mediaQFlags(
//            () => ({ $mediaq: this.inputProps.$mediaq, theme: this.themeContext.theme }),
//            mediaqFlags => mediaqFlags && this.propsPatch.push({ mediaqFlags }),
//            //activeFlag(() => withOptions.withActive, activable => this.codePropsPatch.push({ activable}),
//            toPlatform(
//              () => ({ inputProps: this.inputProps, themeContext: this.themeContext, propsPatch: this.propsPatch }),
//              ({ codeProps, codeClasses, codeSystemProps }) => { this.codeClasses = codeClasses; this.codeProps = codeProps; this.codeSystemProps = codeSystemProps },
//              mediaQSheet(
//                () => this.codeClasses as TMediaQ.MediaQSheet,
//                mediaSheetPatch => mediaSheetPatch && this.codeClassesPatch.push(mediaSheetPatch as Types.Sheet),
//                //activeSheet(() => ({ activeFlag: this.activable.active, sheet: this.codeClasses as TActivable.SheetWithAddIn, activable: withOptions.withActive }), patch => patch && this.patches.push(patch as Types.Sheet),
//                animations(
//                  () => { const anim = this.codeClasses.$animations; delete this.codeClasses.$animations; return anim as TAnimation.SheetsX },
//                  animations => this.codeSystemProps.animations = animations,
//                  this.renderCodeComponent
//                )
//              )
//            )
//          )
//        )
//      )
//    //)
//    //)

//    shouldComponentUpdate(nextProps, nextState, nextContext) {
//      return !nextProps.CONSTANT
//    }

//    public static Provider = provider
//    public static displayName = name
//  }

//  const styled: React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic = Styled as any
//  return styled

//}

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

//export const variantToString = (...pars: Object[]) => pars.map(p => p.toString()).join('$')

export const AppContainer: React.SFC<Partial<TCommon.ThemeProviderProps>> = props => {
  const theme = <ThemeProvider theme={props}>{props.children}</ThemeProvider>
  return mediaQProviderExists() ? theme : <MediaQ_AppContainer>{theme}</MediaQ_AppContainer>
}

/************************
* PRIVATE
*************************/

//const prepareSheet = (name: string, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, props: Types.PropsX, themeContext: TCommon.ThemeContext, propsPatch: TAddIn.CodeProps[]) => {

//  const { classes, className, style, onPress, onLongPress, onPressIn, onPressOut, $web, $native, developer_flag, CONSTANT, ...rest } = props as Types.PropsX & TCommonStyles.OnPressAllX
//  const { theme, $cache } = (themeContext || {}) as TCommon.ThemeContext

//  //** STATIC SHEET
//  let staticSheet: Types.Sheet
//  let getStaticSheet: () => Types.Sheet
//  let variantCacheId
//  let variant = null
//  if (typeof createSheetX !== 'function') {
//    variantCacheId = '#static#'
//    getStaticSheet = () => toPlatformSheet(createSheetX)
//  } else {
//    if (options && options.getVariant) {
//      const propsWithMediaQ = propsPatch.length > 0 ? Object.assign({}, props, ...propsPatch) : props
//      variant = options.getVariant(propsWithMediaQ, theme)
//      variantCacheId = options.variantToString && options.variantToString(variant)
//      if (variantCacheId) {
//        getStaticSheet = () => toPlatformSheet(callCreator(theme, variant, createSheetX))
//      } else {
//        //getVariant!=null && variantToString==null => NO CACHING
//        staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
//      }
//    } else
//      getStaticSheet = () => toPlatformSheet(callCreator(theme, null, createSheetX))
//  }

//  if (!staticSheet) {
//    if (!$cache) staticSheet = getStaticSheet()
//    else {
//      let compCache = $cache[name]
//      if (!compCache) $cache[name] = compCache = {}
//      staticSheet = compCache[variantCacheId]
//      if (!staticSheet) compCache[variantCacheId] = staticSheet = getStaticSheet();
//      (staticSheet as any).$preserve = true
//    }
//  }

//  //** MERGE staticSheet with classes and className
//  const root = className && { root: toPlatformRuleSet(callCreator(theme, variant, className)) }
//  const codeClasses: Types.Sheet = classes || root ? deepMerges({}, staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root) : staticSheet

//  const codeProps = rest as Types.CodeProps

//  //** RETURN platform dependent props for pure component code
//  const systemFromPatch = propsPatch.length > 0 ? Object.assign({}, ...propsPatch) : null
//  const codeSystemProps = {
//    ...systemFromPatch,
//    classes: null,
//    style: toPlatformRuleSet(callCreator(theme, variant, style)),
//    variant,
//    developer_flag,
//  } as Types.CodeSystemProps

//  toPlatformEvents($web, $native as TCommonStyles.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

//  return { codeProps, codeClasses, codeSystemProps }
//}
//const callCreator = <T extends {}>(theme: TCommon.ThemeBase, variant, creator: T | ((theme: TCommon.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

//const fromOptions = (...bools: boolean[]) => {
//  let res = undefined
//  if (bools) bools.forEach(b => { if (typeof b === 'boolean') res = b })
//  return res
//}

