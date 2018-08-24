//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import keycode from "keycode";
import warning from "warning";
import Menu from "../Menu/Menu";
import { isFilled } from "../Input/Input";
import { MenuProps } from "../Menu/Menu";
export interface SelectInputProps {
  autoFocus?: boolean;
  autoWidth: boolean;
  disabled?: boolean;
  IconComponent?: React.ReactType;
  inputRef?: (
    ref:
      | HTMLSelectElement
      | {
          node: HTMLInputElement;
          value: SelectInputProps["value"];
        }
  ) => void;
  MenuProps?: Partial<MenuProps>;
  multiple: boolean;
  name?: string;
  native: boolean;
  onBlur?: React.FocusEventHandler<any>;
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode
  ) => void;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onFocus?: React.FocusEventHandler<any>;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  readOnly?: boolean;
  renderValue?: (value: SelectInputProps["value"]) => React.ReactNode;
  SelectDisplayProps?: React.HTMLAttributes<HTMLDivElement>;
  tabIndex?: number;
  value?: string | number | boolean | Array<string | number | boolean>;
}
/**
 * @ignore - internal component.
 */

interface SelectInputProps {
  children?;
  [p: string]: any;
}
export type CodeProps = SelectInputProps;

class SelectInput extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  static options;
  ignoreNextBlur = false;
  displayRef = null;
  isOpenControlled = this.props.open !== undefined;
  state: any = {
    menuMinWidth: null,
    open: false
  };

  componentDidMount() {
    if (this.isOpenControlled && this.props.open) {
      // Focus the display node so the focus is restored on this element once
      // the menu is closed.
      this.displayRef.focus(); // Rerender with the resolve `displayRef` reference.

      this.forceUpdate();
    }

    if (this.props.autoFocus) {
      this.displayRef.focus();
    }
  }

  update = ({ event, open }) => {
    if (this.isOpenControlled) {
      if (open) {
        this.props.onOpen(event);
      } else {
        this.props.onClose(event);
      }

      return;
    }

    this.setState({
      // Perfom the layout computation outside of the render method.
      menuMinWidth: this.props.autoWidth ? null : this.displayRef.clientWidth,
      open
    });
  };
  handleClick = event => {
    // Opening the menu is going to blur the. It will be focused back when closed.
    this.ignoreNextBlur = true;
    this.update({
      open: true,
      event
    });
  };
  handleClose = event => {
    this.update({
      open: false,
      event
    });
  };
  handleItemClick = child => event => {
    if (!this.props.multiple) {
      this.update({
        open: false,
        event
      });
    }

    const { onChange, name } = this.props;

    if (onChange) {
      let value;

      if (this.props.multiple) {
        value = Array.isArray(this.props.value) ? [...this.props.value] : [];
        const itemIndex = value.indexOf(child.props.value);

        if (itemIndex === -1) {
          value.push(child.props.value);
        } else {
          value.splice(itemIndex, 1);
        }
      } else {
        value = child.props.value;
      }

      event.persist();
      event.target = {
        value,
        name
      };
      onChange(event, child);
    }
  };
  handleBlur = event => {
    if (this.ignoreNextBlur === true) {
      // The parent components are relying on the bubbling of the event.
      event.stopPropagation();
      this.ignoreNextBlur = false;
      return;
    }

    if (this.props.onBlur) {
      const { value, name } = this.props;
      event.persist();
      event.target = {
        value,
        name
      };
      this.props.onBlur(event);
    }
  };
  handleKeyDown = event => {
    if (this.props.readOnly) {
      return;
    }

    if (["space", "up", "down"].indexOf(keycode(event)) !== -1) {
      event.preventDefault(); // Opening the menu is going to blur the. It will be focused back when closed.

      this.ignoreNextBlur = true;
      this.update({
        open: true,
        event
      });
    }
  };
  handleDisplayRef = ref => {
    this.displayRef = ref;
  };
  handleInputRef = ref => {
    const { inputRef } = this.props;

    if (!inputRef) {
      return;
    }

    const nodeProxy = {
      node: ref,
      // By pass the native input as we expose a rich object (array).
      value: this.props.value
    };

    if (typeof inputRef === "function") {
      inputRef(nodeProxy);
    } else {
      inputRef.current = nodeProxy;
    }
  };

  render() {
    const {
      $system: { theme },
      autoWidth,
      children,
      classes,
      className,
      disabled,
      displayEmpty,
      IconComponent,
      inputRef,
      MenuProps = {},
      multiple,
      name,
      onBlur,
      onChange,
      onClose,
      onFocus,
      onOpen,
      open: openProp,
      readOnly,
      renderValue,
      required,
      SelectDisplayProps,
      tabIndex: tabIndexProp,
      type = "hidden",
      value,
      ...other
    } = this.props;
    const open =
      this.isOpenControlled && this.displayRef ? openProp : this.state.open;
    delete other["aria-invalid"];
    let display;
    let displaySingle = "";
    const displayMultiple = [];
    let computeDisplay = false; // No need to display any value if the field is empty.

    if (isFilled(this.props) || displayEmpty) {
      if (renderValue) {
        display = renderValue(value);
      } else {
        computeDisplay = true;
      }
    }

    const items = React.Children.map(
      children,
      (child: React.ReactElement<any>) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        warning(
          child.type !== React.Fragment,
          [
            "Material-UI: the Select component doesn't accept a Fragment as a child.",
            "Consider providing an array instead."
          ].join("\n")
        );
        let selected;

        if (multiple) {
          if (!Array.isArray(value)) {
            throw new Error(
              "Material-UI: the `value` property must be an array " +
                "when using the `Select` component with `multiple`."
            );
          }

          selected = value.indexOf(child.props.value) !== -1;

          if (selected && computeDisplay) {
            displayMultiple.push(child.props.children);
          }
        } else {
          selected = value === child.props.value;

          if (selected && computeDisplay) {
            displaySingle = child.props.children;
          }
        }

        return React.cloneElement(child, {
          onClick: this.handleItemClick(child),
          role: "option",
          selected,
          value: undefined,
          // The value is most likely not a valid HTML attribute.
          "data-value": child.props.value // Instead, we provide it as a data attribute.
        });
      }
    );

    if (computeDisplay) {
      display = multiple ? displayMultiple.join(", ") : displaySingle;
    } // Avoid performing a layout computation in the render method.

    let menuMinWidth = this.state.menuMinWidth;

    if (!autoWidth && this.isOpenControlled && this.displayRef) {
      menuMinWidth = this.displayRef.clientWidth;
    }

    let tabIndex;

    if (typeof tabIndexProp !== "undefined") {
      tabIndex = tabIndexProp;
    } else {
      tabIndex = disabled ? null : 0;
    }

    return (
      <div className={classes.root}>
        <div
          className={classNames(
            classes.select,
            classes.selectMenu,
            disabled && classes.disabled,
            className
          )}
          ref={this.handleDisplayRef}
          data-mui-test="SelectDisplay"
          aria-pressed={open ? "true" : "false"}
          tabIndex={tabIndex}
          role="button"
          aria-owns={open ? `menu-${name || ""}` : null}
          aria-haspopup="true"
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          onClick={disabled || readOnly ? null : this.handleClick}
          onFocus={onFocus}
          {...SelectDisplayProps as any}
        >
          {/* So the vertical align positioning algorithm quicks in. */}
          {/* eslint-disable-next-line react/no-danger */}
          {display || (
            <span
              dangerouslySetInnerHTML={{
                __html: "&#8203;"
              }}
            />
          )}
        </div>
        <input
          value={Array.isArray(value) ? value.join(",") : value}
          name={name}
          ref={this.handleInputRef}
          type={type}
          {...other as any}
        />
        <IconComponent className={classes.icon} />
        <Menu
          id={`menu-${name || ""}`}
          anchorEl={this.displayRef}
          open={open}
          onClose={this.handleClose}
          {...MenuProps as any}
          MenuListProps={{
            role: "listbox",
            ...MenuProps.MenuListProps
          }}
          PaperProps={{
            ...MenuProps.PaperProps,
            style: {
              minWidth: menuMinWidth,
              ...(MenuProps.PaperProps != null
                ? MenuProps.PaperProps.style
                : null)
            }
          }}
        >
          {items}
        </Menu>
      </div>
    );
  }
}

export default SelectInput;
