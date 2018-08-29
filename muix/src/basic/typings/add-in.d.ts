import { TCommonStyles } from './common-styles';
import { Types } from './types';
export declare namespace TAddIn {
    interface RulesetAddInX<T extends TCommonStyles.RulesetNativeIds = unknown, R extends Types.Shape = Types.Shape> {
        $whenUsed?: Types.PartialSheetX<R>;
    }
    interface SheetX<R extends Types.Shape = Types.Shape> {
    }
    interface Shape {
    }
    interface ShapeDefault {
    }
    interface PropsX<R extends Types.Shape = Types.Shape> {
        $ignore?: boolean;
        $constant?: boolean;
        $developer_flag?: boolean;
        $developer_RenderCounter?: number;
    }
    interface GetVariant<R extends Types.Shape = Types.Shape> {
    }
    interface CodePropsWeb<R extends Types.Shape = Types.Shape> {
    }
    interface CodePropsNative<R extends Types.Shape = Types.Shape> {
    }
    interface CodeProps<R extends Types.Shape = Types.Shape> {
    }
}
