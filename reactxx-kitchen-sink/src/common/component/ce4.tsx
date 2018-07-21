import React from 'react'
import ReactN from 'react-native'

import { Types, withStylesCreator, TCommon, ThemeProviderUntyped, TAddIn, TProvider } from 'reactxx-basic'
import { TComps, Text, View, ScrollView, Icon, } from 'reactxx-primitives'

import { H2, A, P } from '../components/typo'

/************************
* THEME
*************************/

export interface Theme extends TCommon.ThemeBase {
  typo: {
    normal: Types.RulesetXPure<'Text'>
    disabled: Types.RulesetXPure<'Text'>
    header: Types.RulesetXPure<'Text'>
    headerDisabled: Types.RulesetXPure<'Text'>
  },
}

const theme: Theme = {
  typo: {
    normal: {
      fontSize: 14,
      $web: {
        fontSize: '12px',
      }
    },
    disabled: {
      color: 'lightgray'
    },
    header: {
      $native: {
        fontWeight: 'bold'
      },
      fontSize: 18
    },
    headerDisabled: {
      fontWeight: 'normal',
      color: 'lightgray'
    },
  },
}

const ThemeProvider = ThemeProviderUntyped as TCommon.ThemeProviderTyped<Theme>

/************************
* SHEET
*************************/

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeViews<'root'> & TCommon.ShapeTexts<'label' | 'header' | 'disabled'>,
  theme: Theme,
}>

const sheet: Types.SheetCreatorX<Shape> = ({ typo }) => ({
  root: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  header: {
    $before: typo.header,
    $whenUsed: {
      disabled: typo.headerDisabled,
    },
    backgroundColor: 'lightblue'
  },
  label: {
    $before: typo.normal,
    $whenUsed: {
      disabled: {
        $before: typo.disabled,
      }
    }
  },
  // just flag: when used in 'mergeRuleset', header.$whenUsed.disabled or label.$whenUsed.disabled is used
  disabled: {},
})

/************************
* CODE
*************************/

class label extends React.Component<Types.CodeProps<Shape>, { disabled: boolean }> {
  state = { disabled: false }
  render() {
    const { state: { disabled }, props: { children, $system: { mergeRulesets }, classes } } = this
    const root = mergeRulesets<Types.ViewRulesetX>(classes.root)
    const header = mergeRulesets<Types.TextRulesetX>(classes.label, disabled && classes.disabled)
    const label = mergeRulesets<Types.TextRulesetX>(classes.label, disabled && classes.disabled)
    return <View className={root}>
      <Text className={header} onPress={() => this.setState(({ disabled }) => ({ disabled: !disabled }))}>Click here to disable x enable</Text>
      <Text className={label}>{children}</Text>
    </View>
  }
}

export const LabelCreator = withStylesCreator<Shape>(sheet, label, {name:'panel'})
export const Label = LabelCreator()

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

const App: React.SFC = props => <ThemeProvider theme={theme}>
  <Label>Label 1</Label>
</ThemeProvider>

const App_: React.SFC = props => <ThemeProvider theme={theme}>
  <Section>
    <Label>Label 1</Label>
  </Section>
</ThemeProvider>

export default App

