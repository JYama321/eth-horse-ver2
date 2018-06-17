import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  START_LOAD_MY_HORSES_ARRAY,
  GET_MY_HORSES_ARRAY_SUCCESS,
} from "../../actionTypes";
import {
  getMyHorseArraySuccess,
  failGetMyHorseArray,
  getHorseInfoSuccess,
} from "./actions";
import {
  selectHorseIdArray,
  selectCurrentPage,
  selectHorseIdToHorseInfo
} from "./selectors";
import {
  getMyHorsesArray,
  getHorseData
} from '../../utils/eth-function'

export function* getMyHorseArray(){
  try{
    const horsesArray = yield call(getMyHorsesArray);
    yield put(getMyHorseArraySuccess(horsesArray))
  }catch (err){
    yield put(failGetMyHorseArray())
  }
}

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
  yield takeLatest(START_LOAD_MY_HORSES_ARRAY,getMyHorseArray);
  yield takeLatest(GET_MY_HORSES_ARRAY_SUCCESS,batchGetHorseInfo);
}
