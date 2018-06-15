import {createSelector} from 'reselect'

const selectGlobal = state => state.global;

const selectOnSaleHorseArray = () => createSelector(
  selectGlobal,
  substate => substate.get('sellHorseArray')
);

const selectOnSaleArrayLoaded = () => createSelector(
    selectGlobal,
    substate => substate.get('isSellHorseArrayLoaded')
);

const selectOnSalePriceArrayLoaded = () => createSelector(
    selectGlobal,
    substate => substate.get('isHorseSellPriceArrayLoaded')
);

const selectOnSalePriceArray = () => createSelector(
    selectGlobal,
    substate => substate.get('horseSellPriceArray')
);

const selectHorseIdToHorseInfo = () => createSelector(
    selectGlobal,
    substate => substate.get('horseIdToHorseInfo')
);

const selectCurrentMarketPage = () => createSelector(
    selectGlobal,
    substate => substate.get('marketCurrentPage')
);

export {
  selectOnSaleArrayLoaded,
  selectOnSaleHorseArray,
  selectOnSalePriceArray,
  selectOnSalePriceArrayLoaded,
  selectHorseIdToHorseInfo,
  selectCurrentMarketPage
}
