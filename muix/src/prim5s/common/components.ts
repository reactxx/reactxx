import { sheetCreator } from '../common/index'
import withStyles from '../common/withStyles'
import { text } from 'muix-prim5s' 

export const textSheet = sheetCreator<Prim5s.TextShape>({
  root: {
    $web: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      '& .base-text': { //high level Text is block element, inner Texts are inline elements
        display: 'inline',
      },
    },
  },
  pressable: {
    cursor: 'pointer'
  },
  singleLineStyle: {
    $web: {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }
})

export const Text = withStyles<Prim5s.TextShape>(textSheet, { name: 'BaseText' })(text)


