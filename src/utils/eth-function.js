

export const getMyHorsesArray = () => {
  return new Promise((resolve, reject) => {
    window.contract_instance.ownedTokensIds(window.web3.eth.coinbase,function(err,result){
      if(err){console.log(err)}
      resolve(result)
    })
  })
};

export const getHorseWinCount = (horseId) => {
  return new Promise((resolve, reject) => {
    window.contract_instance.getWinCountsArray(function(err,result){
      if(err){console.log(err);reject(err);}
      resolve(result);
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


