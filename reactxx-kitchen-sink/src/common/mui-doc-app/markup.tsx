//https://github.com/remarkjs/remark
//https://github.com/syntax-tree/hast-util-sanitize/blob/master/lib/github.json
//https://codesandbox.io/s/github/medfreeman/remark-generic-extensions/tree/master/examples/react-toolbox-icon
//https://github.com/medfreeman/remark-generic-extensions
import React from 'react'
import remark from "remark"
import genericExtensions from "remark-generic-extensions/lib/browser"
import remarkReact from "remark-react"
import deepmerge from "deepmerge"
import { sanitizeGhSchema } from "./hast-util-sanitize"

export interface TagDefs {
    [propName: string]: TagDef<{}>
}

export interface TagDef<ComponentProps extends {}> {
    props: Record<keyof ComponentProps, TagProps>
    component: React.ComponentType<ComponentProps>
}
export interface TagProps {
    [propName: string]: TagProp
}
export interface TagProp {
    default?: unknown // default value
    place?: '::content::' | '::argument::' | string //https://github.com/medfreeman/remark-generic-extensions#placeholders

}

export interface MarkdownDefinition { type: 'markdownDefinition', processSync }

export const markdownDefine = (tagDefs: TagDefs = {}) => {
    // add name to objects
    const tagDefsEx = Object.keys(tagDefs).map(p => ({ ...tagDefs[p], name: p, props: Object.keys(tagDefs[p].props).map(pp => ({ ...tagDefs[p].props[pp], name: pp })) }))
    const elements = {}
    const attributes = {}
    const remarkReactComponents = {}
    tagDefsEx.forEach(tagDef => {
        const propsDefaultValues = {}
        const properties = {}
        tagDef.props.forEach(prop => {
            if (typeof prop.default !== 'undefined') propsDefaultValues[prop.name] = prop.default
            if (typeof prop.place !== 'undefined') properties[prop.name] = prop.place
        })
        elements[tagDef.name] = {
            propsDefaultValues,
            html: { properties }
        }
        attributes[tagDef.name] = tagDef.props.map(prop => prop.name)
        remarkReactComponents[tagDef.name] = tagDef.component
    })
    const tagNames = tagDefsEx.map(t => t.name)
    return remark()
        .use(genericExtensions, { elements })
        .use(remarkReact, {
            createElement: (name, props, children) => {
                if (typeof name !== 'string' || props) return React.createElement(name, props, children)
                return React.createElement(name, {className: 'rxx-markdown'}, children)
            },
            sanitize: deepmerge(sanitizeGhSchema, { 
                tagNames,
                attributes
            }),
            remarkReactComponents
        }) as MarkdownDefinition
}

export const markdownToReact = (markdown: string, markdownDefineResult: MarkdownDefinition) => markdownDefineResult.processSync(markdown, { commonmark: true }).contents

const markdownToReact2 = (markdown: string, componentClass) => {
    return remark()
        .use(genericExtensions, {
            elements: {
                ReactxxDocExample: {
                    propsDefaultValues: {
                        path: null,
                    },
                    html: {
                        properties: {
                            path: "::content::",
                        }
                    }
                }
            }
        })
        .use(remarkReact, {
            sanitize: deepmerge(sanitizeGhSchema, {
                tagNames: [
                    "ReactxxDocExample",
                ],
                attributes: {
                    // allow every element to have className
                    "*": ["className"],
                    ReactxxDocExample: [
                        "path",
                    ]
                }
            }),
            remarkReactComponents: {
                ReactxxDocExample: componentClass,
            },
        })
        .processSync(markdown, { commonmark: true })
        .contents
}


