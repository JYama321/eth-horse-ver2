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
    uint public trainTicketPrice;
    uint public dressUpTicketPrice;
    uint public shuffleDressUpTicketPrice;
    mapping(address => uint) public trainTicketNum; //ticket number
    mapping(address => uint) public dressUpTicketNum; // ticket number
    mapping(address => uint) public shuffleDressUpTicketNum; // all ticket number
    mapping(address => uint) public trainLottery; //address to the last time to do a lottery
    mapping(address => uint) public dressUpLottery;
    mapping(address => uint) public shuffleDressUpLottery;
    mapping(address => uint) public giftHorseLottery;
    uint public lotteryNum=0;

    event LotteryLog(address indexed _from, bool _success, string _type, uint _now);
    event GiftHorseLottery(address indexed _from, uint _tokenId);

    constructor() public{
        owner = msg.sender;
    }

    function setOwner(address _newOwner) onlyOwner{
        owner = _newOwner;

    }

    function setOwnerContract(address _ownerContract) external onlyOwner{
        ownerContract = _ownerContract;
    }

    function setTrainTicketPrice(uint _price) external onlyOwnerContract{
        trainTicketPrice = _price;
    }

    function setDressUpTicketPrice(uint _price) external onlyOwnerContract{
        dressUpTicketPrice = _price;
    }

    function setShuffleDressUpTicketPrice(uint _price) external onlyOwnerContract{
        shuffleDressUpTicketPrice = _price;
    }

    function buyTrainTicket(uint _price) external onlyOwnerContract{
        uint num = _price / trainTicketPrice;
        trainTicketNum[msg.sender] = trainTicketNum[msg.sender].add(num);
    }

    function buyShuffleDressUpTicket(uint _price) external onlyOwnerContract{
        uint num = _price / shuffleDressUpTicketPrice;
        shuffleDressUpTicketNum[msg.sender] = shuffleDressUpTicketNum[msg.sender].add(num);
    }

    function buyDressUpTicket(uint _price) external onlyOwnerContract{
        uint num = _price / dressUpTicketPrice;
        dressUpTicketNum[msg.sender] = dressUpTicketNum[msg.sender].add(num);
    }


    function doTrainLottery(address _user) external onlyOwnerContract{
        require((now - trainLottery[_user]) > 24 hours);
        lotteryNum += 1;
        trainLottery[_user] = now;
        uint _seed = uint(keccak256(lotteryNum,blockhash(block.number-1)));
        if((_seed % 100) < 5){
            trainTicketNum[_user] += 1;
            emit LotteryLog(_user,true,'train', now);
        }
        emit LotteryLog(_user,false,'train', now);
    }

    function doDressUpLottery(address _user) external onlyOwnerContract{
        require((now - dressUpLottery[_user]) > 24 hours);
        lotteryNum += 1;
        dressUpLottery[_user] = now;
        uint _seed = uint(keccak256(lotteryNum,blockhash(block.number-1)));
        if((_seed % 50) <= 2){
            dressUpTicketNum[_user] += 1;
            emit LotteryLog(_user,true,'dress-up', now);
        }
        emit LotteryLog(_user,false,'dress-up', now);
    }

    function doShuffleDressUpLottery(address _user) external onlyOwnerContract{
        require((now - shuffleDressUpLottery[_user]) > 24 hours);
        lotteryNum += 1;
        shuffleDressUpLottery[_user] = now;
        uint _seed = uint(keccak256(lotteryNum,blockhash(block.number-1)));
        if((_seed % 100) <= 5){
            shuffleDressUpTicketNum[_user] += 1;
            emit LotteryLog(_user,true,'s-dress-up', now);
        }
        emit LotteryLog(_user,false,'s-dress-up', now);
    }

    function doGiftHorseLottery(address _user) external onlyOwnerContract{
        require((now - giftHorseLottery[_user]) > 24 hours);
        lotteryNum += 1;
        giftHorseLottery[_user] = now;
        emit GiftHorseLottery(_user,0);
    }

    function presentTrainTicket(address _user) external onlyOwnerContract{
        trainTicketNum[_user]  = trainTicketNum[_user].add(1);
    }

    function presentDressUpTicket(address _user) external onlyOwnerContract{
        dressUpTicketNum[_user] = dressUpTicketNum[_user].add(1);
    }

    function presentShuffleDressUpTicket(address _user) external onlyOwnerContract{
        shuffleDressUpTicketNum[_user] = shuffleDressUpTicketNum[_user].add(1);
    }




}
