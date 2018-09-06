import * as actionTypes from  './ActionTypes';
import {getMenuPerCaterer, addMealsToMenuApi, removeMealFromMenuApi, getAllMenusAPi} from '../api/api';
import _ from 'lodash';

function loadMenuSuccess(data){
  return {type: actionTypes.LOAD_MENU_SUCCESS, data};
}

function loadMenuFailure(data){
  return {type: actionTypes.LOAD_MENU_FAILURE, data};
}

function addMealsToMenuSuccess(data){
  return { type: actionTypes.ADD_MEALS_TO_MENU_SUCCESS, data};
}

function addMealsToMenuFailure(data){
  return { type: actionTypes.ADD_MEALS_TO_MENU_FAILURE, data};
}

function removeMealFromMenuSuccess(data) {
  return {type: actionTypes.REMOVE_MEAL_FROM_MENU_SUCCESS, data};
}

function removeMealFromMenuFailure(data) {
  return {type: actionTypes.REMOVE_MEAL_FROM_MENU_FAILURE, data};
}

function getAllMenusSuccess(data){
  return {type: actionTypes.GET_ALL_MENUS_SUCCESS, data};
}

function getAllMenusFailure(data) {
  return {type: actionTypes.GET_ALL_MENUS_FAILURE, data};
}

export function loadMenu() {
  return function (dispatch) {
    return getMenuPerCaterer()
      .then(response => {
          dispatch(loadMenuSuccess(response.data.message.MENU));
        }
      )
      .catch(errors => {
        dispatch(loadMenuFailure(errors.response.data.message));

      });
  };
}

export function addMealsToMenu(data){
  return function(dispatch){
    return addMealsToMenuApi(data)
      .then(response => {
          dispatch(addMealsToMenuSuccess(response.data.message));
          dispatch(loadMenu());
        }
      )
      .catch(errors => {
          dispatch(addMealsToMenuFailure(errors.response.data.message));
        }
      );
  };
}

export function removeMealFromMenu(data){
  return function (dispatch) {
    return removeMealFromMenuApi(data)
      .then(response => {
        dispatch(removeMealFromMenuSuccess(response.data.message));
        dispatch(loadMenu());

      })
      .catch(errors => {
        dispatch(removeMealFromMenuFailure(errors.response.data.message));
      });
  };
}

export function getAllMenus() {
  return function (dispatch) {
    return getAllMenusAPi()
      .then(response => {
        var menu = response.data.message.MENU;
        var newMenu = [];

        _.forEach(menu, function(value, key) {
          console.log('key', key, 'value', value);
          var menuItem = _.concat([], [[key, value]]);
          newMenu = _.concat(newMenu, menuItem);
        });
        console.log('new menu in actions', newMenu);

        dispatch(getAllMenusSuccess(newMenu));
      })
      .catch(errors => {
        dispatch(getAllMenusFailure(errors.response.data.message));
      });
  };
}

