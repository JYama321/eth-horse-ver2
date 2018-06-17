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

export {
  selectMyPageCurrentDisp,
  selectBalance,
  selectActivity,
  selectTicketNum
}
