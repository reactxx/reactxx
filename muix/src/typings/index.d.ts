export { TCommonStyles } from './common-styles';
export { TComponents } from './components';
export { TEngine } from './engine';
export * from './typed';
export { TUseSheeter } from './use-sheeter';

import { TTyped } from './index';

export namespace TExtensions {

    interface PropsCodePart<R extends TTyped.Shape = TTyped.Shape> { }

    interface Platform  { }

}
