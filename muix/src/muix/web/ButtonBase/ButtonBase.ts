import { styles, default as ButtonBase } from 'material-ui/ButtonBase/ButtonBase'

import { TProvider, TCommon, Types, ThemeProviderUntyped } from 'reactxx-basic'

import { ButtonBaseProps, ButtonBaseClassKey } from '../../typings/ButtonBase/ButtonBase'
import { Theme } from '../styles/withStyles'

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonBaseClassKey>,
  props: ButtonBaseProps,
  theme: Theme
}>

const sheet: Types.SheetCreatorX<Shape> = theme => styles as any as Types.SheetX<Shape>

export default ButtonBase as React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>

