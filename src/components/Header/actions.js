import {
  CHANGE_CURRENT_DISP_RACES
} from "../../actionTypes";


export const changeCurrentDispRaces = (raceType) => ({
  type: CHANGE_CURRENT_DISP_RACES,
  data: raceType
});

