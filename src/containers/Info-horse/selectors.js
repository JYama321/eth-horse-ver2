import {createSelector} from "reselect";

const selectGlobal = state => state.global;

const selectHorseIdToHorseInfo = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseIdToHorseInfo')
);

const selectCurrentHorseId = () => createSelector(
    selectGlobal,
    (substate) => substate.get('currentSearchHorseId')
);

const selectIsHorseInfoLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('isHorseInfoLoading')
);

const selectHorseOwner = () => createSelector(
    selectGlobal,
    substate => substate.get('currentSearchHorseOwner')
);


export {
  selectHorseIdToHorseInfo,
  selectCurrentHorseId,
  selectIsHorseInfoLoading,
  selectHorseOwner
}
