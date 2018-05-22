import { combineReducers } from 'redux'
import {fromJS,List} from "immutable";
import {
  START_LOAD_MY_HORSES_ARRAY,
  GET_MY_HORSES_ARRAY_SUCCESS,
  FAIL_LOAD_MY_HORSES_ARRAY,
  GET_HORSE_INFO,
} from "./actionTypes";

const globalState = fromJS({
  isMyHorseArrayLoading: false,
  myHorseIdArray: [], //my horse

  isSellHorseArrayLoaded: false,
  sellHorseArray: [],  // all sell horses
  isHorseSellPriceArrayLoaded: false,
  horseSellPriceArray: [], // sell price sort

  bidHorseArrayLoaded: false,
  bidHorseArray: [], // all bid horses
  horseMinBidPriceArrayLoaded: false,
  horseMinBidPriceArray: [], //min bid price sort

  sireHorseArrayLoaded: false,
  sireHorseArray: [], // all sire horses
  horseSirePriceArrayLoaded: false,
  horseSirePriceArray: [], //sire price sort

  horseGeneArrayLoaded: false,
  horseGeneArray: [], //strength rank
  horsePrizeArrayLoaded: false,
  horsePrizeArray: [], // prize rank

  allRaceArrayLoaded: false,
  allRaceArray: [], // all races
  wanedRaceArrayLoaded: false,
  wantedRaceArray: [], // currently wanted race
  bettingRaceArrayLoaded: false,
  bettingRaceArray: [], // currently betting race
  checkedRaceArrayLoaded: false,
  checkedRaceArray: [], // already end race

  location: null,
  horseIdToHorseInfo: {}
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
      const horse = state.get('horseIdToHorseInfo').get(action.data.id);
      if(horse){
        return state
      } else {
        return state.set('horseIdToHorseInfo',state.get('horseIdToHorseInfo').set(String(action.data.id),action.data.horse))
      }
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
