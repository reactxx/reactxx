import React from 'react'

import { toPlatformSheet } from 'muix-styles'

export const sheet: Muix.SheetOrCreator<MuixView.Shape> = theme => toPlatformSheet<MuixView.Shape>({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})
