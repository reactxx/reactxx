import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Avatar from 'reactxx-muix/current/Avatar/Avatar';
import Chip from 'reactxx-muix/current/Chip/Chip';
import FaceIcon from 'reactxx-icons/Face';
import DoneIcon from 'reactxx-icons/Done';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit
  }
});

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function Chips(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <Chip label="Basic Chip" className={classNames(classes.chip)} />
      <Chip avatar={<Avatar>MB</Avatar>} label="Clickable Chip" onClick={handleClick} className={classNames(classes.chip)} />
      <Chip avatar={<Avatar src="src/ks/common/muix/static/images/uxceo-128.jpg" />} label="Deletable Chip" onDelete={handleDelete} className={classNames(classes.chip)} />
      <Chip avatar={<Avatar>
            <FaceIcon />
          </Avatar>} label="Clickable Deletable Chip" onClick={handleClick} onDelete={handleDelete} className={classNames(classes.chip)} />
      <Chip label="Custom delete icon Chip" onClick={handleClick} onDelete={handleDelete} className={classNames(classes.chip)} deleteIcon={<DoneIcon />} />
      <Chip label="Clickable Link Chip" className={classNames(classes.chip)} component="a" href="#chip" clickable />
      <Chip avatar={<Avatar>MB</Avatar>} label="Clickable Link Chip" clickable className={classNames(classes.chip)} color="primary" onDelete={handleDelete} deleteIcon={<DoneIcon />} />
      <Chip label="Clickable Link Chip" onDelete={handleDelete} className={classNames(classes.chip)} color="primary" />
      <Chip avatar={<Avatar>
            <FaceIcon />
          </Avatar>} label="Clickable Link Chip" onDelete={handleDelete} className={classNames(classes.chip)} color="secondary" />
    </div>;
}

Chips['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), Chips)();