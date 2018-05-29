import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getHorseData} from "../../utils/eth-function";
import {
  selectCurrentHorseId
} from "./selectors";
import {
  getHorseInfoSuccess,
  getHorseInfoFailed
} from "./actions";
import {
  START_GET_HORSE_INFO
} from "../../actionTypes";

export function* getHorseInfo(){
  try{
    const id = yield select(selectCurrentHorseId());
    const horse = yield call(getHorseData,id);
    yield put(getHorseInfoSuccess(horse))
  } catch (err) {
    yield put(getHorseInfoFailed(err))
  }

}

export default function* horseInfoSaga(){
  yield takeLatest(START_GET_HORSE_INFO,getHorseInfo);
}
