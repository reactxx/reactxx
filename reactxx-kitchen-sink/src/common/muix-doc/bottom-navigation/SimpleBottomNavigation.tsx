import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import BottomNavigation from 'reactxx-muix/current/BottomNavigation/BottomNavigation';
import BottomNavigationAction from 'reactxx-muix/current/BottomNavigationAction/BottomNavigationAction';
import RestoreIcon from 'reactxx-icons/Restore';
import FavoriteIcon from 'reactxx-icons/Favorite';
import LocationOnIcon from 'reactxx-icons/LocationOn';
const styles = {
  root: {
    width: 500
  }
};

class SimpleBottomNavigation extends React.Component<any, any> {
  state: any = {
    value: 0
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
    return <BottomNavigation value={value} onChange={this.handleChange} showLabels className={classNames(classes.root)}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>;
  }

}

SimpleBottomNavigation['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), SimpleBottomNavigation)();