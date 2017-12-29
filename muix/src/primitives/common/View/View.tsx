import React from 'react'

import { toPlatformSheet } from 'muix-styles'

export const sheet: Muix.SheetOrCreator<MuixView.Shape> = theme => toPlatformSheet<MuixView.Shape>({
  common: {
    root: {
      web: {
        alignItems: 'stretch',
        borderWidth: 0,
        borderStyle: 'solid',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        position: 'relative',
        zIndex: 0,
        minHeight: 0,
        minWidth: 0
      }
    }
  }
})
