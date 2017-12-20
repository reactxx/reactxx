import React from 'react'

import { toPlatformSheet } from 'muix-styles'

export const sheet: Mui.SheetOrCreator<MuiText.Shape> = theme => toPlatformSheet<MuiText.Shape>({
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
