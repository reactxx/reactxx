import React from 'react';
import { TCommon, Types, withStylesCreator } from 'reactxx-basic';
import { Text, View } from 'reactxx-primitives';



/************************
* SHEET
*************************/

interface Shape extends Types.ShapeDefault {
  common: TCommon.ShapeViews<'root'> & TCommon.ShapeTexts<'label' | 'header' | 'disabled'>,
  props: {
    disabled?: boolean
  }
}

const sheet: Types.SheetX<Shape> = {
  root: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  header: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: 'blue',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    $sheetSwitch: {
      disabled: {
        backgroundColor: 'lightblue',
        color: 'darkgray',
      }
    },
  },
  label: {
    padding: 10,
    $sheetSwitch: {
      disabled: {
        color: 'lightgray',
      }
    }
  },
  // just flag: when used in 'mergeRuleset', header.$sheetSwitch.disabled or label.$sheetSwitch.disabled is used
  disabled: {},
}

/************************
* CODE
*************************/

class label extends React.Component<Types.CodeProps<Shape>, { disabled: boolean }> {
  state = { disabled: this.props.disabled }
  render() {
    const { state: { disabled }, props: { children, $system: { classNames }, classes, className } } = this
    const root = classNames<Types.ViewRulesetX>(classes.root, className)
    const header = classNames<Types.TextRulesetX>(classes.header, disabled && classes.disabled)
    const label = classNames<Types.TextRulesetX>(classes.label, disabled && classes.disabled)
    return <View className={root}>
      <Text className={header} onPress={() => this.setState(({ disabled }) => ({ disabled: !disabled }))}>Click here to disable x enable</Text>
      <Text className={label}>{children}</Text>
    </View>
  }
}

export const Label = withStylesCreator<Shape>(sheet, label, {name:'panel'})()

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

const App_: React.SFC = props => <Label disabled>Label</Label>

const App: React.SFC = props => <Section>
  <Label>Label</Label>
  <Label disabled>Disabled</Label>
</Section>

export default App

