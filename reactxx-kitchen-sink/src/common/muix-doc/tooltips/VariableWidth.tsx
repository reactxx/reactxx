import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Button from 'reactxx-muix/current/Button/Button';
import Tooltip from 'reactxx-muix/current/Tooltip/Tooltip';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  customWidth: {
    maxWidth: 500
  },
  noMaxWidth: {
    maxWidth: 'none'
  }
});

const longText = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. 
Praesent non nunc mollis, fermentum neque at, semper arcu. 
Nullam eget est sed sem iaculis gravida eget vitae justo. 
`;

function VariableWidth({
  classes
}) {
  return <div>
      <Tooltip title={longText}>
        <Button className={classNames(classes.button)}>Default Width [300px]</Button>
      </Tooltip>
      <Tooltip title={longText} classes={{
      tooltip: classes.customWidth
    }}>
        <Button className={classNames(classes.button)}>Custom Width [500px]</Button>
      </Tooltip>
      <Tooltip title={longText} classes={{
      tooltip: classes.noMaxWidth
    }}>
        <Button className={classNames(classes.button)}>No wrapping</Button>
      </Tooltip>
    </div>;
}

VariableWidth['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), VariableWidth)();