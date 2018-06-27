
export const getMyHorsesArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.ownedTokensIds(window.web3.eth.coinbase,function(err,result){
      if(err){console.log(err)}
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

export const getSirePricesArray = () => {
  return new Promise((resolve,reject) => {
    window.contract_instance.getOnSirePricesArray(function(err, result) {
      if(err){
        reject(err)
      }else{
        resolve(result)
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

export const getGeneArray = () => {
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
    window.contract_instance.horseTokenToOnSale(horseId,window.web3.toWei(price,'ether'),{from:window.web3.eth.coinbase, gasPrice: 10 ** 10},function(err,result){
      if(err) {reject(err)}
      resolve(result)
    })
  })
};

export const horseToSireSale = (horseId,price) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.horseTokenToOnSireSale(horseId, window.web3.toWei(price, 'ether'), {
      from: window.web3.eth.coinbase,
      gasPrice: 10 ** 10
    }, function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
};

export const horseTokenNotToOnSale = (horseId) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.horseTokenToNotOnSale(horseId,{from: window.web3.eth.coinbase, gas: 3000000, gasPrice: 10 ** 10}, function (err, result) {
      if(err){reject(err)}
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
        result,window.web3.eth.coinbase,horseId,{from: window.web3.eth.coinbase, value: window.web3.toWei(price,'ether'), gas: 5000000}
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
    window.contract_instance.getMyRaces({from: window.web3.eth.coinbase},function(err, result){
      if(err){reject(err)}
      console.log(result);
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

export const getOdds = (raceId) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.getOdds(raceId, function (err, result) {
      if(err) {reject(err)}
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

export const hostRace = (info) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.hostRace(info.raceName,info.minWinnerPrize,info.winnerPrizeFromBet,
        {from: window.web3.eth.coinbase, gas: 5000000, gasPrice: 10 ** 10, value: info.deposit},function(err, result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const ownerOf = (horseId) => {
  return new Promise((resolve, reject)=>{
    window.contract_instance.ownerOf(horseId,function(err,result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};


export const applyRace = (raceId,horseId) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.applyRace(raceId,horseId,{from: window.web3.eth.coinbase, gas: 3000000, gasPrice: 10 ** 10},function(err, result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const getHorseStrengthBalance = (raceId) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.getRaceStrengthInfo(raceId,function(err,result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const decideBetRate = (raceId,rates) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.decideBetRate(raceId,rates[0]*100,rates[1]*100,{from: window.web3.eth.coinbase, gasPrice: 10 ** 10, gas: 5000000},function(err,result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const checkResult = (raceId) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.checkRaceResult(raceId,function(err,result) {
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const sireHorses = (papaId,mamaId,name) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.mateHorses(papaId,mamaId,name,{from: window.web3.eth.coinbase, gas: 5000000, gasPrice: 10 ** 10},function(err,result) {
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const getRaceStartTime = (raceId) => {
  return new Promise((resolve,reject) => {
    window.contract_instance.raceStartTime(raceId,function(err,result){
      if(err){reject(err)}
      resolve(result)
    })
  })
};

export const betRace = (raceId,horseId,value) => {
  return new Promise((resolve, reject) => {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    console.log(array[0]);
    window.contract_instance.betRace(raceId,horseId,array[0],
        {from: window.web3.eth.coinbase,gas: 3000000, gasPrice: 10 ** 10, value: window.web3.toWei(value,'ether')},function (err, result) {
      console.log(result)
        })
  })
};
