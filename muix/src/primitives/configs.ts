import React from 'react'
import ReactN from 'react-native'

import { TComponents, TTyped, TUseSheeter } from 'reactxx-typings'
import { TPrimitives } from './shapes'
import { getTypedEngine } from 'reactxx-sheeter'

import { $W, $T, $V, $I, V, T, I, } from 'reactxx-typings'

export const enum CompNames {
  Text = 'ReactXXText',
  View = 'ReactXXView',
  Icon = 'ReactXXIcon',
  ScrollView = 'ReactXXScrollView',

  AnimatedView = 'ReactXXAnimatedView',
  AnimatedIcon = 'ReactXXAnimatedIcon',
  AnimatedText = 'ReactXXAnimatedText',
  AnimatedScrollView = 'ReactXXAnimatedScrollView',
}


export const hasPlatformEvents = (propsCode: TTyped.PropsCode) => !!(
  true
  // window.isWeb ?
  //     propsCode.onClick || propsCode.onMouseUp || propsCode.onMouseDown :
  //     propsCode.onPress || propsCode.onPressIn || propsCode.onPressOut || propsCode.onLongPress
)

const t = getTypedEngine<TPrimitives.TextShape>()

export const textConfig: TUseSheeter.AuthorConfig<TPrimitives.TextShape> = {
  defaultSheet: {
    root: t.$rules<T>(
      t.$web<T>(
        {
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          [`& .${TPrimitives.Consts.textClassName}`]: { //high level Text is block element, inner Texts are inline elements. Consts.textClassName is className for Text component div.
            display: 'inline',
          },
        },
        t.$if<$W>(p => p.$sheetQuery.pressable), {
          cursor: 'pointer'
        }
      ),
      t.$if<T>(p => p.singleLine,
        {
          flexShrink: 1,
        },
        t.$web<T>({
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

export const viewConfig: TUseSheeter.AuthorConfig<TPrimitives.ViewShape> = {
  defaultSheet: {
    root: v.$rules<V>(
      v.$web<V>(
        webViewRuleset,
        v.$if<$W>(p => p.$sheetQuery.pressable, {
          cursor: 'pointer'
        })
      )
    ),
  }
}

const i = getTypedEngine<TPrimitives.IconShape>()

export const iconConfig: TUseSheeter.AuthorConfig<TPrimitives.IconShape> = {
  defaultProps: {
    $web: {
      viewBox: '0 0 24 24',
      focusable: 'false'
    }
  },
  defaultSheet: {
    root: i.$rules<T>(
      {
        flexShrink: 0,
      },
      i.$web<T>(
        {
          fill: 'currentColor',
          fontSize: 'inherited'
        },
        i.$if<$W>(p => p.$sheetQuery.pressable, {
          cursor: 'pointer'
        })
      )
    )
  }
}

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af

const s = getTypedEngine<TPrimitives.ScrollViewShape>()

export const scrollViewConfig: TUseSheeter.AuthorConfig<TPrimitives.ScrollViewShape> = {
  defaultSheet: {
    root: s.$rules<V>(
      {
        flexBasis: 0,
      },
      s.$web<V>(
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
        s.$if<$W>(p => p.horizontal, {
          flexDirection: 'row',
          overflowX: 'auto',
          overflowY: 'hidden'
        }
        )),
    ),
    container: s.$rules<V>(
      s.$web<V>(
        webViewRuleset,
        s.$if<$W>(p => p.horizontal, {
          flexDirection: 'row'
        })
      ),
    )
  }
}



