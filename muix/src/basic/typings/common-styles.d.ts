import * as CSS from 'csstype';
import ReactN from 'react-native';
export declare namespace TCommonStyles {
    type FlexAlignType = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    interface FlexStyle {
        alignContent?: "flex-start" | "flex-end" | "center" | "stretch" | "space-between" | "space-around";
        alignItems?: FlexAlignType;
        alignSelf?: "auto" | FlexAlignType;
        borderBottomWidth?: number;
        borderLeftWidth?: number;
        borderRightWidth?: number;
        borderTopWidth?: number;
        borderWidth?: number;
        bottom?: number | string;
        flex?: number;
        flexBasis?: number | string;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
        flexGrow?: number;
        flexShrink?: number;
        flexWrap?: "wrap" | "nowrap";
        height?: number | string;
        justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
        left?: number | string;
        margin?: number | string;
        marginBottom?: number | string;
        marginLeft?: number | string;
        marginRight?: number | string;
        marginTop?: number | string;
        maxHeight?: number | string;
        maxWidth?: number | string;
        minHeight?: number | string;
        minWidth?: number | string;
        overflow?: "visible" | "hidden" | "scroll";
        padding?: number | string;
        paddingBottom?: number | string;
        paddingLeft?: number | string;
        paddingRight?: number | string;
        paddingTop?: number | string;
        position?: "absolute" | "relative";
        right?: number | string;
        top?: number | string;
        width?: number | string;
        zIndex?: number;
    }
    interface ViewStyle extends FlexStyle {
        backfaceVisibility?: "visible" | "hidden";
        backgroundColor?: string;
        opacity?: number;
        overflow?: "visible" | "hidden";
        display?: "none" | "flex";
        borderBottomColor?: string;
        borderBottomLeftRadius?: number;
        borderBottomRightRadius?: number;
        borderBottomWidth?: number;
        borderTopColor?: string;
        borderTopLeftRadius?: number;
        borderTopRightRadius?: number;
        borderTopWidth?: number;
        borderColor?: string;
        borderLeftColor?: string;
        borderRadius?: number;
        borderRightColor?: string;
        borderRightWidth?: number;
        borderStyle?: "solid" | "dotted" | "dashed";
    }
    interface ScrollViewStyle extends FlexStyle {
        backfaceVisibility?: "visible" | "hidden";
        backgroundColor?: string;
        opacity?: number;
        overflow?: "visible" | "hidden";
        borderBottomColor?: string;
        borderBottomLeftRadius?: number;
        borderBottomRightRadius?: number;
        borderBottomWidth?: number;
        borderTopColor?: string;
        borderTopLeftRadius?: number;
        borderTopRightRadius?: number;
        borderTopWidth?: number;
        borderColor?: string;
        borderRadius?: number;
        borderStyle?: "solid" | "dotted" | "dashed";
        borderRightColor?: string;
        borderRightWidth?: number;
        borderLeftColor?: string;
        borderLeftWidth?: number;
    }
    interface TextStyle extends ViewStyle {
        color?: string;
        fontFamily?: string;
        fontSize?: number;
        fontStyle?: "normal" | "italic";
        fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
        letterSpacing?: number;
        lineHeight?: number;
        textAlign?: "auto" | "left" | "right" | "center";
        textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through";
        textDecorationStyle?: "solid" | "double" | "dotted" | "dashed";
        textDecorationColor?: string;
    }
    interface ImageStyle extends FlexStyle {
        backfaceVisibility?: "visible" | "hidden";
        borderBottomLeftRadius?: number;
        borderBottomRightRadius?: number;
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderTopLeftRadius?: number;
        borderTopRightRadius?: number;
        overflow?: "visible" | "hidden";
        opacity?: number;
    }
    type RulesetNativeIdsLow = 'Text' | 'View' | 'Image';
    type RulesetNativeIds = RulesetNativeIdsLow | unknown;
    type RulesetCommon<T extends RulesetNativeIds> = T extends 'Text' ? TCommonStyles.TextStyle : T extends 'Image' ? TCommonStyles.ImageStyle : T extends 'View' ? TCommonStyles.ViewStyle : TCommonStyles.ViewStyle;
    type RulesetNative<T extends RulesetNativeIds = unknown> = T extends 'Text' ? ReactN.TextStyle : T extends 'Image' ? ReactN.ImageStyle : T extends 'View' ? ReactN.ViewStyle : ReactN.ViewStyle;
    type RulesetWeb = CSS.Properties & {
        [P in CSS.SimplePseudos]?: CSS.Properties;
    };
    type Ruleset<T extends RulesetNativeIds = 'Text'> = RulesetWeb | RulesetNative<T>;
}
