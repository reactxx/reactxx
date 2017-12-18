import React from 'react'

import { toPlatformSheet } from 'muix-styles/current/index'

export const sheet: Mui.SheetOrCreator<MuiView.Shape> = theme => toPlatformSheet<MuiView.Shape>({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})
