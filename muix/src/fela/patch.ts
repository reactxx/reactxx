import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration';
import { generateCombinedMediaQuery, generateCSSSelector, isMediaQuery, isNestedSelector, isSupport, isUndefinedValue, normalizeNestedProperty, processStyleWithPlugins, RULE_TYPE } from 'fela-utils';
import generateClassName from 'fela/lib/generateClassName';
import isPlainObject from 'isobject';
import { IRenderer } from 'fela'
import { TEngine } from 'reactxx-typings'
import warning = require('warning');

export interface IRendererEx extends IRenderer {
  renderRuleEx(style: {}, tracePath?: string): TEngine.AtomicWebs
  lastWin(item: TEngine.AtomicWeb, res: { items?: TEngine.AtomicWebLow[] })
  finalizeClassName: (lastWinResult: TEngine.AtomicWebLows) => TEngine.AtomicWebFinals
  //propIdCache: {}
  //trace: {}
  cache: Cache
  _emitChange
  filterClassName
  getNextRuleIdentifier
  selectorPrefix
}

const patch = (renderer: IRenderer) => {
  const rendererEx = renderer as IRendererEx
  rendererEx.renderRuleEx = renderRuleEx.bind(rendererEx)
  rendererEx.cache = {
    propIds: {},
    classNames: [],
    valueIdCounter: 0,
    itemIdCounter: 0,
  }
  //rendererEx.propIdCache = {}
  rendererEx.lastWin = lastWin
  rendererEx.finalizeClassName = finalizeClassName
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

const concat = (arr1: TEngine.AtomicWebs, arr2: TEngine.AtomicWebs) => arr2 ? arr1.concat(arr2) : arr1

const newAtomicWeb = (def?) => {
  // let res: TAtomize.AtomicWebs = def || [] as any
  // res[TAtomize.TypedInterfaceTypes.prop] = TAtomize.TypedInterfaceTypes.atomicArray
  return def || []
}

const renderStyleToClassNames = (renderer: IRendererEx, tracePath: string, { _className, ...style }: any, pseudo: string = '', media: string = '', support: string = ''): TEngine.AtomicWebs => {
  //let classNames = _className ? ` ${_className}` : ''
  let classNames: TEngine.AtomicWebs = []

  for (const property in style) {

    // reactxx HACK: ignore $... system properties
    warning(property.charAt(0) !== '$', 'FELA PATCH: Something wrong')
    //if (property.charAt(0) === '$') continue

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
Check http://fela.js.org/docs/basics/Rules.html#styleobject for more information.
${JSON.stringify(style)}`)
        //return []
      }
    } else {

      const propReference = support + media + pseudo + property
      //const declarationReference = propReference + value

      let cacheItem = getFromCache(renderer.cache, propReference, value)

      if (!cacheItem) { //renderer.cache.hasOwnProperty(declarationReference)) {
        // we remove undefined values to enable
        // usage of optional props without side-effects
        if (isUndefinedValue(value)) {
          putToCache(renderer.cache, propReference, value, {
            className: '',
          } as any)
          // renderer.cache[declarationReference] = {
          //   className: '',
          // }
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
        //renderer.propIdCache[className] = support + media + pseudo + property

        const declaration = cssifyDeclaration(property, value)
        const selector = generateCSSSelector(className, pseudo)

        cacheItem = {
          type: RULE_TYPE,
          id: ++renderer.cache.itemIdCounter,
          className,
          selector,
          declaration,
          pseudo,
          media,
          support,
        }

        putToCache(renderer.cache, propReference, value, cacheItem)
        //renderer.cache[declarationReference] = change
        renderer._emitChange(cacheItem)
      }

      //const cache: TEngine.FelaWebCacheItem = renderer.cache[declarationReference]
      //const cachedClassName = renderer.cache[declarationReference].className

      // only append if we got a class cached
      if (!cacheItem.className) continue

      if (window.__TRACE__) {
        const res = { cache: cacheItem, tracePath } as TEngine.__dev_AtomicWeb
        res['toJSON'] = toJSON.bind(res)
        classNames.push(res)
      } else
        classNames.push(cacheItem)

    }
  }

  if (classNames.length === 0)
    return null
  return newAtomicWeb(classNames)
}

function toJSON() { return dump(this) }

interface Cache {
  propIds: {
    [propId: string]: Values
  }
  classNames: TEngine.AtomicWeb[]
  valueIdCounter: number
  itemIdCounter: number
}

interface Values {
  propId: number
  values: { [value: string]: TEngine.FelaCacheItem }
}

export const dump = (c: TEngine.AtomicWeb | TEngine.AtomicWebLow, short?: boolean) => {
  if (!c) return
  if (window.__TRACE__) {
    const { cache: { selector, declaration, media, support }, tracePath } = c as TEngine.__dev_AtomicWeb
    return `${support ? '@support' + support : ''}${media ? '@media ' + media : ''}${selector} { ${declaration} }${short ? '' : ` @${tracePath}`}`
  } else {
    if (typeof c === 'string')
      return c
    else
      return (c as TEngine.FelaCacheItem).className
  }
}

const getFromCache = (cache: Cache, propId: string, value: string) => {
  const values = cache.propIds[propId]
  return values && values.values[value]
}

const putToCache = (cache: Cache, propId: string, value: string, item: TEngine.FelaCacheItem) => {
  const values = cache.propIds[propId] || (cache.propIds[propId] = { propId: ++cache.valueIdCounter, values: {} })
  item.propId = values.propId
  values.values[value] = item
  if (item.id) cache.classNames[item.id] = item
}

function isTrace(obj): obj is TEngine.__dev_AtomicWeb { return !!window.__TRACE__ }

const lastWin = (_item: TEngine.AtomicWeb, res: { items?: TEngine.AtomicWebLow[], usedPropIds: boolean[] }) => {
  let item = _item
  if (isTrace(item))
    item = item.cache

  if (!item || !item.className) return

  if (!res.items) {
    res.items = []
    res.usedPropIds = []
  }

  if (res.usedPropIds[item.propId]) return

  res.usedPropIds[item.propId] = true
  if (window.__TRACE__)
    res.items.push(_item as TEngine.__dev_AtomicWeb)
  else
    res.items.push(item.className)
}

const finalizeClassName = (lastWinResult: TEngine.AtomicWebLows) => {
  if (!lastWinResult) return undefined
  if (window.__TRACE__) {
    lastWinResult = lastWinResult.map((r: TEngine.__dev_AtomicWeb) => r.cache.className) as any
  }
  return lastWinResult.join(' ') as TEngine.AtomicWebFinals
}
