// NavigationService.js

import { NavigationActions, StackActions, DrawerActions } from 'react-navigation';

let _navigator;
let _drawerComponent;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}
function setDrawerComponent (drawerComponent) {
	_drawerComponent = drawerComponent;
}
function getDrawerComponent () {
	return _drawerComponent ;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function toggleDrawer() {
  _navigator.dispatch(DrawerActions.toggleDrawer());
}

function replace(routeName) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
    })
  );
}

function resetTo(navigator, routeName) {
	let reset = StackActions.reset({
		index:0,
		key : navigator,
		actions:[NavigationActions.navigate({routeName})]
	});

	_navigator.dispatch(reset);
}

function goBack() {
	_navigator.dispatch(NavigationActions.back());
}

function getNavigation () {
  return _navigator;
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  getNavigation,
  replace,
  toggleDrawer,
  setDrawerComponent,
  getDrawerComponent,
  resetTo
};