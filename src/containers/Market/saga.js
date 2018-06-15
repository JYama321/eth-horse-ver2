import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  START_LOAD_ON_SALE_HORSES,
  CHANGE_MARKET_PAGE,
  GET_ON_SALE_HORSE_SUCCESS,
  START_LOAD_SALE_HORSE_PRICES
} from "../../actionTypes";
import {
  getOnSaleHorses,
  getHorseData,
  getHorsePrices
} from "../../utils/eth-function";
import {
  getOnSaleHorsesSuccess,
  getOnSaleHorsesFailed,
  getHorsePricesSuccess,
  getHorsePricesFailed,
  getHorseInfoSuccess
} from "./actions";
import {
  selectHorseIdToHorseInfo,
  selectCurrentMarketPage,
  selectOnSaleHorseArray,
  selectOnSalePriceArray,
  selectOnSalePriceArrayLoaded
} from "./selectors";

export function* getSaleHorses(){
  try{
    const horseArray = yield call(getOnSaleHorses);
    const priceArray = yield call(getHorsePrices);
    yield put(getHorsePricesSuccess(priceArray));
    yield put(getOnSaleHorsesSuccess(horseArray));
  }catch(err){
    yield put(getOnSaleHorsesFailed())
  }
}


export function* batchGetOnSaleHorseInfo(){
  try{
    const saleHorseArray = yield select(selectOnSaleHorseArray());
    const currentPage = yield select(selectCurrentMarketPage());
    const horseInfo = yield select(selectHorseIdToHorseInfo());
    const arr = saleHorseArray.toArray().slice(8*(currentPage-1),8*currentPage);
    for(let i=0;i<arr.length;i++){
      if(!horseInfo.get(String(arr[i].toNumber()))){
        const horse = yield call(getHorseData,arr[i].toNumber());
        yield put(getHorseInfoSuccess(horse))
      }
    }
  } catch (err) {
    console.log(err)
  }
}


export default function* marketSaga() {
  yield takeLatest(START_LOAD_ON_SALE_HORSES,getSaleHorses);
  yield takeLatest(GET_ON_SALE_HORSE_SUCCESS, batchGetOnSaleHorseInfo);
  yield takeLatest(CHANGE_MARKET_PAGE, batchGetOnSaleHorseInfo)
}
