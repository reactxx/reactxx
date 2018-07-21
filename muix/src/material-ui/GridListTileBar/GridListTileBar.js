import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 48,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily
  },
  titlePositionBottom: {
    bottom: 0
  },
  titlePositionTop: {
    top: 0
  },
  rootSubtitle: {
    height: 68
  },
  titleWrap: {
    flexGrow: 1,
    marginLeft: theme.mixins.gutters().paddingLeft,
    marginRight: theme.mixins.gutters().paddingRight,
    color: theme.palette.common.white,
    overflow: 'hidden'
  },
  titleWrapActionPosLeft: {
    marginLeft: 0
  },
  titleWrapActionPosRight: {
    marginRight: 0
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  actionIcon: {},
  actionIconActionPosLeft: {
    order: -1
  }
});

function GridListTileBar(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    actionIcon,
    actionPosition,
    classes,
    className: classNameProp,
    subtitle,
    title,
    titlePosition,
    ...other
  } = props;
  const actionPos = actionIcon && actionPosition;
  const className = classNames(classes.root, titlePosition === 'bottom' && classes.titlePositionBottom, titlePosition === 'top' && classes.titlePositionTop, subtitle && classes.rootSubtitle, classNameProp); // Remove the margin between the title / subtitle wrapper, and the Action Icon

  const titleWrapClassName = classNames(classes.titleWrap, actionPos === 'left' && classes.titleWrapActionPosLeft, actionPos === 'right' && classes.titleWrapActionPosRight);
  return <div className={classNamesStr(className)} {...other}>
      <div className={classNamesStr(titleWrapClassName)}>
        <div className={classNamesStr(classes.title)}>{title}</div>
        {subtitle ? <div className={classNamesStr(classes.subtitle)}>{subtitle}</div> : null}
      </div>
      {actionIcon ? <div className={classNamesStr(classes.actionIcon, actionPos === 'left' && classes.actionIconActionPosLeft)}>
          {actionIcon}
        </div> : null}
    </div>;
}

const defaultProps = {
  actionPosition: 'right',
  titlePosition: 'bottom'
};
const meta = {
  component: GridListTileBar || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;