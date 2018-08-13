import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Icon from 'reactxx-muix/current/Icon/Icon';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import DeleteIcon from 'reactxx-icons/Delete';
import AddShoppingCartIcon from 'reactxx-icons/AddShoppingCart';
import PhotoCamera from 'reactxx-icons/PhotoCamera';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

function IconButtons(props) {
  const {
    classes
  } = props;
  return <div>
      <IconButton className={classNames(classes.button)} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      <IconButton className={classNames(classes.button)} aria-label="Delete" disabled color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="secondary" className={classNames(classes.button)} aria-label="Add an alarm">
        <Icon>alarm</Icon>
      </IconButton>
      <IconButton color="primary" className={classNames(classes.button)} aria-label="Add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
      <input accept="image/*" className={classNamesStr(classes.input)} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" className={classNames(classes.button)} component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>;
}

IconButtons['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), IconButtons)();