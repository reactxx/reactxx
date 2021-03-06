/* eslint-disable import/prefer-default-export */
import React from 'react';
export function cloneElementWithClassName(child, className) {
  return React.cloneElement(child, {
    //className: classNames(child.props.className, className)
    //TODO
    className: className
  });
}
export function cloneChildrenWithClassName(children, className) {
  return React.Children.map(children, child => {
    return React.isValidElement(child) && cloneElementWithClassName(child, className);
  });
}
export function isMuiElement(element, muiNames) {
  return React.isValidElement(element) && muiNames.indexOf((element as any).type.muiName) !== -1;
}
export function isMuiComponent(element, muiNames) {
  return muiNames.indexOf(element.muiName) !== -1;
}