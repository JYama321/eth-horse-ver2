import {
  FAIL_GET_RACES_ARRAY, GET_BETTING_RACE_ARRAY, GET_CHECKED_RACE_ARRAY,
  GET_WANTED_RACE_ARRAY, GET_MY_RACES, GET_ACTIVITIES,
  GET_USER_BALANCE, GET_TICKET_NUM, GET_MY_HORSES_ARRAY_SUCCESS,
  LOAD_WIN_COUNT_ARRAY_SUCCESS, LOAD_HORSE_GENE_ARRAY_SUCCESS,
  LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS, GET_SIRE_PRICES_ARRAY,
  GET_SIRE_HORSES
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

export const getTotalPrizeArray = (array) => ({
  type: LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS,
  data: array
});

export const getWinCountArray = (array) => ({
  type: LOAD_WIN_COUNT_ARRAY_SUCCESS,
  data: array
});

export const getHorseGeneArray = (array) => ({
  type: LOAD_HORSE_GENE_ARRAY_SUCCESS,
  data: array
});

export const getSirePrices = (array) => ({
  type: GET_SIRE_PRICES_ARRAY,
  data: array
});

export const getSireHorses = (array) => ({
  type: GET_SIRE_HORSES,
  data: array
});
