import React from 'react'
import ReactN from 'react-native'
import { withStyles, sheetCreator } from 'muix-styles'
import { ViewX, TextX } from 'muix-primitives'

export const sheet = sheetCreator<MuixDrawer.Shape>(({ typographyX: typoX, spacing, breakpoints, mixins, palette }) => ({
  root: {
  },
  style: {},
  hidden: {},
  docked: {},
  paper: {},
  paperAnchorLeft: {},
  paperAnchorRight: {},
  paperAnchorTop: {},
  paperAnchorBottom: {},
  paperAnchorDockedLeft: {},
  paperAnchorDockedTop: {},
  paperAnchorDockedRight: {},
  paperAnchorDockedBottom: {},
  modal: {},
}))
