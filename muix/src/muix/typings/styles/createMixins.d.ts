import * as React from 'react';

import { Breakpoints } from 'reactxx-muix/typings/styles/createBreakpoints';
import { Spacing } from 'reactxx-muix/typings/styles/spacing';
import { StyleRules } from 'reactxx-muix/typings/styles';
import { CSSProperties } from 'reactxx-muix/typings/styles/withStyles';

export interface Mixins {
  gutters: (styles?: CSSProperties) => CSSProperties;
  toolbar: CSSProperties;
  // ... use interface declaration merging to add custom mixins
}

export interface MixinsOptions extends Partial<Mixins> {
  // ... use interface declaration merging to add custom mixin options
}

export default function createMixins(
  breakpoints: Breakpoints,
  spacing: Spacing,
  mixins: MixinsOptions,
): Mixins;
