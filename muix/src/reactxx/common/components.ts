import { sheetCreator } from '../common/index'
import { withStylesEx } from '../common/withStyles'
import { text, view, icon, scrollView, animatedView, animatedIcon, animatedText, animatedScrollView } from 'reactxx' //import platform specific component code

type TCreator<R extends ReactXX.Shape> = ReactXX.FromThemeValueOrCreator2<R, ReactXX.SheetX<R>>

const textSheet = {
  root: {
    $web: {
      whiteSpace: 'pre-wrap',
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
} as TCreator<ReactXX.TextShape>

const webViewRuleset = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexBasis: 'auto',
  flexShrink: 0,
  position: 'relative',
} as ReactXX.RulesetWeb

const viewSheet = {
  root: {
    $web: webViewRuleset
  }
} as TCreator<ReactXX.ViewShape>

const iconSheet = {
  root: {
    fontSize: 24,
    $web: {
      fill: 'currentColor',
    }
  }
} as TCreator<ReactXX.IconShape>

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
const scrollViewSheet = {
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
} as TCreator<ReactXX.ScrollViewShape>

export const Text = withStylesEx<ReactXX.TextShape>(ReactXX.CompNames.Text, null, textSheet)(text)
export const AnimatedText = withStylesEx<ReactXX.TextShape>(ReactXX.CompNames.AnimatedText, null, textSheet)(animatedText)
export const View = withStylesEx<ReactXX.ViewShape>(ReactXX.CompNames.View, null, viewSheet)(view)
export const AnimatedView = withStylesEx<ReactXX.ViewShape>(ReactXX.CompNames.AnimatedView, null, viewSheet)(animatedView)
export const Icon = withStylesEx<ReactXX.IconShape>(ReactXX.CompNames.Icon, null, iconSheet)(icon)
export const AnimatedIcon = withStylesEx<ReactXX.IconShape>(ReactXX.CompNames.AnimatedIcon, null, iconSheet)(animatedIcon)
export const ScrollView = withStylesEx<ReactXX.ScrollViewShape>(ReactXX.CompNames.ScrollView, null, scrollViewSheet)(scrollView)
export const AnimatedScrollView = withStylesEx<ReactXX.ScrollViewShape>(ReactXX.CompNames.AnimatedScrollView, null, scrollViewSheet)(animatedScrollView)
