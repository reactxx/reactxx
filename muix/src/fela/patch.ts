import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration';
import { generateCombinedMediaQuery, generateCSSSelector, isMediaQuery, isNestedSelector, isSupport, isUndefinedValue, normalizeNestedProperty, processStyleWithPlugins, RULE_TYPE } from 'fela-utils';
import generateClassName from 'fela/lib/generateClassName';
import isPlainObject from 'isobject';
import { IRenderer } from 'fela'

export interface IRendererEx extends IRenderer {
  renderRuleEx(style: Object): string[]
  propIdCache: {}
}

const patch = (renderer: IRenderer) => {
  const rendererEx = renderer as IRendererEx
  rendererEx.renderRuleEx = renderRuleEx.bind(rendererEx)
  rendererEx.propIdCache = {}
  return rendererEx
}
export default patch

function renderRuleEx(style: {}): string[] {
  if (!style) return []
  const processedStyle = processStyleWithPlugins(
    this,
    style,
    RULE_TYPE,
    {}
  )

  return renderStyleToClassNames(this, processedStyle)//.slice(1)
}

const concat = <T = any>(arr1: Array<T>, arr2: Array<T>) => arr1.concat(arr2)

const renderStyleToClassNames = (renderer, { _className, ...style }: any, pseudo: string = '', media: string = '', support: string = ''): string[] => {
  //let classNames = _className ? ` ${_className}` : ''
  let classNames: string[] = []

  for (const property in style) {

    // // reactxx HACK: ignore $... system properties
    if (property.charAt(0) === '$')
      continue

    const value = style[property]

    if (isPlainObject(value)) {
      if (isNestedSelector(property)) {
        classNames = concat(classNames, renderStyleToClassNames(
          renderer,
          value,
          pseudo + normalizeNestedProperty(property),
          media,
          support
        ))
      } else if (isMediaQuery(property)) {
        const combinedMediaQuery = generateCombinedMediaQuery(
          media,
          property.slice(6).trim()
        )
        classNames = concat(classNames, renderStyleToClassNames(
          renderer,
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

        const className =
          renderer.selectorPrefix +
          generateClassName(
            renderer.getNextRuleIdentifier,
            renderer.filterClassName
          )

        // reactxx HACK: cache declarationReference without value
        renderer.propIdCache[className] = support + media + pseudo + property

        const declaration = cssifyDeclaration(property, value)
        const selector = generateCSSSelector(className, pseudo)

        const change = {
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

      const cachedClassName = renderer.cache[declarationReference].className

      // only append if we got a class cached
      if (cachedClassName)
        classNames.push(cachedClassName)

    }
  }

  return classNames
}