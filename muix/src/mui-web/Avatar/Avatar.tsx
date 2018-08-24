//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme } from '../styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import { StandardProps } from "..";
export interface AvatarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AvatarClassKey> {
  alt?: string;
  childrenClassName?: string;
  component?: React.ReactType<AvatarProps>;
  imgProps?: React.HtmlHTMLAttributes<HTMLImageElement>;
  sizes?: string;
  src?: string;
  srcSet?: string;
}
export type AvatarClassKey = "root" | "colorDefault" | "img";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    borderRadius: "50%",
    overflow: "hidden",
    userSelect: "none"
  },

  /* Styles applied to the root element if there are children and not `src` or `srcSet` */

  /* Styles applied to the root element if `color="default"`. */
  colorDefault: {
    color: theme.palette.background.default,
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[400]
        : theme.palette.grey[600]
  },

  /* Styles applied to the img element if either `src` or `srcSet` is defined. */
  img: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    // Handle non-square image. The property isn't supported by IE11.
    objectFit: "cover"
  }
});

const Avatar: Types.CodeSFCWeb<Shape> = props => {
  const {
    alt,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    classes,
    className: classNameProp,
    component: Component,
    imgProps,
    sizes,
    src,
    srcSet,
    ...other
  } = props;
  const className = classNames(
    classes.root,
    childrenProp && !src && !srcSet && classes.colorDefault,
    classNameProp
  );
  let children = null;

  if (childrenProp) {
    if (
      childrenClassNameProp &&
      typeof childrenProp !== "string" &&
      React.isValidElement(childrenProp)
    ) {
      const childrenClassName = classNames(
        childrenClassNameProp,
        childrenProp.props.className
      );
      children = React.cloneElement(childrenProp, {
        className: childrenClassName
      });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = (
      <img
        alt={alt}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        className={classes.img}
        {...imgProps as any}
      />
    );
  }

  return (
    <Component className={className} {...other as any}>
      {children}
    </Component>
  );
};

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<AvatarClassKey>,
  props: AvatarProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = Avatar.defaultProps = {
  component: 'div'
} as CodeProps;
export const AvatarCode: CodeComponentType = Avatar as any
export const AvatarStyles: SheetCreatorX = styles as any
export const AvatarCreator: WithStyleCreator = withStyles<Shape>(AvatarStyles, AvatarCode, {isMui:true, defaultProps});
export const AvatarComponent: React.ComponentType<PropsX> = AvatarCreator();
if ((Avatar as any).muiName) (AvatarComponent as any).muiName = (Avatar as any).muiName;


export default Avatar
