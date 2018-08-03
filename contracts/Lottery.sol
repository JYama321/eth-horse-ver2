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



contract Lottery{

    using SafeMath for uint256;

    modifier onlyOwnerContract(){
        require(msg.sender == ownerContract);
        _;
    }
    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }
    address ownerContract;
    address owner;
    uint trainPrice;
    uint dressUpPrice;
    uint shuffleDressUpPrice;
    mapping(address => uint) trainTicketNumber; //ticket number
    mapping(address => uint) dressUpTicketNumber; // ticket number
    mapping(address => uint) shuffleDressUpTicketNumber; // all ticket number
    mapping(address => uint) trainLotteryTime; //address to the last time to do a lottery
    mapping(address => uint) dressUpLotteryTime;
    mapping(address => uint) shuffleDressUpLotteryTime;
    mapping(address => uint) giftHorseLotteryTime;
    uint public lotteryNum=0;

    event LotteryLog(address indexed _from, bool _success, string _type, uint _now);
    event GiftHorseLottery(address indexed _from, bool _success , uint _now);

    constructor() public{
        owner = msg.sender;
    }

    function setOwner(address _newOwner) external onlyOwner{
        owner = _newOwner;
    }

    function trainTicketPrice() external view returns(uint){
        return trainPrice;
    }

    function dressUpTicketPrice() external view returns(uint){
        return dressUpPrice;
    }

    function shuffleDressUpTicketPrice() external view returns(uint){
        return shuffleDressUpPrice;
    }

    function trainTicketNum(address _user) external view returns(uint){
        return trainTicketNumber[_user];
    }

    function dressUpTicketNum(address _user) external view returns(uint){
        return dressUpTicketNumber[_user];
    }

    function shuffleDressUpTicketNum(address _user) external view returns(uint) {
        return shuffleDressUpTicketNumber[_user];
    }

    function trainLottery(address _user) external view returns (uint) {
        return trainLotteryTime[_user];
    }

    function dressUpLottery(address _user) external view returns (uint) {
        return dressUpLotteryTime[_user];
    }

    function shuffleDressUpLottery(address _user) external view returns(uint){
        return shuffleDressUpLotteryTime[_user];
    }

    function giftHorseLottery(address _user) external view returns(uint){
        return giftHorseLotteryTime[_user];
    }

    function setOwnerContract(address _ownerContract) external onlyOwner{
        ownerContract = _ownerContract;
    }

    function setTrainTicketPrice(uint _price) external onlyOwnerContract{
        trainPrice = _price;
    }

    function setDressUpTicketPrice(uint _price) external onlyOwnerContract{
        dressUpPrice = _price;
    }

    function setShuffleDressUpTicketPrice(uint _price) external onlyOwnerContract{
        shuffleDressUpPrice = _price;
    }

    function buyTrainTicket(uint _price,address _user) external onlyOwnerContract{
        uint num = _price / trainPrice;
        trainTicketNumber[_user] = trainTicketNumber[_user].add(num);
    }

    function buyShuffleDressUpTicket(uint _price, address _user) external onlyOwnerContract{
        uint num = _price / shuffleDressUpPrice;
        shuffleDressUpTicketNumber[_user] = shuffleDressUpTicketNumber[_user].add(num);
    }

    function buyDressUpTicket(uint _price, address _user) external onlyOwnerContract{
        uint num = _price / dressUpPrice;
        dressUpTicketNumber[_user] = dressUpTicketNumber[_user].add(num);
    }


    function doTrainLottery(address _user) external onlyOwnerContract{
        require((now - trainLotteryTime[_user]) > 24 hours);
        lotteryNum = lotteryNum.add(1);
        trainLotteryTime[_user] = now;
        uint _seed = uint(keccak256(abi.encodePacked(bytes32(lotteryNum)^blockhash(block.number-1))));
        if((_seed % 100) < 5){
            trainTicketNumber[_user] += 1;
            emit LotteryLog(_user,true,'train', now);
        }
        emit LotteryLog(_user,false,'train', now);
    }

    function doDressUpLottery(address _user) external onlyOwnerContract{
        require((now - dressUpLotteryTime[_user]) > 24 hours);
        lotteryNum = lotteryNum.add(1);
        dressUpLotteryTime[_user] = now;
        uint _seed = uint(keccak256(abi.encodePacked(bytes32(lotteryNum)^blockhash(block.number-1))));
        if((_seed % 50) <= 2){
            dressUpTicketNumber[_user] += 1;
            emit LotteryLog(_user,true,'dress-up', now);
        }
        emit LotteryLog(_user,false,'dress-up', now);
    }

    function doShuffleDressUpLottery(address _user) external onlyOwnerContract{
        require((now - shuffleDressUpLotteryTime[_user]) > 24 hours);
        lotteryNum=lotteryNum.add(1);
        shuffleDressUpLotteryTime[_user] = now;
        uint _seed = uint(keccak256(abi.encodePacked(bytes32(lotteryNum)^blockhash(block.number-1))));
        if((_seed % 100) <= 5){
            shuffleDressUpTicketNumber[_user] += 1;
            emit LotteryLog(_user,true,'s-dress-up', now);
        }
        emit LotteryLog(_user,false,'s-dress-up', now);
    }

    function doGiftHorseLottery(address _user) external onlyOwnerContract{
        require((now - giftHorseLotteryTime[_user]) > 24 hours);
        lotteryNum = lotteryNum.add(1);
        uint _seed = uint(keccak256(abi.encodePacked(bytes32(lotteryNum)^blockhash(block.number-1))));
        if((_seed % 100) < 2){
            giftHorseLotteryTime[_user] = 1;
            emit GiftHorseLottery(_user,true,now);
        }
        giftHorseLotteryTime[_user] = now;
        emit GiftHorseLottery(_user,false,now);
    }

    function horseGifted(address _user) external onlyOwnerContract{
        giftHorseLotteryTime[_user] = 0;
        emit GiftHorseLottery(_user, true, 0);
    }

    function presentTrainTicket(address _user) external onlyOwnerContract{
        trainTicketNumber[_user]  = trainTicketNumber[_user].add(1);
    }

    function presentDressUpTicket(address _user) external onlyOwnerContract{
        dressUpTicketNumber[_user] = dressUpTicketNumber[_user].add(1);
    }

    function presentShuffleDressUpTicket(address _user) external onlyOwnerContract{
        shuffleDressUpTicketNumber[_user] = shuffleDressUpTicketNumber[_user].add(1);
    }

    function trainHorse(address _user) external onlyOwnerContract{
        trainTicketNumber[_user] = trainTicketNumber[_user].sub(1);
    }

    function dressUpHorse(address _user) external onlyOwnerContract{
        dressUpTicketNumber[_user] = dressUpTicketNumber[_user].sub(1);
    }
    
    function shuffleDressUp(address _user) external onlyOwnerContract{
        shuffleDressUpTicketNumber[_user] = shuffleDressUpTicketNumber[_user].sub(1);
    }

}


