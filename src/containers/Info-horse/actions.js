import {
  GET_HORSE_INFO,
  GET_HORSE_INFO_FAILED,
  START_GET_HORSE_INFO
} from "../../actionTypes";


export const getHorseInfoSuccess = (horse) => ({
  type: GET_HORSE_INFO,
  data: {
    id: horse[0].toNumber(),
    horse: horse
  }
});

export const getHorseInfoFailed = () => ({
  type: GET_HORSE_INFO_FAILED
});

export const startGetHorseInfo = (id) => ({
  type: START_GET_HORSE_INFO,
  data: id
});
