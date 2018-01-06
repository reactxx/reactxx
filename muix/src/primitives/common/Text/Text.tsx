import React from 'react'

import { toPlatformSheet } from 'muix-styles'

export const sheet: Muix.SheetOrCreator<MuixText.Shape> = theme => toPlatformSheet<MuixText.Shape>({
  root: {
    $web: {
      '& .mui-text': {
        display: 'inline'
      }
    }
  }
})
