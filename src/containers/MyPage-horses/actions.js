import {
  START_LOAD_MY_HORSES_ARRAY,
  GET_MY_HORSES_ARRAY_SUCCESS,
  FAIL_LOAD_MY_HORSES_ARRAY,
  GET_HORSE_INFO,
  MOVE_MY_PAGE_PAGE
} from '../../actionTypes'

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

export const moveMyPageHorsePagination = (page) => ({
  type: MOVE_MY_PAGE_PAGE,
  data: page
});
