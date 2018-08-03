import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import BottomNavigation from 'reactxx-mui-web/BottomNavigation/BottomNavigation';
import BottomNavigationAction from 'reactxx-mui-web/BottomNavigationAction/BottomNavigationAction';

import { Icon } from 'reactxx-primitives'
import { History } from 'reactxx-mdi/History'
import { Heart } from 'reactxx-mdi/Heart'
import { Folder } from 'reactxx-mdi/Folder'
import { MapMarker } from 'reactxx-mdi/MapMarker'


const styles = {
  root: {
    width: 500,
  },
};

class simpleBottomNavigation extends React.Component<any,any> {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Recents" icon={<Icon data={History} />} />
        <BottomNavigationAction label="Favorites" icon={<Icon data={Heart} />} />
        <BottomNavigationAction label="Nearby" icon={<Icon data={MapMarker} />} />
      </BottomNavigation>
    );
  }
}
const SimpleBottomNavigation = withStylesCreator(styles as any, simpleBottomNavigation)()

class labelBottomNavigation extends React.Component<any,any> {
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction label="Recents" value="recents" icon={<Icon data={History} />} />
        <BottomNavigationAction label="Favorites" value="favorites" icon={<Icon data={Heart} />} />
        <BottomNavigationAction label="Nearby" value="nearby" icon={<Icon data={MapMarker} />} />
        <BottomNavigationAction label="Folder" value="folder" icon={<Icon data={Folder} />} />
      </BottomNavigation>
    );
  }
}
const LabelBottomNavigation = withStylesCreator(styles as any, labelBottomNavigation)()

class App extends React.Component<any> {
  render() {
    const { classes, $system: { classNamesStr } } = this.props;
    return <div className={classNamesStr(classes.root)}>
      <h2>Bottom Navigation</h2>
      <SimpleBottomNavigation />
      <h2>Bottom Navigation with no label</h2>
      <LabelBottomNavigation />
    </div>
  }
}

export default withStylesCreator(styles as any, App)()