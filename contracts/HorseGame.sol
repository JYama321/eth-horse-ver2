pragma solidity ^0.4.23;

library SafeMath{

    function mul(uint a, uint b) internal pure returns(uint c){
        if (a == 0){
            return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint a, uint b) internal pure returns(uint){
        return a / b;
    }

    function sub(uint a, uint b) internal pure returns (uint) {
        assert(b <= a);
        return a - b;
    }

    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        assert(c >= a);
        return c;
    }
}

contract Ownable{
    address owner;
    event OwnershipTransferred(address indexed previousOwner,address indexed newOwner);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner{
        require(newOwner != address(0));
        owner = newOwner;
    }
}

//
//contract ERC721{
//    event Transfer(address indexed _from,address indexed _to,uint _tokenId);
//    event Approval(address indexed _owner,address indexed _approved,uint _tokenId);
//
//    function balanceOf(address _owner) external view returns (uint _balance);
//    function ownerOf(uint _tokenId) external view returns (address);
//    function transfer(address _to,uint _tokenId) internal;
//    //    function approve(address _to,uint _tokenId) external;
//    function takeOwnership(address _from,address _to,uint _tokenId) external payable;
//    //    function name() external view returns (string name);
//    //    function symbol() external view returns (string symbol);
//}


contract RaceFunctionInterface{
    function generateWinnerIndex(bytes32 _nonce, uint _gene1, uint _gene2) external view returns(uint);
    function horseStrengthBalance(uint _gene1,uint _gene2) external pure returns(uint,uint);
}

contract GeneFunctionInterface{
    function generateGenes(uint,uint,string) external view returns(uint);
}

contract HorseGameBase is Ownable{
    using SafeMath for uint256;


    uint geneModulus = 10 ** 64; // length of genes
    uint[] horsesOnSale; //horsesOnSale
    uint[] horsesOnSireSale; //horsesOnSireSale

    GeneFunctionInterface geneFunction;
    RaceFunctionInterface raceFunction;
    struct Horse{
        uint horseId;
        uint genes;
        string name;
        uint winCount;
        uint papaId;
        uint momId;
        uint mateIndex;
        uint raceIndex;
        uint price;
        uint sirePrice;
        uint saleDuration;
        bool isOnSale;
        bool isOnAuction;
        bool isOnSireSale;
    }


    Horse[] public horses;
    uint[] horseWinCounts; //win count of a horse
    uint[] horseGenes;
    uint[] horseTotalPrize; //won total prize of a horse
    uint[] horseOnSalePrices; // sale price of a horse
    uint[] horseOnSirePrices; // sire price of a horse
    uint[] horseOnMinBidPrices; // minimum win price of a horse


    mapping(uint => address) public tokenOwner; // owner of a horse
    mapping(address => uint[]) public ownedTokens; // ids of tokens that an address has
    mapping(uint => uint) public ownedTokensIndex;//token index which
    mapping(uint => uint) public tokenIdToOnSaleIndex; //token Id to onSaleIndex
    mapping(uint => uint) public tokenIdToOnSireSaleIndex;
    mapping(uint => uint[]) public raceIdToHorseIds;//raceIdと参加する馬のIdを紐付ける
    mapping(uint => uint) public raceIdToDeposit; //レースにデポジットされたETHの値

    event HorseOnSale(address indexed _from,uint _tokenId, string _type, uint _now);
    event Transfer(address indexed _from,address indexed _to,uint256 _tokenId, uint _now);
    event ApplyRace(address indexed _owner,uint _raceId,uint _horseId,uint _now);
    event BetRace(address indexed _voter,uint _betValue, uint _raceId, uint _horseId, uint _now);
    event HostRace(address indexed _host, uint _deposit, uint _minWinnerPrize, uint _raceId, uint _now);

    function getWinCountsArray() external view returns(uint[]){
        return horseWinCounts;
    }

    function getTotalPrizeArray() external view returns(uint[]){
        return horseTotalPrize;
    }

    function getOnSalePricesArray() external view returns(uint[]){
        return horseOnSalePrices;
    }

    function getOnSirePricesArray() external view returns(uint[]){
        return horseOnSirePrices;
    }

    function getOnMinBidPricesArray() external view returns(uint[]){
        return horseOnMinBidPrices;
    }

    function getHorseGenesArray() external view returns(uint[]){
        return horseGenes;
    }

    //balance of owner
    function balanceOf(address _owner) external view returns (uint){
        return ownedTokens[_owner].length;
    }
    //owner of a token
    function ownerOf(uint256 _tokenId) external view returns (address){
        return tokenOwner[_tokenId];
    }

    function onSaleHorses() external view returns(uint[]){
        return horsesOnSale;
    }

    function ownedTokensIds(address _owner) external view returns(uint[]){
        return ownedTokens[_owner];
    }

    function transfer(address _from,address _to,uint256 _tokenId) internal {
        //remove and add
        _removeToken(_from,_tokenId);
        _addToken(_to,_tokenId);
    }

    function _removeToken(address _from,uint256 _tokenId) private {
        require(tokenOwner[_tokenId] == _from);

        uint tokenIndex = ownedTokensIndex[_tokenId];
        uint ownedTokenNum = ownedTokens[_from].length;
        uint lastTokenIndex = ownedTokenNum - 1;
        uint lastToken = ownedTokens[_from][lastTokenIndex];

        tokenOwner[_tokenId] = 0;
        ownedTokens[_from][tokenIndex] = lastToken;
        ownedTokens[_from][lastTokenIndex] = 0;

        ownedTokens[_from].length--;
        ownedTokensIndex[_tokenId] = 0;
        ownedTokensIndex[lastToken] = tokenIndex;
    }

    function _addToken(address _to,uint256 _tokenId) private{
        require(tokenOwner[_tokenId] == address(0));
        tokenOwner[_tokenId] = _to;
        ownedTokensIndex[_tokenId] = ownedTokens[_to].push(_tokenId) - 1;
    }

    function mateHorses(uint _papaId, uint _mamaId, string _name) external {
        require(_papaId != _mamaId);
        require(tokenOwner[_papaId] == msg.sender && tokenOwner[_mamaId] == msg.sender);
        Horse storage papa = horses[_papaId.sub(1)];
        Horse storage mama = horses[_mamaId.sub(1)];
        require(papa.mateIndex >= 1 && mama.mateIndex >= 1);
        papa.mateIndex -= 1;
        mama.mateIndex -= 1;
        _mint(_papaId,_mamaId,papa.genes,mama.genes,msg.sender, horses.length.add(1),_name);
    }

    function sireHorseWithOnSaleHorse(uint _myTokenId,uint _saleTokenId,string _name) external payable{
        require(_myTokenId != _saleTokenId);
        require(tokenOwner[_myTokenId] == msg.sender);
        Horse storage myHorse = horses[_myTokenId.sub(1)];
        Horse storage saleHorse = horses[_saleTokenId.sub(1)];
        require(myHorse.mateIndex >= 1 && saleHorse.mateIndex >= 1);
        require(saleHorse.isOnSireSale && saleHorse.sirePrice <= msg.value);
        myHorse.mateIndex -= 1;
        saleHorse.mateIndex -= 1;
        _mint(_myTokenId,_saleTokenId,myHorse.genes,saleHorse.genes,msg.sender,horses.length.add(1),_name);
    }

    function takeOwnership(address _from,address _to,uint256 _tokenId) external payable{
        require(_to == msg.sender);
        require(_from == tokenOwner[_tokenId]);
        Horse storage horse = horses[_tokenId.sub(1)];
        require(horse.isOnSale && horse.price <= msg.value);
        uint price = horse.price;
        horse.price = 0;
        horse.isOnSale = false;
        uint onSaleIndex = tokenIdToOnSaleIndex[_tokenId];
        uint lastIndex = horsesOnSale.length.sub(1);
        uint lastToken = horsesOnSale[lastIndex];

        horsesOnSale[onSaleIndex] = horsesOnSale[lastIndex];
        tokenIdToOnSaleIndex[lastToken] = onSaleIndex;
        delete tokenIdToOnSaleIndex[_tokenId];
        horsesOnSale.length--;
        transfer(_from,_to,_tokenId);
        emit Transfer(_from,_to,_tokenId, now);
        _from.transfer(price);
    }

    function horseTokenToOnSale(uint _tokenId,uint _price) external{
        require(tokenOwner[_tokenId] == msg.sender);
        Horse storage horse = horses[_tokenId.sub(1)];
        require(!horse.isOnSale);
        horse.price = _price;
        horse.isOnSale = true;
        tokenIdToOnSaleIndex[_tokenId] = horsesOnSale.push(_tokenId) - 1;
        horseOnSalePrices[_tokenId.sub(1)] = _price;
        emit HorseOnSale(tokenOwner[_tokenId],_tokenId, "sale", now);
    }

    function horseTokenToNotOnSale(uint _tokenId) external{
        require(tokenOwner[_tokenId] == msg.sender);
        Horse storage horse = horses[_tokenId.sub(1)];
        horse.isOnSale = false;
        horse.price = 0;
        horseOnSalePrices[_tokenId.sub(1)] = 0;
        horse.saleDuration = 0;

        uint onSaleIndex = tokenIdToOnSaleIndex[_tokenId];
        uint lastIndex = horsesOnSale.length.sub(1);
        uint lastToken = horsesOnSale[lastIndex];

        horsesOnSale[onSaleIndex] = horsesOnSale[lastIndex];
        tokenIdToOnSaleIndex[lastToken] = onSaleIndex;
        delete tokenIdToOnSaleIndex[_tokenId];
        horsesOnSale.length--;
    }

    function horseTokenToNotOnSireSale(uint _tokenId) external{
        require(tokenOwner[_tokenId] == msg.sender);
        Horse storage horse = horses[_tokenId.sub(1)];
        horse.isOnSireSale = false;
        horse.sirePrice = 0;

        uint onSireIndex = tokenIdToOnSireSaleIndex[_tokenId];
        uint lastIndex = horsesOnSireSale.length.sub(1);
        uint lastToken = horsesOnSireSale[lastIndex];

        horsesOnSireSale[onSireIndex] = horsesOnSireSale[lastIndex];
        horseOnSirePrices[_tokenId.sub(1)] = 0;
        tokenIdToOnSireSaleIndex[lastToken] = onSireIndex;
        delete tokenIdToOnSireSaleIndex[_tokenId];
        horsesOnSireSale.length--;
    }

    function horseTokenToOnSireSale(uint _tokenId, uint _price) external{
        require(tokenOwner[_tokenId.sub(1)] == msg.sender);
        Horse storage horse = horses[_tokenId.sub(1)];
        horse.sirePrice = _price;
        horse.isOnSireSale = true;
        tokenIdToOnSireSaleIndex[_tokenId] = horsesOnSireSale.push(_tokenId) - 1;
        horseOnSirePrices[_tokenId.sub(1)] = _price;
        emit HorseOnSale(tokenOwner[_tokenId], _tokenId, "sire", now);
    }


    function _mint(
        uint256 _papaId,
        uint256 _momId,
        uint256 _maleGenes,
        uint256 _femaleGenes,
        address _to,
        uint256 _tokenId,
        string _name
    )
    private
    {
        require(_to != address(0));
        require(_papaId != _momId || (_papaId == 0 && _momId == 0));
        _addToken(_to,_tokenId);
        uint newGene = geneFunction.generateGenes(_maleGenes,_femaleGenes,_name);
        Horse memory newHorse = Horse({
            horseId:_tokenId,
            genes:newGene,
            name:_name,
            winCount: 0,
            papaId:_papaId,
            momId:_momId,
            mateIndex:newGene % (10 ** 30) / (10 ** 29),
            raceIndex:newGene % (10 ** 31) / (10 ** 30),
            price: 0,
            saleDuration: 0,
            sirePrice: 0,
            isOnSale: false,
            isOnSireSale: false,
            isOnAuction: false
            });
        horses.push(newHorse);
        horseGenes.push(newGene);
        horseWinCounts.push(0);
        horseOnSalePrices.push(0);
        horseOnSirePrices.push(0);
        horseOnMinBidPrices.push(0);
        horseTotalPrize.push(0);
        //from が 0x0だったら誕生
        emit Transfer(0x0,_to,_tokenId, now);
    }

    function createHorseToken(string _name) external onlyOwner{
        _mint(0,0,0,0,msg.sender,horses.length.add(1),_name);
    }

    function() public payable{}
}


contract HorseBet is HorseGameBase{
    struct RaceParticipant{
        uint betHorseId;
        uint betPrice;
        uint expectedReturn;
    }

    struct Race{
        uint raceId;
        address host;
        uint horseOne;
        uint horseTwo;
        bytes32 nonce;
        string raceName;
        uint minWinnerPrize;
        uint winnerPrizeFromBet;
        mapping(address => RaceParticipant) participantInfo;
        mapping(uint => uint) horseIdToBetRate;
        mapping(uint => uint) horseIdToBetAmount;
        uint winnerHorseId;
        uint deposit;
        uint totalBet;
        bool isWanted;
        bool isChecked;
        bool isBetting;
    }

    Race[] public races;
    bool[] public wantedRaces;
    bool[] public bettingRaces;
    bool[] public checkedRaces;
    mapping (address => uint[]) public mapUserToRaceIds;
    mapping (uint => uint) public raceStartTime;


    modifier hostOnly(uint _raceId,address _sender){
        Race storage race = races[_raceId.sub(1)];
        require(race.host == _sender);
        _;
    }


    function checkRaceResult(uint _raceId) external {
        Race storage race = races[_raceId.sub(1)];
        require(!race.isChecked && raceStartTime[_raceId] > now);
        Horse storage horse1 = horses[race.horseOne.sub(1)];
        Horse storage horse2 = horses[race.horseTwo.sub(1)];
        uint winnerIndex = raceFunction.generateWinnerIndex(race.nonce,horse1.genes,horse2.genes);
        uint winnerId;
        if(winnerIndex == 0){
            race.winnerHorseId = race.horseOne;
            winnerId = race.horseOne;
        }else if(winnerIndex == 1){
            race.winnerHorseId = race.horseTwo;
            winnerId = race.horseTwo;
        }
        race.isChecked = true;
        checkedRaces[_raceId.sub(1)] = true;
        bettingRaces[_raceId.sub(1)] = false;
        uint hostPayback =
        race.deposit + race.totalBet - race.minWinnerPrize - race.totalBet * race.winnerPrizeFromBet / 100 - race.horseIdToBetAmount[winnerId] * race.horseIdToBetRate[winnerId];
        race.host.transfer(hostPayback);
    }

    function decideBetRate(uint _raceId,uint _rate1,uint _rate2) external hostOnly(_raceId,msg.sender){
        Race storage race = races[_raceId.sub(1)];
        require(!race.isBetting && race.horseOne != 0 && race.horseTwo != 0);
        race.horseIdToBetRate[race.horseOne] = _rate1;
        race.horseIdToBetRate[race.horseTwo] = _rate2;
        race.isBetting = true;
        bettingRaces[_raceId.sub(1)] = true;
        raceStartTime[_raceId] = now + 5 hours;
    }

    function withdrawPayback(uint _raceId) external{
        Race storage race = races[_raceId.sub(1)];
        require(race.participantInfo[msg.sender].betHorseId == race.winnerHorseId);
        require(race.isChecked == true);
        uint payback = race.participantInfo[msg.sender].expectedReturn;
        race.participantInfo[msg.sender].expectedReturn = 0;
        msg.sender.transfer(payback);
    }

    function withdrawPrize(uint _raceId) external{
        Race storage race = races[_raceId.sub(1)];
        require(race.isChecked);
        require(msg.sender == tokenOwner[race.winnerHorseId]);
        uint prize = race.minWinnerPrize + race.totalBet * race.winnerPrizeFromBet / 100;
        race.minWinnerPrize = 0;
        race.winnerPrizeFromBet = 0;
        horseTotalPrize[race.winnerHorseId.sub(1)].add(prize);
        msg.sender.transfer(prize);
    }

    function myBetInfo(uint _raceId) external view returns(uint,uint,uint){
        Race storage race = races[_raceId.sub(1)];
        RaceParticipant memory person = race.participantInfo[msg.sender];
        return(person.betHorseId,person.betPrice,person.expectedReturn);
    }

    function getRaceStrengthInfo(uint _raceId) external view hostOnly(_raceId,msg.sender) returns(uint,uint){
        Race storage race = races[_raceId.sub(1)];
        require(race.horseOne != 0 && race.horseTwo != 0);
        return raceFunction.horseStrengthBalance(horses[race.horseOne.sub(1)].genes,horses[race.horseTwo.sub(1)].genes);
    }

    function bettingInfo(uint _raceId) external view returns(uint,uint,uint,uint,uint,uint){
        Race storage race = races[_raceId.sub(1)];
        require(race.horseOne != 0 && race.horseTwo != 0);
        uint paybackMax = race.totalBet * (100 - race.winnerPrizeFromBet) / 100 + (race.deposit - race.minWinnerPrize);
        uint max1 = ((paybackMax - (race.horseIdToBetAmount[race.horseOne] * race.horseIdToBetRate[race.horseOne] / 100)) / race.horseIdToBetRate[race.horseOne]) * 100;
        uint max2 = ((paybackMax - (race.horseIdToBetAmount[race.horseTwo] * race.horseIdToBetRate[race.horseTwo] / 100)) / race.horseIdToBetRate[race.horseTwo]) * 100;
        return (max1,race.horseIdToBetAmount[race.horseOne],race.horseIdToBetRate[race.horseOne],max2,race.horseIdToBetAmount[race.horseTwo],race.horseIdToBetRate[race.horseTwo]);
    }

    function betRace(uint _raceId, uint _horseId, uint _secret) external payable{
        require(race.participantInfo[msg.sender].betPrice == 0);
        Race storage race = races[_raceId.sub(1)];
        require(race.isBetting && !race.isChecked);
        RaceParticipant memory person = RaceParticipant({
            betHorseId: _horseId,
            betPrice: msg.value,
            expectedReturn: race.horseIdToBetRate[_horseId] * msg.value
            });

        race.participantInfo[msg.sender] = person;
        uint _nonce = uint(race.nonce)^_secret;
        race.nonce = keccak256(_nonce);
        race.horseIdToBetAmount[_horseId] += msg.value;
        emit BetRace(msg.sender,msg.value,_raceId,_horseId,now);
    }

    function getOdds(uint _raceId) external view returns(uint,uint){
        Race storage race = races[_raceId.sub(1)];
        return(race.horseIdToBetRate[race.horseOne],race.horseIdToBetRate[race.horseTwo]);
    }

    function showParticipantInfo(uint _raceId) external view returns(uint,uint,uint) {
        Race storage race = races[_raceId.sub(1)];
        RaceParticipant storage participantInfo = race.participantInfo[msg.sender];
        return(
        participantInfo.betHorseId,
        participantInfo.betPrice,
        participantInfo.expectedReturn
        );
    }

    function hostRace(string _raceName,uint _minWinnerPrize, uint _winnerPrizeFromBet) external payable{
        require(msg.value > _minWinnerPrize);
        Race memory race =  Race({
            raceId: races.length.add(1),
            host: msg.sender,
            horseOne: 0,
            horseTwo: 0,
            nonce: bytes32(0),
            raceName: _raceName,
            minWinnerPrize: _minWinnerPrize,
            winnerHorseId: 0,
            winnerPrizeFromBet: _winnerPrizeFromBet,
            deposit: msg.value,
            totalBet: 0,
            isWanted: true,
            isChecked: false,
            isBetting: false
            });
        mapUserToRaceIds[msg.sender].push(races.length.add(1));
        races.push(race);
        wantedRaces.push(true);
        bettingRaces.push(false);
        checkedRaces.push(false);
        emit HostRace(msg.sender, msg.value, _minWinnerPrize, races.length, now);
    }

    function applyRace(uint _raceId, uint _horseId) external{
        require(tokenOwner[_horseId] == msg.sender);
        Race storage race = races[_raceId.sub(1)];
        require(race.horseOne == 0 || race.horseTwo == 0);
        require(race.horseOne != _horseId && race.horseTwo != _horseId);
        Horse storage horse = horses[_horseId.sub(1)];
        horse.raceIndex = horse.raceIndex.sub(1);
        if(race.horseOne == 0){
            race.horseOne = _horseId;
        }else{
            race.horseTwo = _horseId;
            wantedRaces[_raceId.sub(1)] = false;
        }
        emit ApplyRace(tokenOwner[_horseId], _raceId, _horseId, now);
    }

    function getRaceIds() external view returns(uint){
        return races.length;
    }

    function getWantedRaces() external view returns(bool[]){
        return wantedRaces;
    }

    function getBettingRaces() external view returns(bool[]){
        return bettingRaces;
    }

    function getCheckedRaces() external view returns(bool[]){
        return checkedRaces;
    }

    function getMyRaces() external view returns(uint[]){
        return mapUserToRaceIds[msg.sender];
    }
}


contract HorseBid is HorseBet{

    struct Bid{
        uint horseId;
        uint closeTime;
        uint minPrice;
        uint currentMax;
        address currentMaxUser;
        address host;
        mapping(address => uint) participantsToBidPrice;
        bool isClosed;
    }
    uint[] horsesOnBid; //horsesOnSale
    mapping(uint => uint) public tokenIdToBidIndex; //token Id to BidIndex

    mapping(uint => Bid) tokenIdToAuction;
    mapping(uint => address[]) tokenIdToAuctionParticipants;

    function horseTokenNotToAuction(uint _tokenId) public{
        Horse storage horse = horses[_tokenId.sub(1)];
        require(horse.isOnAuction);
        require(tokenOwner[_tokenId] == msg.sender);
        delete tokenIdToAuction[_tokenId];
        uint onBidIndex = tokenIdToBidIndex[_tokenId];
        uint lastIndex = horsesOnBid.length.sub(1);
        uint lastToken = horsesOnBid[lastIndex];

        horsesOnBid[onBidIndex] = horsesOnBid[lastIndex];
        horseOnMinBidPrices[_tokenId.sub(1)] = 0;
        tokenIdToBidIndex[lastToken] = onBidIndex;
        delete tokenIdToBidIndex[_tokenId];
        horsesOnBid.length--;
        horse.isOnAuction = false;
    }

    function horseTokenToAuction(uint _tokenId, uint _minPrice, uint _duration) external{
        Horse storage horse = horses[_tokenId.sub(1)];
        Bid memory bid = Bid({
            horseId: _tokenId,
            closeTime: now + _duration,
            minPrice: _minPrice,
            currentMax: 0,
            currentMaxUser: msg.sender,
            host: msg.sender,
            isClosed: false
            });
        if(horse.isOnSale){
            horseTokenNotToAuction(_tokenId);
            horseOnSalePrices[_tokenId.sub(1)] = 0;
        }
        horse.isOnAuction = true;
        horseOnMinBidPrices[_tokenId.sub(1)] = _minPrice;
        tokenIdToAuction[_tokenId] = bid;
        tokenIdToBidIndex[_tokenId] = horsesOnBid.push(_tokenId).sub(1);
        emit HorseOnSale(msg.sender,_tokenId,"auction", now);
    }

    function changeAuctionStatus(uint _addTime,uint _price, uint _tokenId) external{
        Horse storage horse = horses[_tokenId.sub(1)];
        require(horse.isOnAuction);
        Bid storage bid = tokenIdToAuction[_tokenId];
        require(!bid.isClosed);
        require(bid.horseId == _tokenId);
        require(tokenIdToAuctionParticipants[_tokenId].length == 0);
        bid.minPrice = _price;
        bid.closeTime += _addTime;
    }


    function applyBid(uint _tokenId) external payable{
        Horse storage horse = horses[_tokenId.sub(1)];
        require(horse.isOnAuction);
        Bid storage bid = tokenIdToAuction[_tokenId];
        require(!bid.isClosed);
        require(bid.minPrice <= msg.value);
        require(bid.host != msg.sender);
        tokenIdToAuctionParticipants[_tokenId].push(msg.sender);
        bid.participantsToBidPrice[msg.sender] += msg.value;
        if(bid.currentMax < bid.participantsToBidPrice[msg.sender]){
            bid.currentMax = bid.participantsToBidPrice[msg.sender];
            bid.currentMaxUser = msg.sender;
        }
    }

    function withdrawBid(uint _tokenId) external {
        Horse storage horse = horses[_tokenId.sub(1)];
        horse.isOnAuction = false;
        Bid storage bid = tokenIdToAuction[_tokenId];
        require(bid.isClosed);
        address sender;
        uint payback;
        if(msg.sender == bid.currentMaxUser){
            transfer(bid.host,msg.sender,_tokenId);
            emit Transfer(bid.host,msg.sender,_tokenId, now);
        }else if(msg.sender == bid.host){
            payback = bid.currentMax;
            bid.currentMax = 0;
            bid.host.transfer(payback);
        }else{
            for(uint i=0;i<tokenIdToAuctionParticipants[_tokenId].length;i++){
                if(msg.sender == tokenIdToAuctionParticipants[_tokenId][i]){
                    sender = msg.sender;
                    payback = bid.participantsToBidPrice[sender];
                    bid.participantsToBidPrice[sender] = 0;
                }
            }
            sender.transfer(payback);
        }
    }
}

contract HorseGame is HorseBid{
    uint ticketPrice;
    mapping(address => uint) public ticketNum; //ticket number

    constructor(address _geneInterface, address _raceFunctionInterface) public {
        geneFunction = GeneFunctionInterface(_geneInterface);
        raceFunction = RaceFunctionInterface(_raceFunctionInterface);
    }

    function setTicketPrice(uint _price) external onlyOwner{
        ticketPrice = _price;
    }

    function buyTrainTicket() external payable{
        require(msg.value >= ticketPrice);
        uint num = msg.value / ticketPrice;
        ticketNum[msg.sender] = ticketNum[msg.sender].add(num);
    }

    function trainHorse(uint _horseId) external {
        require(tokenOwner[_horseId] == msg.sender);
        Horse storage horse = horses[_horseId.sub(1)];
        uint gene = horse.genes;
        uint up = 0;
        for(uint i=1; i<=5; i++){
            uint info = gene % (100 ** i);
            if(info < 9 * ((100 ** i) / 10)){ up = up.add(100 ** i / 10);}
        }
        horse.genes = horse.genes.add(up);
        horseGenes[_horseId.sub(1)] = horse.genes;
    }

    function presentTicket(address _user) external onlyOwner{
        ticketNum[_user]  = ticketNum[_user].add(1);
    }
}
