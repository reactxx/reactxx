import React from 'react'
import ReactN from 'react-native'

import Button, { ButtonIconStart, ButtonIconEnd } from 'reactxx-mui/Button/Button'
import { AppContainer, createMuiTheme } from 'reactxx-mui/index'

//import color from 'material-ui/colors/orange'

import { ScrollView, View, Icon, Text, compThemeSheetModifier } from 'reactxx'
import { ThemeModifierX } from 'reactxx-mui/index'

import { MuiButtonT } from 'reactxx-mui/typings/button'

import MDI from 'reactxx-mdi'

import { TBasic } from 'reactxx-basic'

const theme = createMuiTheme({
  //overridesX: theme => ({
  //  [MuiButton.CompNames.Button]: {
  //    raisedSecondary: {
  //      backgroundColor: 'brown',
  //      $web: { '&:hover': { backgroundColor: 'brown' } } as any
  //    }
  //  }
  //})
})

const rootView: TBasic.ViewRulesetX = { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'stretch', padding: 10 }

const app2: React.SFC = props => <AppContainer>
  <Button color="secondary" variant='raised' classes={theme => ({ raisedSecondary: { backgroundColor: 'green', $web: { '&:hover': { backgroundColor: 'green', } } } })} >classes</Button>
  </AppContainer>

//const root = { root: { margin: theme.spacing.unit } }
//const root = {  }
//export const overridesNew: Muix.ThemeValueOrCreator<Muix.OverridesX> = theme => ({ MuiButton: root, MuiButtonIconLeft: root, MuiButtonIconRight: root })

const app: React.SFC = props => <AppContainer>
  <ScrollView>
    <View classes={{ root: rootView }} >
      <Button>Default</Button>
      <Button color="primary" >Primary</Button>
      <Button color="secondary" >Accent</Button>
      <Button disabled >Disabled</Button>
      <Button href="#flat-buttons" >Link</Button>
      <Button disabled href="/" >Link disabled</Button>
      <Button size='small' >Dense</Button>
      <Button onPress={() => alert('Here I am')} >Do something</Button>
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
      <Button variant='fab' color="primary"><Icon>{MDI.Plus}</Icon></Button>
      <Button variant='fab' mini color="primary"><Icon>{MDI.Plus}</Icon></Button>
      <Button variant='fab' color="secondary"><Icon>{MDI.Pencil}</Icon></Button>
      <Button variant='fab' mini color="secondary"><Icon>{MDI.Pencil}</Icon></Button>
      <Button variant='fab' disabled><Icon>{MDI.Delete}</Icon></Button>
      <Button variant='fab' mini disabled><Icon>{MDI.Delete}</Icon></Button>
    </View>
    <View classes={{ root: rootView }} >
      <ButtonIconStart color='secondary' variant='raised' ><Icon data={MDI.ArrowDownBoldBox} />Icon Left</ButtonIconStart>
      <ButtonIconStart color='primary' variant='raised' ><Icon data={MDI.ArrowDownBoldBox} />Icon Left</ButtonIconStart>
      <ButtonIconEnd color='default' variant='raised' >Icon Right<Icon data={MDI.ArrowDownBoldBox} /></ButtonIconEnd>
      <ButtonIconEnd color='secondary' size='small' variant='raised' >Icon Right<Icon data={MDI.ArrowDownBoldBox} /></ButtonIconEnd>
      <ButtonIconEnd color='primary' disabled variant='raised' >Icon Right<Icon data={MDI.ArrowDownBoldBox} /></ButtonIconEnd>
    </View>
    <View classes={{ root: rootView }} >
      <Button color='secondary' variant='raised' classes={{ raisedSecondary: { backgroundColor: 'green', $web: { '&:hover': { backgroundColor: 'red', } } } }} >classes</Button>
      <ThemeModifierX modify={compThemeSheetModifier<MuiButtonT.Shape>(MuiButtonT.CompNames.Button, { raisedSecondary: { backgroundColor: 'red' } })}>
        <Button color='secondary' variant='raised'>theme</Button>
      </ThemeModifierX>
    </View>
  </ScrollView>
</AppContainer>

export default app
//export default app2

//{ raisedSecondary: { backgroundColor: 'maroon', $web: { '&:hover': { backgroundColor: 'orange', } } } }