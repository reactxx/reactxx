import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Badge from 'reactxx-muix/current/Badge/Badge';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import MailIcon from 'reactxx-icons/Mail';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Tabs from 'reactxx-muix/current/Tabs/Tabs';
import Tab from 'reactxx-muix/current/Tab/Tab';
import Typography from 'reactxx-muix/current/Typography/Typography';
import Button from 'reactxx-muix/current/Button/Button';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

function SimpleBadge(props) {
  const {
    classes
  } = props;
  return <div>
      <div>
        <Badge className={classNames(classes.margin)} badgeContent={4} color="primary">
          <MailIcon />
        </Badge>
        <Badge className={classNames(classes.margin)} badgeContent={10} color="secondary">
          <MailIcon />
        </Badge>
        <IconButton aria-label="4 pending messages" className={classNames(classes.margin)}>
          <Badge badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
        </IconButton>
      </div>
      <AppBar position="static" className={classNames(classes.margin)}>
        <Tabs value={0}>
          <Tab label={<Badge className={classNames(classes.padding)} color="secondary" badgeContent={4}>
                Item One
              </Badge>} />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <Badge color="primary" badgeContent={4} className={classNames(classes.margin)}>
        <Typography className={classNames(classes.padding)}>Typography</Typography>
      </Badge>
      <Badge color="primary" badgeContent={4} className={classNames(classes.margin)}>
        <Button variant="contained">Button</Button>
      </Badge>
    </div>;
}

SimpleBadge['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), SimpleBadge)();