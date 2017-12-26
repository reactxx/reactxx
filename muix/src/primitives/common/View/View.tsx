import React from 'react'

import { toPlatformSheet } from 'muix-styles'

type ClassKey = 'root'

export type Shape = Overwrite<Mui.DefaultEmptyShape, {
  common: Record<ClassKey, ReactN.ViewStyle>
}>

export const sheet: Mui.SheetOrCreator<Shape> = theme => toPlatformSheet<Shape>({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})
