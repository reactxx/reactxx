import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';

export interface InputAdornmentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, InputAdornmentClassKey> {
  component?: React.ReactType<InputAdornmentProps>;
  disableTypography?: boolean;
  position: 'start' | 'end';
}

export type InputAdornmentClassKey = 'root' | 'positionStart' | 'positionEnd';

declare const InputAdornment: React.ComponentType<InputAdornmentProps>;

export default InputAdornment;
