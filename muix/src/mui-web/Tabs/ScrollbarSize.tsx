//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import EventListener from "react-event-listener";
import debounce from "debounce"; // < 1kb payload overhead when lodash/debounce is > 3kb.

const styles = {
  width: 100,
  height: 100,
  position: "absolute",
  top: -10000,
  overflow: "scroll",
  msOverflowStyle: "scrollbar"
};
/**
 * @ignore - internal component.
 * The component is originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */

interface ScrollbarSizeProps {
  children?;
  [p: string]: any;
}
export type CodeProps = ScrollbarSizeProps;

class ScrollbarSize extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  scrollbarWidth;
  scrollbarHeight;
  nodeRef;
  static options;
  handleResize = debounce(() => {
    const { onChange } = this.props;
    const prevHeight = this.scrollbarHeight;
    const prevWidth = this.scrollbarWidth;
    this.setMeasurements();

    if (
      prevHeight !== this.scrollbarHeight ||
      prevWidth !== this.scrollbarWidth
    ) {
      onChange({
        scrollbarHeight: this.scrollbarHeight,
        scrollbarWidth: this.scrollbarWidth
      });
    }
  }, 166); // Corresponds to 10 frames at 60 Hz.

  componentDidMount() {
    this.setMeasurements();
    this.props.onLoad({
      scrollbarHeight: this.scrollbarHeight,
      scrollbarWidth: this.scrollbarWidth
    });
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  setMeasurements = () => {
    const nodeRef = this.nodeRef;

    if (!nodeRef) {
      return;
    }

    this.scrollbarHeight = nodeRef.offsetHeight - nodeRef.clientHeight;
    this.scrollbarWidth = nodeRef.offsetWidth - nodeRef.clientWidth;
  };

  render() {
    const { onChange } = this.props;
    return (
      <div>
        {onChange ? (
          <EventListener target="window" onResize={this.handleResize} />
        ) : null}
        <div
          style={styles}
          ref={ref => {
            this.nodeRef = ref;
          }}
        />
      </div>
    );
  }
}

export default ScrollbarSize;
