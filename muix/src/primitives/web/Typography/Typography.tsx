import ReactN from 'react-native'
import React from 'react'

import Typography from 'material-ui/Typography/Typography'
import { withStylesX } from 'muix-styles/web'
import { Shape } from '../../common/Typography/Typography'

export type TypographyShape = Shape

const typography = withStylesX<Shape>(Typography)
export default typography
