import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import AppBar from 'reactxx-muix/web/AppBar/AppBar';
import Toolbar from 'reactxx-muix/web/Toolbar/Toolbar';
import Button from 'reactxx-muix/web/Button/Button';
import IconButton from 'reactxx-muix/web/IconButton/IconButton';
import { Icon } from 'reactxx-primitives'
import { Menu } from 'reactxx-mdi/Menu'
import Typography from 'reactxx-muix/web/Typography/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div style={{ margin: 20 }}>
      <h2>Simple App Bar</h2>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Photos
          </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <h2>App Bar with buttons</h2>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <Icon data={Menu} />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              News
          </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <h2>Dense (desktop only)</h2>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <Icon data={Menu} />
            </IconButton>
            <Typography variant="title" color="inherit">
              Photos
          </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

//const App: React.SFC = props => <Button variant='raised' disabled size='large' color='secondary' >CLICK ME</Button>
export default withStylesCreator(styles as any, SimpleAppBar)()
//export default App

