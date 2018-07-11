import { Breakpoints, BreakpointsOptions } from 'reactxx-muix/typings/styles/createBreakpoints';
import { Mixins, MixinsOptions } from 'reactxx-muix/typings/styles/createMixins';
import { Palette, PaletteOptions } from 'reactxx-muix/typings/styles/createPalette';
import { Typography, TypographyOptions } from 'reactxx-muix/typings/styles/createTypography';
import { Shadows } from 'reactxx-muix/typings/styles/shadows';
import { Shape, ShapeOptions } from 'reactxx-muix/typings/styles/shape';
import { Spacing, SpacingOptions } from 'reactxx-muix/typings/styles/spacing';
import { Transitions, TransitionsOptions } from 'reactxx-muix/typings/styles/transitions';
import { ZIndex, ZIndexOptions } from 'reactxx-muix/typings/styles/zIndex';
import { Overrides } from 'reactxx-muix/typings/styles/overrides';
import { ComponentsProps } from 'reactxx-muix/typings/styles/props';

export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  overrides?: Overrides;
  palette?: PaletteOptions;
  props?: ComponentsProps;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
}

export interface Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  overrides?: Overrides;
  palette: Palette;
  props?: ComponentsProps;
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
}

export default function createMuiTheme(options?: ThemeOptions): Theme;
