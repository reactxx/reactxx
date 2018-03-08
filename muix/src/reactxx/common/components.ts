import React from 'react'
import ReactN from 'react-native'
import { withStyles } from '../common/withStyles'
import { text, view, icon, scrollView, animatedView, animatedIcon, animatedText, animatedScrollView } from 'reactxx' //import platform specific component code

const textSheet: ReactXX.SheetCreatorX<ReactXX.TextShape> = {
  root: {
    $web: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      [`& .${ReactXX.CompNames.textClassName}`]: { //high level Text is block element, inner Texts are inline elements. <ReactXX.CompNames.Text> is className for Text component root div.
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

const viewSheet: ReactXX.SheetCreatorX<ReactXX.ViewShape> = {
  root: {
    $web: webViewRuleset
  }
}

const iconSheet: ReactXX.SheetCreatorX<ReactXX.IconShape> = {
  root: {
    fontSize: 24,
    flexShrink: 0,
    $web: {
      fill: 'currentColor',
    }
  }
}

//https://stackoverflow.com/questions/35395691/understanding-the-difference-between-the-flex-and-flex-grow-properties
//https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af
const scrollViewSheet: ReactXX.SheetCreatorX<ReactXX.ScrollViewShape> = {
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

export const Text = withStyles<ReactXX.TextShape>(ReactXX.CompNames.Text, textSheet)(text)
export const AnimatedText = withStyles<ReactXX.TextShape>(ReactXX.CompNames.AnimatedText, textSheet)(animatedText)
export const View = withStyles<ReactXX.ViewShape>(ReactXX.CompNames.View, viewSheet)(view)
export const AnimatedView = withStyles<ReactXX.ViewShape>(ReactXX.CompNames.AnimatedView, viewSheet)(animatedView)
export const Icon = withStyles<ReactXX.IconShape>(ReactXX.CompNames.Icon, iconSheet)(icon)
export const AnimatedIcon = withStyles<ReactXX.IconShape>(ReactXX.CompNames.AnimatedIcon, iconSheet)(animatedIcon)
export const ScrollView = withStyles<ReactXX.ScrollViewShape>(ReactXX.CompNames.ScrollView, scrollViewSheet)(scrollView)
export const AnimatedScrollView = withStyles<ReactXX.ScrollViewShape>(ReactXX.CompNames.AnimatedScrollView, scrollViewSheet)(animatedScrollView)

export const LoremIpsum = (words: 2 | 5 | 10 | 20 | 40 | 80 | 160) => {
  switch (words) {
    case 2: return 'Lorem ipsum.'
    case 5: return 'Lorem ipsum dolor sit amet.'
    case 10: return 'Lorem ipsum dolor sit amet, usu vocibus eleifend accommodare te.'
    case 20: return 'Lorem ipsum dolor sit amet, ei eius elitr numquam mei, ubique utamur pericula ad mel! Quo at dicta lobortis salutatus.'
    case 40: return 'Lorem ipsum dolor sit amet, offendit comprehensam te nam! Dicam incorrupte id his, veri ipsum singulis mel ex! Mei ei cetero convenire. Ius quas dolorem no? Te usu rebum delectus scribentur, vel an veri dissentias, mel id laboramus urbanitas et.'
    case 80: return 'Lorem ipsum dolor sit amet, ei has audire tamquam mediocritatem, vim velit postulant eu. Mel insolens intellegebat ei. Autem tincidunt intellegebat ad duo? Est ei meliore ancillae, sea an efficiendi intellegam definitiones, eum ei oratio latine aliquando! Et eos probo volumus. Propriae deleniti et sea.Ne eam tibique detracto.Vero ullum ius id, cu nobis iuvaret nec.Wisi inciderint ad vim ? Vitae docendi interesset pro eu, ei pri tota petentium! Usu munere epicurei ei, meliore graecis et est, ne per.'
    case 160: return 'Lorem ipsum dolor sit amet, no usu nominavi appetere, debet partem ei vis, ex nec fugit maiestatis. Te sint propriae sea, his augue labores in? Duo debet mollis ea, ut est denique eligendi copiosae! Natum ubique feugait mea eu, falli liber cotidieque sit in. Ad quo suas pertinacia dissentiunt! Legere accusata nominati et his, et eos possit copiosae, in mutat commodo constituam quo.Doctus scripta petentium per ad, cum cu dictas eleifend dissentiet, pro civibus lobortis accommodare id.Vim dolor signiferumque ea, brute propriae iudicabit ne pro, porro diceret appareat ad vix! Sea no zril noster adipisci, stet semper persequeris sit et.Mel ad cetero denique apeirian, oblique scribentur nam ne. No mollis nostrud vel.Vim te erat nemore.Sea ne meliore vivendum.Eum ex tollit ornatus! Doctus mandamus vel ex, ius ea enim intellegat, purto imperdiet sed ne.Mel electram mnesarchum instructior no. Sed audire tacimates ex, ex sit tincidunt definitionem.Usu tation consectetuer et, fabellas efficiendi eu vix.'
  }
}
