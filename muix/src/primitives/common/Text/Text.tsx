import React from 'react'

import { toPlatformSheet } from 'muix-styles'

type ClassKeyText = 'root'

export type Shape = Overwrite<Mui.DefaultEmptyShape, {
  common: Record<ClassKeyText, ReactN.TextStyle>
  style: ReactN.TextStyle
  propsNative: ReactN.TextProperties

}>

export const sheet: Mui.SheetOrCreator<Shape> = theme => toPlatformSheet<Shape>({
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
