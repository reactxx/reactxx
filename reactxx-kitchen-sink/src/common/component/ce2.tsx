import React from 'react'
import ReactN from 'react-native'

import { Types, withStylesCreator, TCommon, ThemeProviderUntyped, TAddIn, TProvider } from 'reactxx-basic'
import { TComps, Text, View, ScrollView, Icon,  } from 'reactxx-primitives'

import { H2, A, P } from '../components/typo'

/************************
* TYPINGS
*************************/

export interface Theme extends TCommon.ThemeBase {
  color: {
    main: string
    dark: string
    constrastText: string
  },
  fontSize: number
}

export const enum Consts {
  Label = 'ks$ce2$label',
  Badge = 'ks$ce3$badge',
}

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeViews<'root'> & TCommon.ShapeTexts<'label'>,
  //nameType: Consts.Label | Consts.Badge,
  theme: Theme,
}>

const ThemeProvider = ThemeProviderUntyped as TCommon.ThemeProviderTyped<Theme>

/************************
* LABEL
*************************/

const labelSheet: Types.SheetCreatorX<Shape> = ({ color: { main, dark, constrastText }, fontSize }) => ({
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
    color: constrastText,
    fontWeight: 'bold',
    fontSize
  },
})

const label: Types.CodeSFC<Shape> = ({ $system: { mergeRulesets }, classes, style, children}) => {
  const root = mergeRulesets<Types.ViewRulesetX>(classes.root)
  const label = mergeRulesets<Types.TextRulesetX>(classes.label)
  return <View className={root} style={style as Types.ViewRulesetX}>
    <Text className={label}>{children}</Text>
  </View>
}

export const LabelCreator = withStylesCreator<Shape>(labelSheet, label, {name: Consts.Label})
export const Label = LabelCreator()

// 
export const LabelEx = LabelCreator({
  defaultProps: {
    classes: theme => ({ label: { color: theme.color.dark }})
  }
})


/************************
* BADGE
*************************/

const badgeSheet: Types.SheetCreatorX<Shape> = ({ color: { dark, constrastText } }) => ({
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
    color: constrastText,
    fontWeight: 'bold',
  },
})

const badge: Types.CodeSFC<Shape> = ({ $system: { mergeRulesets }, classes, style, children }) => {
  const root = mergeRulesets<Types.ViewRulesetX>(classes.root)
  const label = mergeRulesets<Types.TextRulesetX>(classes.label) 
  return <View className={root} style={style as Types.ViewRulesetX}>
    <Text className={label}>{children}</Text>
  </View>
}

export const BadgeCreator = withStylesCreator<Shape>(badgeSheet, badge, {name:Consts.Badge})
export const Badge = BadgeCreator()

/************************
* THEMES
*************************/

const themeGreen: Theme = {
  color: {
    main: 'green',
    dark: 'darkgreen',
    constrastText: 'white'
  },
  fontSize: 18
}

const themeBlue: Theme = {
  color: {
    main: 'blue',
    dark: 'darkblue',
    constrastText: 'white'
  },
  fontSize: 18
}

/************************************************
*************************************************
*
* APP
*
*************************************************
*************************************************/
const Section: React.SFC = ({ children }) => <View className={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{children}</View>

/**************************************************
* EXAMPLE 1
*************************************************/

const Example1: React.SFC = props => <ThemeProvider theme={themeGreen}>
  <Section>
    <Label>Label 1</Label>
    <Badge>11</Badge>
  </Section>
  <ThemeProvider theme={themeBlue}>
    <Section>
      <Label>Label 2</Label>
      <Badge>12</Badge>
      <ThemeProvider theme={theme => ({ ...theme, fontSize: 32 })}> {/*theme as a function of parent theme*/}
        <Label>Label 2</Label>
        <Badge>12</Badge>
      </ThemeProvider>
    </Section>
  </ThemeProvider>
</ThemeProvider>

/**************************************************
* EXAMPLE 2
*************************************************/

class Example2 extends React.Component<{}, { toggle: boolean }> {

  state = { toggle: false }

  doToggle = () => this.setState(st => ({ toggle: !st.toggle }))

  render() {
    const actThemes = this.state.toggle
      ? [themeGreen, themeBlue, /*theme as a function of parent theme: */ theme => ({ ...theme, fontSize: 32 })]
      : [themeBlue, themeGreen, /*theme as a function of parent theme: */ theme => ({ ...theme, fontSize: 12 })]

    return <ThemeProvider theme={actThemes[0]}>
      <P>
        <A onPress={this.doToggle}>CLICK HERE TO TOGGLE THEME</A>
      </P>
      <Section>
        <Label>Label 1</Label>
        <Badge>11</Badge>
      </Section>
      <ThemeProvider theme={actThemes[1]}>
        <Section>
          <Label>Label 2</Label>
          <Badge>12</Badge>
          <ThemeProvider theme={actThemes[2]}>
            <Label>Label 3</Label>
            <Badge>12</Badge>
          </ThemeProvider>
        </Section>
      </ThemeProvider>
    </ThemeProvider>
  }
}

/**************************************************
* EXAMPLE 3
*************************************************/

const Example3: React.SFC = props => <ThemeProvider theme={themeGreen}>
  <Section>
    <Label>Label 1</Label>
    <Label className={theme => ({ backgroundColor: theme.color.dark })}>Label 1</Label>
    <Label classes={theme => ({ label: { color: theme.color.dark } })}>Label 2</Label>
    <Label style={theme => ({ backgroundColor: theme.color.dark })} >Label 3</Label>
  </Section>
</ThemeProvider>


/**************************************************
* APP
*************************************************/

const App: React.SFC = props => <ScrollView className={{ flex: 1 }}>
  <H2>USING THEME</H2>
  <Example1 />
  <H2>CHANGING THEME</H2>
  <Example2 />
  <H2>THEMING PROPERTIES</H2>
  <Example3 />
</ScrollView>


export default App

