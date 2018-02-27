import { withStylesEx } from '../common/withStyles'
import { text, view, icon, scrollView, animatedView, animatedIcon, animatedText, animatedScrollView } from 'reactxx' //import platform specific component code

//type TCreator<R extends ReactXX.Shape> = ReactXX.FromThemeValueOrCreator2<R, ReactXX.SheetX<R>>

const textSheet: ReactXX.CreateSheetX<ReactXX.TextShape> = {
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
}

const webViewRuleset = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  flexBasis: 'auto',
  flexShrink: 0,
  position: 'relative',
} as ReactXX.RulesetWeb

const viewSheet: ReactXX.CreateSheetX<ReactXX.ViewShape> = {
  root: {
    $web: webViewRuleset
  }
}

const iconSheet: ReactXX.CreateSheetX<ReactXX.IconShape> = {
  root: {
    fontSize: 24,
    $web: {
      fill: 'currentColor',
    }
  }
}

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
const scrollViewSheet: ReactXX.CreateSheetX<ReactXX.ScrollViewShape> = {
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
}

export const Text = withStylesEx<ReactXX.TextShape>(ReactXX.CompNames.Text, textSheet)(text)
export const AnimatedText = withStylesEx<ReactXX.TextShape>(ReactXX.CompNames.AnimatedText, textSheet)(animatedText)
export const View = withStylesEx<ReactXX.ViewShape>(ReactXX.CompNames.View, viewSheet)(view)
export const AnimatedView = withStylesEx<ReactXX.ViewShape>(ReactXX.CompNames.AnimatedView, viewSheet)(animatedView)
export const Icon = withStylesEx<ReactXX.IconShape>(ReactXX.CompNames.Icon, iconSheet)(icon)
export const AnimatedIcon = withStylesEx<ReactXX.IconShape>(ReactXX.CompNames.AnimatedIcon, iconSheet)(animatedIcon)
export const ScrollView = withStylesEx<ReactXX.ScrollViewShape>(ReactXX.CompNames.ScrollView, scrollViewSheet)(scrollView)
export const AnimatedScrollView = withStylesEx<ReactXX.ScrollViewShape>(ReactXX.CompNames.AnimatedScrollView, scrollViewSheet)(animatedScrollView)
