import React from 'react'

import { Text } from 'reactxx-primitives'
import { mergeRulesets, TCommon, LoremIpsum, ThemeProviderUntyped, registerTheme } from 'reactxx-basic'
import { MediaQ_AppContainer, Types, withStylesCreator, breaksToString } from 'reactxx-mediaq'

/************************
* TYPINGS
*************************/

export interface Theme extends TCommon.ThemeBase {
  breakpoints: {
    mobileEnd: number
    tabletEnd: number
  }
}

export const enum Consts {
  Label1 = 'ks$me3$label1', //unique component name
  Theme1 = 'ks$me3$theme1',
  Theme2 = 'ks$me3$theme2',
}

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<'root'>,
  mediaq: 'isMobile' | 'isTablet' | 'isDesktop'
  nameType: Consts.Label1
  theme: Theme
}>

/************************
* SHEET
*************************/

const sheet: Types.SheetCreatorX<Shape> = ({ breakpoints: { mobileEnd, tabletEnd } }) => ({
  root: {
    margin: 10,
    $mediaq: {
      [breaksToString(null, mobileEnd)]: { color: 'red', fontSize: 14 },
      [breaksToString(mobileEnd, tabletEnd)]: { color: 'green', fontStyle: 'italic' },
      [breaksToString(tabletEnd, null)]: { color: 'blue' },
    }
  },
})

/************************
* THEME
*************************/
const ThemeProvider = ThemeProviderUntyped as TCommon.ThemeProviderTyped<Theme>

registerTheme<Theme>(Consts.Theme1, { breakpoints: { mobileEnd: 480, tabletEnd: 1024 } })
registerTheme<Theme>(Consts.Theme2, { breakpoints: { mobileEnd: 1024, tabletEnd: 1280 } })

/************************
* CODE
*************************/

const label: Types.CodeSFC<Shape> = ({ system: { classes, mediaqFlags }, children }) => {
  const root = mergeRulesets<Types.ViewRulesetX>(classes.root)
  const info = mediaqFlags.isMobile ? 'MOBILE' : mediaqFlags.isTablet ? 'TABLET' : 'DESKTOP'
  return <Text className={root} developer_flag>[{info}] {children}</Text>
}

const Label: Types.ComponentTypeX<Shape> = withStylesCreator(Consts.Label1, sheet, label)({
  defaultProps: ({ breakpoints: { mobileEnd, tabletEnd } }) => ({
    $mediaq: {
      isMobile: [null, mobileEnd],
      isTablet: [mobileEnd, tabletEnd],
      isDesktop: [tabletEnd, null],
    }
  })
})

const App: React.SFC = props => {
  return <MediaQ_AppContainer>
    <ThemeProvider theme={Consts.Theme1}>
      <Label>{LoremIpsum(40)}</Label>
      <ThemeProvider theme={Consts.Theme2}>
        <Label>{LoremIpsum(40)}</Label>
      </ThemeProvider>
    </ThemeProvider>
  </MediaQ_AppContainer>
}

export default App