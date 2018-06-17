import {
  CHANGE_MY_PAGE_DISP, FAIL_LOAD_MY_HORSES_ARRAY,
  GET_MY_HORSES_ARRAY_SUCCESS, START_LOAD_MY_HORSES_ARRAY,
  GET_HORSE_INFO
} from "../../actionTypes";


export const changeCurrentDisplay = (page) => ({
  type: CHANGE_MY_PAGE_DISP,
  data: page
});

export const getMyHorseArray = (array) => ({
  type: GET_MY_HORSES_ARRAY_SUCCESS,
  data: array
});

export const startLoadMyHorseArray = () => ({
  type: START_LOAD_MY_HORSES_ARRAY
});

export const getMyHorseArraySuccess = (array) => ({
  type: GET_MY_HORSES_ARRAY_SUCCESS,
  data: array
});

export const failGetMyHorseArray = () => ({
  type: FAIL_LOAD_MY_HORSES_ARRAY
});

export const getHorseInfoSuccess = (data) => ({
  type: GET_HORSE_INFO,
  data: {
    id: data[0].toNumber(),
    horse: data
  }
});
