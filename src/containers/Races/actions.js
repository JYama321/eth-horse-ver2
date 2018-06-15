import {
  GET_RACES_ARRAY_SUCCESS,
  FAIL_GET_RACES_ARRAY,
  GET_WANTED_RACE_ARRAY,
  GET_BETTING_RACE_ARRAY,
  GET_CHECKED_RACE_ARRAY,
  GET_RACE_INFO,
  START_LOAD_RACE_ARRAY,
  GET_HORSE_INFO,
  CHANGE_RACE_PAGE
} from "../../actionTypes";

export const startLoadRaceArray = () => ({
  type: START_LOAD_RACE_ARRAY
});

export const getRacesArray = (data) => ({
  type: GET_RACES_ARRAY_SUCCESS,
  data: data
});

export const failGetRaces = () => ({
  type: FAIL_GET_RACES_ARRAY
});

export const getWantedRaces = (array) => ({
  type: GET_WANTED_RACE_ARRAY,
  data: array
});

export const getBettingRaces = (array) => ({
  type: GET_BETTING_RACE_ARRAY,
  data: array
});

export const getCheckedRaces = (array) => ({
  type: GET_CHECKED_RACE_ARRAY,
  data: array
});

export const getRaceInfo = (info) => ({
  type: GET_RACE_INFO,
  data: {
    id: info[0].toNumber(),
    race: info
  }
});

export const getHorseInfo = (data) => ({
  type: GET_HORSE_INFO,
  data: {
    id: data[0].toNumber(),
    horse: data
  }
});

export const changeRacePage = (page) => ({
  type: CHANGE_RACE_PAGE,
  data: page
});
