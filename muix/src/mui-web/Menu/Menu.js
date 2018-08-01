// @inheritedComponent Popover
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import withStyles from '../styles/withStyles';
import Popover from "../Popover/Popover";
import MenuList from "../MenuList/MenuList";
const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right'
};
const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left'
};
export const styles = {
  /* Styles applied to the `Paper` component. */
  paper: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tapable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100% - 96px)',
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: 'touch'
  }
};

class Menu extends React.Component {
  menuListRef = null;

  componentDidMount() {
    if (this.props.open && this.props.disableAutoFocusItem !== true) {
      this.focus();
    }
  }

  getContentAnchorEl = () => {
    if (!this.menuListRef || !this.menuListRef.selectedItemRef) {
      return ReactDOM.findDOMNode(this.menuListRef).firstChild;
    }

    return ReactDOM.findDOMNode(this.menuListRef.selectedItemRef);
  };
  focus = () => {
    if (this.menuListRef && this.menuListRef.selectedItemRef) {
      ReactDOM.findDOMNode(this.menuListRef.selectedItemRef).focus();
      return;
    }

    const menuList = ReactDOM.findDOMNode(this.menuListRef);

    if (menuList && menuList.firstChild) {
      menuList.firstChild.focus();
    }
  };
  handleEnter = element => {
    const {
      disableAutoFocusItem,
      theme
    } = this.props;
    const menuList = ReactDOM.findDOMNode(this.menuListRef); // Focus so the scroll computation of the Popover works as expected.

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
        classNamesStr,
        theme
      },
      children,
      classes,
      disableAutoFocusItem,
      MenuListProps,
      onEnter,
      PaperProps = {},
      PopoverClasses,
      ...other
    } = this.props;
    return <Popover getContentAnchorEl={this.getContentAnchorEl} classes={PopoverClasses} onEnter={this.handleEnter} anchorOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN} transformOrigin={theme.direction === 'rtl' ? RTL_ORIGIN : LTR_ORIGIN} PaperProps={{ ...PaperProps,
      classes: { ...PaperProps.classes,
        root: classes.paper
      }
    }} {...other}>
        <MenuList data-mui-test="Menu" onKeyDown={this.handleListKeyDown} {...MenuListProps} ref={ref => {
        this.menuListRef = ref;
      }}>
          {children}
        </MenuList>
      </Popover>;
  }

}

const defaultProps = Menu.defaultProps = {
  disableAutoFocusItem: false,
  transitionDuration: 'auto'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Menu/Menu').Shape>}
*/
export const MenuCreator = withStyles(styles, Menu, {
  isMui: true,
  defaultProps
});
const MenuComponent = MenuCreator();
if (Menu.muiName) MenuComponent.muiName = Menu.muiName;
export default MenuComponent;