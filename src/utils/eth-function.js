
export const getMyHorsesArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.ownedTokensIds(window.web3.eth.coinbase,function(err,result){
      if(err){console.log(err)}
      console.log(result,'getMyHorseArray')
      resolve(result)
    })
  })
};

export const getOnSaleHorses = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.onSaleHorses(function(err, result) {
      if(!err){
        resolve(result)
      }else{
        reject(err);
        console.log(err)
      }
    })
  })
};

export const getHorsePrices = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getOnSalePricesArray(function(err, result){
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
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

export const buyHorse = (horseId,price) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.ownerOf(horseId,function(err, result){
      if(err){
        reject(err)
      }
      resolve(result)
    })
  }).then(function(result){
    window.contract_instance.takeOwnership(
        result,window.web3.eth.coinbase,horseId,{from: window.web3.eth.coinbase, value: window.web3.toWei(price,'ether')}
        ,function(err,result){
          if(err){
            console.log(err)
          }
          return(result)
        })
  });
};


//races
export const getRace = (raceIndex) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.races(raceIndex, function(err, result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const getAllRaceArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getRaceIds(function(err, result){
      if (err) {reject(err)}
      resolve(result)
    })
  })
};

export const getWantedRaceArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getWantedRaces(function(err, result){
      if(err) {reject(err)}
      resolve(result)
    })
  })
};

export const getBettingRaceArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getBettingRaces(function(err, result){
      if (err) {reject(err)}
      resolve(result)
    })
  })
};

export const getCheckedRaceArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getCheckedRaces(function(err, result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const getMyRaceArrray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getMyRaces(function(err, result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const getBetInfo = (raceId) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.bettingInfo(raceId, function(err, result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const getTicketNum = (address) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.ticketNum(address, function (err, result) {
      if(err){reject(err)}
      resolve(result)
    })
  })
};
