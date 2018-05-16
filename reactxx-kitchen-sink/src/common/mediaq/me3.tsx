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
  Label = 'ks$me3$label', //unique component name
  Theme1 = 'ks$me3$theme1',
  Theme2 = 'ks$me3$theme2',
}

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<'root'>,
  mediaq: 'isMobile' | 'isTablet' | 'isDesktop'
  nameType: Consts.Label
  theme: Theme
}>

/************************
* SHEET
*************************/

const sheet: Types.SheetCreatorX<Shape> = ({ breakpoints: { mobileEnd, tabletEnd } }) => ({
  root: {
    margin: 10,
    $mediaq: {
      [breaksToString(null, mobileEnd)]: { color: 'red', fontSize: 14 }, // e.g. '-480': { color: 'red', fontSize: 14 }
      [breaksToString(mobileEnd, tabletEnd)]: { color: 'green', fontStyle: 'italic' }, // e.g. '480-1024': { color: 'green', fontStyle: 'italic' }
      [breaksToString(tabletEnd, null)]: { color: 'blue' },
    }
  },
})

/************************
* THEME
*************************/
const ThemeProvider = ThemeProviderUntyped as TCommon.ThemeProviderTyped<Theme>

// use static theme definition (with 'registerTheme') when possible
registerTheme<Theme>(Consts.Theme1, { breakpoints: { mobileEnd: 480, tabletEnd: 1024 } })
registerTheme<Theme>(Consts.Theme2, { breakpoints: { mobileEnd: 640, tabletEnd: 1280 } })

/************************
* CODE
*************************/

const label: Types.CodeSFC<Shape> = ({ system: { classes, mediaqFlags }, children }) => {
  const root = mergeRulesets<Types.ViewRulesetX>(classes.root)
  const info = mediaqFlags.isMobile ? 'MOBILE' : mediaqFlags.isTablet ? 'TABLET' : 'DESKTOP'
  return <Text className={root}>[{info}] {children}</Text>
}

const Label: Types.ComponentTypeX<Shape> = withStylesCreator(Consts.Label, sheet, label)({
  defaultProps: ({ breakpoints: { mobileEnd, tabletEnd } }) => ({ // use values from theme
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
        {/*WRONG: sheet.root.$mediaq value is parametrized by THEME (not by PROPS). Changing props impacts mediaqFlags only (used in label.info variable)*/}
        <Label $mediaq={{ isMobile: [null, 1024], isTablet: [1024, 1280], isDesktop: [1280, null] }}>WRONG: {LoremIpsum(40)}</Label>
      </ThemeProvider>
    </ThemeProvider>
  </MediaQ_AppContainer>
}

export default App