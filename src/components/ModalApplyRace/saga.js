import {call, put, select, takeLatest} from 'redux-saga/effects';
import {CHANGE_APPLY_RACE_HORSE_CURRENT_PAGE} from '../../actionTypes'
import {
  getHorseInfoSuccess
} from './actions'
import {
  selectHorseInfo,
  selectCurrentApplyModalPage,
  selectMyHorseIdArray
} from "./selectors";
import {
  getHorseData
} from "../../utils/eth-function";



export function* getHorseInfo(){
  try{
    const currentPage = yield select(selectCurrentApplyModalPage());
    const horseInfo = yield select(selectHorseInfo());
    const idArray = yield select(selectMyHorseIdArray());
    const ids = idArray.slice((currentPage-1) * 3,currentPage * 3).toArray();
    for(let i=0;i<3;i++){
      const id = ids[i];
      if(!horseInfo.get(String(id))){
        const horse = yield call(getHorseData,id);
        yield put(getHorseInfoSuccess(horse));
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export default function* applyModalSaga(){
  yield takeLatest(CHANGE_APPLY_RACE_HORSE_CURRENT_PAGE, getHorseInfo)
}

