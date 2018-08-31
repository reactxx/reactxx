import React from 'react'

import withStyles, { Theme } from 'reactxx-mui-web/styles/withStyles';
import { Types } from 'reactxx-basic';
import ReactxxDocExample from './example'

import {markdownDefine, MarkdownDefinition, markdownToReact, TagDef} from './markup'

const markdownDefinition = markdownDefine({
    ReactxxDocExample: {
        component: ReactxxDocExample,
        props: {
            text: {
                default: null,
                place: '::content::'
            }
        }
    } as TagDef<{text: string}>
})

interface Shape extends Types.ShapeDefault {
    web: 'root'
    props: { text?: string, markdownDefinition?: MarkdownDefinition }
    theme: Theme
}

const styles: Types.SheetCreatorX<Shape> = theme => ({
    root: {
        $web: {
            fontFamily: theme.typography.fontFamily,
            PropertiesfontSize: 16,
            color: theme.palette.text.primary,
            '& pre, & pre[class*="language-"]': {
                margin: '24px 0',
                padding: '12px 18px',
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
            },
            '& code': {
                display: 'inline-block',
                lineHeight: 1.6,
                fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
                padding: '3px 6px',
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
                fontSize: 14,
            },
            '& p code, & ul code, & pre code': {
                fontSize: 14,
                lineHeight: 1.6,
            },
            '& h1': {
                ...theme.typography.display2,
                color: theme.palette.text.secondary,
                margin: '32px 0 16px',
            },
            '& h2': {
                ...theme.typography.display1,
                color: theme.palette.text.secondary,
                margin: '32px 0 24px',
            },
            '& h3': {
                ...theme.typography.headline,
                color: theme.palette.text.secondary,
                margin: '32px 0 24px',
            },
            '& h4': {
                ...theme.typography.title,
                color: theme.palette.text.secondary,
                margin: '24px 0 16px',
            },
            '& p, & ul, & ol': {
                lineHeight: 1.6,
            },
            '& h1 code, & h2 code, & h3 code, & h4 code': {
                fontSize: 'inherit',
                lineHeight: 'inherit',
                // Remove scroll on small screens.
                wordBreak: 'break-word',
            },
            '& table': {
                width: '100%',
                display: 'block',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
                borderCollapse: 'collapse',
                borderSpacing: 0,
                overflow: 'hidden',
            },
            '& thead': {
                fontSize: 14,
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.text.secondary,
            },
            '& tbody': {
                fontSize: 14,
                lineHeight: 1.5,
                color: theme.palette.text.primary,
            },
            '& td': {
                borderBottom: `1px solid ${theme.palette.divider}`,
                padding: '8px 16px 8px 8px',
                textAlign: 'left',
            },
            '& td:last-child': {
                paddingRight: 24,
            },
            '& td compact': {
                paddingRight: 24,
            },
            '& td code': {
                fontSize: 13,
                lineHeight: 1.6,
            },
            '& th': {
                whiteSpace: 'pre',
                borderBottom: `1px solid ${theme.palette.divider}`,
                fontWeight: theme.typography.fontWeightMedium,
                padding: '0 16px 0 8px',
                textAlign: 'left',
            },
            '& th:last-child': {
                paddingRight: 24,
            },
            '& tr': {
                height: 48,
            },
            '& thead tr': {
                height: 64,
            },
            '& strong': {
                fontWeight: theme.typography.fontWeightMedium,
            },
            '& blockquote': {
                borderLeft: `5px solid ${theme.palette.text.hint}`,
                backgroundColor: theme.palette.background.paper,
                padding: '4px 24px',
                margin: '24px 0',
            },
            '& a, & a code': {
                // Style taken from the Link component
                color: theme.palette.secondary.main,
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
            '& img': {
                maxWidth: '100%',
            },
        },
    },
})

const Markdown: Types.CodeSFCWeb<Shape> = props => {
    const { classes, text } = props
    return <div className={classes.root}>
        {markdownToReact(text, markdownDefinition)}
    </div>
}

const MarkdownElementComponent = withStyles<Shape>(styles as Types.SheetCreatorX<Shape>, Markdown, { isMui: true })()

export default MarkdownElementComponent
