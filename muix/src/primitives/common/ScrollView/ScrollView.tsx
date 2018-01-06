import React from 'react'
import ReactN from 'react-native'

import { sheetCreator } from 'muix-styles'

export const sheet = sheetCreator<MuixScrollView.Shape>(({ palette }) => ({
  root: {
    $web: {
      flex: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    }
  },
  text: {}
}))
