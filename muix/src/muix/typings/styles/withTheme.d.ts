import { Theme } from 'reactxx-muix/typings/styles/createMuiTheme';
import { ConsistentWith } from 'reactxx-muix/typings';

export interface WithTheme {
  theme: Theme;
}

declare const withTheme: () => <P extends ConsistentWith<P, WithTheme>>(
  component: React.ComponentType<P & WithTheme>,
) => React.ComponentClass<P>;

export default withTheme;
