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

const selectTrainTicketNum = () => createSelector(
    selectGlobal,
    substate => substate.get('trainTicketNum')
);

const selectShuffleTicketNum = () => createSelector(
    selectGlobal,
    substate => substate.get('shuffleTicketNum')
);

const selectShuffleAllTicketNum = () => createSelector(
    selectGlobal,
    substate => substate.get('shuffleAllTicketNum')
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

const selectMyPageLoaded = () => createSelector(
    selectGlobal,
    substate => substate.get('myPageInfoLoaded')
);

export {
    selectMyPageCurrentDisp,
    selectBalance,
    selectActivity,
    selectTrainTicketNum,
    selectShuffleTicketNum,
    selectShuffleAllTicketNum,
    selectHorseIdArray,
    selectHorseArrayLoading,
    selectCurrentPage,
    selectHorseIdToHorseInfo,
    selectMyPageLoaded
}
