import React from 'react'
import ReactN from 'react-native'

import { sheetCreator } from 'muix-styles'

export const sheet = sheetCreator<MuixTemplate.Shape>(({ palette }) => ({
  common: {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    text: {}
  },
  native: null,
  web: null
}))
