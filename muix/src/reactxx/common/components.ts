import { sheetCreator } from '../common/index'
import withStyles, { withStylesEx } from '../common/withStyles'
import { text, view, icon, scrollView, animatedView, animatedIcon, animatedText, animatedScrollView } from 'reactxx' //import platform specific component code

const textHOC = withStylesEx<ReactXX.TextShape>(ReactXX.CompNames.Text, null, (theme, options) => ({
  root: {
    $web: {
      whiteSpace: 'pre-wrap',
      //backgroundColor:'white',
      wordWrap: 'break-word',
      [`& .${ReactXX.CompNames.Text}`]: { //high level Text is block element, inner Texts are inline elements. <ReactXX.CompNames.Text> is className for Text component root div.
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
}))

export const Text2 = textHOC(text)

export const textSheet = sheetCreator<ReactXX.TextShape>({
  root: {
    $web: {
      whiteSpace: 'pre-wrap',
      //backgroundColor:'white',
      wordWrap: 'break-word',
      [`& .${ReactXX.CompNames.Text}`]: { //high level Text is block element, inner Texts are inline elements. <ReactXX.CompNames.Text> is className for Text component root div.
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
} as ReactXX.RulesetWeb

export const viewSheet = sheetCreator<ReactXX.ViewShape>({
  root: {
    $web: webViewRuleset
  }
})

export const iconSheet = sheetCreator<ReactXX.IconShape>({
  root: {
    fontSize: 24,
    $web: {
      fill: 'currentColor',
    }
  }
})

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
export const scrollViewSheet = sheetCreator<ReactXX.ScrollViewShape>({
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

export const Text = withStyles<ReactXX.TextShape>(textSheet, { name: ReactXX.CompNames.Text })(text)
export const AnimatedText = withStyles<ReactXX.TextShape>(textSheet, { name: ReactXX.CompNames.AnimatedText })(animatedText)
export const View = withStyles<ReactXX.ViewShape>(viewSheet, { name: ReactXX.CompNames.View })(view)
export const AnimatedView = withStyles<ReactXX.ViewShape>(viewSheet, { name: ReactXX.CompNames.AnimatedView })(animatedView)
export const Icon = withStyles<ReactXX.IconShape>(iconSheet, { name: ReactXX.CompNames.Icon })(icon)
export const AnimatedIcon = withStyles<ReactXX.IconShape>(iconSheet, { name: ReactXX.CompNames.AnimatedIcon })(animatedIcon)
export const ScrollView = withStyles<ReactXX.ScrollViewShape>(scrollViewSheet, { name: ReactXX.CompNames.ScrollView })(scrollView)
export const AnimatedScrollView = withStyles<ReactXX.ScrollViewShape>(scrollViewSheet, { name: ReactXX.CompNames.AnimatedScrollView })(animatedScrollView)
