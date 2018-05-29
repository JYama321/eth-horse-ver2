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

const selectIsMamaInfoLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('isMamaLoading')
);

const selectIsPapaInfoLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('isPapaLoading')
);

export {
  selectHorseIdToHorseInfo,
  selectCurrentHorseId,
  selectIsMamaInfoLoading,
  selectIsPapaInfoLoading
}
