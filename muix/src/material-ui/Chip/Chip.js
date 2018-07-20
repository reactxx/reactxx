import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import CancelIcon from '../internal/svg-icons/Cancel';
import withStyles from '../styles/withStyles';
import { emphasize, fade } from '../styles/colorManipulator';
import unsupportedProp from '../utils/unsupportedProp';
import '../Avatar/Avatar'; // So we don't have any override priority issue.

export const styles = theme => {
  const height = 32;
  const backgroundColor = theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];
  const deleteIconColor = fade(theme.palette.text.primary, 0.26);
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      borderRadius: height / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 'none',
      textDecoration: 'none',
      border: 'none',
      // Remove `button` border
      padding: 0 // Remove `button` padding

    },
    clickable: {
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08)
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12)
      }
    },
    deletable: {
      '&:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08)
      }
    },
    avatar: {
      marginRight: -4,
      width: height,
      height,
      color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      fontSize: theme.typography.pxToRem(16)
    },
    avatarChildren: {
      width: 19,
      height: 19
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      userSelect: 'none',
      whiteSpace: 'nowrap',
      cursor: 'inherit'
    },
    deleteIcon: {
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      color: deleteIconColor,
      cursor: 'pointer',
      height: 'auto',
      margin: '0 4px 0 -8px',
      '&:hover': {
        color: fade(deleteIconColor, 0.4)
      }
    }
  };
};
/**
 * Chips represent complex entities in small blocks, such as a contact.
 */

class Chip extends React.Component {
  chipRef = null;
  handleDeleteIconClick = event => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    const {
      onDelete
    } = this.props;

    if (onDelete) {
      onDelete(event);
    }
  };
  handleKeyDown = event => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget !== event.target) {
      return;
    }

    const {
      onClick,
      onDelete,
      onKeyDown
    } = this.props;
    const key = keycode(event);

    if (onClick && (key === 'space' || key === 'enter')) {
      event.preventDefault();
      onClick(event);
    } else if (onDelete && key === 'backspace') {
      event.preventDefault();
      onDelete(event);
    } else if (key === 'esc') {
      event.preventDefault();

      if (this.chipRef) {
        this.chipRef.blur();
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
      avatar: avatarProp,
      classes,
      className: classNameProp,
      clickable,
      component: Component,
      deleteIcon: deleteIconProp,
      label,
      onClick,
      onDelete,
      onKeyDown,
      tabIndex: tabIndexProp,
      ...other
    } = this.props;
    const className = classNames(classes.root, (onClick || clickable) && classes.clickable, onDelete && classes.deletable, classNameProp);
    let deleteIcon = null;

    if (onDelete) {
      deleteIcon = deleteIconProp && React.isValidElement(deleteIconProp) ? React.cloneElement(deleteIconProp, {
        className: classNames(deleteIconProp.props.className, classes.deleteIcon),
        onClick: this.handleDeleteIconClick
      }) : <CancelIcon className={classes.deleteIcon} onClick={this.handleDeleteIconClick} />;
    }

    let avatar = null;

    if (avatarProp && React.isValidElement(avatarProp)) {
      avatar = React.cloneElement(avatarProp, {
        className: classNames(classes.avatar, avatarProp.props.className),
        childrenClassName: classNames(classes.avatarChildren, avatarProp.props.childrenClassName)
      });
    }

    let tabIndex = tabIndexProp;

    if (!tabIndex) {
      tabIndex = onClick || onDelete || clickable ? 0 : -1;
    }

    return <Component role="button" className={className} tabIndex={tabIndex} onClick={onClick} onKeyDown={this.handleKeyDown} ref={node => {
      this.chipRef = node;
    }} {...other}>
        {avatar}
        <span className={classNamesStr(classes.label)}>{label}</span>
        {deleteIcon}
      </Component>;
  }

}

export default withStyles(styles, {
  name: 'MuiChip',
  defaultProps: {
    clickable: false,
    component: 'div'
  }
})(Chip);