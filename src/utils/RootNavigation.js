import * as React from 'react';
import {navigationRef} from '../navigations/Main';
import {StackActions} from '@react-navigation/native';

export const navigationRefNew = React.createRef();

export function navigate(name, params) {
  navigationRefNew.current?.navigate(name, params);
}
export function dispatch(name, params) {
  navigationRefNew.current?.dispatch(name, params);
}
export function replace(...args) {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}
