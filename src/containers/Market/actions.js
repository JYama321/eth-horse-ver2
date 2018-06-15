import {
  START_LOAD_ON_SALE_HORSES,
  GET_ON_SALE_HORSE_SUCCESS,
  FAIL_LOAD_ON_SALE_HORSE_ARRAY,
  START_LOAD_SALE_HORSE_PRICES,
  GET_SALE_HORSE_PRICES_SUCCESS,
  FAIL_LOAD_SALE_HORSE_PRICES,
  GET_HORSE_INFO,
  CHANGE_MARKET_PAGE
} from "../../actionTypes";


export const getHorseInfoSuccess = (data) => ({
  type: GET_HORSE_INFO,
  data: {
    id: data[0].toNumber(),
    horse: data
  }
});

export const getOnSaleHorsesSuccess = (horses) => ({
  type: GET_ON_SALE_HORSE_SUCCESS,
  data: horses
});

export const getOnSaleHorsesFailed = () => ({
  type: FAIL_LOAD_ON_SALE_HORSE_ARRAY
});

export const startLoadOnSaleHorses = () => ({
  type: START_LOAD_ON_SALE_HORSES
});

export const startLoadOnSaleHorsePrices = () => ({
  type: START_LOAD_SALE_HORSE_PRICES
});

export const getHorsePricesSuccess = (horses) => ({
  type: GET_SALE_HORSE_PRICES_SUCCESS,
  data: horses
});

export const getHorsePricesFailed = () => ({
  type: FAIL_LOAD_SALE_HORSE_PRICES
});

export const changePage = (page) => ({
  type: CHANGE_MARKET_PAGE,
  data: page
});
