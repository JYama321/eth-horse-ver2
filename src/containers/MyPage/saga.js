import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  START_LOAD_MY_HORSES,
} from "../../actionTypes";
import {
  getHorseInfoSuccess,
} from "./actions";
import {
  selectHorseIdArray,
  selectCurrentPage,
  selectHorseIdToHorseInfo
} from "./selectors";
import {
  getHorseData
} from '../../utils/eth-function'


export function* batchGetHorseInfo(){
  try{
    const idArray = yield select(selectHorseIdArray());
    const currentPage = yield select(selectCurrentPage());
    const horseInfo = yield select(selectHorseIdToHorseInfo());
    const arr = idArray.toArray().slice(8*(currentPage-1),8*currentPage);
    for(let i=0;i<arr.length;i++){
      if(!horseInfo.get(String(arr[i].toNumber()))){
        const horse = yield call(getHorseData,arr[i].toNumber());
        yield put(getHorseInfoSuccess(horse));
      }
    }
  } catch(err) {
    console.log(err)
  }
}



export default function* myHorseSaga(){
  yield takeLatest(START_LOAD_MY_HORSES,batchGetHorseInfo);
}
