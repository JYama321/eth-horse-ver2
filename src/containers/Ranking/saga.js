import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  START_LOAD_HORSE_GENE_ARRAY,
  LOAD_HORSE_GENE_ARRAY_SUCCESS,
  MOVE_GENE_RANK_PAGE,
  START_LOAD_HORSE_TOTAL_PRIZE_ARRAY,
  LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS,
  START_LOAD_WIN_COUNT_HORSE_ARRAY,
  LOAD_WIN_COUNT_ARRAY_SUCCESS
} from "../../actionTypes";
import {
  loadHorseGeneArraySuccess,
  failGetMyHorseArray,
  getHorseInfoSuccess,
  loadHorseTotalPrizeArraySuccess,
  loadHorseTotalPrizeArrayFailed,
  loadHorseWinCountArraySuccess,
  loadHorseWinCountArrayFailed
} from "./actions";
import {
  selectHorseGeneArray,
  selectRankGeneCurrentPage,
  selectRankTotalPrizeArray,
  selectRankTotalPrizeCurrentPage,
  selectRankWinCountArray,
  selectRankWinCountCurrentPage,
} from "./selectors";
import {
  getHorseGeneArray,
  getHorseData,
  getHorseTotalPrizeArray,
  getHorseWinCountArray
} from '../../utils/eth-function'

export function* getHorseGenes(){
  try{
    const horsesArray = yield call(getHorseGeneArray);
    console.log(horsesArray);
    const geneIdArray = horsesArray.map(function(elem,index,self){
      const gene = elem.c.join(',').replace(/,/g,'');
      const strength =
          Number(gene.slice(gene.length-15,gene.length-12))+Number(gene.slice(gene.length-12,gene.length-9))+
          Number(gene.slice(gene.length-9,gene.length-6))+Number(gene.slice(gene.length-6,gene.length-3))+
          Number(gene.slice(gene.length-3,gene.length));
      return {
        id: index + 1,
        strength: strength
      }
    });
    geneIdArray.sort(function(a,b){
      if(a.strength >= b.strength){
        return -1;
      }else{
        return 1
      }
    });
    yield put(loadHorseGeneArraySuccess(geneIdArray))
  }catch (err){
    yield put(failGetMyHorseArray())
  }
}

export function* getHorseTotalPrizes(){
  try{
    const horseArray = yield call(getHorseTotalPrizeArray);
    const prizeIdArray = horseArray.map(function(elem,index,self){
      const totalPrize = window.web3.fromWei(elem,'ether').toFixed(4);
      return {
        id: index+1,
        totalPrize: totalPrize
      }
    });
    prizeIdArray.sort(function(a,b){
      if(a.totalPrize > b.totalPrize){
        return -1;
      }else {
        return 1;
      }
    });
    yield put(loadHorseTotalPrizeArraySuccess(prizeIdArray))
  } catch (err) {
    yield put(loadHorseTotalPrizeArrayFailed())
  }
}

export function* getHorseWinCounts(){
  try{
    const horseArray = yield call(getHorseWinCountArray);
    const winCountArray = horseArray.map(function(elem,index,self){
      return {
        id: index+1,
        winCount: elem.toNumber()
      }
    });
    winCountArray.sort(function(a,b){
      if(a.winCount > b.winCount){
        return -1;
      }else{
        return 1;
      }
    });
    yield put(loadHorseWinCountArraySuccess(winCountArray))
  }catch (err) {
    yield put(loadHorseWinCountArrayFailed());
  }
}

export function* batchGetGeneHorseInfo(){
  try{
    const idArray = yield select(selectHorseGeneArray());
    const currentPage = yield select(selectRankGeneCurrentPage());
    const arr = idArray.toArray().slice(8*(currentPage-1),8*currentPage);
    for(let i=0;i<arr.length;i++){
      const horse = yield call(getHorseData,arr[i].id);
      yield put(getHorseInfoSuccess(horse));
    }
  } catch(err) {
    console.log(err)
  }
}

export function* batchGetTotalPrizeHorseInfo(){
  try{
    const idArray = yield select(selectRankTotalPrizeArray());
    const currentPage = yield select(selectRankTotalPrizeCurrentPage());
    const arr = idArray.toArray().slice(8*(currentPage-1),8*currentPage);
    for(let i=0;i<arr.length;i++){
      const horse = yield call(getHorseData,arr[i].id);
      yield put(getHorseInfoSuccess(horse));
    }
  } catch(err) {
    console.log(err)
  }
}

export function* batchGetWinCountHorseInfo(){
  try{
    const idArray = yield select(selectRankWinCountArray());
    const currentPage = yield select(selectRankWinCountCurrentPage());
    const arr = idArray.toArray().slice(8*(currentPage-1),8*currentPage);
    for(let i=0;i<arr.length;i++){
      const horse = yield call(getHorseData,arr[i].id);
      yield put(getHorseInfoSuccess(horse));
    }
  } catch(err) {
    console.log(err)
  }
}

export default function* rankingSaga(){
  yield takeLatest(START_LOAD_HORSE_GENE_ARRAY,getHorseGenes);
  yield takeLatest(LOAD_HORSE_GENE_ARRAY_SUCCESS,batchGetGeneHorseInfo);
  yield takeLatest(MOVE_GENE_RANK_PAGE,batchGetGeneHorseInfo);
  yield takeLatest(START_LOAD_HORSE_TOTAL_PRIZE_ARRAY,getHorseTotalPrizes);
  yield takeLatest(LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS,batchGetTotalPrizeHorseInfo);
  yield takeLatest(START_LOAD_WIN_COUNT_HORSE_ARRAY,getHorseWinCounts);
  yield takeLatest(LOAD_WIN_COUNT_ARRAY_SUCCESS,batchGetWinCountHorseInfo);
}
