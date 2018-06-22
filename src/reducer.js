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
  GET_PAPA_INFO_SUCCESS,
  SET_CURRENT_SIRE_HORSE_ID,
  START_LOAD_ON_SALE_HORSES,
  FAIL_LOAD_ON_SALE_HORSE_ARRAY,
  GET_ON_SALE_HORSE_SUCCESS,
  START_LOAD_SALE_HORSE_PRICES,
  FAIL_LOAD_SALE_HORSE_PRICES,
  GET_SALE_HORSE_PRICES_SUCCESS,
  CHANGE_MARKET_PAGE,
  CHANGE_CURRENT_DISP_RACES,
  //races
  CHANGE_RACE_PAGE,
  GET_RACES_ARRAY_SUCCESS,
  FAIL_GET_RACES_ARRAY,
  START_LOAD_RACE_ARRAY,
  GET_WANTED_RACE_ARRAY,
  GET_BETTING_RACE_ARRAY,
  GET_CHECKED_RACE_ARRAY,
  GET_MY_RACES,
  GET_RACE_INFO,
  GET_ACTIVITIES,
  CHANGE_MY_PAGE_DISP,
  //Balance
  GET_USER_BALANCE,
  GET_TICKET_NUM,
  //horse owner
  GET_CURRENT_SEARCH_HORSE_OWNER,
  CHANGE_APPLY_RACE_HORSE_CURRENT_PAGE,
  CHANGE_MARKET_SORT
} from "./actionTypes";

const globalState = fromJS({
  isMyHorseArrayLoadDone: false,
  isMySireHorseArrayLoading: false,
  myHorseIdArray: [], //my horse
  myHorsePageCurrentPage: 1,
  applyRaceHorseCurrentPage: 1,

  isSellHorseArrayLoaded: false,
  sellHorseArray: [],  // all sell horses
  isHorseSellPriceArrayLoaded: false,
  horseSellPriceArray: [], // sell price sort,
  marketCurrentPage: 1,
  marketSorted: 'default',

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

  allRaceArrayLoaded: false,
  allRaceArray: 1, // all races,
  isAllRaceArrayLoaded: false,
  raceCurrentPage: 1,
  raceIdToRaceInfo: {},
  wanedRaceArrayLoaded: false,
  wantedRaceArray: [], // currently wanted race

  bettingRaceArrayLoaded: false,
  bettingRaceArray: [], // currently betting race

  checkedRaceArrayLoading: false,
  checkedRaceArray: [], // already end race

  myRacesArray: [],

  location: null,
  horseIdToHorseInfo: {},
  isHorseInfoLoading: true,
  currentSearchHorseId: 0,
  currentSearchHorseOwner: '',

  currentSireHorseId: 0,
  isPapaLoading: true,
  isMamaLoading: true,
  //header
  racesCurrentDisplay: 'now-wanted',
  myPageCurrentDisplay: 'status',
  //activity
  activities: [],
  //balance
  balance: 0,
  //ticketNum
  ticketNum: 0,

});

function globalReducer(state = globalState ,action){
  switch (action.type){
    case START_LOAD_MY_HORSES_ARRAY:
      return state.set('isMyHorseArrayLoadDone',false);
    case GET_MY_HORSES_ARRAY_SUCCESS:
      return state.set('myHorseIdArray',List(action.data)).set('isMyHorseArrayLoadDone',true);
    case FAIL_LOAD_MY_HORSES_ARRAY:
      return state.set('isMyHorseArrayLoadDone', false);
    case GET_HORSE_INFO:
      const horse = state.get('horseIdToHorseInfo').get(String(action.data.id));
      if(horse){
        return state
      } else {
        return state.set('horseIdToHorseInfo',state.get('horseIdToHorseInfo').set(String(action.data.id),action.data.horse)).set('isHorseInfoLoading',false)
      }
    case START_LOAD_ON_SALE_HORSES:
      return state.set('isSellHorseArrayLoaded', false);
    case FAIL_LOAD_ON_SALE_HORSE_ARRAY:
      return state.set('isSellHorseArrayLoaded', true);
    case GET_ON_SALE_HORSE_SUCCESS:
      return state.set('isSellHorseArrayLoaded', true).set('sellHorseArray',List(action.data));
    case MOVE_MY_PAGE_PAGE:
      return state.set('myHorsePageCurrentPage',action.data);
    case START_LOAD_HORSE_GENE_ARRAY:
      return state.set('horseGeneArrayLoading',true);
    case LOAD_HORSE_GENE_ARRAY_SUCCESS:
      return state.set('horseGeneArrayLoading',false).set('horseGeneArray',List(action.data));
    case LOAD_HORSE_GENE_ARRAY_FAILED:
      return state.set('horseGeneArrayLoading',false);
    case START_LOAD_SALE_HORSE_PRICES:
      return state.set('isHorseSellPriceArrayLoaded', false);
    case CHANGE_MARKET_PAGE:
      return state.set('marketCurrentPage', action.data);
    case CHANGE_MARKET_SORT:
      return state.set('marketSorted', action.data);
    case FAIL_LOAD_SALE_HORSE_PRICES:
      return state.set('isHorseSellPriceArrayLoaded', false);
    case GET_SALE_HORSE_PRICES_SUCCESS:
      return state.set('horseSellPriceArray', List(action.data)).set('isHorseSellPriceArrayLoaded',true);
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
    case GET_CURRENT_SEARCH_HORSE_OWNER:
      return state.set('currentSearchHorseOwner', action.data);
    case SET_CURRENT_SIRE_HORSE_ID:
      return state.set('currentSireHorseId', action.data);
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
    case CHANGE_CURRENT_DISP_RACES:
      return state.set('racesCurrentDisplay', action.data);
    case CHANGE_RACE_PAGE:
      return state.set('raceCurrentPage', action.data);
    case CHANGE_MY_PAGE_DISP:
      return state.set('myPageCurrentDisplay', action.data);
    case START_LOAD_RACE_ARRAY:
      return state.set('allRaceArrayLoaded', false);
    case GET_RACES_ARRAY_SUCCESS:
      return state.set('allRaceArray', action.data).set('allRaceArrayLoaded', true);
    case FAIL_GET_RACES_ARRAY:
      return state.set('allRaceArrayLoaded', false);
    case GET_WANTED_RACE_ARRAY:
      return state.set('wantedRaceArray', action.data);
    case GET_BETTING_RACE_ARRAY:
      return state.set('bettingRaceArray', action.data);
    case GET_CHECKED_RACE_ARRAY:
      return state.set('checkedRaceArray', action.data);
    case GET_MY_RACES:
      return state.set('myRacesArray', action.data);
    case GET_RACE_INFO:
      return state.set('raceIdToRaceInfo',state.get('raceIdToRaceInfo').set(String(action.data.id),action.data.race));
    case GET_ACTIVITIES:
      return state.set('activities', state.get('activities').concat(action.data));
    case GET_USER_BALANCE:
      return state.set('balance', action.data);
    case GET_TICKET_NUM:
      return state.set('ticketNum', action.data);
    case CHANGE_APPLY_RACE_HORSE_CURRENT_PAGE:
      return state.set('applyRaceHorseCurrentPage', action.data);
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
