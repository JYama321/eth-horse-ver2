import {createSelector} from "reselect";

const selectGlobal = state => state.global;

const selectMyPageCurrentDisp = () => createSelector(
    selectGlobal,
    substate => substate.get('myPageCurrentDisplay')
);

const selectBalance = () => createSelector(
    selectGlobal,
    substate => substate.get('balance')
);
const selectActivity = () => createSelector(
    selectGlobal,
    substate => substate.get('activities')
);

const selectTicketNum = () => createSelector(
    selectGlobal,
    substate => substate.get('ticketNum')
);

const selectHorseIdArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('myHorseIdArray')
);

const selectHorseArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('isMyHorseArrayLoadDone')
);
const selectCurrentPage = () => createSelector(
    selectGlobal,
    (substate) => substate.get('myHorsePageCurrentPage')
);
const selectHorseIdToHorseInfo = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseIdToHorseInfo')
);

export {
  selectMyPageCurrentDisp,
  selectBalance,
  selectActivity,
  selectTicketNum,
  selectHorseIdArray,
  selectHorseArrayLoading,
  selectCurrentPage,
  selectHorseIdToHorseInfo
}
