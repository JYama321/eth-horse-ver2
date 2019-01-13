pragma solidity ^0.4.23;
import "./Strings.sol";

library SafeMath{
    using strings for *;

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
    function horseStrengthBalance(uint _gene1,uint _gene2) external view returns(uint,uint);
}

contract GeneFunctionInterface{
    function generateGenes(uint,uint,string) external view returns(uint);
    function generateReplaceGene(uint) external view returns(uint);
}


contract LotteryInterface{
    function trainTicketNum(address _user) external view returns(uint);
    function dressUpTicketNum(address _user) external view returns(uint);
    function shuffleDressUpTicketNum(address _user) external view returns(uint);
    function trainLottery(address _user) external view returns(uint);
    function dressUpLottery(address _user) external view returns(uint);
    function shuffleDressUpLottery(address _user) external view returns(uint);
    function giftHorseLottery(address _user) external view returns(uint);
    function setTrainTicketPrice(uint) external;
    function setDressUpTicketPrice(uint) external;
    function setShuffleDressUpTicketPrice(uint) external;
    function trainTicketPrice() external view returns(uint);
    function dressUpTicketPrice() external view returns(uint);
    function shuffleDressUpTicketPrice() external view returns(uint);
    function buyTrainTicket(uint,address) external;
    function buyShuffleDressUpTicket(uint, address) external;
    function buyDressUpTicket(uint, address) external;
    function doTrainLottery(address) external;
    function doDressUpLottery(address) external;
    function doShuffleDressUpLottery(address) external;
    function doGiftHorseLottery(address) external;
    function presentTrainTicket(address) external;
    function presentDressUpTicket(address) external;
    function presentShuffleDressUpTicket(address) external;
    function trainHorse(address) external;
    function dressUpHorse(address) external;
    function shuffleDressUp(address) external;
    function horseGifted(address) external;
}


contract HorseGameBase is Ownable{
    using SafeMath for uint256;


    uint geneModulus = 10 ** 64; // length of genes
    uint[] horsesOnSale; //horsesOnSale
    uint[] horsesOnSireSale; //horsesOnSireSale
    uint public matePrice;

    GeneFunctionInterface geneFunction;
    RaceFunctionInterface raceFunction;
    LotteryInterface lotteryFunction;
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

    string baseURI;

    event HorseOnSale(address indexed _from,uint _price, uint _tokenId, string _type, uint _now);
    event Transfer(address indexed _from,address indexed _to,uint256 _tokenId, string _type, uint _now);
    event ApplyRace(address indexed _owner,uint _raceId,uint _horseId,uint _now);
    event BetRace(address indexed _voter,uint _betValue, uint _raceId, uint _horseId, uint _now);
    event HostRace(address indexed _host, uint _deposit, uint _minWinnerPrize, uint _raceId, uint _now);
    event GiftHorseLottery(address indexed _from, uint _tokenId);

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


    function onSireSaleHorses() external view returns(uint[]){
        return horsesOnSireSale;
    }

    function ownedTokensIds(address _owner) external view returns(uint[]){
        return ownedTokens[_owner];
    }

    function setMatePrices(uint _price) external onlyOwner{
        matePrice = _price;
    }

    function transfer(address _from,address _to,uint256 _tokenId) internal {
        //remove and add
        _removeToken(_from,_tokenId);
        _addToken(_to,_tokenId);
    }

    function baseTokenURI() public view returns (string) {
        return baseURI;
    }

    function uintToString(uint v) public view returns(string) {
        uint maxLength = 100;
        bytes memory reversed = new bytes(maxLength);
        uint i = 0;
        while(v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        return string(s);
    }


    function tokenURI(uint256 _tokenId) public view returns(string) {
        string memory tokenId = uintToString(_tokenId);
        bytes memory strbyte1 = bytes(baseTokenURI());
        bytes memory strbyte2 = bytes(tokenId);
        bytes memory str = new bytes(strbyte1.length + strbyte2.length);
        uint8 point = 0;
        for(uint8 j = 0; j < strbyte1.length; j++) {
            str[point] = strbyte1[j];
            point++;
        }
        for(uint8 k=0;k < strbyte2.length; k++) {
            str[point] = strbyte2[k];
            point++;
        }
        return string(str);
    }

    function _removeToken(address _from,uint256 _tokenId) private {
        require(tokenOwner[_tokenId] == _from,"_from should be token owner");

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
        require(tokenOwner[_tokenId] == address(0), "address should not be 0");
        tokenOwner[_tokenId] = _to;
        ownedTokensIndex[_tokenId] = ownedTokens[_to].push(_tokenId) - 1;
    }

    function mateHorses(uint _papaId, uint _mamaId, string _name) external payable {
        require(_papaId != _mamaId && msg.value >= matePrice,"papa and mama should be diffrence and msg.value is higher or equal to matePrice");
        require(tokenOwner[_papaId] == msg.sender && tokenOwner[_mamaId] == msg.sender,"user should be owner of both papa and mama.");
        Horse storage papa = horses[_papaId.sub(1)];
        Horse storage mama = horses[_mamaId.sub(1)];
        require(papa.mateIndex >= 1 && mama.mateIndex >= 1, "mateIndex should be remained.");
        papa.mateIndex -= 1;
        mama.mateIndex -= 1;
        _mint(_papaId,_mamaId,papa.genes,mama.genes,msg.sender, horses.length.add(1),_name);
        owner.transfer(msg.value);
    }

    function sireHorseWithOnSaleHorse(uint _myTokenId,uint _saleTokenId,string _name) external payable{
        require(_myTokenId != _saleTokenId,"");
        require(tokenOwner[_myTokenId] == msg.sender);
        Horse storage myHorse = horses[_myTokenId.sub(1)];
        Horse storage saleHorse = horses[_saleTokenId.sub(1)];
        require(myHorse.mateIndex >= 1 && saleHorse.mateIndex >= 1);
        require(saleHorse.isOnSireSale && saleHorse.sirePrice <= msg.value);
        myHorse.mateIndex -= 1;
        saleHorse.mateIndex -= 1;
        _mint(_myTokenId,_saleTokenId,myHorse.genes,saleHorse.genes,msg.sender,horses.length.add(1),_name);
        tokenOwner[_saleTokenId].transfer(msg.value);
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
        emit Transfer(_from,_to,_tokenId,"buy", now);
        _from.transfer(price);
    }

    function horseTokenToOnSale(uint _tokenId,uint _price) external{
        require(tokenOwner[_tokenId] == msg.sender,"msg.sender should be token owner.");
        Horse storage horse = horses[_tokenId.sub(1)];
        require(!horse.isOnSale, "horse should be on sale.");
        horse.price = _price;
        horse.isOnSale = true;
        tokenIdToOnSaleIndex[_tokenId] = horsesOnSale.push(_tokenId) - 1;
        horseOnSalePrices[_tokenId.sub(1)] = _price;
        emit HorseOnSale(tokenOwner[_tokenId], _price,_tokenId, "sale", now);
    }

    function horseTokenToNotOnSale(uint _tokenId) external{
        require(tokenOwner[_tokenId] == msg.sender,"msg.sender should be token owner.");
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
        require(tokenOwner[_tokenId] == msg.sender, "msg.sender should be token owner");
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
        require(tokenOwner[_tokenId] == msg.sender, "msg.sender shoudl be token owner.");
        Horse storage horse = horses[_tokenId.sub(1)];
        horse.sirePrice = _price;
        horse.isOnSireSale = true;
        tokenIdToOnSireSaleIndex[_tokenId] = horsesOnSireSale.push(_tokenId) - 1;
        horseOnSirePrices[_tokenId.sub(1)] = _price;
        emit HorseOnSale(tokenOwner[_tokenId],_price, _tokenId, "sire", now);
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
        require(_to != address(0), "_to should not be address(0)");
        require(_papaId != _momId || (_papaId == 0 && _momId == 0),"papaID should not be equal to mmamaID, papaID and mamaId should not be 0.");
        _addToken(_to,_tokenId);
        uint newGene = geneFunction.generateGenes(_maleGenes,_femaleGenes,_name);
        Horse memory newHorse = Horse({
            horseId:_tokenId,
            genes:newGene,
            name:_name,
            winCount: 0,
            papaId:_papaId,
            momId:_momId,
            mateIndex:(newGene % (10 ** 30) / (10 ** 29)) + (newGene % (10 ** 29) / (10 ** 28)),
            raceIndex:(newGene % (10 ** 32) / (10 ** 31)) + (newGene % (10 ** 31) / (10 ** 30)),
            price: 0,
            saleDuration: 0,
            sirePrice: 0,
            isOnSale: false,
            isOnSireSale: false
            });
        horses.push(newHorse);
        horseGenes.push(newGene);
        horseWinCounts.push(0);
        horseOnSalePrices.push(0);
        horseOnSirePrices.push(0);
        horseOnMinBidPrices.push(0);
        horseTotalPrize.push(0);
        //from が 0x0だったら誕生
        emit Transfer(0x0,_to,_tokenId,'sire',now);
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
        bytes32 nonce;
        bool committed;
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
    mapping (uint => uint) public raceBetEnd;
    mapping (uint => uint) public raceCommitEnd;
    mapping (uint => uint) raceParticipantNum;


    modifier hostOnly(uint _raceId,address _sender){
        Race storage race = races[_raceId.sub(1)];
        require(race.host == _sender, "host should be _sender");
        _;
    }

    function checkRaceResult(uint _raceId) external {
        Race storage race = races[_raceId.sub(1)];
        require(!race.isChecked && raceCommitEnd[_raceId] < now, "confirm that race is checked");
        Horse storage horse1 = horses[race.horseOne.sub(1)];
        Horse storage horse2 = horses[race.horseTwo.sub(1)];
        uint winnerIndex = raceFunction.generateWinnerIndex(
            race.nonce,horse1.genes,horse2.genes
        );
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
        uint hostPayback = race.deposit + race.totalBet - race.minWinnerPrize - race.totalBet * race.winnerPrizeFromBet / 100 - race.horseIdToBetAmount[winnerId] * race.horseIdToBetRate[winnerId] / 100;
        race.host.transfer(hostPayback);
    }

    function decideBetRate(uint _raceId,uint _rate1,uint _rate2) external hostOnly(_raceId,msg.sender){
        Race storage race = races[_raceId.sub(1)];
        require(!race.isBetting && race.horseOne != 0 && race.horseTwo != 0,"race is not betting or two horses are not applied yet.");
        race.horseIdToBetRate[race.horseOne] = _rate1;
        race.horseIdToBetRate[race.horseTwo] = _rate2;
        race.isBetting = true;
        bettingRaces[_raceId.sub(1)] = true;
        raceBetEnd[_raceId] = now + 12 hours;
        raceCommitEnd[_raceId] = now + 24 hours;
    }

    function withdrawPayback(uint _raceId) external{
        Race storage race = races[_raceId.sub(1)];
        require(race.participantInfo[msg.sender].betHorseId == race.winnerHorseId, "betHorseId should equal to winnerHorseId");
        require(race.isChecked == true,"race is not checked ye");
        uint payback = race.participantInfo[msg.sender].expectedReturn;
        race.participantInfo[msg.sender].expectedReturn = 0;
        msg.sender.transfer(payback);
    }

    function withdrawPrize(uint _raceId) external{
        Race storage race = races[_raceId.sub(1)];
        require(race.isChecked, "rasce should already be checked.");
        require(msg.sender == tokenOwner[race.winnerHorseId], "shouldb e token owner");
        Horse storage horse = horses[race.winnerHorseId.sub(1)];
        uint prize = race.minWinnerPrize + race.totalBet * race.winnerPrizeFromBet / 100;
        race.minWinnerPrize = 0;
        race.winnerPrizeFromBet = 0;
        horseTotalPrize[race.winnerHorseId.sub(1)] = horseTotalPrize[race.winnerHorseId.sub(1)].add(prize);
        horseWinCounts[race.winnerHorseId.sub(1)] = horseWinCounts[race.winnerHorseId.sub(1)].add(1);
        horse.winCount = horse.winCount.add(1);
        msg.sender.transfer(prize);
    }

    function myBetInfo(uint _raceId) external view returns(uint,uint,uint){
        Race storage race = races[_raceId.sub(1)];
        RaceParticipant memory person = race.participantInfo[msg.sender];
        return(person.betHorseId,person.betPrice,person.expectedReturn);
    }

    function getRaceStrengthInfo(uint _raceId) external view hostOnly(_raceId,msg.sender) returns(uint,uint){
        Race storage race = races[_raceId.sub(1)];
        require(race.horseOne != 0 && race.horseTwo != 0, "Two horses are not applied yet.");
        return raceFunction.horseStrengthBalance(horses[race.horseOne.sub(1)].genes,horses[race.horseTwo.sub(1)].genes);
    }


    function bettingInfo(uint _raceId) external view returns(uint,uint,uint,uint,uint,uint){
        Race storage race = races[_raceId.sub(1)];
        require(race.horseOne != 0 && race.horseTwo != 0, "Two horses are not applied yet.");
        uint paybackMax = race.totalBet * (100 - race.winnerPrizeFromBet) / 100 + (race.deposit * 98 / 100 - race.minWinnerPrize);
        uint max1 = ((paybackMax - (race.horseIdToBetAmount[race.horseOne] * race.horseIdToBetRate[race.horseOne] / 100)) / race.horseIdToBetRate[race.horseOne]) * 100;
        uint max2 = ((paybackMax - (race.horseIdToBetAmount[race.horseTwo] * race.horseIdToBetRate[race.horseTwo] / 100)) / race.horseIdToBetRate[race.horseTwo]) * 100;
        return (max1,race.horseIdToBetAmount[race.horseOne],race.horseIdToBetRate[race.horseOne],max2,race.horseIdToBetAmount[race.horseTwo],race.horseIdToBetRate[race.horseTwo]);
    }

    function betRace(uint _raceId, uint _horseId, uint _secret) external payable{
        Race storage race = races[_raceId.sub(1)];
        require(race.participantInfo[msg.sender].betPrice == 0, "The participant has already bet race.");
        require(race.isBetting && !race.isChecked, "Race is not in betting time");
        require(raceBetEnd[_raceId] > now, "Betting time is already ended.");
        RaceParticipant memory person = RaceParticipant({
            betHorseId: _horseId,
            betPrice: msg.value,
            expectedReturn: (race.horseIdToBetRate[_horseId] * msg.value) / 100,
            nonce: keccak256(abi.encodePacked(bytes32(_secret))),
            committed: false
            });
        race.participantInfo[msg.sender] = person;
        raceParticipantNum[_raceId] = raceParticipantNum[_raceId].add(1);
        race.horseIdToBetAmount[_horseId] = race.horseIdToBetAmount[_horseId].add(msg.value);
        race.totalBet = race.totalBet.add(msg.value);
        emit BetRace(msg.sender,msg.value,_raceId,_horseId,now);
    }

    function commitRace(uint _raceId, uint _secret) external {
        Race storage race = races[_raceId.sub(1)];
        require(race.participantInfo[msg.sender].betPrice != 0, "Bet value should not be 0");
        require(raceBetEnd[_raceId] < now && raceCommitEnd[_raceId] > now, "Betting time is already ended.");
        RaceParticipant storage person = race.participantInfo[msg.sender];
        require(person.nonce == keccak256(abi.encodePacked(bytes32(_secret))) && person.committed == false, "The person has already ");
        race.nonce = race.nonce^bytes32(_secret);
        person.committed = true;
        uint payback = race.deposit / 50 / raceParticipantNum[_raceId];
        race.deposit = race.deposit.sub(payback);
        msg.sender.transfer(payback);
    }

    function getOdds(uint _raceId) external view returns(uint,uint){
        Race storage race = races[_raceId.sub(1)];
        return(race.horseIdToBetRate[race.horseOne],race.horseIdToBetRate[race.horseTwo]);
    }

    function showParticipantInfo(uint _raceId) external view returns(uint,uint,uint,bool) {
        Race storage race = races[_raceId.sub(1)];
        RaceParticipant storage participantInfo = race.participantInfo[msg.sender];
        return(
        participantInfo.betHorseId,
        participantInfo.betPrice,
        participantInfo.expectedReturn,
        participantInfo.committed
        );
    }

    function hostRace(string _raceName,uint _minWinnerPrize, uint _winnerPrizeFromBet) external payable{
        require((msg.value * 98 / 100) > _minWinnerPrize, "98% value should higher than minnimum winner prieze.");
        Race memory race = Race({
            raceId: races.length.add(1),
            host: msg.sender,
            horseOne: 0,
            horseTwo: 0,
            nonce: bytes32(blockhash(block.number-1)),
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
        raceParticipantNum[race.raceId] = 0;
        races.push(race);
        wantedRaces.push(true);
        bettingRaces.push(false);
        checkedRaces.push(false);
        emit HostRace(msg.sender, msg.value, _minWinnerPrize, races.length, now);
    }

    function applyRace(uint _raceId, uint _horseId) external{
        require(tokenOwner[_horseId] == msg.sender,"msg.sender should be token owner.");
        Race storage race = races[_raceId.sub(1)];
        require(race.horseOne == 0 || race.horseTwo == 0, "Remnant should be remained.");
        require(race.horseOne != _horseId && race.horseTwo != _horseId, "horse should be new commer.");
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

contract HorseGame is HorseBet{
    function setLotteryFunction(address _lotteryAddress) external onlyOwner{
        lotteryFunction = LotteryInterface(_lotteryAddress);
    }

    function setGeneFunction(address _geneAddress) external onlyOwner{
        geneFunction = GeneFunctionInterface(_geneAddress);
    }

    function setRaceFunction(address _raceAddress) external onlyOwner{
        raceFunction = RaceFunctionInterface(_raceAddress);
    }

    function setTrainTicketPrice(uint _price) external onlyOwner{
        lotteryFunction.setTrainTicketPrice(_price);
    }

    function setDressUpTicketPrice(uint _price) external onlyOwner{
        lotteryFunction.setDressUpTicketPrice(_price);
    }

    function setShuffleDressUpTicketPrice(uint _price) external onlyOwner{
        lotteryFunction.setShuffleDressUpTicketPrice(_price);
    }

    function buyTrainTicket() external payable{
        require(msg.value >= lotteryFunction.trainTicketPrice(),"msg.value should be higher or equal to ticket price");
        lotteryFunction.buyTrainTicket(msg.value,msg.sender);
        owner.transfer(msg.value);
    }

    function buyShuffleDressUpTicket() external payable{
        require(msg.value >= lotteryFunction.shuffleDressUpTicketPrice(),"msg.value should be higher or equal to ticket price");
        lotteryFunction.buyShuffleDressUpTicket(msg.value,msg.sender);
        owner.transfer(msg.value);
    }

    function buyDressUpTicket() external payable{
        require(msg.value >= lotteryFunction.dressUpTicketPrice(),"msg.value should be higher or equal to ticket price");
        lotteryFunction.buyDressUpTicket(msg.value,msg.sender);
        owner.transfer(msg.value);
    }

    function trainTicketNum() external view returns(uint){
        return lotteryFunction.trainTicketNum(msg.sender);
    }

    function dressUpTicketNum() external view returns(uint){
        return lotteryFunction.dressUpTicketNum(msg.sender);
    }

    function shuffleDressUpTicketNum() external view returns(uint){
        return lotteryFunction.shuffleDressUpTicketNum(msg.sender);
    }

    function shuffleDressUpTexture(uint _horseId, uint _nonce) external{
        require(tokenOwner[_horseId] == msg.sender);
        require(lotteryFunction.shuffleDressUpTicketNum(msg.sender) > 0);
        lotteryFunction.shuffleDressUp(msg.sender);
        Horse storage horse = horses[_horseId.sub(1)];
        uint gene = horse.genes;
        uint geneEnd = gene % (10 ** 20);
        uint geneMiddle = gene % (10 ** 38);
        uint fakeGene = geneFunction.generateReplaceGene(_nonce);
        uint replaceGeneEnd = fakeGene % (10 ** 20);
        uint replaceGene = fakeGene % (10 ** 38) - replaceGeneEnd;
        horse.genes = gene - geneMiddle + replaceGene + geneEnd;
        horseGenes[_horseId.sub(1)] = horse.genes;
    }

    function dressUpTexture(uint _horseId, uint _index, uint _num) external{
        require(tokenOwner[_horseId] == msg.sender);
        require(lotteryFunction.dressUpTicketNum(msg.sender) > 0);
        require(_index >= 20 && _index <= 35);
        lotteryFunction.dressUpHorse(msg.sender);
        Horse storage horse = horses[_horseId.sub(1)];
        uint gene = horse.genes;
        uint geneEnd = gene % (10 ** _index);
        uint geneMiddle = gene % (10 ** (_index + 3));
        uint replaceGene = _num * (10 ** _index);
        horse.genes = gene - geneMiddle + replaceGene + geneEnd;
        horseGenes[_horseId.sub(1)] = horse.genes;
    }

    function trainHorse(uint _horseId) external {
        require(tokenOwner[_horseId] == msg.sender);
        require(lotteryFunction.trainTicketNum(msg.sender) > 0);
        lotteryFunction.trainHorse(msg.sender);
        Horse storage horse = horses[_horseId.sub(1)];
        uint gene = horse.genes;
        uint up = 0;
        for(uint i=1; i<=5; i++){
            uint info = gene % ((1000 ** i));
            if(info < 9 * (1000 ** i / 10)){ up = up.add((1000 ** i / 100) * 5);}
        }
        horse.genes = horse.genes.add(up);
        horseGenes[_horseId.sub(1)] = horse.genes;
    }

    function doTrainLottery() external{
        lotteryFunction.doTrainLottery(msg.sender);
    }

    function doDressUpLottery() external{
        lotteryFunction.doDressUpLottery(msg.sender);
    }

    function doShuffleDressUpLottery() external{
        lotteryFunction.doShuffleDressUpLottery(msg.sender);
    }

    function doGiftHorseLottery() external{
        lotteryFunction.doGiftHorseLottery(msg.sender);
    }

    function presentTrainTicket(address _user) external onlyOwner{
        lotteryFunction.presentTrainTicket(_user);
    }

    function presentDressUpTicket(address _user) external onlyOwner{
        lotteryFunction.presentDressUpTicket(_user);
    }

    function presentShuffleDressUpTicket(address _user) external onlyOwner{
        lotteryFunction.presentShuffleDressUpTicket(_user);
    }

    function presentHorse(uint _tokenId, address _to) external onlyOwner{
        transfer(msg.sender,_to,_tokenId);
        emit GiftHorseLottery(msg.sender,_tokenId);
    }

    function giftHorse(uint _tokenId, address _to) external onlyOwner{
        transfer(msg.sender,_to,_tokenId);
        lotteryFunction.horseGifted(_to);
    }

    function trainTicketPrice() external view returns(uint){
        return lotteryFunction.trainTicketPrice();
    }

    function dressUpTicketPrice() external view returns(uint){
        return lotteryFunction.dressUpTicketPrice();
    }

    function shuffleDressUpTicketPrice() external view returns(uint){
        return lotteryFunction.shuffleDressUpTicketPrice();
    }

    function dressUpLottery() external view returns(uint){
        return lotteryFunction.dressUpLottery(msg.sender);
    }

    function trainLottery() external view returns(uint){
        return lotteryFunction.trainLottery(msg.sender);
    }

    function shuffleDressUpLottery() external view returns(uint){
        return lotteryFunction.shuffleDressUpLottery(msg.sender);
    }

    function giftHorseLottery() external view returns(uint){
        return lotteryFunction.giftHorseLottery(msg.sender);
    }
}

