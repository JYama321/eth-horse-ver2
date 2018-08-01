export function betRace(raceId,horseId,betValue){
    return new Promise((resolve, reject) => {
        let array = new Uint32Array(2);
        window.crypto.getRandomValues(array);
        window.contract_instance.betRace(raceId,horseId,array[0],{
            value: window.web3.toWei(betValue,'ether'),
            gas: 4500000,
            gasPrice: 100000000
        },function (err,result) {
            if(err){console.log(err);reject(err)}
        })
    })
}

export function horseStatus(gene){
    const params = [gene.slice(0,3),gene.slice(3,6),gene.slice(6,9),gene.slice(9,12),gene.slice(12,15)];
    let strength=0,attributes=[];
    params.forEach(function (elem,index,self) {
        const num = Number(elem);
        const s = Math.ceil(num / 100);
        strength += s;
        attributes.push(s)
    });
    return {powerTotal: strength, params: params, attributes: attributes};
}

export function calculateDate(num){
    const dateNum = num.toNumber();
    const date = new Date(dateNum * 1000);
    const month = '0' + (date.getMonth() + 1);
    const day = '0'+date.getDate();
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();
    return [date.getFullYear() + '/' + month.slice(month.length - 2,month.length) + '/' +
    day.slice(day.length - 2,day.length) + '/' + hours.slice(hours.length-2,hours.length) + ':' + minutes.slice(minutes.length-2,minutes.length),
        date]
}