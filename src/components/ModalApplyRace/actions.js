import {GET_HORSE_INFO,CHANGE_APPLY_RACE_HORSE_CURRENT_PAGE} from "../../actionTypes";

export const getHorseInfoSuccess = (data) => ({
  type: GET_HORSE_INFO,
  data: {
    id: data[0].toNumber(),
    horse: data
  }
});

export const changeApplyRaceHorsePage = (page) => ({
  type: CHANGE_APPLY_RACE_HORSE_CURRENT_PAGE,
  data: page
});
