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
import { StandardProps } from "..";
export interface TableFooterProps
  extends StandardProps<TableFooterBaseProps, TableFooterClassKey> {
  component?: React.ReactType<TableFooterBaseProps>;
}
export type TableFooterClassKey = "root";
export type TableFooterBaseProps = React.HTMLAttributes<
  HTMLTableSectionElement
>;
const styles = {
  /* Styles applied to the root element. */
  root: {
    display: "table-footer-group"
  }
};

class TableFooter extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  static options;

  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      tablelvl2: {
        variant: "footer"
      }
    };
  }

  render() {
    const {
      $system: { theme },
      classes,
      className,
      component: Component,
      ...other
    } = this.props;
    return (
      <Component
        className={classNames(classes.root, className)}
        {...other as any}
      />
    );
  }
}

TableFooter.childContextTypes = {
  tablelvl2: PropTypes.object
};

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TableFooterClassKey>,
  props: TableFooterProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = TableFooter.defaultProps = {
  component: 'tfoot'
} as CodeProps;
export const TableFooterCode: CodeComponentType = TableFooter as any
export const TableFooterStyles: SheetCreatorX = styles as any
export const TableFooterCreator: WithStyleCreator = withStyles<Shape>(TableFooterStyles, TableFooterCode, {isMui:true, defaultProps});
export const TableFooterComponent: React.ComponentClass<PropsX> = TableFooterCreator();
if ((TableFooter as any).muiName) (TableFooterComponent as any).muiName = (TableFooter as any).muiName;


export default TableFooterComponent
