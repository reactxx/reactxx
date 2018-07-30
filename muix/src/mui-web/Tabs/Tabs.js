/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import EventListener from 'react-event-listener';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.

import { getNormalizedScrollLeft, detectScrollType } from 'normalize-scroll-left';
import scroll from 'scroll';
import ScrollbarSize from './ScrollbarSize';
import withStyles from '../styles/withStyles';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';
export const styles = theme => ({
  root: {
    overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.

  },
  flexContainer: {
    display: 'flex'
  },
  scroller: {
    position: 'relative',
    display: 'inline-block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap'
  },
  fixed: {
    overflowX: 'hidden',
    width: '100%'
  },
  scrollable: {
    overflowX: 'scroll'
  },
  centered: {
    justifyContent: 'center'
  },
  scrollButtons: {},
  scrollButtonsAuto: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
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
    this.updateScrollButtonState(); // The index might have changed at the same time.
    // We need to check again the right indicator position.

    this.updateIndicatorState(this.props);

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
      classes,
      scrollable,
      ScrollButtonComponent,
      scrollButtons,
      theme
    } = this.props;
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? <ScrollbarSize onLoad={this.handleScrollbarSizeChange} onChange={this.handleScrollbarSizeChange} /> : null;
    const showScrollButtons = scrollable && (scrollButtons === 'auto' || scrollButtons === 'on');
    conditionalElements.scrollButtonLeft = showScrollButtons ? <ScrollButtonComponent direction={theme && theme.direction === 'rtl' ? 'right' : 'left'} onClick={this.handleLeftScrollClick} visible={this.state.showLeftScroll} className={classNames(classes.scrollButtons, scrollButtons === 'auto' && classes.scrollButtonsAuto)} /> : null;
    conditionalElements.scrollButtonRight = showScrollButtons ? <ScrollButtonComponent direction={theme && theme.direction === 'rtl' ? 'left' : 'right'} onClick={this.handleRightScrollClick} visible={this.state.showRightScroll} className={classNames(classes.scrollButtons, scrollButtons === 'auto' && classes.scrollButtonsAuto)} /> : null;
    return conditionalElements;
  };
  getTabsMeta = (value, direction) => {
    let tabsMeta;

    if (this.tabs) {
      const rect = this.tabs.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

      tabsMeta = {
        clientWidth: this.tabs ? this.tabs.clientWidth : 0,
        scrollLeft: this.tabs ? this.tabs.scrollLeft : 0,
        scrollLeftNormalized: this.tabs ? getNormalizedScrollLeft(this.tabs, direction) : 0,
        scrollWidth: this.tabs ? this.tabs.scrollWidth : 0,
        left: rect.left,
        right: rect.right
      };
    }

    let tabMeta;

    if (this.tabs && value !== false) {
      const children = this.tabs.children[0].children;

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
    if (this.tabs) {
      this.moveTabsScroll(-this.tabs.clientWidth);
    }
  };
  handleRightScrollClick = () => {
    if (this.tabs) {
      this.moveTabsScroll(this.tabs.clientWidth);
    }
  };
  handleScrollbarSizeChange = ({
    scrollbarHeight
  }) => {
    this.setState({
      scrollerStyle: {
        marginBottom: -scrollbarHeight
      }
    });
  };
  moveTabsScroll = delta => {
    const {
      theme
    } = this.props;

    if (this.tabs) {
      const multiplier = theme.direction === 'rtl' ? -1 : 1;
      const nextScrollLeft = this.tabs.scrollLeft + delta * multiplier; // Fix for Edge

      const invert = theme.direction === 'rtl' && detectScrollType() === 'reverse' ? -1 : 1;
      scroll.left(this.tabs, invert * nextScrollLeft);
    }
  };
  scrollSelectedIntoView = () => {
    const {
      theme,
      value
    } = this.props;
    const {
      tabsMeta,
      tabMeta
    } = this.getTabsMeta(value, theme.direction);

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      scroll.left(this.tabs, nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
      scroll.left(this.tabs, nextScrollLeft);
    }
  };
  updateScrollButtonState = () => {
    const {
      scrollable,
      scrollButtons,
      theme
    } = this.props;

    if (this.tabs && scrollable && scrollButtons !== 'off') {
      const {
        scrollWidth,
        clientWidth
      } = this.tabs;
      const scrollLeft = getNormalizedScrollLeft(this.tabs, theme.direction);
      const showLeftScroll = theme.direction === 'rtl' ? scrollWidth > clientWidth + scrollLeft : scrollLeft > 0;
      const showRightScroll = theme.direction === 'rtl' ? scrollLeft > 0 : scrollWidth > clientWidth + scrollLeft;

      if (showLeftScroll !== this.state.showLeftScroll || showRightScroll !== this.state.showRightScroll) {
        this.setState({
          showLeftScroll,
          showRightScroll
        });
      }
    }
  };

  updateIndicatorState(props) {
    const {
      theme,
      value
    } = props;
    const {
      tabsMeta,
      tabMeta
    } = this.getTabsMeta(value, theme.direction);
    let left = 0;

    if (tabMeta && tabsMeta) {
      const correction = theme.direction === 'rtl' ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
      left = tabMeta.left - tabsMeta.left + correction;
    }

    const indicatorStyle = {
      left,
      // May be wrong until the font is loaded.
      width: tabMeta ? tabMeta.width : 0
    };

    if ((indicatorStyle.left !== this.state.indicatorStyle.left || indicatorStyle.width !== this.state.indicatorStyle.width) && !isNaN(indicatorStyle.left) && !isNaN(indicatorStyle.width)) {
      this.setState({
        indicatorStyle
      });
    }
  }

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
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
      theme,
      value,
      ...other
    } = this.props;
    warning(!centered || !scrollable, 'Material-UI: you can not use the `centered={true}` and `scrollable={true}` properties ' + 'at the same time on a `Tabs` component.');
    const className = classNames(classes.root, classNameProp);
    const scrollerClassName = classNames(classes.scroller, !scrollable && classes.fixed, scrollable && classes.scrollable);
    const flexContainerClassName = classNames(classes.flexContainer, centered && !scrollable && classes.centered);
    const indicator = <TabIndicator className={classes.indicator} color={indicatorColor} {...TabIndicatorProps} style={{ ...this.state.indicatorStyle,
      ...TabIndicatorProps.style
    }} />;
    this.valueToIndex = new Map();
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      warning(child.type !== React.Fragment, ["Material-UI: the Tabs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      const childValue = child.props.value === undefined ? childIndex : child.props.value;
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
    return <Component className={classNamesStr(className)} {...other}>
        <EventListener target="window" onResize={this.handleResize} />
        {conditionalElements.scrollbarSizeListener}
        <div className={classNamesStr(classes.flexContainer)}>
          {conditionalElements.scrollButtonLeft}
          <div className={classNamesStr(scrollerClassName)} style={this.state.scrollerStyle} ref={node => {
          this.tabs = node;
        }} role="tablist" onScroll={this.handleTabsScroll}>
            <div className={classNamesStr(flexContainerClassName)}>{children}</div>
            {this.state.mounted && indicator}
          </div>
          {conditionalElements.scrollButtonRight}
        </div>
      </Component>;
  }

}

const defaultProps = {
  centered: false,
  component: 'div',
  fullWidth: false,
  indicatorColor: 'secondary',
  scrollable: false,
  ScrollButtonComponent: TabScrollButton,
  scrollButtons: 'auto',
  textColor: 'inherit'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Tabs/Tabs').Shape>}
*/
export const TabsCreator = withStyles(styles, Tabs, {
  isMui: true,
  defaultProps
});
const TabsComponent = TabsCreator();
export default TabsComponent;