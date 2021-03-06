import { TComponents, TTyped, $W, V, T } from 'reactxx-typings'
import { getTypedEngine } from 'reactxx-styles'

import { TPrimitives } from './shapes'


const t = getTypedEngine<TPrimitives.TextShape>()

export const textConfig: TComponents.ComponentConfig<TPrimitives.TextShape> = {
  $sheet: {
    root: t.STYLE<T>(
      t.WEB(
        {
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          [`& .${TPrimitives.Consts.textClassName}`]: { //high level Text is block element, inner Texts are inline elements. Consts.textClassName is className for Text component div.
            display: 'inline',
          },
        },
        t.IF<$W>(p => p.pressable, {
          cursor: 'pointer'
        })
      ),
      t.IF<T>(p => p.singleLine,
        {
          flexShrink: 1,
        },
        t.WEB({
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }),
      )
    ),
  
  }
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

const v = getTypedEngine<TPrimitives.ViewShape>()

export const viewConfig: TComponents.ComponentConfig<TPrimitives.ViewShape> = {
  $sheet: {
    root: v.STYLE<V>(
      v.WEB(
        webViewRuleset,
        v.IF<$W>(p => p.pressable, {
          cursor: 'pointer'
        })
      )
    ),
  }
}

const i = getTypedEngine<TPrimitives.IconShape>()

export const iconConfig: TComponents.ComponentConfig<TPrimitives.IconShape> = {
  $props: {
    $rootWebProps: {
      viewBox: '0 0 24 24',
      focusable: 'false'
    }
  },
  $sheet: {
    root: i.STYLE<T>(
      {
        flexShrink: 0,
      },
      i.WEB(
        {
          fill: 'currentColor',
          fontSize: 'inherited'
        },
        i.IF<$W>(p => p.pressable, {
          cursor: 'pointer'
        })
      )
    )
  }
}

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af

const s = getTypedEngine<TPrimitives.ScrollViewShape>()

export const scrollViewConfig: TComponents.ComponentConfig<TPrimitives.ScrollViewShape> = {
  $sheet: {
    root: s.STYLE<V>(
      {
        flexBasis: 0,
      },
      s.WEB(
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
      s.WEB(
        webViewRuleset,
        s.IF<$W>(p => p.horizontal, {
          flexDirection: 'row'
        })
      ),
    )
  }
}