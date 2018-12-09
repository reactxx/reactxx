import ReactN from 'react-native'

import { TTyped, $W, $T, $V, $I, V, T, I, O } from 'reactxx-typings'

import { getEngine } from 'reactxx-sheeter'
import { TUseSheeter } from 'reactxx-use-sheeter'

//----------------------------------------
// PRIVATE

interface TextShapeLow extends TTyped.ShapeAncestor {
  props: { singleLine?: boolean; url?: string }
  sheetQuery: { pressable: boolean }

  rootWebProps: React.HTMLAttributes<HTMLSpanElement>
  rootNativeProps: ReactN.TextProperties
  //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
}
const { STYLE, WEB, IF } = getEngine<TextShapeLow>()

const defaultSheet = () => ({
  root: STYLE<T>(
    WEB(
      {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        [`& .${Consts.textClassName}`]: { //high level Text is block element, inner Texts are inline elements. Consts.textClassName is className for Text component div.
          display: 'inline',
        },
      },
      IF<$W>(p => p.pressable, {
        cursor: 'pointer'
      })
    ),
    IF<T>(p => p.singleLine,
      {
        flexShrink: 1,
      },
      WEB({
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }),
    )
  ),

})

//----------------------------------------
// EXPORT

export const enum Consts {
  textClassName = 'reactxx-text'
}

export interface TextShape extends TextShapeLow {
  sheet: ReturnType<typeof defaultSheet>
}

export const textConfig: TUseSheeter.AuthorConfig<TextShape> = {
  defaultSheet  
}
