import {
  FAIL_GET_RACES_ARRAY, GET_BETTING_RACE_ARRAY, GET_CHECKED_RACE_ARRAY,
  GET_WANTED_RACE_ARRAY, GET_MY_RACES, GET_ACTIVITIES,
  GET_USER_BALANCE, GET_TICKET_NUM, GET_MY_HORSES_ARRAY_SUCCESS
} from "./actionTypes";

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

export const failGetRaces = () => ({
  type: FAIL_GET_RACES_ARRAY
});

export const getMyRaces = (race) => ({
  type: GET_MY_RACES,
  data: race
});

export const getActivities = (activity) => ({
  type: GET_ACTIVITIES,
  data: activity
});

export const getUserBalance = (balance) => ({
  type: GET_USER_BALANCE,
  data: balance
});

export const getMyHorseArraySuccess = (array) => ({
  type: GET_MY_HORSES_ARRAY_SUCCESS,
  data: array
});

export const getTicket = (num) => ({
  type: GET_TICKET_NUM,
  data: num
});
