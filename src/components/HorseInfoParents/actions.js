import {
  GET_HORSE_INFO
} from "../../actionTypes";

export const getHorseInfoSuccess = (horse) => ({
  type: GET_HORSE_INFO,
  data: {
    id: horse[0].toNumber(),
    horse: horse
  }
});
