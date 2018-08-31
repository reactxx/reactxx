import React from 'react'

import withStyles, { Theme } from 'reactxx-mui-web/styles/withStyles';
import { Types } from 'reactxx-basic';
import ReactxxDocExample from './example'

import { markdownDefine, MarkdownDefinition, TagDef, markdownToReact, htmlTagClassName } from './markup'

const markdownDefinition = markdownDefine({
    ReactxxDocExample: {
        component: ReactxxDocExample,
        props: {
            text: {
                //default: null,
                place: '::content::'
            }
        }
    } as TagDef<{ text: string }>
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
            [`& pre.${htmlTagClassName}, & pre[class*="language-"].${htmlTagClassName}`]: {
                margin: '24px 0',
                padding: '12px 18px',
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
            },
            [`& code.${htmlTagClassName}`]: {
                display: 'inline-block',
                lineHeight: 1.6,
                fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
                padding: '3px 6px',
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
                fontSize: 14,
            },
            [`& p code.${htmlTagClassName}, & ul code.${htmlTagClassName}, & pre code.${htmlTagClassName}`]: {
                fontSize: 14,
                lineHeight: 1.6,
            },
            [`& h1.${htmlTagClassName}`]: {
                ...theme.typography.display2,
                color: theme.palette.text.secondary,
                margin: '32px 0 16px',
            },
            [`& h2.${htmlTagClassName}`]: {
                ...theme.typography.display1,
                color: theme.palette.text.secondary,
                margin: '32px 0 24px',
            },
            [`& h3.${htmlTagClassName}`]: {
                ...theme.typography.headline,
                color: theme.palette.text.secondary,
                margin: '32px 0 24px',
            },
            [`& h4.${htmlTagClassName}`]: {
                ...theme.typography.title,
                color: theme.palette.text.secondary,
                margin: '24px 0 16px',
            },
            [`& p.${htmlTagClassName}, & ul.${htmlTagClassName}, & ol.${htmlTagClassName}`]: {
                lineHeight: 1.6,
            },
            [`& h1 code.${htmlTagClassName}, & h2 code.${htmlTagClassName}, & h3 code.${htmlTagClassName}, & h4 code.${htmlTagClassName}`]: {
                fontSize: 'inherit',
                lineHeight: 'inherit',
                // Remove scroll on small screens.
                wordBreak: 'break-word',
            },
            [`& table.${htmlTagClassName}`]: {
                width: '100%',
                display: 'block',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
                borderCollapse: 'collapse',
                borderSpacing: 0,
                overflow: 'hidden',
            },
            [`& thead.${htmlTagClassName}`]: {
                fontSize: 14,
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.text.secondary,
            },
            [`& tbody.${htmlTagClassName}`]: {
                fontSize: 14,
                lineHeight: 1.5,
                color: theme.palette.text.primary,
            },
            [`& td.${htmlTagClassName}`]: {
                borderBottom: `1px solid ${theme.palette.divider}`,
                padding: '8px 16px 8px 8px',
                textAlign: 'left',
            },
            [`& td:last-child.${htmlTagClassName}`]: {
                paddingRight: 24,
            },
            [`& td compact.${htmlTagClassName}`]: {
                paddingRight: 24,
            },
            [`& td code.${htmlTagClassName}`]: {
                fontSize: 13,
                lineHeight: 1.6,
            },
            [`& th.${htmlTagClassName}`]: {
                whiteSpace: 'pre',
                borderBottom: `1px solid ${theme.palette.divider}`,
                fontWeight: theme.typography.fontWeightMedium,
                padding: '0 16px 0 8px',
                textAlign: 'left',
            },
            [`& th:last-child.${htmlTagClassName}`]: {
                paddingRight: 24,
            },
            [`& tr.${htmlTagClassName}`]: {
                height: 48,
            },
            [`& thead tr.${htmlTagClassName}`]: {
                height: 64,
            },
            [`& strong.${htmlTagClassName}`]: {
                fontWeight: theme.typography.fontWeightMedium,
            },
            [`& blockquote.${htmlTagClassName}`]: {
                borderLeft: `5px solid ${theme.palette.text.hint}`,
                backgroundColor: theme.palette.background.paper,
                padding: '4px 24px',
                margin: '24px 0',
            },
            [`& a.${htmlTagClassName}`]: {
                // Style taken from the Link component
                color: theme.palette.secondary.main,
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
            [`& a code.${htmlTagClassName}`]: {
                // Style taken from the Link component
                color: theme.palette.secondary.main,
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
            [`& img.${htmlTagClassName}`]: {
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

const MarkdownElementComponent = withStyles<Shape>(styles, Markdown, { isMui: true })()

export default MarkdownElementComponent
