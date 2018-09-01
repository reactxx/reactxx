import React from 'react'

import withStyles, { Theme } from 'reactxx-mui-web/styles/withStyles';
import { Types, TCommonStyles } from 'reactxx-basic';
import { siteMap, pathToObjs, SitemapNode } from '../muix-doc/meta'

interface Shape extends Types.ShapeDefault<'root' | 'demo'> {
    props: { text?: string }
    theme: Theme
}


//https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/Demo.js
const styles: Types.SheetCreatorX<Shape> = theme => ({
    root: {
        $web: {
            position: 'relative',
            marginBottom: 40,
            marginLeft: -theme.spacing.unit * 2,
            marginRight: -theme.spacing.unit * 2,
            [theme.breakpoints.up('sm')]: {
                padding: `0 ${theme.spacing.unit}px`,
                marginLeft: 0,
                marginRight: 0,
            },
        },
    },
    demo: {
        $web: theme.mixins.gutters({
            borderRadius: theme.shape.borderRadius,
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
            display: 'flex',
            justifyContent: 'center',
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            [theme.breakpoints.up('sm')]: {
                paddingLeft: theme.spacing.unit * 3,
                paddingRight: theme.spacing.unit * 3,
                paddingTop: theme.spacing.unit * 6,
                paddingBottom: theme.spacing.unit * 3,
            },
        }),
    }
});

class reactxxDocExample extends React.Component<Types.CodePropsWeb<Shape>> {
    render() {
        const { classes, text } = this.props
        const Comp = pathToObjs[text]
        return <div className={classes.root}>
            <div className={classes.demo}>  
                <Comp/>
            </div>
        </div >
    }
}
const ReactxxDocExample = withStyles<Shape>(styles, reactxxDocExample as Types.CodeComponentType<Shape>, { isMui: true })()

export default ReactxxDocExample
