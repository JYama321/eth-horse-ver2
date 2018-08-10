import {GET_HORSE_INFO, GET_RACE_INFO} from "../../actionTypes";

export const getRaceInfo = (info) => ({
    type: GET_RACE_INFO,
    data: {
        id: info[0].toNumber(),
        race: info
    }
});

export const getHorseInfo = (data) => ({
    type: GET_HORSE_INFO,
    data: {
        id: data[0].toNumber(),
        horse: data
    }
});
