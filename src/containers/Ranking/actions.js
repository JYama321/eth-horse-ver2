import { GET_HORSE_INFO } from "../../actionTypes";


export const getHorseInfoSuccess = (data) => ({
  type: GET_HORSE_INFO,
  data: {
    id: data[0].toNumber(),
    horse: data
  }
});
