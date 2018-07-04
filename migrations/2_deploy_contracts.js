let HorseGameNew = artifacts.require("./HorseGame.sol");
let GeneFunction = artifacts.require("./GeneFunction.sol");
let RaceFunction = artifacts.require("./RaceFunction.sol");
let Lottery = artifacts.require("./Lottery.sol");
module.exports = function(deployer) {
  deployer.deploy(GeneFunction).then(function () {
    return deployer.deploy(RaceFunction)
  }).then(function () {
    return deployer.deploy(HorseGameNew,GeneFunction.address,RaceFunction.address,{gas: 5400000})
  });
};
