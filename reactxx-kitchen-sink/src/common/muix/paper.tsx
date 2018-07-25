import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import Paper from 'reactxx-mui-web/Paper/Paper';
import Typography from 'reactxx-mui-web/Typography/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
  const { classes, className, $system: {classNames} } = props;

  return (
    <div style={{padding:10}}>
      <Paper className={classNames(classes.root, className)} elevation={1}>
        <Typography variant="headline" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
    </div>
  );
}

//const App: React.SFC = props => <Button variant='raised' disabled size='large' color='secondary' >CLICK ME</Button>
export default withStylesCreator(styles as any, PaperSheet)()
//export default App

