import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.

import EventListener from 'react-event-listener';
import withStyles from '../styles/withStyles';
const ROWS_HEIGHT = 19;
export const styles = {
  root: {
    position: 'relative',
    // because the shadow has position: 'absolute',
    width: '100%'
  },
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0,
    cursor: 'inherit',
    boxSizing: 'border-box',
    lineHeight: 'inherit',
    border: 'none',
    outline: 'none',
    background: 'transparent'
  },
  shadow: {
    resize: 'none',
    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    overflow: 'hidden',
    // Visibility needed to hide the extra text area on ipads
    visibility: 'hidden',
    position: 'absolute',
    height: 'auto',
    whiteSpace: 'pre-wrap'
  }
};
/**
 * @ignore - internal component.
 */

class Textarea extends React.Component {
  shadow = null;
  singlelineShadow = null;
  input = null;
  value = null;
  handleResize = debounce(() => {
    this.syncHeightWithShadow();
  }, 166); // Corresponds to 10 frames at 60 Hz.

  constructor(props) {
    super(props); // <Input> expects the components it renders to respond to 'value'
    // so that it can check whether they are filled.

    this.value = props.value || props.defaultValue || '';
    this.state = {
      height: Number(props.rows) * ROWS_HEIGHT
    };
  }

  state = {
    height: null
  };

  componentDidMount() {
    this.syncHeightWithShadow();
  }

  componentDidUpdate() {
    this.syncHeightWithShadow();
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  handleRefInput = node => {
    this.input = node;
    const {
      textareaRef
    } = this.props;

    if (textareaRef) {
      if (typeof textareaRef === 'function') {
        textareaRef(node);
      } else {
        textareaRef.current = node;
      }
    }
  };
  handleRefSinglelineShadow = node => {
    this.singlelineShadow = node;
  };
  handleRefShadow = node => {
    this.shadow = node;
  };
  handleChange = event => {
    this.value = event.target.value;

    if (typeof this.props.value === 'undefined' && this.shadow) {
      // The component is not controlled, we need to update the shallow value.
      this.shadow.value = this.value;
      this.syncHeightWithShadow();
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  syncHeightWithShadow() {
    const props = this.props;

    if (!this.shadow || !this.singlelineShadow) {
      return;
    } // The component is controlled, we need to update the shallow value.


    if (typeof props.value !== 'undefined') {
      this.shadow.value = props.value == null ? '' : String(props.value);
    }

    const lineHeight = this.singlelineShadow.scrollHeight;
    let newHeight = this.shadow.scrollHeight; // Guarding for jsdom, where scrollHeight isn't present.
    // See https://github.com/tmpvar/jsdom/issues/1013

    if (newHeight === undefined) {
      return;
    }

    if (Number(props.rowsMax) >= Number(props.rows)) {
      newHeight = Math.min(Number(props.rowsMax) * lineHeight, newHeight);
    }

    newHeight = Math.max(newHeight, lineHeight); // Need a large enough different to update the height.
    // This prevents infinite rendering loop.

    if (Math.abs(this.state.height - newHeight) > 1) {
      this.setState({
        height: newHeight
      });
    }
  }

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
      classes,
      className,
      defaultValue,
      onChange,
      rows,
      rowsMax,
      textareaRef,
      value,
      ...other
    } = this.props;
    return <div className={classNamesStr(classes.root)} style={{
      height: this.state.height
    }}>
        <EventListener target="window" onResize={this.handleResize} />
        <textarea ref={this.handleRefSinglelineShadow} className={classNamesStr(classnames(classes.shadow, classes.textarea))} tabIndex={-1} rows="1" readOnly aria-hidden="true" value="" />
        <textarea ref={this.handleRefShadow} className={classNamesStr(classnames(classes.shadow, classes.textarea))} tabIndex={-1} rows={rows} aria-hidden="true" readOnly defaultValue={defaultValue} value={value} />
        <textarea rows={rows} className={classNamesStr(classnames(classes.textarea, className))} defaultValue={defaultValue} value={value} onChange={this.handleChange} ref={this.handleRefInput} {...other} />
      </div>;
  }

}

const defaultProps = {
  rows: 1
};
const meta = {
  component: Textarea || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;