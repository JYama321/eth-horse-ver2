import {CHANGE_MY_PAGE_DISP} from "../../actionTypes";


export const changeCurrentDisplay = (page) => ({
  type: CHANGE_MY_PAGE_DISP,
  data: page
});
