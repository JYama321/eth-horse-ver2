import { combineReducers } from 'redux'
import {fromJS,List} from "immutable";
import {
  START_LOAD_MY_HORSES_ARRAY,
  GET_MY_HORSES_ARRAY_SUCCESS,
  FAIL_LOAD_MY_HORSES_ARRAY,
  GET_HORSE_INFO,
  MOVE_MY_PAGE_PAGE,
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
  MOVE_WIN_COUNT_RANK_PAGE,
  START_GET_HORSE_INFO,
  GET_HORSE_INFO_FAILED,
  GET_MAMA_INFO_SUCCESS,
  GET_MAMA_INFO_FAILED,
  GET_PAPA_INFO_FAILED,
  GET_PAPA_INFO_SUCCESS
} from "./actionTypes";

const globalState = fromJS({
  isMyHorseArrayLoading: false,
  myHorseIdArray: [], //my horse
  myHorsePageCurrentPage: 1,

  isSellHorseArrayLoading: false,
  sellHorseArray: [],  // all sell horses
  isHorseSellPriceArrayLoading: false,
  horseSellPriceArray: [], // sell price sort

  bidHorseArrayLoading: false,
  bidHorseArray: [], // all bid horses
  horseMinBidPriceArrayLoading: false,
  horseMinBidPriceArray: [], //min bid price sort

  sireHorseArrayLoading: false,
  sireHorseArray: [], // all sire horses
  horseSirePriceArrayLoading: false,
  horseSirePriceArray: [], //sire price sort

  horseGeneArrayLoading: false,
  horseGeneArray: [], //strength rank
  rankGeneCurrentPage: 1,
  horsePrizeArrayLoading: false,
  horsePrizeArray: [], // prize rank
  rankPrizeCurrentPage: 1,
  horseWinCountArrayLoading: false,
  horseWinCountArray: [], // prize rank
  rankWinCountCurrentPage: 1,

  allRaceArrayLoading: false,
  allRaceArray: [], // all races

  wanedRaceArrayLoading: false,
  wantedRaceArray: [], // currently wanted race

  bettingRaceArrayLoading: false,
  bettingRaceArray: [], // currently betting race

  checkedRaceArrayLoading: false,
  checkedRaceArray: [], // already end race

  location: null,
  horseIdToHorseInfo: {},
  isHorseInfoLoading: true,
  currentSearchHorseId: 0,
  isPapaLoading: true,
  isMamaLoading: true
});

function globalReducer(state = globalState ,action){
  switch (action.type){
    case START_LOAD_MY_HORSES_ARRAY:
      return state.set('isMyHorseArrayLoading',true);
    case GET_MY_HORSES_ARRAY_SUCCESS:
      return state.set('myHorseIdArray',List(action.data)).set('isMyHorseArrayLoading',false);
    case FAIL_LOAD_MY_HORSES_ARRAY:
      return state.set('isMyHorseArrayLoading', false);
    case GET_HORSE_INFO:
      const horse = state.get('horseIdToHorseInfo').get(String(action.data.id));
      if(horse){
        return state
      } else {
        return state.set('horseIdToHorseInfo',state.get('horseIdToHorseInfo').set(String(action.data.id),action.data.horse)).set('isHorseInfoLoading',false)
      }
    case MOVE_MY_PAGE_PAGE:
      return state.set('myHorsePageCurrentPage',action.data);
    case START_LOAD_HORSE_GENE_ARRAY:
      return state.set('horseGeneArrayLoading',true);
    case LOAD_HORSE_GENE_ARRAY_SUCCESS:
      return state.set('horseGeneArrayLoading',false).set('horseGeneArray',List(action.data));
    case LOAD_HORSE_GENE_ARRAY_FAILED:
      return state.set('horseGeneArrayLoading',false);
    case MOVE_GENE_RANK_PAGE:
      return state.set('rankGeneCurrentPage',action.data);
    case START_LOAD_HORSE_TOTAL_PRIZE_ARRAY:
      return state.set('horsePrizeArrayLoading', true);
    case LOAD_HORSE_TOTAL_PRIZE_ARRAY_FAILED:
      return state.set('horsePrizeArrayLoading', false);
    case LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS:
      return state.set('horsePrizeArrayLoading', false).set('horsePrizeArray', List(action.data));
    case MOVE_TOTAL_PRIZE_RANK_PAGE:
      return state.set('rankPrizeCurrentPage', action.data);
    case START_LOAD_WIN_COUNT_HORSE_ARRAY:
      return state.set('horseWinCountArrayLoading',true);
    case LOAD_WIN_COUNT_ARRAY_SUCCESS:
      return state.set('horseWinCountArray', List(action.data)).set('horseWinCountArrayLoading', false);
    case LOAD_WIN_COUNT_ARRAY_FAILED:
      return state.set('horseWinCountArrayLoading', false);
    case MOVE_WIN_COUNT_RANK_PAGE:
      return state.set('rankWinCountCurrentPage', action.data);
    case START_GET_HORSE_INFO:
      return state.set('isHorseInfoLoading',true).set('currentSearchHorseId',action.data);
    case GET_HORSE_INFO_FAILED:
      return state.set('GET_HORSE_INFO_FAILED', false);
    case GET_MAMA_INFO_SUCCESS:
      return state.set('isMamaLoading', false);
    case GET_MAMA_INFO_FAILED:
      return state.set('isMamaLoading', false);
    case GET_PAPA_INFO_SUCCESS:
      return state.set('isPapaLoading', false);
    case GET_PAPA_INFO_FAILED:
      return state.set('isPapaLoading', false);
    default:
      return state;
  }
}



export default function createReducer(injectedReducers){
  return combineReducers({
    global: globalReducer,
      ...injectedReducers
  });
}
