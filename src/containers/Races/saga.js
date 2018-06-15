import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  getAllRaceArray,
  getWantedRaceArray,
  getBettingRaceArray,
  getCheckedRaceArray,
  getRace
} from "../../utils/eth-function";
import {
  START_LOAD_RACE_ARRAY,
  CHANGE_RACE_PAGE
} from "../../actionTypes";
import {
  getRacesArray,
  getBettingRaces,
  getWantedRaces,
  failGetRaces,
  getCheckedRaces,
  getRaceInfo
} from "./actions";
import{

} from './selectors'
export function* startGetRaces () {
  try{
    const allRaceNum = yield call(getAllRaceArray);
    const wantedRaces = yield call(getWantedRaceArray);
    const bettingRaces = yield call(getBettingRaceArray);
    const checkedRaces = yield call(getCheckedRaceArray);
    yield put(getWantedRaces(wantedRaces));
    yield put(getBettingRaces(bettingRaces));
    yield put(getCheckedRaces(checkedRaces));
    yield put(getRacesArray(allRaceNum));
    for(let i=0;i<allRaceNum;i++){
      const race = yield call(getRace,i);
      yield put(getRaceInfo(race));
    }
  } catch(err) {
    yield put(failGetRaces())
  }
}

export function* getRaces () {

}


export default function* raceSaga() {
  yield takeLatest(START_LOAD_RACE_ARRAY, startGetRaces);
  yield takeLatest(CHANGE_RACE_PAGE, getRaces)
}


