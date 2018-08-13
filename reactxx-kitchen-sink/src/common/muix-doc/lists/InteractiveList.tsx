import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import List from 'reactxx-muix/current/List/List';
import ListItem from 'reactxx-muix/current/ListItem/ListItem';
import ListItemAvatar from 'reactxx-muix/current/ListItemAvatar/ListItemAvatar';
import ListItemIcon from 'reactxx-muix/current/ListItemIcon/ListItemIcon';
import ListItemSecondaryAction from 'reactxx-muix/current/ListItemSecondaryAction/ListItemSecondaryAction';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import Avatar from 'reactxx-muix/current/Avatar/Avatar';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import FormGroup from 'reactxx-muix/current/FormGroup/FormGroup';
import FormControlLabel from 'reactxx-muix/current/FormControlLabel/FormControlLabel';
import Checkbox from 'reactxx-muix/current/Checkbox/Checkbox';
import Grid from 'reactxx-muix/current/Grid/Grid';
import Typography from 'reactxx-muix/current/Typography/Typography';
import FolderIcon from 'reactxx-icons/Folder';
import DeleteIcon from 'reactxx-icons/Delete';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

function generate(element) {
  return [0, 1, 2].map(value => React.cloneElement(element, {
    key: value
  }));
}

class InteractiveList extends React.Component<any, any> {
  state: any = {
    dense: false,
    secondary: false
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      dense,
      secondary
    } = this.state;
    return <div className={classNamesStr(classes.root)}>
        <FormGroup row>
          <FormControlLabel control={<Checkbox checked={dense} onChange={(event, checked) => this.setState({
          dense: checked
        })} value="dense" />} label="Enable dense" />
          <FormControlLabel control={<Checkbox checked={secondary} onChange={(event, checked) => this.setState({
          secondary: checked
        })} value="secondary" />} label="Enable secondary text" />
        </FormGroup>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classNames(classes.title)}>
              Text only
            </Typography>
            <div className={classNamesStr(classes.demo)}>
              <List dense={dense}>
                {generate(<ListItem>
                    <ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
                  </ListItem>)}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classNames(classes.title)}>
              Icon with text
            </Typography>
            <div className={classNamesStr(classes.demo)}>
              <List dense={dense}>
                {generate(<ListItem>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
                  </ListItem>)}
              </List>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classNames(classes.title)}>
              Avatar with text
            </Typography>
            <div className={classNamesStr(classes.demo)}>
              <List dense={dense}>
                {generate(<ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
                  </ListItem>)}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classNames(classes.title)}>
              Avatar with text and icon
            </Typography>
            <div className={classNamesStr(classes.demo)}>
              <List dense={dense}>
                {generate(<ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>)}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>;
  }

}

InteractiveList['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), InteractiveList)();