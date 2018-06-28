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

contract GeneFunction{
    using SafeMath for uint;
    uint geneModulus = 10 ** 64; // length of genes
    function generateGenes
    (
        uint256 _maleGene,
        uint256 _femaleGene,
        string _name
    )
    external view returns (uint)
    {
        uint _seed = uint(keccak256(_name,blockhash(block.number-1)));
        uint fakeGene = _seed % geneModulus;
        uint newGene;
        if(_femaleGene == 0 && _maleGene == 0){
            newGene = fakeGene;
            return newGene;
        }else{
            for(uint i=1;i<=32;i++){
                uint quot = 10 ** (i * 2);
                uint con = quot / 100;
                if(fakeGene % quot > 5 * con * 10){
                    newGene = newGene.add(_maleGene % quot - _maleGene % con);
                }else if(fakeGene % quot > 1 * con * 10){
                    newGene = newGene.add(_femaleGene % quot - _femaleGene % con);
                }else{
                    newGene = newGene.add(fakeGene % quot - fakeGene % con);
                }
            }
            return newGene;
        }
    }

    function generateReplaceGene
    (uint _nonce)
    external view returns(uint)
    {
        uint _seed = uint(keccak256(_nonce,blockhash(block.number-1)));
        return  _seed % geneModulus;
    }

}
