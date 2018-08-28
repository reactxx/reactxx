//https://codesandbox.io/s/github/medfreeman/remark-generic-extensions/tree/master/examples/react-toolbox-icon
//https://github.com/syntax-tree/hast-util-sanitize/blob/master/lib/github.json
//https://github.com/medfreeman/remark-generic-extensions
import React from 'react'
import remark from "remark"
import genericExtensions from "remark-generic-extensions/lib/browser"
import remarkReact from "remark-react"
import deepmerge from "deepmerge"
import { sanitizeGhSchema } from "./hast-util-sanitize"

const markdownToReact = (markdown: string) => {
    return remark()
        .use(genericExtensions, {
            elements: {
                Icon: {
                    propsDefaultValues: {
                        accent: true,
                        floating: true,
                        primary: true,
                        raised: true
                    },
                    html: {
                        properties: {
                            icon: "::content::",
                            tooltip: "::argument::"
                        }
                    }
                }
            }
        })
        .use(remarkReact, {
            sanitize: deepmerge(sanitizeGhSchema, {
                tagNames: [
                    "Icon",
                ],
                attributes: {
                    // allow every element to have className
                    "*": ["className"],
                    // allow Icon to have these properties
                    Icon: [
                        "accent",
                        "floating",
                        "icon",
                        "primary",
                        "raised",
                        "tooltip"
                    ]
                }
            }),
            remarkReactComponents: {
                Icon: TooltipIcon,
            },
        })
        .processSync(markdown, { commonmark: true })
        .contents
}

const TooltipIcon: React.SFC = (props) => {
    const { children, ...rest } = props
    return <code><pre>{JSON.stringify(rest, null, 2)}</pre></code>
}

const App = () => {
    const md = markdownToReact(
        `
# Hello
!Icon[add asdfa dsfas fasd fsdda asdfasd](Add fff){ floating accent }
!Icon[bookmark](Bookmark){ raised primary label="Bookmark" }
`
    )
    return <div>{md}</div>
}

export default App
