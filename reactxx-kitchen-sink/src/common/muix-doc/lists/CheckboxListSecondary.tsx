import React from 'react';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import List from 'reactxx-muix/current/List';
import ListItem from 'reactxx-muix/current/ListItem';
import ListItemSecondaryAction from 'reactxx-muix/current/ListItemSecondaryAction';
import ListItemText from 'reactxx-muix/current/ListItemText';
import Checkbox from 'reactxx-muix/current/Checkbox';
import Avatar from 'reactxx-muix/current/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {[0, 1, 2, 3].map(value => (
            <ListItem key={value} dense button className={classes.listItem}>
              <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(value)}
                  checked={this.state.checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStylesCreator(styles, {})(CheckboxListSecondary);
