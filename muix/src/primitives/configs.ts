import { TTyped, $W, $T, $V, $I, V, T, I, } from 'reactxx-typings'
import { getEngine } from 'reactxx-sheeter'
import { TUseSheeter } from 'reactxx-use-sheeter'

import { TPrimitives } from './shapes'


export const hasPlatformEvents = (propsCode: TTyped.PropsCode) => !!(
  true
  // window.isWeb ?
  //     propsCode.onClick || propsCode.onMouseUp || propsCode.onMouseDown :
  //     propsCode.onPress || propsCode.onPressIn || propsCode.onPressOut || propsCode.onLongPress
)

const t = getEngine<TPrimitives.TextShape>()

export const textConfig: TUseSheeter.AuthorConfig<TPrimitives.TextShape> = {
  defaultSheet: () => ({
    root: t.STYLE<T>(
      t.WEB<T>(
        {
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          [`& .${TPrimitives.Consts.textClassName}`]: { //high level Text is block element, inner Texts are inline elements. Consts.textClassName is className for Text component div.
            display: 'inline',
          },
        },
        t.IF<$W>(p => p.$sheetQuery.pressable, {
          cursor: 'pointer'
        })
      ),
      t.IF<T>(p => p.singleLine,
        {
          flexShrink: 1,
        },
        t.WEB<T>({
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }),
      )
    ),
  })
}

// mimic React Native view behavior
const webViewRuleset: TTyped.Ruleset<V> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexBasis: 'auto',
  flexShrink: 0,
  position: 'relative',
  overflow: 'hidden',
}

const v = getEngine<TPrimitives.ViewShape>()

export const viewConfig: TUseSheeter.AuthorConfig<TPrimitives.ViewShape> = {
  defaultSheet: () => ({
    root: v.STYLE<V>(
      v.WEB<V>(
        webViewRuleset,
        v.IF<$W>(p => p.$sheetQuery.pressable, {
          cursor: 'pointer'
        })
      )
    ),
  })
}

const i = getEngine<TPrimitives.IconShape>()

export const iconConfig: TUseSheeter.AuthorConfig<TPrimitives.IconShape> = {
  defaultProps: {
    $web: {
      viewBox: '0 0 24 24',
      focusable: 'false'
    }
  },
  defaultSheet: () => ({
    root: i.STYLE<T>(
      {
        flexShrink: 0,
      },
      i.WEB<T>(
        {
          fill: 'currentColor',
          fontSize: 'inherited'
        },
        i.IF<$W>(p => p.$sheetQuery.pressable, {
          cursor: 'pointer'
        })
      )
    )
  })
}

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af

const s = getEngine<TPrimitives.ScrollViewShape>()

export const scrollViewConfig: TUseSheeter.AuthorConfig<TPrimitives.ScrollViewShape> = {
  defaultSheet: () => ({
    root: s.STYLE<V>(
      {
        flexBasis: 0,
      },
      s.WEB<V>(
        webViewRuleset,
        {
          flexGrow: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          // Enable hardware compositing in modern browsers.
          // Creates a new layer with its own backing surface that can significantly
          // improve scroll performance.
          transform: 'translateZ(0)'
        },
        s.IF<$W>(p => p.horizontal, {
          flexDirection: 'row',
          overflowX: 'auto',
          overflowY: 'hidden'
        }
        )),
    ),
    container: s.STYLE<V>(
      s.WEB<V>(
        webViewRuleset,
        s.IF<$W>(p => p.horizontal, {
          flexDirection: 'row'
        })
      ),
    )
  })
}



