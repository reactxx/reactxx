import React from 'react'
import ReactN from 'react-native'

import { sheetCreator } from 'muix-styles'

type ClassKeyView = 'root'
type ClassKeyText = 'text'

export type Shape = Overwrite<Mui.DefaultEmptyShape, {
  common: Record<ClassKeyView, ReactN.ViewStyle> & Record<ClassKeyText, ReactN.TextStyle>
  native: {}
  web: null
  style: ReactN.ViewStyle
  props: {}
  propsWeb: React.HTMLAttributes<HTMLDivElement>
  propsNative: ReactN.ViewProperties
}>

export const sheet = sheetCreator<Shape>(({ palette }) => ({
  common: {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    text: {}
  },
  native: null,
  web: null
}))
