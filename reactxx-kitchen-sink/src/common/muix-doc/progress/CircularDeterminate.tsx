import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import CircularProgress from 'reactxx-muix/current/CircularProgress/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class CircularDeterminate extends React.Component<any, any> {
  timer = null;
  state: any = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const {
      completed
    } = this.state;
    this.setState({
      completed: completed >= 100 ? 0 : completed + 1
    });
  };

  render() {
    const {
      classes
    } = this.props;
    return <div>
        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
        <CircularProgress className={classes.progress} variant="determinate" size={50} value={this.state.completed} />
        <CircularProgress className={classes.progress} color="secondary" variant="determinate" value={this.state.completed} />
        <CircularProgress className={classes.progress} color="secondary" variant="determinate" size={50} value={this.state.completed} />
      </div>;
  }

}

CircularDeterminate['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), CircularDeterminate)();