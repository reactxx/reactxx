import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import AppBar from 'reactxx-mui-web/AppBar/AppBar';
import Toolbar from 'reactxx-mui-web/Toolbar/Toolbar';
import Button from 'reactxx-mui-web/Button/Button';
import IconButton from 'reactxx-mui-web/IconButton/IconButton';
import { Icon } from 'reactxx-primitives'
import { Navigation } from 'reactxx-mdi/Navigation'
import Typography from 'reactxx-mui-web/Typography/Typography';

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

function ButtonAppBar(props) {
  const { classes, className, $system: { classNamesStr, classNames } } = props;
  return (
    <div className={classNamesStr(classes.root, className)}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <Icon data={Navigation}/>
          </IconButton>
          <Typography variant="title" color="inherit" className={classNames(classes.flex)}>
            INFO
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
//const App: React.SFC = props => <Button variant='raised' disabled size='large' color='secondary' >CLICK ME</Button>
export default withStylesCreator(styles as any, ButtonAppBar)()
//export default App

