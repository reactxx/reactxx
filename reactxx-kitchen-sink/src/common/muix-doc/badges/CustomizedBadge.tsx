//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import Badge from 'reactxx-muix/current/Badge/Badge';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import ShoppingCartIcon from 'reactxx-icons/ShoppingCart';

const styles = theme => ({
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});

function CustomizedBadge(props) {
  const { classes } = props;

  return (
    <IconButton aria-label="Cart">
      <Badge badgeContent={4} color="primary" classes={{ badge: classes.badge }}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

CustomizedBadge['propTypes'] = {
  classes: PropTypes.object.isRequired,
};

export default withStylesCreator(styles as any, CustomizedBadge)();