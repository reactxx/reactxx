import React from 'react'

import { Text } from 'reactxx-primitives'
import { mergeRulesets, TCommon, LoremIpsum } from 'reactxx-basic'
import { MediaQ_AppContainer, Types, withStylesCreator } from 'reactxx-mediaq'

/************************
* TYPINGS
*************************/

export const enum Consts {
  Label1 = 'ks$me2$label1' //unique component name
}

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<'root' | 'mobile' | 'tablet' | 'desktop'>,
  mediaq: 'isMobile' | 'isTablet' | 'isDesktop'
  //nameType: Consts.Label1
}>

/************************
* SHEET
*************************/

const sheet: Types.SheetX<Shape> = {
  root: {
    margin:10
  },
  mobile: {
    color: 'red', fontSize: 14
  },
  tablet: {
    color: 'green', fontStyle: 'italic'
  },
  desktop: {
    color: 'blue'
  },
}

/************************
* CODE
*************************/
const label: Types.CodeSFC<Shape> = ({ system: { classes, mediaqFlags }, children }) => {
  const root = mergeRulesets<Types.ViewRulesetX>(
    classes.root,
    mediaqFlags.isMobile && classes.mobile,
    mediaqFlags.isTablet && classes.tablet,
    mediaqFlags.isDesktop && classes.desktop,
  )
  const info = mediaqFlags.isMobile ? 'MOBILE' : mediaqFlags.isTablet ? 'TABLET' : 'DESKTOP'
  return <Text className={root} $developer_flag>[{info}] {children}</Text>
}

const Label: Types.ComponentTypeX<Shape> = withStylesCreator(Consts.Label1, sheet, label)({
  defaultProps: {
    $mediaq: {
      isMobile: [null, 480],
      isTablet: [480, 1024],
      isDesktop: [1024, null],
    }
  }
})

const App: React.SFC = props => {
  return <MediaQ_AppContainer>
    <Label>{LoremIpsum(40)}</Label>
    <Label $mediaq={{ isMobile: [null, 1024], isTablet: [1024, 1280], isDesktop: [1280, null] }}>{LoremIpsum(40)}</Label>
  </MediaQ_AppContainer>
}

export default App