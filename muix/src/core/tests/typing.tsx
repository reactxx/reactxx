/** @jsx createElement */
import { TSheeter } from 'reactxx-typings'

interface Shape1 extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    theme: { color: string }
}
const style1: TSheeter.Ruleset<'Text', Shape1> = {
    $whenFlag: {
        webOnly: {},
        root: {},
        x: 0,
    },
}

const sheet3: TSheeter.SheetCreator<Shape1> = ({ color }) => ({
    root: {
        color
    }
})





interface Shape2 extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'> & TSheeter.ShapeViews<'disabled'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeWeb<'webOnly'>
}

const style2: TSheeter.Ruleset<'Text', Shape2>[] = [
    {
        $web: {},
    },
    {
        $whenFlag: {
        },
        $native: {
            $whenFlag: {
                webOnly: {
                    $web: {
                        $mediaq: {},
                    },
                    $whenFlag: {},
                    $mediaq: {},
                    $native: {
                        $mediaq: {},
                    }
                },
            },
        },
    }
]

const sheet: TSheeter.Sheet<Shape2> = {
    webOnly: {},
    nativeOnly: {},
    root: {},
    disabled: {}
}

