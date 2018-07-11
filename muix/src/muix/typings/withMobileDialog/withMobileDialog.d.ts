import { Breakpoint } from 'reactxx-muix/typings/styles/createBreakpoints';
import { WithWidthProps } from 'reactxx-muix/typings/withWidth';

export interface WithMobileDialogOptions {
  breakpoint: Breakpoint;
}

export interface InjectedProps {
  fullScreen?: boolean;
}

export default function withMobileDialog<P = {}>(
  options?: WithMobileDialogOptions,
): (
  component: React.ComponentType<P & InjectedProps & Partial<WithWidthProps>>,
) => React.ComponentType<P & Partial<WithWidthProps>>;
