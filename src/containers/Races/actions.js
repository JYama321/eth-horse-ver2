import {
  FAIL_GET_RACES_ARRAY,
  GET_WANTED_RACE_ARRAY,
  GET_BETTING_RACE_ARRAY,
  GET_CHECKED_RACE_ARRAY,
  GET_RACE_INFO,
  START_LOAD_RACE_ARRAY,
  GET_HORSE_INFO,
  CHANGE_RACE_PAGE,
  CHANGE_CURRENT_DISP_RACES
} from "../../actionTypes";

export const startLoadRaceArray = () => ({
  type: START_LOAD_RACE_ARRAY
});


export const failGetRaces = () => ({
  type: FAIL_GET_RACES_ARRAY
});


export const getRaceInfo = (info) => ({
  type: GET_RACE_INFO,
  data: {
    id: info[0].toNumber(),
    race: info
  }
});


export const changeRacePage = (page) => ({
  type: CHANGE_RACE_PAGE,
  data: page
});

export const changeRaceCurrentDisp = (disp) => ({
  type: CHANGE_CURRENT_DISP_RACES,
  data: disp
});
