import React from 'react'
import ReactN from 'react-native'

import { TComponents, TCommonStyles } from 'reactxx-typings'
import { resetPlatform, platform } from 'reactxx-sheeter'
import { TPrimitives } from './d-index'

export const hasPlatformEvents = (propsCode: TComponents.PropsCode) => !!(
  true
  // window.isWeb ?
  //     propsCode.onClick || propsCode.onMouseUp || propsCode.onMouseDown :
  //     propsCode.onPress || propsCode.onPressIn || propsCode.onPressOut || propsCode.onLongPress
)

type TPars<R extends TTyped.Shape> = TCommonStyles.RulesetType<'$Web'>[]

type TRulesProc<R extends TTyped.Shape> = <T extends keyof TSheeter.getRulesets<R>>(arg: (p: {
  $web: (...r: TPars<R>) => any,
  $native, 
  $wif, 
  $nif, 
  $if: (c, ...r: TCommonStyles.RulesetType<TSheeter.getRulesets<R>[T]>[]) => any, 
}) => any) => any
const TSheet = <R extends TTyped.Shape>(par: (TRules: TRulesProc<R>, theme: TSheeter.getTheme<R>, props) => any) => null

//const { $if, $web } = Typed<TPrimitives.TextShape>()

//type T = TPrimitives.TextShape
export const textSheet = TSheet<TPrimitives.TextShape>((TRules, theme, props) => ({
//export const textSheet = TSheet<TPrimitives.TextShape>((TRules, theme) => ({
  root: TRules<'root'>(({ $web, $native, $wif, $nif, $if}) => [
    $web(
      {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        [`& .${TPrimitives.Consts.textClassName}`]: { //high level Text is block element, inner Texts are inline elements. Consts.textClassName is className for Text component div.
          display: 'inline',
        },
      },
      $wif(p => p.pressable), {
        cursor: 'pointer'
      }
    ),

    $if(p => p.singleLine,
      {
        flexShrink: 1,
      },
      $web({
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }),
    )
  ]),
}))

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
    $switch: {
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
    $switch: {
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
    $switch: {
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
    $switch: {
      horizontal: {
        $web: {
          flexDirection: 'row'
        }
      }
    }
  },
})

