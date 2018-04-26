import React from 'react'
import ReactN from 'react-native'

import { Types, deepMerge, deepMerges } from 'reactxx-basic'
import { TComps, TTheme, ThemeCreator, TBasic, TAddInConfig, Text, View, ScrollView, Icon, withStylesCreator, ThemeProviderUntyped, ThemeProviderTyped } from 'reactxx'

import { H4 } from '../components/typo'

/************************
* TYPINGS
*************************/

export interface Theme extends TTheme.ThemeBase {
  color: {
    main: string
    dark: string
    constrastText: string
  },
}

export const enum Consts {
  Label = 'ks$ce3$label',
  Badge = 'ks$ce3$badge',
}

type Shape = TBasic.OverwriteShape<{
  common: TComps.ShapeViews<'root'> & TComps.ShapeTexts<'label'>,
  nameType: Consts.Label | Consts.Badge,
  theme: Theme,
}>

const ThemeProvider = ThemeProviderUntyped as ThemeProviderTyped<Theme>

/************************
* LABEL
*************************/

const labelSheet: TTheme.SheetCreatorX<Shape> = ({ color: { main, dark, constrastText } }) => ({
  root: {
    backgroundColor: main,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: dark,
    borderStyle: 'solid',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  label: {
    color: constrastText
  },
})

const label: TBasic.CodeSFC<Shape> = ({ classes, mergeRulesetWithOverrides, children, style }) => {
  const root = mergeRulesetWithOverrides(classes.root) as TBasic.ViewRulesetX
  const label = mergeRulesetWithOverrides(classes.label) as TBasic.TextRulesetX
  return <View className={root} style={style as TBasic.ViewRulesetX}>
    <Text className={label}>{children}</Text>
  </View>
}

export const LabelCreator = withStylesCreator<Shape>(Consts.Label, labelSheet, label)
export const Label = LabelCreator()
export const LabelC = LabelCreator({ withCascading: true })

/************************
* BADGE
*************************/

const badgeSheet: TTheme.SheetCreatorX<Shape> = ({ color: { dark, constrastText } }) => ({
  root: {
    backgroundColor: dark,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    marginBottom: 10,
    marginRight: 10,
  },
  label: {
    color: constrastText
  },
})

const badge: TBasic.CodeSFC<Shape> = ({ classes, mergeRulesetWithOverrides, children, style }) => {
  const root = mergeRulesetWithOverrides(classes.root) as TBasic.ViewRulesetX
  const label = mergeRulesetWithOverrides(classes.label) as TBasic.TextRulesetX
  return <View className={root} style={style as TBasic.ViewRulesetX}>
    <Text className={label}>{children}</Text>
  </View>
}

export const BadgeCreator = withStylesCreator<Shape>(Consts.Badge, badgeSheet, badge)
export const Badge = BadgeCreator()
export const BadgeC = LabelCreator({ withCascading: true })

/************************
* THEMES
*************************/

const themeGreen: Theme = {
  color: {
    main: 'green',
    dark: 'darkgreen',
    constrastText: 'white'
  }
}

const themeGreenModifier: DeepPartial<Theme> = {
  color: {
    constrastText: 'lightgreen'
  }
}


/************************************************
*************************************************
*
* EXAMPLE
*
*************************************************
*************************************************/
const Section: React.SFC = ({ children }) => <View className={{ flexDirection: 'row', flexWrap: 'wrap' }}>{children}</View>

class App extends React.Component<{}, {  }> {
  render() {
    return <ThemeProvider theme={themeGreen}>
      <ScrollView className={{ flex: 1 }}>
        <Section>
          <Label>Label 1</Label>
          <Badge>11</Badge>
        </Section>
        <ThemeProvider theme={theme => deepMerges(false, {}, theme, themeGreenModifier)}>
          <Section>
            <Label>Label 2</Label>
            <Badge>12</Badge>
          </Section>
        </ThemeProvider>
      </ScrollView>
    </ThemeProvider>
  }
}

export default App

