import {
    FAIL_GET_RACES_ARRAY, GET_BETTING_RACE_ARRAY, GET_CHECKED_RACE_ARRAY,
    GET_WANTED_RACE_ARRAY, GET_MY_RACES, GET_ACTIVITIES,
    GET_USER_BALANCE, GET_TRAIN_TICKET_NUM, GET_MY_HORSES_ARRAY_SUCCESS,
    LOAD_WIN_COUNT_ARRAY_SUCCESS, LOAD_HORSE_GENE_ARRAY_SUCCESS,
    LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS, GET_SIRE_PRICES_ARRAY,
    GET_SIRE_HORSES, GET_SHUFFLE_TICKET_NUM, GET_SHUFFLE_ALL_TICKET_NUM,
    GET_ON_SALE_HORSE_SUCCESS, GET_SALE_HORSE_PRICES_SUCCESS,
    GET_RACE_INFO, GET_HORSE_INFO, GET_MATE_PRICE
} from "./actionTypes";

export const getWantedRaces = (array) => ({
    type: GET_WANTED_RACE_ARRAY,
    data: array
});

export const getBettingRaces = (array) => ({
    type: GET_BETTING_RACE_ARRAY,
    data: array
});

export const getCheckedRaces = (array) => ({
    type: GET_CHECKED_RACE_ARRAY,
    data: array
});

export const failGetRaces = () => ({
    type: FAIL_GET_RACES_ARRAY
});

export const getMyRaces = (race) => ({
    type: GET_MY_RACES,
    data: race
});

export const getActivities = (activity) => ({
    type: GET_ACTIVITIES,
    data: activity
});

export const getUserBalance = (balance) => ({
    type: GET_USER_BALANCE,
    data: balance
});

export const getMyHorseArraySuccess = (array) => ({
    type: GET_MY_HORSES_ARRAY_SUCCESS,
    data: array
});

export const getTrainTicket = (num) => ({
    type: GET_TRAIN_TICKET_NUM,
    data: num
});

export const getDressUpTicket = (num) => ({
    type: GET_SHUFFLE_TICKET_NUM,
    data: num
});

export const getShuffleAllTicket = (num) => ({
    type: GET_SHUFFLE_ALL_TICKET_NUM,
    data: num
});

export const getTotalPrizeArray = (array) => ({
    type: LOAD_HORSE_TOTAL_PRIZE_ARRAY_SUCCESS,
    data: array
});

export const getWinCountArray = (array) => ({
    type: LOAD_WIN_COUNT_ARRAY_SUCCESS,
    data: array
});

export const getHorseGeneArray = (array) => ({
    type: LOAD_HORSE_GENE_ARRAY_SUCCESS,
    data: array
});

export const getSirePrices = (array) => ({
    type: GET_SIRE_PRICES_ARRAY,
    data: array
});

export const getSireHorses = (array) => ({
    type: GET_SIRE_HORSES,
    data: array
});

export const getOnSaleHorsesArray = (horses) => ({
    type: GET_ON_SALE_HORSE_SUCCESS,
    data: horses
});

export const getSaleHorsePrices = (array) => ({
    type: GET_SALE_HORSE_PRICES_SUCCESS,
    data: array
});


export const getRaceInfo = (info) => ({
    type: GET_RACE_INFO,
    data: {
        id: info[0].toNumber(),
        race: info
    }
});

export const getHorseInfo = (horse) => ({
    type: GET_HORSE_INFO,
    data: {
        id: horse[0].toNumber(),
        horse: horse
    }
});

export const dispatchGetMatePrice = (price) => ({
    type: GET_MATE_PRICE,
    data: price
});

