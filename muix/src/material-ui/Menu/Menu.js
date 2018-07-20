// @inheritedComponent Popover
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import withStyles from '../styles/withStyles';
import Popover from '../Popover';
import MenuList from '../MenuList';
const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right'
};
const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left'
};
export const styles = {
  paper: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tappable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100% - 96px)',
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: 'touch',
    // Fix a scrolling issue on Chrome.
    transform: 'translateZ(0)'
  }
};

class Menu extends React.Component {
  menuList = null;

  componentDidMount() {
    if (this.props.open && this.props.disableAutoFocusItem !== true) {
      this.focus();
    }
  }

  getContentAnchorEl = () => {
    if (!this.menuList || !this.menuList.selectedItem) {
      return ReactDOM.findDOMNode(this.menuList).firstChild;
    }

    return ReactDOM.findDOMNode(this.menuList.selectedItem);
  };
  focus = () => {
    if (this.menuList && this.menuList.selectedItem) {
      ReactDOM.findDOMNode(this.menuList.selectedItem).focus();
      return;
    }

    const menuList = ReactDOM.findDOMNode(this.menuList);

    if (menuList && menuList.firstChild) {
      menuList.firstChild.focus();
    }
  };
  handleEnter = element => {
    const {
      disableAutoFocusItem,
      theme
    } = this.props;
    const menuList = ReactDOM.findDOMNode(this.menuList); // Focus so the scroll computation of the Popover works as expected.

    if (disableAutoFocusItem !== true) {
      this.focus();
    } // Let's ignore that piece of logic if users are already overriding the width
    // of the menu.


    if (menuList && element.clientHeight < menuList.clientHeight && !menuList.style.width) {
      const size = `${getScrollbarSize()}px`;
      menuList.style[theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = size;
      menuList.style.width = `calc(100% + ${size})`;
    }

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };
  handleListKeyDown = (event, key) => {
    if (key === 'tab') {
      event.preventDefault();

      if (this.props.onClose) {
        this.props.onClose(event);
      }
    }
  };

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
      children,
      classes,
      disableAutoFocusItem,
      MenuListProps,
      onEnter,
      PaperProps = {},
      PopoverClasses,
      theme,
      ...other
    } = this.props;
    return <Popover getContentAnchorEl={this.getContentAnchorEl} classes={PopoverClasses} onEnter={this.handleEnter} anchorOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN} transformOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN} PaperProps={{ ...PaperProps,
      classes: { ...PaperProps.classes,
        root: classes.paper
      }
    }} {...other}>
        <MenuList data-mui-test="Menu" onKeyDown={this.handleListKeyDown} {...MenuListProps} ref={node => {
        this.menuList = node;
      }}>
          {children}
        </MenuList>
      </Popover>;
  }

}

export default withStyles(styles, {
  name: 'MuiMenu',
  withTheme: true,
  defaultProps: {
    disableAutoFocusItem: false,
    transitionDuration: 'auto'
  }
})(Menu);