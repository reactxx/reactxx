import React from 'react'
import ReactN from 'react-native'

import { TBasic } from '../typings/basic'
import { TComps } from '../typings/comps'

export const textSheet: TBasic.SheetX<TComps.TextShape> = {
  root: {
    $web: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      [`& .${TBasic.Consts.textClassName}`]: { //high level Text is block element, inner Texts are inline elements.TBasic.Consts.textClassName is className for Text component div.
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
    cursor: 'pointer'
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
} as TBasic.RulesetWeb

export const viewSheet: TBasic.SheetX<TComps.ViewShape> = {
  root: {
    $web: webViewRuleset
  }
}

export const iconSheet: TBasic.SheetX<TComps.IconShape> = {
  root: {
    fontSize: 24,
    flexShrink: 0,
    $web: {
      fill: 'currentColor',
    }
  },
  pressable: { //web only ruleset
    cursor: 'pointer'
  },
}

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
export const scrollViewSheet: TBasic.SheetX<TComps.ScrollViewShape> = {
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
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  containerHorizontal: {
    flexDirection: 'row'
  }
}
