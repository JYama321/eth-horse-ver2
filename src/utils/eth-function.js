
export const getMyHorsesArray = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.ownedTokensIds(window.web3.eth.coinbase,function(err,result){
            if(err){console.log(err)}
            resolve(result)
        })
    })
};

export const getTokenOwner = (tokenId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.tokenOwner(tokenId,function(err, result) {
            if(err){reject(err)}
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

export const getSireHorsesArray = () => {
    return new Promise((resolve,reject) => {
        window.contract_instance.onSireSaleHorses(function(err,result){
            if(err){
                reject(err)
            }else{
                resolve(result)
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
        window.contract_instance.horseTokenToOnSale(horseId,window.web3.toWei(price,'ether'),{from:window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},function(err,result){
            if(err) {reject(err)}
            resolve(result)
        })
    })
};

export const horseToSireSale = (horseId,price) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.horseTokenToOnSireSale(horseId,window.web3.toWei(price,'ether'),{from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},
            function (err, result) {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
    })
};

export const horseTokenNotToOnSale = (horseId) => {
    return new Promise((resolve,reject) => {
        window.contract_instance.horseTokenToNotOnSale(horseId,{from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2}, function (err, result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const horseTokenNotToOnSireSale = (horseId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.horseTokenToNotOnSireSale(horseId,{from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2}, function(err, result){
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
            result,window.web3.eth.coinbase,horseId,{from: window.web3.eth.coinbase, value: window.web3.toWei(price,'ether'), gasPrice: 10 ** 10 * 2}
            ,function(err,result){
                if(err){
                    console.log(err)
                }
                return(result)
            })
    });
};

export const sireWithOnSaleHorse = (myHorse,sireHorse,name,price) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.sireHorseWithOnSaleHorse(myHorse,sireHorses,name,
            {from:window.web3.eth.coinbase,value: window.web3.toWei(price,'ether')},function(err, result){
                if(err){reject(err)}
                resolve(result)
            })
    })
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

export const getMyRaceArray = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.getMyRaces({from: window.web3.eth.coinbase},function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

//betting
export const getBetInfo = (raceId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.bettingInfo(raceId, function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getParticipantPantInfo = (raceId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.showParticipantInfo(raceId,{from: window.web3.eth.coinbase},function(err,result){
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

export const getTrainTicketNum = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.trainTicketNum({from: window.web3.eth.coinbase},function (err, result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getDressUpTicketNum = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.dressUpTicketNum({from: window.web3.eth.coinbase},function(err, result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getShuffleAllTicketNum = (address) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.shuffleDressUpTicketNum({from: window.web3.eth.coinbase},function(err, result) {
            if (err) {reject(err)}
            resolve(result)
        })
    })
};

export const hostRace = (info) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.hostRace(info.raceName,info.minWinnerPrize,info.winnerPrizeFromBet,
            {from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2, value: info.deposit, nonce: 19},function(err, result){
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
        window.contract_instance.applyRace(raceId,horseId,{from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},function(err, result){
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

export const getStrengthBalance = (genes) => {
    return new Promise((resolve, reject) => {
        window.race_contract.horseStrengthBalance(genes[0],genes[1],function(err, result){
            if(err){reject(err)}
            resolve(result)
        })

    })
};

export const decideBetRate = (raceId,rates) => {
    return new Promise((resolve,reject) => {
        window.contract_instance.decideBetRate(raceId,rates[0]*100,rates[1]*100,{from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},function(err,result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const checkResult = (raceId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.checkRaceResult(raceId,{from: window.web3.eth.coinbase,gasPrice: 10 ** 10 * 2},function(err,result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const withdrawPayback = (raceId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.withdrawPayback(raceId, {from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const withdrawPrize = (raceId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.withdrawPrize(raceId,{from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},function(err,result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const sireHorses = (papaId,mamaId,name,price) => {
    return new Promise((resolve,reject) => {
        window.contract_instance.mateHorses(papaId,mamaId,name,
            {from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2, value: price},function(err,result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getMatePrice = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.matePrice(function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getRaceBetEndTime = (raceId) => {
    return new Promise((resolve,reject) => {
        window.contract_instance.raceBetEnd(raceId,function(err,result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getRaceCommitEndTime = (raceId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.raceCommitEnd(raceId,function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};


export const betRace = (raceId,horseId,value,secret) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.betRace(raceId,horseId,secret,
            {from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2, value: window.web3.toWei(value,'ether')},function (err, result) {
                if(err){console.log(err)}
                resolve(result)
            })
    })
};

export const commitRace = (raceId,secret) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.commitRace(raceId,secret,{from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},
            function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

//lottery

export const doTrainLottery = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.doTrainLottery({from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},function(err,result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const doShuffleLottery = () => {
    return new  Promise((resolve, reject) => {
        window.contract_instance.doDressUpLottery({
            from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const doShuffleAllLottery = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.doShuffleDressUpLottery({from: window.web3.eth.coinbase,
            gasPrice: 10 ** 10 * 2},function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const doGiftHorseLottery = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.doGiftHorseLottery({from: window.web3.eth.coinbase,
            gasPrice: 10 ** 10 * 2}, function(err, result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};


export const getTrainLottery = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.trainLottery({from:window.web3.eth.coinbase},function (err, result) {
            if(err) {reject(err)}
            resolve(result)
        })
    })
};

export const getShuffleLottery = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.dressUpLottery({from:window.web3.eth.coinbase},function (err, result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getShuffleAllLottery = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.shuffleDressUpLottery({from:window.web3.eth.coinbase}, function (err, result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getGiftHorseLottery = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.giftHorseLottery({from:window.web3.eth.coinbase},function(err, result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

//get ticket price
export const getTrainTicketPrice = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.trainTicketPrice({from: window.web3.eth.coinbase},function(err,result){
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getDressUpTicketPrice = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.dressUpTicketPrice(function(err, result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

export const getShuffleDressUpTicketPrice = () => {
    return new Promise((resolve, reject) => {
        window.contract_instance.shuffleDressUpTicketPrice(function(err, result) {
            if(err){reject(err)}
            resolve(result)
        })
    })
};

//buy tickets
export const buyDressUpTicket = (value) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.buyDressUpTicket({from: window.web3.eth.coinbase, value: window.web3.toWei(value,'ether')},
            function(err, result){
                if(err){reject(err)}
                resolve(result)
            })
    })
};

export const buyShuffleDressUpTicket = (value) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.buyShuffleDressUpTicket({from: window.web3.eth.coinbase, value: window.web3.toWei(value,'ether')},
            function (err, result) {
                if(err){reject(err)}
                resolve(result)
            })
    })
};

export const buyTrainTicket = (value) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.buyTrainTicket({from: window.web3.eth.coinbase, value: window.web3.toWei(value,'ether')},
            function (err, result) {
                if(err){reject(err)}
                resolve(result)
            })
    })
};

///use tickets

export const trainHorse = (horseId) => {
    return new Promise((resolve, reject) => {
        window.contract_instance.trainHorse(
            horseId,{from: window.web3.eth.coinbase,gasPrice: 10 ** 10 * 2},function (err, result) {
                if(err){reject(err)}
                resolve(result)
            })
    })
};

export const shuffleAll = (horseId) => {
    return new Promise((resolve, reject) => {
        let array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        window.contract_instance.shuffleDressUpTexture(
            horseId,array[0],{from: window.web3.eth.coinbase, gasPrice: 10 ** 10 * 2},function (err, result) {
                if(err){reject(err)}
                resolve(result)
            })
    })
};


