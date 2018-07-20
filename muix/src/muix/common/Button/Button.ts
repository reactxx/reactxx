import React from 'react';
import { TCommon, TProvider, Types } from 'reactxx-basic';
import { ButtonClassKey, ButtonProps } from '../../typings/Button/Button';
import { Theme } from '../../web/styles/withStyles';

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonClassKey>,
  props: ButtonProps,
  theme: Theme
}>


