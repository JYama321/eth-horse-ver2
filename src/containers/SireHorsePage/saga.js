import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  START_LOAD_MY_HORSES_ARRAY,
  GET_MY_HORSES_ARRAY_SUCCESS,
  CHANGE_SIRE_HORSE_PAGE
} from "../../actionTypes";
import {
  getMyHorseArraySuccess,
  failGetMyHorseArray,
  getHorseInfoSuccess,
} from "./actions";
import {
  selectHorseIdArray,
  selectCurrentSireHorseId,
  selectCurrentSirePage,
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
    const currentHorseId = yield select(selectCurrentSireHorseId());
    const horseInfo = yield select(selectHorseIdToHorseInfo());
    const currentPage = yield select(selectCurrentSirePage());
    const filteredArray = idArray.filter(elem => elem.toNumber() !== currentHorseId);
    const arr = filteredArray.toArray().slice(3*(currentPage-1),3*currentPage);
    for(let i=0;i<arr.length;i++){
      const id = arr[i];
      if(!horseInfo.get(String(id))){
        const horse = yield call(getHorseData,id);
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
  yield takeLatest(CHANGE_SIRE_HORSE_PAGE,batchGetHorseInfo);
}
