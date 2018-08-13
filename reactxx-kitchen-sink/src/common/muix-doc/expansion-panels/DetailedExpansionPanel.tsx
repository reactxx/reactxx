import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import ExpansionPanel from 'reactxx-muix/current/ExpansionPanel/ExpansionPanel';
import ExpansionPanelDetails from 'reactxx-muix/current/ExpansionPanelDetails/ExpansionPanelDetails';
import ExpansionPanelSummary from 'reactxx-muix/current/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelActions from 'reactxx-muix/current/ExpansionPanelActions/ExpansionPanelActions';
import Typography from 'reactxx-muix/current/Typography/Typography';
import ExpandMoreIcon from 'reactxx-icons/ExpandMore';
import Chip from 'reactxx-muix/current/Chip/Chip';
import Button from 'reactxx-muix/current/Button/Button';
import Divider from 'reactxx-muix/current/Divider/Divider';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '33.33%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

function DetailedExpansionPanel(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classNamesStr(classes.column)}>
            <Typography className={classNames(classes.heading)}>Location</Typography>
          </div>
          <div className={classNamesStr(classes.column)}>
            <Typography className={classNames(classes.secondaryHeading)}>Select trip destination</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classNames(classes.details)}>
          <div className={classNamesStr(classes.column)} />
          <div className={classNamesStr(classes.column)}>
            <Chip label="Barbados" className={classNames(classes.chip)} onDelete={() => {}} />
          </div>
          <div className={classNamesStr(classes.column, classes.helper)}>
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#sub-labels-and-columns" className={classNamesStr(classes.link)}>
                Learn more
              </a>
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>;
}

DetailedExpansionPanel['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), DetailedExpansionPanel)();