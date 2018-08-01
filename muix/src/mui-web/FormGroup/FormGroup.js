import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },

  /* Styles applied to the root element if `row={true}`. */
  row: {
    flexDirection: 'row'
  }
};
/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */

function FormGroup(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    classes,
    className,
    children,
    row,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, row && classes.row, className)} {...other}>
      {children}
    </div>;
}

const defaultProps = FormGroup.defaultProps = {
  row: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/FormGroup/FormGroup').Shape>}
*/
export const FormGroupCreator = withStyles(styles, FormGroup, {
  isMui: true,
  defaultProps
});
const FormGroupComponent = FormGroupCreator();
if (FormGroup.muiName) FormGroupComponent.muiName = FormGroup.muiName;
export default FormGroupComponent;