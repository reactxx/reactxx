import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { PaperProps } from 'reactxx-muix/typings/Paper';

export interface CardProps extends StandardProps<PaperProps, CardClassKey> {
  raised?: boolean;
}

export type CardClassKey = 'root';

declare const Card: React.ComponentType<CardProps>;

export default Card;
