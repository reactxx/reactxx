//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import warning from "warning";
import { StandardProps } from "..";
export interface ListItemAvatarProps
  extends StandardProps<{}, ListItemAvatarClassKey> {}
export type ListItemAvatarClassKey = "root" | "icon";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    width: 36,
    height: 36,
    fontSize: theme.typography.pxToRem(18),
    marginRight: 4
  },

  /* Styles applied to the children – typically the `Avatar` component. */
  icon: {
    width: 20,
    height: 20,
    fontSize: theme.typography.pxToRem(20)
  }
});
/**
 * This is a simple wrapper to apply the `dense` mode styles to `Avatar`.
 */

const ListItemAvatar: Types.CodeSFCWeb<Shape> = (props, context) => {
  const { children, classes, className: classNameProp, ...other } = props;

  if (context.dense === undefined) {
    warning(
      false,
      `Material-UI: <ListItemAvatar> is a simple wrapper to apply the dense styles
      to <Avatar>. You do not need it unless you are controlling the <List> dense property.`
    );
    return props.children as any;
  }

  return React.cloneElement(children as any, {
    className: classNames(
      context.dense && classes.root,
      classNameProp,
      (children as any).props.className
    ),
    childrenClassName: classNames(
      context.dense && classes.icon,
      (children as any).props.childrenClassName
    ),
    ...other
  });
};

ListItemAvatar.contextTypes = {
  dense: PropTypes.bool
};
ListItemAvatar["muiName"] = "ListItemAvatar";

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ListItemAvatarClassKey>,
  props: ListItemAvatarProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = ListItemAvatar.defaultProps = {} as CodeProps;
export const ListItemAvatarCode: CodeComponentType = ListItemAvatar as any
export const ListItemAvatarStyles: SheetCreatorX = styles as any
export const ListItemAvatarCreator: WithStyleCreator = withStyles<Shape>(ListItemAvatarStyles, ListItemAvatarCode, {isMui:true, defaultProps});
export const ListItemAvatarComponent: React.ComponentType<PropsX> = ListItemAvatarCreator();
if ((ListItemAvatar as any).muiName) (ListItemAvatarComponent as any).muiName = (ListItemAvatar as any).muiName;


export default ListItemAvatarComponent
