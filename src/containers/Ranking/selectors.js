import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectHorseGeneArrayLoading = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseGeneArrayLoading')
);

const selectHorseGeneArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseGeneArray')
);

const selectHorseIdToHorseInfo = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseIdToHorseInfo')
);

const selectRankTotalPrizeArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horsePrizeArray')
);

const selectRankWinCountArray = () => createSelector(
    selectGlobal,
    (substate) => substate.get('horseWinCountArray')
);

export {
  selectGlobal,
  selectHorseGeneArrayLoading,
  selectHorseGeneArray,
  selectHorseIdToHorseInfo,
  selectRankTotalPrizeArray,
  selectRankWinCountArray,
}
