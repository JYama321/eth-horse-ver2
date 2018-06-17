import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  getRace
} from "../../utils/eth-function";
import {
  START_LOAD_RACE_ARRAY,
  CHANGE_RACE_PAGE
} from "../../actionTypes";
import {
  failGetRaces,
  getRaceInfo
} from "./actions";
import{
  selectWantedRaceArray,
} from './selectors'
export function* startGetRaces () {
  try{
    const wantedRaces = yield select(selectWantedRaceArray());
    for(let i=0;i<wantedRaces.length;i++){
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


