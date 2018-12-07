import ReactN from 'react-native'
import { TTyped, $W, $T, $V, $I, V, T, I, } from 'reactxx-typings'
import { getEngine } from 'reactxx-sheeter'
import { TUseSheeter } from 'reactxx-use-sheeter'

interface TextShapeLow extends TTyped.ShapeAncestor {
  root: {
    web: React.HTMLAttributes<HTMLSpanElement>
    native: ReactN.TextProperties
  }
  sheetQuery: { pressable: boolean }
  props: { singleLine?: boolean; url?: string }
  //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
}

export interface TextShape extends TextShapeLow {   
  sheet: typeof tsheet,
}


const {WEB, IF, ROOT} = getEngine<TextShapeLow>()

export const tsheet = {
  root: ROOT(
    WEB(
      {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        [`& .${''/*TPrimitives.Consts.textClassName*/}`]: { //high level Text is block element, inner Texts are inline elements. Consts.textClassName is className for Text component div.
          display: 'inline',
        },
      },
      IF<$W>(p => p.pressable, {
        cursor: 'pointer'
      })
    ),
    IF<V>(p => p.singleLine,
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

}

export const hasPlatformEvents = (propsCode: TTyped.PropsCode) => !!(
  true
  // window.isWeb ?
  //     propsCode.onClick || propsCode.onMouseUp || propsCode.onMouseDown :
  //     propsCode.onPress || propsCode.onPressIn || propsCode.onPressOut || propsCode.onLongPress
)

export const textConfig: TUseSheeter.AuthorConfig<TextShape> = {
  defaultSheet: tsheet
}

