import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getHorseData,ownerOf} from "../../utils/eth-function";
import {
  selectCurrentHorseId
} from "./selectors";
import {
  getHorseInfoSuccess,
  getHorseInfoFailed,
  getCurrentSearchHorseOwner
} from "./actions";
import {
  START_GET_HORSE_INFO
} from "../../actionTypes";

export function* getHorseInfo(){
  try{
    const id = yield select(selectCurrentHorseId());
    const horseOwner = yield call(ownerOf,id);
    const horse = yield call(getHorseData,id);
    yield put(getCurrentSearchHorseOwner(horseOwner))
    yield put(getHorseInfoSuccess(horse))
  } catch (err) {
    yield put(getHorseInfoFailed(err))
  }

}

export default function* horseInfoSaga(){
  yield takeLatest(START_GET_HORSE_INFO,getHorseInfo);
}
