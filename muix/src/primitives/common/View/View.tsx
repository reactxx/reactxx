import React from 'react'

import { toPlatformSheet } from 'muix-styles'

export const sheet: Muix.SheetOrCreator<MuixView.Shape> = theme => toPlatformSheet<MuixView.Shape>({
  root: { }
})
