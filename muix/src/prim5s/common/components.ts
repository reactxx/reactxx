import { sheetCreator } from '../common/index'
import withStyles from '../common/withStyles'
import { text, view, icon, scrollView } from 'muix-prim5s' //import platform specific component code

export const textSheet = sheetCreator<Prim5s.TextShape>({
  root: {
    $web: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      [`& .${Prim5s.CompNames.Text}`]: { //high level Text is block element, inner Texts are inline elements. <Prim5s.CompNames.Text> is className for Text component root div.
        display: 'inline',
      },
    },
  },
  singleLineStyle: {
    $web: {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  },
  pressable: { //web only ruleset
    cursor: 'pointer'
  },
})

const webViewRuleset = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexBasis: 'auto',
  flexShrink: 0,

  position: 'relative',
} as Prim5s.RulesetWeb

export const viewSheet = sheetCreator<Prim5s.ViewShape>({
  root: {
    $web: webViewRuleset
  }
})

export const iconSheet = sheetCreator<Prim5s.IconShape>({
  root: {
    $web: {
      fill: 'currentColor',
    }
  }
})

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
export const scrollViewSheet = sheetCreator<Prim5s.ScrollViewShape>({
  root: {
    $web: {
      ...webViewRuleset,
      flexBasis: 0,
      flexGrow: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      // Enable hardware compositing in modern browsers.
      // Creates a new layer with its own backing surface that can significantly
      // improve scroll performance.
      transform: [{ translateZ: 0 }]
    }
  },
  container: {
    $web: webViewRuleset,
  },
  rootHorizontal: {
    $web: {
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden'
    },
  },
  containerHorizontal: {
    $web: {
      flexDirection: 'row'
    }
  }
})

export const Text = withStyles<Prim5s.TextShape>(textSheet, { name: Prim5s.CompNames.Text })(text)
export const View = withStyles<Prim5s.ViewShape>(viewSheet, { name: Prim5s.CompNames.View })(view)
export const AnimatedView = withStyles<Prim5s.AnimatedViewShape>(viewSheet, { name: Prim5s.CompNames.AnimatedView })(view)
export const Icon = withStyles<Prim5s.IconShape>(iconSheet, { name: Prim5s.CompNames.Icon })(icon)
export const ScrollView = withStyles<Prim5s.ScrollViewShape>(scrollViewSheet, { name: Prim5s.CompNames.ScrollView })(scrollView)
