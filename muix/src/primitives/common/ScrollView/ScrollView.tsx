import React from 'react'
import ReactN from 'react-native'

import { sheetCreator } from 'muix-styles'

export const sheet = sheetCreator<MuixScrollView.Shape>(({ palette }) => ({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        height: '100%',
      }
    },
    text: {}
  },
  native: null,
  web: null
}))
