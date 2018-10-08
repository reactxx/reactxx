import React from 'react'
import ReactN from 'react-native'

import { TSheeter } from 'reactxx-typings'
import { TPrimitives } from './d-index'

export const textSheet: TSheeter.Sheet<TPrimitives.TextShape> = ({
  root: {
    $web: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      [`& .${TPrimitives.Consts.textClassName}`]: { //high level Text is block element, inner Texts are inline elements. Consts.textClassName is className for Text component div.
        display: 'inline',
      },
    },
    $sheetSwitch: {
      pressable: {
        $web: {
          cursor: 'pointer'
        },
      },
      singleLine: {
        flexShrink: 1,
        $web: {
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
      },
    },
  },
})

// mimic React Native view behavior
const webViewRuleset: TSheeter.RulesetWebOrAtomized = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexBasis: 'auto',
  flexShrink: 0,
  position: 'relative',
  overflow: 'hidden',
}

export const viewSheet: TSheeter.Sheet<TPrimitives.ViewShape> = ({
  root: {
    $web: webViewRuleset as any,
    $sheetSwitch: {
      pressable: {
        $web: {
          cursor: 'pointer'
        }
      }
    }
  },
})

export const iconSheet: TSheeter.Sheet<TPrimitives.IconShape> = ({
  root: {
    //fontSize: 24,
    flexShrink: 0,
    $web: {
      fill: 'currentColor',
      fontSize: 'inherited'
    },
    $sheetSwitch: {
      pressable: {
        $web: {
          cursor: 'pointer'
        }
      }
    }
  },
})

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
export const scrollViewSheet: TSheeter.Sheet<TPrimitives.ScrollViewShape> = ({
  root: {
    $web: [
      webViewRuleset as any,
      {
        flexBasis: 0,
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        // Enable hardware compositing in modern browsers.
        // Creates a new layer with its own backing surface that can significantly
        // improve scroll performance.
        transform: 'translateZ(0)'
      }
    ],
    $native: {
      flexBasis: 0,
    },
    $sheetSwitch: {
      horizontal: {
        $web: {
          flexDirection: 'row',
          overflowX: 'auto',
          overflowY: 'hidden'
        }
      }
    }
  },
  container: {
    $web: webViewRuleset as any,
    $sheetSwitch: {
      horizontal: {
        $web: {
          flexDirection: 'row'
        }
      }
    }
  },
})

