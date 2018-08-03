// @inheritedComponent TableCell
import React from 'react';
import { toAtomic } from '../styles/withStyles';

import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Input from "../Input/Input";
import MenuItem from '../MenuItem';
import Select from "../Select/Select";
import TableCell from '../TableCell';
import Toolbar from '../Toolbar';
import Typography from "../Typography/Typography";
import TablePaginationActions from '../TablePaginationActions';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    fontSize: theme.typography.pxToRem(12),
    // Increase the specificity to override TableCell.
    '&:last-child': { ...toAtomic('padding', 0)
    }
  },

  /* Styles applied to the Toolbar component. */
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2
  },

  /* Styles applied to the spacer element. */
  spacer: {
    flex: '1 1 100%'
  },

  /* Styles applied to the caption Typography components if `variant="caption"`. */
  caption: {
    flexShrink: 0
  },

  /* Styles applied to the Select component `root` class. */
  selectRoot: {
    marginRight: 32,
    marginLeft: 8,
    color: theme.palette.text.secondary
  },

  /* Styles applied to the Select component `select` class. */
  select: {
    paddingLeft: 8,
    paddingRight: 16
  },

  /* Styles applied to the Select component `icon` class. */
  selectIcon: {
    top: 1
  },

  /* Styles applied to the Input component. */
  input: {
    fontSize: 'inherit',
    flexShrink: 0
  },

  /* Styles applied to the MenuItem component. */
  menuItem: {},

  /* Styles applied to the internal `TablePaginationActions` component. */
  actions: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: 20
  }
});
/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */

class TablePagination extends React.Component {
  // This logic would be better handled on userside.
  // However, we have it just in case.
  componentDidUpdate() {
    const {
      count,
      onChangePage,
      page,
      rowsPerPage
    } = this.props;
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    if (page > newLastPage) {
      onChangePage(null, newLastPage);
    }
  }

  render() {
    const {
      $system: {
        classNames,
        classNamesStr,
        classNamesAny,
        theme
      },
      ActionsComponent,
      backIconButtonProps,
      classes,
      colSpan: colSpanProp,
      component: Component,
      count,
      labelDisplayedRows,
      labelRowsPerPage,
      nextIconButtonProps,
      onChangePage,
      onChangeRowsPerPage,
      page,
      rowsPerPage,
      rowsPerPageOptions,
      SelectProps,
      ...other
    } = this.props;
    let colSpan;

    if (Component === TableCell || Component === 'td') {
      colSpan = colSpanProp || 1000; // col-span over everything
    }

    return <Component className={classNamesAny(Component, classes.root)} colSpan={colSpan} {...other}>
        <Toolbar className={classes.toolbar}>
          <div className={classNamesStr(classes.spacer)} />
          {rowsPerPageOptions.length > 1 && <Typography variant="caption" className={classes.caption}>
              {labelRowsPerPage}
            </Typography>}
          {rowsPerPageOptions.length > 1 && <Select classes={{
          root: classes.selectRoot,
          select: classes.select,
          icon: classes.selectIcon
        }} input={<Input className={classes.input} disableUnderline />} value={rowsPerPage} onChange={onChangeRowsPerPage} {...SelectProps}>
              {rowsPerPageOptions.map(rowsPerPageOption => <MenuItem className={classes.menuItem} key={rowsPerPageOption} value={rowsPerPageOption}>
                  {rowsPerPageOption}
                </MenuItem>)}
            </Select>}
          <Typography variant="caption" className={classes.caption}>
            {labelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to: Math.min(count, (page + 1) * rowsPerPage),
            count,
            page
          })}
          </Typography>
          <ActionsComponent className={classes.actions} backIconButtonProps={backIconButtonProps} count={count} nextIconButtonProps={nextIconButtonProps} onChangePage={onChangePage} page={page} rowsPerPage={rowsPerPage} />
        </Toolbar>
      </Component>;
  }

}

const defaultProps = TablePagination.defaultProps = {
  ActionsComponent: TablePaginationActions,
  component: TableCell,
  labelDisplayedRows: ({
    from,
    to,
    count
  }) => `${from}-${to} of ${count}`,
  labelRowsPerPage: 'Rows per page:',
  rowsPerPageOptions: [5, 10, 25]
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/TablePagination/TablePagination').Shape>}
*/
export const TablePaginationCreator = withStyles(styles, TablePagination, {
  isMui: true,
  defaultProps
});
const TablePaginationComponent = TablePaginationCreator();
if (TablePagination.muiName) TablePaginationComponent.muiName = TablePagination.muiName;
export default TablePaginationComponent;