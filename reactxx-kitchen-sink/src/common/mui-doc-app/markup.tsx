//https://codesandbox.io/s/github/medfreeman/remark-generic-extensions/tree/master/examples/react-toolbox-icon
//https://github.com/syntax-tree/hast-util-sanitize/blob/master/lib/github.json
//https://github.com/medfreeman/remark-generic-extensions
import React from 'react'
import remark from "remark"
import genericExtensions from "remark-generic-extensions/lib/browser"
import remarkReact from "remark-react"
import deepmerge from "deepmerge"
import { sanitizeGhSchema } from "./hast-util-sanitize"

const markdownToReact = (markdown: string, componentClass: React.ComponentClass<{ path: string }>) => {
    return remark()
        .use(genericExtensions, {
            elements: {
                ReactxxDocExample: {
                    propsDefaultValues: {
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
                    // allow Icon to have these properties
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

export default markdownToReact
