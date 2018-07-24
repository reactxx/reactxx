import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import AppBar from 'reactxx-mui-web/AppBar/AppBar';
import Toolbar from 'reactxx-mui-web/Toolbar/Toolbar';
import Button from 'reactxx-mui-web/Button/Button';
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
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
  </IconButton>*/}
          <Typography variant="title" color="inherit" className={classes.flex}>
            INFO
          </Typography>
          <Typography variant="title" color="inherit" className={classes.flex}>
            News
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

