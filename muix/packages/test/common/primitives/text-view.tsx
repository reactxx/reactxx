//https://github.com/jsdf/react-native-htmlview
//https://github.com/vitalets/react-native-extended-stylesheet
//https://github.com/alekhurst/react-native-elevated-view/blob/master/index.js
//jspm build ./app-native/snack/mui/index.js ./app-native/snack/mui/bundle.js
import React from 'react'
import { createMuiTheme, MuiThemeProvider } from 'muix-styles'
import orange from 'material-ui/colors/orange'
import green from 'material-ui/colors/green'
import cyan from 'material-ui/colors/cyan'

import { Text, View, ScrollView } from 'muix-primitives'

const P: React.SFC = props => {
  const { children, ...rest } = props
  return <Text style={{ marginBottom: 8 }}>
    {children}
  </Text>
}

const app = () => {
  return <ScrollView style={{ paddingTop: 24 }}>
    <Text onClick={() => alert('Here I am')}>do something</Text>
    <Text>
      afsd fas df asd sd f asd fasd f asdf asd f asdf asd f asdf asd fa sdf asd fasd f asdf as f asdf asdf
      <Text style={{ backgroundColor: 'red', color: 'white' }}>40 40 40 40 40 40 40 TITLE:  asd f asdf asd f sad fsa df sad fsa df asdf sad f sadf asd fsda f sdaf</Text>
      ?? ?? ?? ?? ?? ?? ?? ?? afsd fas df asd sd f asd fasd f asdf asd f asdf asd f asdf asd fa sdf asd fasd f asdf as f asdf asdf
      <Text>20 20 asd f asd fsad f asdf sad f</Text>
      afsd fas df asd sd f asd fasd f asdf asd f asdf asd f asdf asd fa sdf asd fasd f asdf as f asdf asdf
      <Text>
        10 10 10 10 10 10 10 10 10 text text text text text text text text text text text text
        text text text text text text text text text text text text
      </Text>
      <Text>20 20 20 </Text>
    </Text>
    <Text>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
    <Text>TITLE:</Text>
    <P>
      text text text text text text text text text text text text
      text text text text text text text text text text text text
    </P>
    <P>
      text text text text text text text text text text text text
      text text text text text text text text text text text text
    </P>
    <P>
      text text text text text text text text text text text text
    text text text text text text text text text text text text
    </P>
  </ScrollView>
}

export default app

//https://github.com/oyyd/htmlparser2-without-node-native
const converter = (getMarkup: () => JSX.Element | JSX.Element[]) => {

  type Border = Partial<{ Color: string; Width: number; Style: boolean /*solid x none*/ }>
  type Font = Partial<{ color: string; backgroundColor: string; size: number; weight: number /*-1:light, 0: normal, 1: bold*/; ital: boolean; und: boolean; strike: boolean }> //color-bkgndColor-fontSize-fontWeight-lineHeight-italic-underline 
  type Margin = Partial<{ Left: number; Top: number; Right: number; Bottom: number }>
  type Style = {
    margin: Margin
    padding: Margin
    border: Border
    font: Font
  }
  const fontSize = 14
  type BlockDefault = Partial<{ font: Font, margin: Margin }>
  type Parsed = { type: string, style: React.CSSProperties, props: object, childs: Array<Parsed | string> }
  const defaultFont: Font = { color: 'black', backgroundColor: 'white', size: fontSize, weight: 0, ital: false, und: false, strike: false }

  //https://www.w3schools.com/cssref/css_default_values.asp
  const blocksDefaults: { [tag: string]: BlockDefault } = {
    div: {},
    blockquote: { margin: { Left: 40 }, font: {} },
    p: { margin: { Top: fontSize, Bottom: fontSize }, font: {} },
    h1: { margin: { Top: 2 * 0.67 * fontSize, Bottom: 2 * 0.67 * fontSize }, font: { size: 2 * fontSize, weight: 1 } },
    h2: { margin: { Top: 1.5 * 0.83 * fontSize, Bottom: 1.5 * 0.83 * fontSize }, font: { size: 1.5 * fontSize, weight: 1 } },
    h3: { margin: { Top: 1.17 * fontSize, Bottom: 1.17 * fontSize }, font: { size: 1.17 * fontSize, weight: 1 } },
    h4: { margin: { Top: 1.33 * fontSize, Bottom: 1.33 * fontSize }, font: { size: 1 * fontSize, weight: 1 } },
    ul: { margin: { Top: fontSize, Bottom: fontSize }, font: {} },
    ol: { margin: { Top: fontSize, Bottom: fontSize }, font: {} },
    li: { margin: { Top: fontSize, Bottom: fontSize }, font: {} },
  }

  const old = React.createElement
  //parsing
  let parsed: Parsed | Parsed[]
  try {
    (React as any)['createElement'] = (type: string, pars, ...children) => {
      const { __source, style: {
        margin, marginTop, marginBottom, marginLeft, marginRight,
        padding, paddingTop, paddingBottom, paddingLeft, paddingRight,
        borderColor, borderWidth, borderStyle,
        color, backgroundColor, fontSize, fontWeight, fontStyle, textDecorationLine,
        ...styleRest },
        ...props } = pars
      return { type, props, children }
    }
    parsed = getMarkup() as any
  } finally {
    React.createElement = old
  }

  const convert = (block: Parsed, parent?: Style) => {
    const start: Style = parent || { margin: {}, padding: {}, border: {}, font: { ...defaultFont } }
    //TODO: merge block style to start
    let childs = null
    if (block.childs) childs = block.childs.map(ch => {
      if (typeof ch == 'string') return ch
      return convert(ch, start)
    })
    //const blockStack: BlockStackItem[] = []
    return { type: block.type, pars: start, childs }
  }

  //console.log(parsed)
  //parsed[0].props.onClick()
  if (Array.isArray(parsed)) return parsed.map(p => convert(p))
  else return convert(parsed)
}

//<Typography>Colors</Typography>
//<Text>{JSON.stringify(createMuiTheme({}), null, 2)}</Text>