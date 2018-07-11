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

const selectMarketSort = () => createSelector(
    selectGlobal,
    substate => substate.get('marketSorted')
);

const selectSireHorsesArray = () => createSelector(
    selectGlobal,
    substate => substate.get('sireHorseArray')
);

const selectSirePricesArray = () => createSelector(
    selectGlobal,
    substate => substate.get('horseSirePriceArray')
);

const selectMarketType = () => createSelector(
    selectGlobal,
    substate => substate.get('marketType')
);

const selectActivity = () => createSelector(
  selectGlobal,
  substate => substate.get('activities')
)
export {
  selectOnSaleArrayLoaded,
  selectOnSaleHorseArray,
  selectOnSalePriceArray,
  selectOnSalePriceArrayLoaded,
  selectHorseIdToHorseInfo,
  selectCurrentMarketPage,
  selectMarketSort,
  selectSireHorsesArray,
  selectSirePricesArray,
  selectMarketType,
  selectActivity
}
