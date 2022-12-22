import * as React from 'react';

export const navigationRefNew = React.createRef();

export function navigate(name, params) {
    navigationRefNew.current?.navigate(name, params);
}
export function dispatch(name, params) {
    navigationRefNew.current?.dispatch(name, params);
  }