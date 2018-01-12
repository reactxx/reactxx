import React from 'react'
import Button, { ButtonIconLeft, ButtonIconRight } from 'muix-components/Button/Button'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
//import color from 'material-ui/colors/orange'

import { ScrollView, View, Icon, Text } from 'muix-primitives'

const theme = createMuiTheme({
  overridesNew: theme => ({
    MuiButton: {
      root: {
        margin: theme.spacing.unit
      }
    },
  })
})

const rootView: ReactN.ViewStyle = { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', padding: 10, flex: 1, /*alignItems: 'flex-start'  shifts button label*/ }

const app2: React.SFC = props => <AppContainer themeOptions={{ overridesNew: theme => ({ MuiButton: root, MuiButtonIconLeft: root, MuiButtonIconRight: root }) }}>
  <Button color="contrast" disabled style={{ marginTop:24 }} >Contrast</Button>
</AppContainer>

const root = { root: { margin: theme.spacing.unit } }

const app: React.SFC = props => <AppContainer themeOptions={{ overridesNew: theme => ({ MuiButton: root, MuiButtonIconLeft: root, MuiButtonIconRight: root }) }}>
  <ScrollView>
    <View classes={{ root: rootView }} >
      <Button>Default</Button>
      <Button color="primary" >Primary</Button>
      <Button color="accent" >Accent</Button>
      <Button disabled >Disabled</Button>
      <Button href="#flat-buttons" >Link</Button>
      <Button disabled href="/" >Link disabled</Button>
      <Button dense >Dense</Button>
      <Button onClick={() => alert('here I am')} >Does something</Button>
    </View>
    <View classes={{ root: rootView }} style={{ backgroundColor: theme.palette.primary[500] }}>
      <Button color="contrast" >Contrast</Button>
      <Button color="contrast" disabled >Contrast</Button>
    </View>
    <View classes={{ root: rootView }} >
      <Button raised>Default</Button>
      <Button raised color="primary">Primary</Button>
      <Button raised color="accent">Accent</Button>
      <Button raised color="contrast">Contrast</Button>
      <Button raised color="accent" disabled>Disabled</Button>
      {/*<input accept="image/*" className={classes.input} id="raised-button-file" multiple type="file" />
      <label htmlFor="raised-button-file"><Button raised component="span">Upload</Button></label>*/}
      <Button raised dense>Dense</Button>
    </View>
    <View classes={{ root: rootView }} >
      <Button fab color="primary"><Icon>{MuixIcons.Plus}</Icon></Button>
      <Button fab mini color="primary"><Icon>{MuixIcons.Plus}</Icon></Button>
      <Button fab color="accent"><Icon>{MuixIcons.Pencil}</Icon></Button>
      <Button fab mini color="accent"><Icon>{MuixIcons.Pencil}</Icon></Button>
      <Button fab disabled><Icon>{MuixIcons.Delete}</Icon></Button>
      <Button fab mini disabled><Icon>{MuixIcons.Delete}</Icon></Button>
    </View>
    <View classes={{ root: rootView }} >
      <ButtonIconLeft color='accent' raised ><Icon children={MuixIcons.ArrowDownBoldBox} />Icon Left</ButtonIconLeft>
      <ButtonIconLeft color='primary' raised ><Icon children={MuixIcons.ArrowDownBoldBox} />Icon Left</ButtonIconLeft>
      <ButtonIconRight color='default' raised >Icon Right<Icon children={MuixIcons.ArrowDownBoldBox} /></ButtonIconRight>
      <ButtonIconRight color='contrast' dense raised >Icon Right<Icon children={MuixIcons.ArrowDownBoldBox} /></ButtonIconRight>
      <ButtonIconRight color='primary' disabled raised >Icon Right<Icon children={MuixIcons.ArrowDownBoldBox} /></ButtonIconRight>
    </View>
    <View classes={{ root: rootView }} >
      <Button color='accent' raised classes={theme => ({ raisedAccent: { backgroundColor: theme.palette.secondary[100] } })} >classes</Button>
    </View>
  </ScrollView>
</AppContainer >

export default app
//export default app2