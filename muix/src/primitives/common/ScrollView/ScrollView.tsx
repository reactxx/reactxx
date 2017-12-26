import React from 'react'
import ReactN from 'react-native'

import { sheetCreator } from 'muix-styles'

type ClassKeyView = 'root'

export type Shape = Overwrite<Mui.DefaultEmptyShape, {
  common: Record<ClassKeyView, ReactN.ViewStyle>
  style: ReactN.ViewStyle
  propsWeb: React.HTMLAttributes<HTMLDivElement>
  propsNative: ReactN.ViewProperties
}>

export const sheet = sheetCreator<Shape>(({ palette }) => ({
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
