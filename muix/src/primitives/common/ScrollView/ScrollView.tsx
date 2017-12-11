import React from 'react'
import RN from 'react-native'

import { sheetCreator } from 'muix-styles/common/withStyles'

export const sheet = sheetCreator<MuiScrollView.Shape>(({ palette }) => ({
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
