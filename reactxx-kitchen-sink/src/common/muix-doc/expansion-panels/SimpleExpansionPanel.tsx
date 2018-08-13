import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import ExpansionPanel from 'reactxx-muix/current/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from 'reactxx-muix/current/ExpansionPanelSummary/ExpansionPanelSummary';
import ExpansionPanelDetails from 'reactxx-muix/current/ExpansionPanelDetails/ExpansionPanelDetails';
import Typography from 'reactxx-muix/current/Typography/Typography';
import ExpandMoreIcon from 'reactxx-icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function SimpleExpansionPanel(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames(classes.heading)}>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames(classes.heading)}>Expansion Panel 2</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel disabled>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames(classes.heading)}>Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </div>;
}

SimpleExpansionPanel['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), SimpleExpansionPanel)();