import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { FormLabelProps, FormLabelClassKey } from 'reactxx-muix/typings/FormLabel';
import { ClassNameMap } from 'reactxx-muix/typings/styles/withStyles';

export interface InputLabelProps extends StandardProps<FormLabelProps, InputLabelClassKey> {
  disableAnimation?: boolean;
  disabled?: boolean;
  error?: boolean;
  FormLabelClasses?: Partial<ClassNameMap<FormLabelClassKey>>;
  focused?: boolean;
  required?: boolean;
  shrink?: boolean;
}

export type InputLabelClassKey = 'root' | 'formControl' | 'marginDense' | 'shrink' | 'animated';

declare const InputLabel: React.ComponentType<InputLabelProps>;

export default InputLabel;
