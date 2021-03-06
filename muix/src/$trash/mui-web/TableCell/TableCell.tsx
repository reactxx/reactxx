//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v3.0.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import { capitalize } from "../utils/helpers";
import { darken, fade, lighten } from "../styles/colorManipulator";
import { StandardProps } from "..";
/**
 * `<TableCell>` will be rendered as an `<th>`or `<td>` depending
 * on the context it is used in. Where context literally is the
 * React `context`.
 *
 * Since it is not decided via prop, we have create loose typings
 * here.
 */

export interface TableCellProps
  extends StandardProps<TableCellBaseProps, TableCellClassKey> {
  component?: React.ReactType<TableCellBaseProps>;
  numeric?: boolean;
  padding?: Padding;
  sortDirection?: SortDirection;
  variant?: "head" | "body" | "footer";
}
export type TableCellBaseProps = React.ThHTMLAttributes<
  HTMLTableHeaderCellElement
> &
  React.TdHTMLAttributes<HTMLTableDataCellElement>;
export type Padding = "default" | "checkbox" | "dense" | "none";
export type SortDirection = "asc" | "desc" | false;
export type TableCellClassKey =
  | "root"
  | "head"
  | "body"
  | "footer"
  | "numeric"
  | "paddingDense"
  | "paddingCheckbox"
  | "paddingNone";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    $web: {
      display: "table-cell",
      verticalAlign: "inherit",
      // Workaround for a rendering bug with spanned columns in Chrome 62.0.
      // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
      borderBottom: `1px solid
    ${
      theme.palette.type === "light"
        ? lighten(fade(theme.palette.divider, 1), 0.88)
        : darken(fade(theme.palette.divider, 1), 0.8)
    }`,
      textAlign: "left",
      padding: "4px 56px 4px 24px",
      "&:last-child": {
        paddingRight: 24
      }
    }
  },

  /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
  head: {
    $web: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightMedium
    }
  },

  /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
  body: {
    $web: {
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(13),
      fontWeight: theme.typography.fontWeightRegular
    }
  },

  /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
  footer: {
    $web: {
      borderBottom: 0,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(12)
    }
  },

  /* Styles applied to the root element if `numeric={true}`. */
  numeric: {
    $web: {
      textAlign: "right",
      flexDirection: "row-reverse" // can be dynamically inherited at runtime by contents
    }
  },

  /* Styles applied to the root element if `padding="dense"`. */
  paddingDense: {
    $web: {
      paddingRight: 24
    }
  },

  /* Styles applied to the root element if `padding="checkbox"`. */
  paddingCheckbox: {
    $web: {
      padding: "0 12px",
      "&:last-child": {
        paddingRight: 12
      }
    }
  },

  /* Styles applied to the root element if `padding="none"`. */
  paddingNone: {
    $web: {
      padding: 0,
      "&:last-child": {
        padding: 0
      }
    }
  }
});

const TableCell: Types.CodeSFCWeb<Shape> = (props, context) => {
  const {
    children,
    classes,
    className: classNameProp,
    component,
    sortDirection,
    numeric,
    padding: paddingProp,
    scope: scopeProp,
    variant,
    ...other
  } = props;
  const { table, tablelvl2 } = context;
  let Component;

  if (component) {
    Component = component;
  } else {
    Component = tablelvl2 && tablelvl2.variant === "head" ? "th" : "td";
  }

  let scope = scopeProp;

  if (!scope && tablelvl2 && tablelvl2.variant === "head") {
    scope = "col";
  }

  const padding =
    paddingProp || (table && table.padding ? table.padding : "default");
  const className = classNames(
    classes.root,
    (variant
      ? variant === "head"
      : tablelvl2 && tablelvl2.variant === "head") && classes.head,
    (variant
      ? variant === "body"
      : tablelvl2 && tablelvl2.variant === "body") && classes.body,
    (variant
      ? variant === "footer"
      : tablelvl2 && tablelvl2.variant === "footer") && classes.footer,
    numeric && classes.numeric,
    padding !== "default" && classes[`padding${capitalize(padding)}`],
    classNameProp
  );
  let ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === "asc" ? "ascending" : "descending";
  }

  return (
    <Component
      className={className}
      aria-sort={ariaSort}
      scope={scope}
      {...other as any}
    >
      {children}
    </Component>
  );
};

TableCell.contextTypes = {
  table: PropTypes.object,
  tablelvl2: PropTypes.object
};

export interface Shape extends Types.ShapeDefault {
  common: TCommon.ShapeTexts<TableCellClassKey>,
  props: TableCellProps
  style: 'Text'
  theme: Theme
}
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = TableCell.defaultProps = {
  numeric: false
} as CodeProps;
export const TableCellCode: CodeComponentType = TableCell as any
export const TableCellStyles: SheetCreatorX = styles as any
export const TableCellCreator: WithStyleCreator = withStyles<Shape>(TableCellStyles, TableCellCode, {isMui:true, defaultProps});
export const TableCellComponent: React.ComponentType<PropsX> = TableCellCreator();
if ((TableCell as any).muiName) (TableCellComponent as any).muiName = (TableCell as any).muiName;


export default TableCellComponent
