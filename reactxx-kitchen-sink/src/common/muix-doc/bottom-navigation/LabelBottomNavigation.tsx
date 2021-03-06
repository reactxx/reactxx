//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v3.0.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import BottomNavigation from 'reactxx-mui-web/BottomNavigation/BottomNavigation';
import BottomNavigationAction from 'reactxx-mui-web/BottomNavigationAction/BottomNavigationAction';
import Icon from 'reactxx-mui-web/Icon/Icon';
import RestoreIcon from 'reactxx-icons/Restore';
import FavoriteIcon from 'reactxx-icons/Favorite';
import LocationOnIcon from 'reactxx-icons/LocationOn';
const styles = {
  root: {
    width: 500
  }
};

class LabelBottomNavigation extends React.Component<any, any> {
  state: any = {
    value: 'recents'
  };
  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      value
    } = this.state;
    return <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Folder" value="folder" icon={<Icon>folder</Icon>} />
      </BottomNavigation>;
  }

}

LabelBottomNavigation['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), LabelBottomNavigation)();