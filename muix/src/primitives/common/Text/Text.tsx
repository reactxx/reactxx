import React from 'react'

import { toPlatformSheet } from 'muix-styles/current/createMuiTheme'

export const sheet: Mui.PlatformSheetCreator<MuiText.Shape> = theme => toPlatformSheet<MuiText.Shape>({
  common: {
    root: {
      web: {
        '& .mui-text': {
          display: 'inline'
        }
      }
    }
  }
})
