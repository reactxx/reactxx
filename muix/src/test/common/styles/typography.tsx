//https://github.com/vitalets/react-native-extended-stylesheet
//https://github.com/alekhurst/react-native-elevated-view/blob/master/index.js
//jspm build ./app-native/snack/mui/index.js ./app-native/snack/mui/bundle.js
import React from 'react'

import { createMuiTheme, MuiThemeProvider } from 'muix-styles'
import orange from 'material-ui/colors/orange'
import green from 'material-ui/colors/green'
import cyan from 'material-ui/colors/cyan'

import { View, ScrollView, Typography } from 'muix-primitives'

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
      common: {
        colorAccent: { color: cyan.A700, fontWeight: '500', fontSize: 18 },
        display2: { color: cyan.A700 },
      }
    } as Mui.PartialSheetX<Typography.Shape>
  }
})

const app2 = () => <Typography classes={{ root: { fontWeight: '500', textDecorationLine: 'line-through', color: 'blue' } }}>TEXT</Typography>

const app = () => <ScrollView>
  <Typography paragraph type='headline' style={{ textDecorationLine: 'underline' }}>noWrap</Typography>
  <Typography noWrap style={{ width: 200, flexShrink:0 }}>noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap </Typography>
  {/**/}
  <Typography paragraph type='headline' style={{ textDecorationLine: 'underline' }}>MARGINS</Typography>
  <Typography paragraph>paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph </Typography>
  <Typography paragraph>paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph </Typography>
  <Typography gutterBottom>gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom </Typography>
  <Typography gutterBottom>gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom </Typography>
  {/**/}
  <Typography paragraph type='headline' style={{ textDecorationLine: 'underline' }}>FONTS (native only)</Typography>
  <Typography style={{ fontFamily: 'Roboto' }}>Roboto</Typography>
  <Typography style={{ fontFamily: 'Roboto_Light' }}>Roboto_Light</Typography>
  <Typography style={{ fontFamily: 'Roboto_Medium' }}>Roboto_Medium</Typography>
  {/**/}
  <Typography paragraph type='headline' style={{ textDecorationLine: 'underline' }}>COLORS</Typography>
  <Typography>undefined</Typography>
  <Typography color='inherit'>inherit</Typography>
  <Typography color='accent'>accent</Typography>
  <Typography color='error'>error</Typography>
  <Typography color='default'>default</Typography>
  <Typography color='secondary'>secondary</Typography>
  <Typography color='primary'>primary</Typography>
  {/**/}
  <Typography paragraph type='headline' style={{ textDecorationLine: 'underline' }}>TYPES</Typography>
  <Typography>undefined</Typography>
  <Typography type='body1' align="right">body1, align=right</Typography>
  <Typography type='body2' align="center">body2, align=center</Typography>
  <Typography type='button' align="left">button, align=left</Typography>
  <Typography type='caption'>caption</Typography>
  <Typography paragraph type='headline'>headline</Typography>
  <Typography type='subheading'>subheading</Typography>
  <Typography type='title'>title</Typography>
  <Typography type='display1'>display1</Typography>
  <Typography type='display2'>display2</Typography>
  <Typography type='display3'>display3</Typography>
  <Typography type='display4'>display4</Typography>
  {/**/}
  <Typography paragraph type='headline' style={{ textDecorationLine: 'underline' }}>WITH CLASSES</Typography>
  <Typography classes={{ root: { fontWeight: '500', textDecorationLine: 'line-through', color: 'blue' } }}>TEXT</Typography>
  {/**/}
  <Typography paragraph type='headline' style={{ textDecorationLine: 'underline' }}>WITH THEME</Typography>
  <MuiThemeProvider theme={theme}>
    <View>
      <Typography color='secondary'>secondary</Typography>
      <Typography color='primary'>primary</Typography>
      <Typography type='caption' >caption</Typography>
      <Typography type='display2' >display2</Typography>
      <Typography color='accent' >accent</Typography>
      <Typography color='accent' style={{ color: 'red' }} >accent red</Typography>
      <Typography color='primary' classes={{ root: { fontWeight: '500', textDecorationLine: 'line-through' } }}>primary, WITH CLASSES</Typography>
    </View>
  </MuiThemeProvider>
</ScrollView>

export default app

//<Typography>Colors</Typography>
//<Text>{JSON.stringify(createMuiTheme({}), null, 2)}</Text>