

export const getMyHorsesArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.ownedTokensIds(window.web3.eth.coinbase,function(err,result){
      if(err){console.log(err)}
      resolve(result)
    })
  })
};

export const getHorseWinCountArray = (horseId) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getWinCountsArray(function(err,result){
      if(err){console.log(err);reject(err);}
      resolve(result);
    })
  })
};

export const getHorseTotalPrizeArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getTotalPrizeArray(function(err, result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const getHorseGeneArray = () => {
  return new Promise((resolve,reject) => {
    window.contract_instance.getHorseGenesArray(function(err, result){
      if(err){reject(err)}
      console.log(result)
      resolve(result)
    })
  })
};

export const getHorseData = (horseId) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.horses(horseId-1,function(err,result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const horseToOnSale = (horseId,price) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.horseTokenToOnSale(horseId,window.web3.toWei(price,'ether'),function(err,result){
      if(err) {reject(err)}
      resolve(result)
    })
  })
};
