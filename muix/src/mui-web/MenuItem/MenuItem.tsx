//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme } from '../styles/withStyles';
// @inheritedComponent ListItem
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import ListItem from "../ListItem/ListItem";
import { StandardProps } from "..";
import { ListItemProps } from "../ListItem/ListItem";
export interface MenuItemProps
  extends StandardProps<ListItemProps, MenuItemClassKey> {
  component?: React.ReactType<MenuItemProps>;
  role?: string;
  selected?: boolean;
}
export type MenuItemClassKey = "root" | "selected";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.subheading,
    height: 24,
    boxSizing: "content-box",
    width: "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    paddingLeft: 16,
    paddingRight: 16,
    "&$selected": {
      backgroundColor: theme.palette.action.selected
    }
  },

  /* Styles applied to the root element if `selected={true}`. */
  selected: {}
});

const MenuItem: Types.CodeSFCWeb<Shape> = props => {
  const { classes, className, component, selected, role, ...other } = props;
  return (
    <ListItem
      button
      role={role}
      tabIndex={-1}
      className={classNames(
        classes.root,
        selected && classes.selected,
        className
      )}
      component={component}
      {...other as any}
    />
  );
};

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<MenuItemClassKey>,
  props: MenuItemProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = MenuItem.defaultProps = {
  component: 'li',
  role: 'menuitem',
  selected: false
} as CodeProps;
export const MenuItemCode: CodeComponentType = MenuItem as any
export const MenuItemStyles: SheetCreatorX = styles as any
export const MenuItemCreator: WithStyleCreator = withStyles<Shape>(MenuItemStyles, MenuItemCode, {isMui:true, defaultProps});
export const MenuItemComponent: React.ComponentType<PropsX> = MenuItemCreator();
if ((MenuItem as any).muiName) (MenuItemComponent as any).muiName = (MenuItem as any).muiName;


export default MenuItem
