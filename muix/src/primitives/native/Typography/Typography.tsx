import React from 'react'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { Text as TextRN } from 'react-native'

import { withStyles, classNames } from 'muix-styles/native/withStyles'
import { toRule } from 'muix-styles/native/platform'
import { sheetCreator } from 'muix-styles/common/platform'

export const sheet = sheetCreator<Typography.Shape>(({ typographyNative: typo, palette, spacing }) => ({
  common: {
    root: { margin: 0, },
    display4: typo.display4,
    display3: typo.display3,
    display2: typo.display2,
    display1: typo.display1,
    headline: typo.headline,
    title: typo.title,
    subheading: typo.subheading,
    body2: typo.body2,
    body1: typo.body1,
    caption: typo.caption,
    button: typo.button,
    alignJustify: { },
    alignLeft: { textAlign: 'left' },
    alignCenter: { textAlign: 'center', },
    alignRight: { textAlign: 'right', },
    noWrap: {
      ellipsizeMode: 'tail',
      numberOfLines: 1
    } as any,
    gutterBottom: { marginBottom: typo.fontSizeNormalizerNative(0.35 * 16) },
    paragraph: { marginBottom: spacing.unit * 2, },
    colorInherit: { color: undefined, },
    colorPrimary: { color: palette.primary[500], },
    colorSecondary: { color: palette.text.secondary },
    colorAccent: { color: palette.secondary.A400, },
    colorError: { color: palette.error.A400, },
  },
  native: {},
  web: {},
}))

const typography: Mui.CodeSFCNative<Typography.Shape> = (props => {
  const {
    align = 'inherit',
    classes,
    color = 'default',
    gutterBottom,
    noWrap,
    paragraph,
    type = 'body1',
    style,
    theme,
    ...other
  } = props

  const actStyle = classNames(
    classes.root,
    classes[type],
    color !== 'default' && classes[`color${capitalizeFirstLetter(color)}`],
    gutterBottom && classes.gutterBottom,
    paragraph && classes.paragraph,
    align !== 'inherit' && classes[`align${capitalizeFirstLetter(align)}`],
    toRule(style)
  )

  //console.log(type, classes[type], actStyle)
  return <TextRN style={actStyle} {...(noWrap && classes.noWrap) } {...other} />
})

const Typography = withStyles<Typography.Shape>(sheet, { name: 'MuiTypography' })(typography)

export default Typography