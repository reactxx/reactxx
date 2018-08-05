import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'

import Grid from 'reactxx-muix/current/Grid/Grid';
import FormLabel from 'reactxx-muix/current/FormLabel/FormLabel';
import FormControlLabel from 'reactxx-muix/current/FormControlLabel/FormControlLabel';
import RadioGroup from 'reactxx-muix/current/RadioGroup/RadioGroup';
import Radio from 'reactxx-muix/current/Radio/Radio';
import Paper from 'reactxx-muix/current/Paper/Paper';
import Typography from 'reactxx-muix/current/Typography/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class GuttersGrid extends React.Component<any,any> {
  state = {
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={spacing as any}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                <FormLabel>spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="Spacing"
                  value={spacing}
                  onChange={this.handleChange('spacing')}
                  row
                >
                  <FormControlLabel value="0" control={<Radio />} label="0" />
                  <FormControlLabel value="8" control={<Radio />} label="8" />
                  <FormControlLabel value="16" control={<Radio />} label="16" />
                  <FormControlLabel value="24" control={<Radio />} label="24" />
                  <FormControlLabel value="32" control={<Radio />} label="32" />
                  <FormControlLabel value="40" control={<Radio />} label="40" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
//const App: React.SFC = props => <Button variant='raised' disabled size='large' color='secondary' >CLICK ME</Button>
export default withStylesCreator(styles as any, GuttersGrid)()
//export default App

