import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration';
import { generateCombinedMediaQuery, generateCSSSelector, isMediaQuery, isNestedSelector, isSupport, isUndefinedValue, normalizeNestedProperty, processStyleWithPlugins, RULE_TYPE } from 'fela-utils';
import generateClassName from 'fela/lib/generateClassName';
import isPlainObject from 'isobject';
import { IRenderer } from 'fela'
import { TEngine } from 'reactxx-typings'
import warning = require('warning');

export interface IRendererEx extends IRenderer {
  renderRuleEx(style: {}, tracePath?: string): TEngine.AtomicWebs
  propIdCache: {}
  //trace: {}
  cache
  _emitChange
  filterClassName
  getNextRuleIdentifier
  selectorPrefix
}

const patch = (renderer: IRenderer) => {
  const rendererEx = renderer as IRendererEx
  rendererEx.renderRuleEx = renderRuleEx.bind(rendererEx)
  rendererEx.propIdCache = {}
  //rendererEx.trace = {}
  return rendererEx
}
export default patch

function renderRuleEx(style: {}, tracePath?: string): TEngine.AtomicWebs {
  if (!style) return newAtomicWeb()
  // const $ = {}
  // let has$ = false, has = false
  // for (const p in style) {
  //   if (p.charAt(0) !== '$') {
  //     has = true
  //   } else {
  //     has$ = true
  //     $[p] = style[p]
  //     delete style[p]
  //   }
  // }
  // if (!has)
  //   return null
  //try {
  const processedStyle = processStyleWithPlugins(
    this,
    style,
    RULE_TYPE,
    {}
  )

  return renderStyleToClassNames(this, tracePath, processedStyle)//.slice(1)
  // } finally {
  //   if (has$)
  //     Object.assign(style, $)
  // }
}

const concat = (arr1: TEngine.AtomicWebsLow, arr2: TEngine.AtomicWebsLow) => arr2 ? arr1.concat(arr2) : arr1

const newAtomicWeb = (def?) => {
  // let res: TAtomize.AtomicWebs = def || [] as any
  // res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
  return def || []
}

const renderStyleToClassNames = (renderer: IRendererEx, tracePath: string, { _className, ...style }: any, pseudo: string = '', media: string = '', support: string = ''): TEngine.AtomicWebs => {
  //let classNames = _className ? ` ${_className}` : ''
  let classNames: TEngine.AtomicWebsLow = []

  for (const property in style) {

    // reactxx HACK: ignore $... system properties
    warning(property.charAt(0) !== '$', 'FELA PATCH: Something wrong')

    const value = style[property]

    if (isPlainObject(value)) {
      if (isNestedSelector(property)) {
        classNames = concat(classNames, renderStyleToClassNames(
          renderer,
          tracePath,
          value,
          // reactxx HACK
          //(pseudo ? pseudo + ' ' : '') + 
          pseudo + normalizeNestedProperty(property),
          media,
          support
        ))
      } else if (isMediaQuery(property)) {
        const combinedMediaQuery = generateCombinedMediaQuery(
          media,
          property.slice(6).trim()
        )
        // reactxx HACK
        classNames = concat(classNames, renderStyleToClassNames(
          renderer,
          tracePath,
          value,
          pseudo,
          combinedMediaQuery,
          support
        ))
      } else if (isSupport(property)) {
        const combinedSupport = generateCombinedMediaQuery(
          support,
          property.slice(9).trim()
        )
        classNames = concat(classNames, renderStyleToClassNames(
          renderer,
          tracePath,
          value,
          pseudo,
          media,
          combinedSupport
        ))
      } else {
        console.warn(`The object key "${property}" is not a valid nested key in Fela. 
Maybe you forgot to add a plugin to resolve it? 
Check http://fela.js.org/docs/basics/Rules.html#styleobject for more information.`)
      }
    } else {
      const declarationReference =
        support + media + pseudo + property + value
      if (!renderer.cache.hasOwnProperty(declarationReference)) {
        // we remove undefined values to enable
        // usage of optional props without side-effects
        if (isUndefinedValue(value)) {
          renderer.cache[declarationReference] = {
            className: '',
          }
          /* eslint-disable no-continue */
          continue
          /* eslint-enable */
        }

        const className: string =
          renderer.selectorPrefix +
          generateClassName(
            renderer.getNextRuleIdentifier,
            renderer.filterClassName
          )

        // reactxx HACK: cache declarationReference without value
        renderer.propIdCache[className] = support + media + pseudo + property

        const declaration = cssifyDeclaration(property, value)
        const selector = generateCSSSelector(className, pseudo)

        const change: TEngine.__dev_WebCache = {
          type: RULE_TYPE,
          className,
          selector,
          declaration,
          pseudo,
          media,
          support,
        }

        renderer.cache[declarationReference] = change
        renderer._emitChange(change)
      }

      const cache: TEngine.__dev_WebCache = renderer.cache[declarationReference]
      //const cachedClassName = renderer.cache[declarationReference].className

      // only append if we got a class cached
      if (!cache.className) continue

      if (window.__TRACE__) {
        const res = { cache, tracePath } as TEngine.__dev_AtomicWeb
        res['toJSON'] = toJSON.bind(res)
        classNames.push(res)
      } else
        classNames.push(cache.className)

    }
  }

  if (classNames.length === 0)
    return null
  return newAtomicWeb(classNames)
}

function toJSON() { return dump(this) }

export const dump = (c, short?: boolean) => {
  if (!c) return
  const { cache: { selector, declaration, media, support }, tracePath } = c as TEngine.__dev_AtomicWeb
  return `${support ? '@support' + support : ''}${media ? '@media ' + media : ''}${selector} { ${declaration} }${short ? '' : ` @${tracePath}`}`
}