import {
  CHANGE_CURRENT_DISP_RACES,
  CHANGE_MY_PAGE_DISP
} from "../../actionTypes";


export const changeCurrentDispRaces = (raceType) => ({
  type: CHANGE_CURRENT_DISP_RACES,
  data: raceType
});

export const changeMyPageCurrentDisplay = (page) => ({
  type: CHANGE_MY_PAGE_DISP,
  data: page
});
