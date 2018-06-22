import {
  START_LOAD_MY_HORSES_ARRAY,
  GET_MY_HORSES_ARRAY_SUCCESS,
  FAIL_LOAD_MY_HORSES_ARRAY,
  GET_HORSE_INFO,
  START_GET_HORSE_INFO,
  SET_CURRENT_SIRE_HORSE_ID,
  CHANGE_SIRE_HORSE_PAGE
} from '../../actionTypes'

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

export const setSireHorseId = (id) => ({
  type: SET_CURRENT_SIRE_HORSE_ID,
  data: id
});

export const changeSireHorsePage = (page) => ({
  type: CHANGE_SIRE_HORSE_PAGE,
  data: page
});
