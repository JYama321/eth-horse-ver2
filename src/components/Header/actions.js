import {
  CHANGE_CURRENT_DISP_RACES,
  CHANGE_MY_PAGE_DISP,
  CHANGE_MARKET_SORT
} from "../../actionTypes";


export const changeCurrentDispRaces = (raceType) => ({
  type: CHANGE_CURRENT_DISP_RACES,
  data: raceType
});

export const changeMyPageCurrentDisplay = (page) => ({
  type: CHANGE_MY_PAGE_DISP,
  data: page
});

export const changeMarketSort = (sort) => ({
  type: CHANGE_MARKET_SORT,
  data: sort
});
