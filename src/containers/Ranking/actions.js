import {
  START_LOAD_MY_HORSES_ARRAY,
  GET_MY_HORSES_ARRAY_SUCCESS,
  FAIL_LOAD_MY_HORSES_ARRAY,
  GET_HORSE_INFO,
  START_LOAD_HORSE_GENE_ARRAY,
  LOAD_HORSE_GENE_ARRAY_SUCCESS,
  LOAD_HORSE_GENE_ARRAY_FAILED,
  MOVE_GENE_RANK_PAGE,
  START_LOAD_HORSE_TOTAL_PRIZE_ARRAY,
  LOAD_HORSE_TOTAL_PRIZE_ARRAY_FAILED,
  LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS,
  MOVE_TOTAL_PRIZE_RANK_PAGE,
  START_LOAD_WIN_COUNT_HORSE_ARRAY,
  LOAD_WIN_COUNT_ARRAY_SUCCESS,
  LOAD_WIN_COUNT_ARRAY_FAILED,
  MOVE_WIN_COUNT_RANK_PAGE
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

export const startLoadHorseGeneArray = () => ({
  type: START_LOAD_HORSE_GENE_ARRAY
});

export const loadHorseGeneArraySuccess = (horseArray) => ({
  type: LOAD_HORSE_GENE_ARRAY_SUCCESS,
  data: horseArray
});

export const loadHorseGeneArrayFailed = () => ({
  type: LOAD_HORSE_GENE_ARRAY_FAILED
});

export const moveGeneRankPage = (page) => ({
  type: MOVE_GENE_RANK_PAGE,
  data: page
});

export const startLoadHorseTotalPrizeArray = () => ({
  type: START_LOAD_HORSE_TOTAL_PRIZE_ARRAY
});

export const loadHorseTotalPrizeArraySuccess = (horsesArray) => ({
  type: LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS,
  data: horsesArray
});

export const loadHorseTotalPrizeArrayFailed = () => ({
  type: LOAD_HORSE_TOTAL_PRIZE_ARRAY_FAILED
});

export const moveTotalPrizeRankPage = (page) => ({
  type: MOVE_TOTAL_PRIZE_RANK_PAGE,
  data: page
});

export const startLoadHorseWinCountArray = () => ({
  type: START_LOAD_WIN_COUNT_HORSE_ARRAY
});

export const loadHorseWinCountArraySuccess = (horsesArray) => ({
  type: LOAD_WIN_COUNT_ARRAY_SUCCESS,
  data: horsesArray
});

export const loadHorseWinCountArrayFailed = () => ({
  type: LOAD_WIN_COUNT_ARRAY_FAILED
});

export const moveWinCountRankPage = (page) => ({
  type: MOVE_WIN_COUNT_RANK_PAGE,
  data: page
});
