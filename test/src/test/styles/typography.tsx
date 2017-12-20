//https://github.com/vitalets/react-native-extended-stylesheet
//https://github.com/alekhurst/react-native-elevated-view/blob/master/index.js
//jspm build ./app-native/snack/mui/index.js ./app-native/snack/mui/bundle.js
import React from 'react'
//import { View, Text, ScrollView } from 'react-native'
import { createMuiTheme, MuiThemeProvider } from 'muix-styles'
import orange from 'material-ui/colors/orange'
import green from 'material-ui/colors/green'
import cyan from 'material-ui/colors/cyan'

import { View, ScrollView, Typography } from 'muix-primitives'


//import { toPlatformTypographyOptions } from 'muix/styles/createTypography'

//import { View, ScrollView } from 'react-native'

//const ScrollView: React.SFC<{ style?: CSSProperties }> = ({ style, children }) => <div style={style}>{children}</div>
//const View = ScrollView

//type TColor = React.CSSProperties['color']
//type TColor2 = Mui.DeepPartial<TColor>
//const c: TColor = cyan.A700
//const c2: TColor2 = cyan.A700

//type TProc = () => void
//type TProc2 = Mui.DeepPartial<TProc>
//const p: TProc = () => { }
//p()
//const p2: TProc2 = () => { }
//p2()




const theme = createMuiTheme({
  typography: palette => ({
    caption: {
      color: cyan.A700,
      fontSize: 28,
      fontWeight: '500',
      native: {
        fontSize: 22,
      }
    }
  }),
  palette: {
    primary: orange,
    secondary: green
  },
  overridesNew: {
    MuiTypography: {
    //[Mui.Names.Typography]: {
      common: {
        colorAccent: { color: cyan.A700, fontWeight: '500', fontSize: 18 },
        display2: { color: cyan.A700 },
      }
    } as Mui.PartialSheetX<Typography.Shape>
  }
})

const app = () =>
  <ScrollView>
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>noWrap</Typography>
    <Typography noWrap style={{ width: 200 }}>noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap </Typography>
    {/**/}
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>MARGINS</Typography>
    <Typography paragraph>paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph </Typography>
    <Typography paragraph>paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph </Typography>
    <Typography gutterBottom>gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom </Typography>
    <Typography gutterBottom>gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom </Typography>
    {/**/}
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>FONTS</Typography>
    <Typography style={{ fontFamily: 'Roboto' }}>Roboto</Typography>
    <Typography style={{ fontFamily: 'Roboto_Light' }}>Roboto_Light</Typography>
    <Typography style={{ fontFamily: 'Roboto_Medium' }}>Roboto_Medium</Typography>
    {/**/}
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>COLORS</Typography>
    <Typography>undefined</Typography>
    <Typography color='inherit'>inherit</Typography>
    <Typography color='accent'>accent</Typography>
    <Typography color='error'>error</Typography>
    <Typography color='default'>default</Typography>
    <Typography color='secondary'>secondary</Typography>
    <Typography color='primary'>primary</Typography>
    {/**/}
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>TYPES</Typography>
    <Typography>undefined</Typography>
    <Typography type='body1' align="right">body1</Typography>
    <Typography type='body2' align="center">body2</Typography>
    <Typography type='button' align="left">button</Typography>
    <Typography type='caption'>caption</Typography>
    <Typography type='headline'>headline</Typography>
    <Typography type='subheading'>subheading</Typography>
    <Typography type='title'>title</Typography>
    <Typography type='display1'>display1</Typography>
    <Typography type='display2'>display2</Typography>
    <Typography type='display3'>display3</Typography>
    <Typography type='display4'>display4</Typography>
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>THEME</Typography>
    <MuiThemeProvider theme={theme}>
      <View>
        <Typography color='secondary'>secondary</Typography>
        <Typography color='primary'>primary</Typography>
        <Typography type='caption' >caption</Typography>
        <Typography type='display2' >display2</Typography>
        <Typography color='accent' >accent</Typography>
        <Typography color='accent' style={{ color: 'red' }} >accent red</Typography>
      </View>
    </MuiThemeProvider>
  </ScrollView>

export default app

//<Typography>Colors</Typography>
//<Text>{JSON.stringify(createMuiTheme({}), null, 2)}</Text>