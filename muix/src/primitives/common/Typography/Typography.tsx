import React from 'react'
import ReactN from 'react-native'

import { capitalize } from 'material-ui/utils/helpers'
import { TypographyNativeX } from 'muix-primitives'
//import { Text as TextRN } from 'react-native'

import { sheetCreator, withStyles } from 'muix-styles'

export const sheet = sheetCreator<MuixTypography.Shape>(({ typographyX: typoX, palette, spacing }) => ({
  root: {
    margin: 0,
    $web: { display: 'block' }
  },
  
  display4: typoX.display4,
  display3: typoX.display3,
  display2: typoX.display2,
  display1: typoX.display1,
  headline: typoX.headline,
  title: typoX.title,
  subheading: typoX.subheading,
  body2: typoX.body2,
  body1: typoX.body1,
  caption: typoX.caption,
  button: typoX.button,
  alignLeft: { textAlign: 'left' },
  alignCenter: { textAlign: 'center', },
  alignRight: { textAlign: 'right', },
  alignJustify: {
    $web: { textAlign: 'justify' }
  },
  noWrap: {
    $web: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    $native: {
      ellipsizeMode: 'tail',
      numberOfLines: 1
    } as any
  },
  gutterBottom: {
    $web: { marginBottom: '0.35em' },
    $native: { marginBottom: 0.35 * 16 }
  },
  paragraph: {
    marginBottom: spacing.unit * 2,
  },
  colorInherit: {
    $web: { color: 'inherit', }
  },
  colorPrimary: {
    color: palette.primary.main,
  },
  colorSecondary: {
    color: palette.secondary.main,
  },
  colorTextSecondary: {
    color: palette.text.secondary,
  },
  colorError: {
    color: palette.error.main,
  },
}))

const typography: Prim5s.CodeSFC<MuixTypography.Shape> = (props => {
  const {
    align = 'inherit',
    classes,
    color = 'default',
    gutterBottom,
    noWrap,
    paragraph,
    variant = 'body1',
    style,
    getRulesetWithSideEffect,
    animations,
    theme, flip, 
    children,
    className,
    ...rest
  } = props

  //console.log('### typography', color, classes)

  const classNameRes = getRulesetWithSideEffect(
    classes.root,
    classes[variant],
    color !== 'default' && classes[`color${capitalize(color)}`],
    gutterBottom && classes.gutterBottom,
    paragraph && classes.paragraph,
    align !== 'inherit' && classes[`align${capitalize(align)}`],
    className,
  )

  //console.log(className)
  return <TypographyNativeX
    className={classNameRes as ReactN.TextStyle} style={style as ReactN.TextStyle}
    $native={rest as PrimComps.TypographyX['$native']} $web={rest as NoPartial<React.HTMLAttributes<HTMLDivElement>>}
    $type={variant}
    $noWrapStyle={noWrap && classes.noWrap}
    children={children} /> as any
})

const Typography = withStyles<MuixTypography.Shape>(sheet, { name: 'MuiTypography' })(typography)

export default Typography