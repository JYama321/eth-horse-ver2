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

contract RaceFunction{

    function generateWinnerIndex(bytes32 _nonce,uint _gene1, uint _gene2) external view returns (uint){
        uint seed = uint256(keccak256(_nonce,blockhash(block.number-1)));
        uint info1 = _returnStrength(_gene1);
        uint info2 = _returnStrength(_gene2);
        uint rangeMax = info1 + info2;
        uint winnerIndexSeed = uint(seed) % rangeMax;
        if(winnerIndexSeed < info1){
            return 0;
        }else{
            return 1;
        }
    }

    function _returnStrength(uint256 _gene) internal pure returns (uint256) {
        uint info1 = _gene % 100;
        uint info2 = _gene % 10000 / 100;
        uint info3 = _gene % 1000000 / 10000;
        uint info4 = _gene % 100000000 / 1000000;
        uint info5 = _gene % 10000000000 / 100000000;
        return info1 + info2 + info3 + info4 + info5;
    }

    function horseStrengthBalance(uint _gene1,uint _gene2) external pure returns
    (uint,uint)
    {
        return(_returnStrength(_gene1),_returnStrength(_gene2));
    }


}
