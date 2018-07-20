import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export const styles = theme => ({
  root: theme.mixins.gutters({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16
  }),
  avatar: {
    flex: '0 0 auto',
    marginRight: 16
  },
  action: {
    flex: '0 0 auto',
    alignSelf: 'flex-start',
    marginTop: -8,
    marginRight: -16
  },
  content: {
    flex: '1 1 auto'
  },
  title: {},
  subheader: {}
});

function CardHeader(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    action,
    avatar,
    classes,
    className: classNameProp,
    component: Component,
    subheader,
    title,
    ...other
  } = props;
  return <Component className={classNames(classes.root, classNameProp)} {...other}>
      {avatar && <div className={classNamesStr(classes.avatar)}>{avatar}</div>}
      <div className={classNamesStr(classes.content)}>
        <Typography variant={avatar ? 'body2' : 'headline'} component="span" className={classes.title}>
          {title}
        </Typography>
        {subheader && <Typography variant={avatar ? 'body2' : 'body1'} component="span" color="textSecondary" className={classes.subheader}>
            {subheader}
          </Typography>}
      </div>
      {action && <div className={classNamesStr(classes.action)}>{action}</div>}
    </Component>;
}

export default withStyles(styles, {
  name: 'MuiCardHeader',
  defaultProps: {
    component: 'div'
  }
})(CardHeader);