import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { FormGroupProps, FormGroupClassKey } from 'reactxx-muix/typings/FormGroup';

export interface RadioGroupProps
  extends StandardProps<FormGroupProps, RadioGroupClassKey, 'onChange'> {
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  value?: string;
}

export type RadioGroupClassKey = FormGroupClassKey;

declare const RadioGroup: React.ComponentType<RadioGroupProps>;

export default RadioGroup;
