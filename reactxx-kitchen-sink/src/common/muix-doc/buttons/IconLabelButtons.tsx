import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import Button from 'reactxx-muix/current/Button/Button';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import DeleteIcon from 'reactxx-icons/Delete';
import CloudUploadIcon from 'reactxx-icons/CloudUpload';
import KeyboardVoiceICon from 'reactxx-icons/KeyboardVoice';
import Icon from 'reactxx-muix/current/Icon/Icon';
import SaveIcon from 'reactxx-icons/Save';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

function IconLabelButtons(props) {
  const {
    classes
  } = props;
  return <div>
      <Button variant="contained" color="secondary" className={classNames(classes.button)}>
        Delete
        <DeleteIcon className={classNames(classes.rightIcon)} />
      </Button>
      <Button variant="contained" color="primary" className={classNames(classes.button)}>
        Send
        <Icon className={classNames(classes.rightIcon)}>send</Icon>
      </Button>
      <Button variant="contained" color="default" className={classNames(classes.button)}>
        Upload
        <CloudUploadIcon className={classNames(classes.rightIcon)} />
      </Button>
      <Button variant="contained" disabled color="secondary" className={classNames(classes.button)}>
        <KeyboardVoiceICon className={classNames(classes.leftIcon)} />
        Talk
      </Button>
      <Button variant="contained" size="small" className={classNames(classes.button)}>
        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
    </div>;
}

IconLabelButtons['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), IconLabelButtons)();