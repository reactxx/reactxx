import React from 'react'
import ReactN from 'react-native'

import { Types, TCommonStyles  } from 'reactxx-basic'
import { TComps } from '../typings/comps'

export const textSheet: Types.SheetX<TComps.TextShape> = {
  root: {
    $web: {
      whiteSpace: 'pre-wrap', 
      wordWrap: 'break-word',
      [`& .${TComps.Consts.textClassName}`]: { //high level Text is block element, inner Texts are inline elements. Consts.textClassName is className for Text component div.
        display: 'inline',
      },
    },
  },
  singleLineStyle: {
    flexShrink: 1,
    $web: {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
  },
  pressable: { //web only ruleset
    $web: {
      cursor: 'pointer'
    }
  },
}

const webViewRuleset = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexBasis: 'auto',
  flexShrink: 0,
  position: 'relative',
  overflow: 'hidden',
} as TCommonStyles.RulesetWeb

export const viewSheet: Types.SheetX<TComps.ViewShape> = {
  root: {
    $web: webViewRuleset
  },
  pressable: {
    $web: {
      cursor: 'pointer'
    }
  }
}

export const iconSheet: Types.SheetX<TComps.IconShape> = {
  root: {
    fontSize: 24,
    flexShrink: 0,
    $web: {
      fill: 'currentColor',
    }
  },
  pressable: { //web only ruleset
    $web: {
      cursor: 'pointer'
    }
  },
}

let x: Types.SheetX<TComps.ScrollViewShape>


//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
export const scrollViewSheet: Types.SheetX<TComps.ScrollViewShape> = {
  root: {
    $web: {
      ...webViewRuleset,
      flexBasis: 0,
      flexGrow: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      // Enable hardware compositing in modern browsers.
      // Creates a new layer with its own backing surface that can significantly
      // improve scroll performance.
      transform: 'translateZ(0)'
    },
    $native: {
      flexBasis: 0,
    }
  },
  container: {
    $web: webViewRuleset,
  },
  rootHorizontal: {
    $web: {
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden'
    }
  },
  containerHorizontal: {
    $web: {
      flexDirection: 'row'
    }
  }
}
