import React from 'react'
import Button, { ButtonIconLeft, ButtonIconRight } from 'muix-components/Button/Button'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
//import color from 'material-ui/colors/orange'

import { ScrollView, View, Icon, Text } from 'muix-primitives'

const theme = createMuiTheme({
  overridesX: theme => ({
    MuiButton: {
      
      raisedSecondary: {
        backgroundColor: 'brown',
        $web: { '&:hover': { backgroundColor: 'brown' } } as any
      }
    }
  })
})

const rootView: ReactN.ViewStyle = { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'stretch', padding: 10 }

const app2: React.SFC = props => (
  <View classes={{ root: rootView }} >
    <Button color='secondary' variant='raised' classes={theme => ({ raisedSecondary: { backgroundColor: 'green', $web: { '&:hover': { backgroundColor: 'green', } } } })} >classes</Button>
    <MuiThemeProvider theme={theme}>
      <Button color='secondary' variant='raised'>theme</Button>
    </MuiThemeProvider>
  </View>
)

const root = { root: { margin: theme.spacing.unit } }
//const root = {  }
export const overridesNew: Muix.ThemeValueOrCreator<Muix.OverridesX> = theme => ({ MuiButton: root, MuiButtonIconLeft: root, MuiButtonIconRight: root })

const app: React.SFC = props => <ScrollView>
  <View classes={{ root: rootView }} >
    <Button>Default</Button>
    <Button color="primary" >Primary</Button>
    <Button color="secondary" >Accent</Button>
    <Button disabled >Disabled</Button>
    <Button href="#flat-buttons" >Link</Button>
    <Button disabled href="/" >Link disabled</Button>
    <Button size='small' >Dense</Button>
    <Button onClick={() => alert('Here I am')} >Do something</Button>
  </View>
  <View classes={{ root: rootView }} style={{ backgroundColor: theme.palette.primary[500] }}>
    <Button /*color="contrast"*/ >Contrast</Button>
    <Button /*color="contrast"*/ disabled >Contrast</Button>
  </View>
  <View classes={{ root: rootView }} >
    <Button variant='raised'>Default</Button>
    <Button variant='raised' color="primary">Primary</Button>
    <Button variant='raised' color="secondary">Accent</Button>
    <Button variant='raised' /*color="contrast"*/>Contrast</Button>
    <Button variant='raised' color="secondary" disabled>Disabled</Button>
    {/*<input accept="image/*" className={classes.input} id="variant='raised'-button-file" multiple type="file" />
      <label htmlFor="variant='raised'-button-file"><Button variant='raised' component="span">Upload</Button></label>*/}
    <Button variant='raised' size='small'>Dense</Button>
  </View>
  <View classes={{ root: rootView }} >
    <Button variant='fab' color="primary"><Icon>{MuixIcons.Plus}</Icon></Button>
    <Button variant='fab' mini color="primary"><Icon>{MuixIcons.Plus}</Icon></Button>
    <Button variant='fab' color="secondary"><Icon>{MuixIcons.Pencil}</Icon></Button>
    <Button variant='fab' mini color="secondary"><Icon>{MuixIcons.Pencil}</Icon></Button>
    <Button variant='fab' disabled><Icon>{MuixIcons.Delete}</Icon></Button>
    <Button variant='fab' mini disabled><Icon>{MuixIcons.Delete}</Icon></Button>
  </View>
  <View classes={{ root: rootView }} >
    <ButtonIconLeft color='secondary' variant='raised' ><Icon children={MuixIcons.ArrowDownBoldBox} />Icon Left</ButtonIconLeft>
    <ButtonIconLeft color='primary' variant='raised' ><Icon children={MuixIcons.ArrowDownBoldBox} />Icon Left</ButtonIconLeft>
    <ButtonIconRight color='default' variant='raised' >Icon Right<Icon children={MuixIcons.ArrowDownBoldBox} /></ButtonIconRight>
    <ButtonIconRight color='secondary' size='small' variant='raised' >Icon Right<Icon children={MuixIcons.ArrowDownBoldBox} /></ButtonIconRight>
    <ButtonIconRight color='primary' disabled variant='raised' >Icon Right<Icon children={MuixIcons.ArrowDownBoldBox} /></ButtonIconRight>
  </View>
  <View classes={{ root: rootView }} >
    <Button color='secondary' variant='raised' classes={theme => ({ raisedSecondary: { backgroundColor: 'green', $web: { '&:hover': { backgroundColor: 'green', } } } })} >classes</Button>
    <MuiThemeProvider theme={theme}>
      <Button color='secondary' variant='raised'>theme</Button>
    </MuiThemeProvider>
  </View>
</ScrollView>

export default app
//export default app2

