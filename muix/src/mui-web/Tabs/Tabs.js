//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

/* eslint-disable no-restricted-globals */
import React from "react";
import PropTypes from "prop-types";
import warning from "warning";
import classNames from "classnames";
import EventListener from "react-event-listener";
import debounce from "debounce"; // < 1kb payload overhead when lodash/debounce is > 3kb.

import {
  getNormalizedScrollLeft,
  detectScrollType
} from "normalize-scroll-left";
import animate from "../internal/animate";
import ScrollbarSize from "./ScrollbarSize";
import withStyles from "../styles/withStyles";
import TabIndicator from "./TabIndicator";
import TabScrollButton from "./TabScrollButton";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    overflow: "hidden",
    minHeight: 48,
    WebkitOverflowScrolling: "touch" // Add iOS momentum scrolling.
  },

  /* Styles applied to the flex container element. */
  flexContainer: {
    display: "flex"
  },

  /* Styles applied to the flex container element if `centered={true}` & `scrollable={false}`. */
  centered: {
    justifyContent: "center"
  },

  /* Styles applied to the tablist element. */
  scroller: {
    position: "relative",
    display: "inline-block",
    flex: "1 1 auto",
    whiteSpace: "nowrap"
  },

  /* Styles applied to the tablist element if `scrollable={false}`. */
  fixed: {
    overflowX: "hidden",
    width: "100%"
  },

  /* Styles applied to the tablist element if `scrollable={true}`. */
  scrollable: {
    overflowX: "scroll"
  },

  /* Styles applied to the `ScrollButtonComponent` component. */
  scrollButtons: {},

  /* Styles applied to the `ScrollButtonComponent` component if `sscrollButtons="auto"`. */
  scrollButtonsAuto: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },

  /* Styles applied to the `TabIndicator` component. */
  indicator: {}
});

class Tabs extends React.Component {
  tabs = null;
  valueToIndex = new Map();
  handleResize = debounce(() => {
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();
  }, 166); // Corresponds to 10 frames at 60 Hz.

  handleTabsScroll = debounce(() => {
    this.updateScrollButtonState();
  }, 166); // Corresponds to 10 frames at 60 Hz.

  state = {
    indicatorStyle: {},
    scrollerStyle: {
      marginBottom: 0
    },
    showLeftScroll: false,
    showRightScroll: false,
    mounted: false
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mounted: true
    });
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();

    if (this.props.action) {
      this.props.action({
        updateIndicator: this.handleResize
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // The index might have changed at the same time.
    // We need to check again the right indicator position.
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();

    if (this.state.indicatorStyle !== prevState.indicatorStyle) {
      this.scrollSelectedIntoView();
    }
  }

  componentWillUnmount() {
    this.handleResize.clear();
    this.handleTabsScroll.clear();
  }

  getConditionalElements = () => {
    const {
      $system: { theme },
      classes,
      scrollable,
      ScrollButtonComponent,
      scrollButtons
    } = this.props;
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? (
      <ScrollbarSize
        onLoad={this.handleScrollbarSizeChange}
        onChange={this.handleScrollbarSizeChange}
      />
    ) : null;
    const showScrollButtons =
      scrollable && (scrollButtons === "auto" || scrollButtons === "on");
    conditionalElements.scrollButtonLeft = showScrollButtons ? (
      <ScrollButtonComponent
        direction={theme && theme.direction === "rtl" ? "right" : "left"}
        onClick={this.handleLeftScrollClick}
        visible={this.state.showLeftScroll}
        className={classNames(
          classes.scrollButtons,
          scrollButtons === "auto" && classes.scrollButtonsAuto
        )}
      />
    ) : null;
    conditionalElements.scrollButtonRight = showScrollButtons ? (
      <ScrollButtonComponent
        direction={theme && theme.direction === "rtl" ? "left" : "right"}
        onClick={this.handleRightScrollClick}
        visible={this.state.showRightScroll}
        className={classNames(
          classes.scrollButtons,
          scrollButtons === "auto" && classes.scrollButtonsAuto
        )}
      />
    ) : null;
    return conditionalElements;
  };
  getTabsMeta = (value, direction) => {
    let tabsMeta;

    if (this.tabsRef) {
      const rect = this.tabsRef.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

      tabsMeta = {
        clientWidth: this.tabsRef.clientWidth,
        scrollLeft: this.tabsRef.scrollLeft,
        scrollLeftNormalized: getNormalizedScrollLeft(this.tabsRef, direction),
        scrollWidth: this.tabsRef.scrollWidth,
        left: rect.left,
        right: rect.right
      };
    }

    let tabMeta;

    if (this.tabsRef && value !== false) {
      const children = this.tabsRef.children[0].children;

      if (children.length > 0) {
        const tab = children[this.valueToIndex.get(value)];
        warning(tab, `Material-UI: the value provided \`${value}\` is invalid`);
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }

    return {
      tabsMeta,
      tabMeta
    };
  };
  handleLeftScrollClick = () => {
    this.moveTabsScroll(-this.tabsRef.clientWidth);
  };
  handleRightScrollClick = () => {
    this.moveTabsScroll(this.tabsRef.clientWidth);
  };
  handleScrollbarSizeChange = ({ scrollbarHeight }) => {
    this.setState({
      scrollerStyle: {
        marginBottom: -scrollbarHeight
      }
    });
  };
  moveTabsScroll = delta => {
    const {
      $system: { theme }
    } = this.props;
    const multiplier = theme.direction === "rtl" ? -1 : 1;
    const nextScrollLeft = this.tabsRef.scrollLeft + delta * multiplier; // Fix for Edge

    const invert =
      theme.direction === "rtl" && detectScrollType() === "reverse" ? -1 : 1;
    this.scroll(invert * nextScrollLeft);
  };
  scrollSelectedIntoView = () => {
    const {
      $system: { theme },
      value
    } = this.props;
    const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      const nextScrollLeft =
        tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      this.scroll(nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      const nextScrollLeft =
        tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
      this.scroll(nextScrollLeft);
    }
  };
  scroll = value => {
    animate("scrollLeft", this.tabsRef, value);
  };
  updateScrollButtonState = () => {
    const {
      $system: { theme },
      scrollable,
      scrollButtons
    } = this.props;

    if (scrollable && scrollButtons !== "off") {
      const { scrollWidth, clientWidth } = this.tabsRef;
      const scrollLeft = getNormalizedScrollLeft(this.tabsRef, theme.direction);
      const showLeftScroll =
        theme.direction === "rtl"
          ? scrollWidth > clientWidth + scrollLeft
          : scrollLeft > 0;
      const showRightScroll =
        theme.direction === "rtl"
          ? scrollLeft > 0
          : scrollWidth > clientWidth + scrollLeft;

      if (
        showLeftScroll !== this.state.showLeftScroll ||
        showRightScroll !== this.state.showRightScroll
      ) {
        this.setState({
          showLeftScroll,
          showRightScroll
        });
      }
    }
  };

  updateIndicatorState(props) {
    const {
      $system: { theme },
      value
    } = props;
    const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);
    let left = 0;

    if (tabMeta && tabsMeta) {
      const correction =
        theme.direction === "rtl"
          ? tabsMeta.scrollLeftNormalized +
            tabsMeta.clientWidth -
            tabsMeta.scrollWidth
          : tabsMeta.scrollLeft;
      left = Math.round(tabMeta.left - tabsMeta.left + correction);
    }

    const indicatorStyle = {
      left,
      // May be wrong until the font is loaded.
      width: tabMeta ? Math.round(tabMeta.width) : 0
    };

    if (
      (indicatorStyle.left !== this.state.indicatorStyle.left ||
        indicatorStyle.width !== this.state.indicatorStyle.width) &&
      !isNaN(indicatorStyle.left) &&
      !isNaN(indicatorStyle.width)
    ) {
      this.setState({
        indicatorStyle
      });
    }
  }

  render() {
    const {
      $system: { classNames, classNamesStr, classNamesAny, theme },
      action,
      centered,
      children: childrenProp,
      classes,
      className: classNameProp,
      component: Component,
      fullWidth,
      indicatorColor,
      onChange,
      scrollable,
      ScrollButtonComponent,
      scrollButtons,
      TabIndicatorProps = {},
      textColor,
      value,
      ...other
    } = this.props;
    warning(
      !centered || !scrollable,
      "Material-UI: you can not use the `centered={true}` and `scrollable={true}` properties " +
        "at the same time on a `Tabs` component."
    );
    const className = classNames(classes.root, classNameProp);
    const flexContainerClassName = classNames(
      classes.flexContainer,
      centered && !scrollable && classes.centered
    );
    const scrollerClassName = classNames(
      classes.scroller,
      !scrollable && classes.fixed,
      scrollable && classes.scrollable
    );
    const indicator = (
      <TabIndicator
        className={classes.indicator}
        color={indicatorColor}
        {...TabIndicatorProps}
        style={{
          ...this.state.indicatorStyle,
          ...TabIndicatorProps.style
        }}
      />
    );
    this.valueToIndex = new Map();
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      warning(
        child.type !== React.Fragment,
        [
          "Material-UI: the Tabs component doesn't accept a Fragment as a child.",
          "Consider providing an array instead."
        ].join("\n")
      );
      const childValue =
        child.props.value === undefined ? childIndex : child.props.value;
      this.valueToIndex.set(childValue, childIndex);
      const selected = childValue === value;
      childIndex += 1;
      return React.cloneElement(child, {
        fullWidth,
        indicator: selected && !this.state.mounted && indicator,
        selected,
        onChange,
        textColor,
        value: childValue
      });
    });
    const conditionalElements = this.getConditionalElements();
    return (
      <Component className={classNamesAny(Component, className)} {...other}>
        <EventListener target="window" onResize={this.handleResize} />
        {conditionalElements.scrollbarSizeListener}
        <div className={classNamesStr(classes.flexContainer)}>
          {conditionalElements.scrollButtonLeft}
          <div
            className={classNamesStr(scrollerClassName)}
            style={this.state.scrollerStyle}
            ref={ref => {
              this.tabsRef = ref;
            }}
            role="tablist"
            onScroll={this.handleTabsScroll}
          >
            <div className={classNamesStr(flexContainerClassName)}>
              {children}
            </div>
            {this.state.mounted && indicator}
          </div>
          {conditionalElements.scrollButtonRight}
        </div>
      </Component>
    );
  }
}

const defaultProps = (Tabs.defaultProps = {
  centered: false,
  component: "div",
  fullWidth: false,
  indicatorColor: "secondary",
  scrollable: false,
  ScrollButtonComponent: TabScrollButton,
  scrollButtons: "auto",
  textColor: "inherit"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Tabs/Tabs').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Tabs/Tabs').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Tabs/Tabs').Shape> } TDefaultProps */

/** @type { TComponent } */
const TabsCode = Tabs;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  TabsCode as Tabs,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
