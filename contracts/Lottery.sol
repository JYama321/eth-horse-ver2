pragma solidity ^0.4.23;

contract Lottery{
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    address owner;
    uint public trainTicketPrice;
    uint public dressUpTicketPrice;
    uint public shuffleDressUpTicketPrice;

    constructor(address _ownerContract) public {
        owner = _ownerContract;

    }
}
