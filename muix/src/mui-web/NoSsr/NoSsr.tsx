//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import exactProp from "../utils/exactProp";
export interface NoSsrProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 * - Escape hatch for broken dependencies not supporting SSR.
 * - Improve the time-to-first paint on the client by only rendering above the fold.
 * - Reduce the rendering time on the server.
 * - Under too heavy server load, you can turn on service degradation.
 */

interface NoSsrProps {
  children?;
  [p: string]: any;
}
export type CodeProps = NoSsrProps;

class NoSsr extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  static options;
  state: any = {
    mounted: false
  };

  componentDidMount() {
    this.mounted = true;

    if (this.props.defer) {
      // Wondering why we use two raf? Check this video out:
      // https://www.youtube.com/watch?v=cCOL7MC4Pl0
      requestAnimationFrame(() => {
        // The browser should be about to render the DOM that React commited at this point.
        // We don't want to interrupt. Let's wait the next raf.
        requestAnimationFrame(() => {
          if (this.mounted) {
            this.setState({
              mounted: true
            });
          }
        });
      });
    } else {
      this.setState({
        mounted: true
      }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { children, fallback } = this.props;
    return this.state.mounted ? children : fallback;
  }
}

NoSsr.defaultProps = {
  defer: false,
  fallback: null
};
export default NoSsr;
