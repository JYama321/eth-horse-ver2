pragma solidity ^0.4.23;

library SafeMath {

    function mul
    (
        uint256 a,
        uint256 b
    )
    internal pure
    returns (uint256 c)
    {
        if (a == 0) {
            return 0;
        }
        c = a * b;
        require(c / a == b, "should be commutative");
        return c;
    }

    function div
    (
        uint256 a,
        uint256 b
    )
    internal pure returns (uint256)
    {
        require(b > 0,"should be more than 0");
        uint256 c = a / b;
        return c;
    }

    function sub
    (
        uint256 a,
        uint256 b
    )
    internal pure
    returns (uint256)
    {
        require(b <= a, "a should be more or equal to a.");
        uint256 c = a - b;
        return c;
    }

    function add
    (
        uint256 a,
        uint256 b
    )
    internal pure
    returns (uint256)
    {
        uint256 c = a + b;
        require(c >= a, "c should be more or equal to a");
        return c;
    }

    function mod
    (
        uint256 a,
        uint256 b
    )
    internal pure
    returns (uint256)
    {
        require(b != 0,"b should not be zero");
        return a % b;
    }
}

library Address {
    /*
    @param account address of the account to check
    @return whether the target address is a contract
    */

    function isContract(address account)
    internal view
    returns (bool)
    {
        uint256 size;
        // 指定したaddressの code size が0なら EOA, codeが存在してたらcontract
        assembly { size := extcodesize(account) }
        return size > 0;
    }
}

interface IERC1155 {
    event Approval(address indexed _owner, address indexed _spender, uint256 indexed _id, uint256 _oldValue, uint256 _value);
    event Transfer(address _spender, address indexed _from, address _to, uint256 indexed _id, uint256 _value);

    function transfer (address _to, uint256[] _ids, uint256[] _values) external returns (bool);
    function approve(address _spender, uint256[] _ids, uint256[] _currentValues, uint256[] _values) external returns(bool);
    function balanceOf(uint256 _id, address _owner) external view returns (uint256);
    function allowance(uint256 _id, address _owner, address _spender) external view returns (uint256);
    function transferFrom(address _from, address _to, uint256[] _ids, uint256[] _values) external returns (bool);
}

contract Ownable {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() public {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    function owner() public view returns(address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(isOwner());
        _;
    }

    function isOwner() public view returns(bool) {
        return msg.sender == _owner;
    }

    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0));
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract ERC1155HorseGame is IERC1155 {
    using SafeMath for uint256;
    using Address for address;

    struct FungibleItems {
        string name;
        uint256 totalSupply;
        uint256 lotteryRate;
        uint256 lotterySeedNum;      
        uint256 itemPrice;
        FungibleItemExecInterface tokenContent;
        mapping(address => uint256) lastLot;
        mapping(address => uint256) balances;
        bool isNFT;
    }
    
    mapping (uint256 => uint8) public decimals;
    mapping (uint256 => string) public symbols;
    mapping (uint256 => mapping(address => mapping(address => uint256))) public allowances;
    mapping (uint256 => FungibleItems) public items;
    mapping (uint256 => string) public metadataURIs;

    bytes4 constant private ERC1155_RECEIVED = 0xf23a6e61;

    // Event
    event Approval(address indexed _owner, address indexed _spender, uint indexed _id, uint256 _oldValue, uint256 _value);
    event Transfer(address _spender, address indexed _from, address indexed _to, uint256 indexed _id, uint256 _value);
    event Mint(uint256 _tokenId, string _name, uint256 _totalSupply, string _uri, uint256 _decimals, string _symbol, bool _isNFI);
    
    function allowance
    (
        uint256 _id,
        address _owner,
        address _spender
    )
    external view 
    returns (uint256)
    {
        return allowances[_id][_owner][_spender];
    }
}

contract ERC1155NonFungible is ERC1155HorseGame {
    uint256 constant TYPE_MASK = uint256(uint128(~0)) << 128; 
    uint256 constant NF_INDEX_MASK = uint128(~0); // 128bit 11...111
    uint256 constant TYPE_NF_BIT = 1 << 255; //100...00 256 bit

    mapping(uint256 => address) nfiOwners;

    function isNonFungible
    (
        uint256 _id
    )
    public pure
    returns (bool)
    {
        return (_id & TYPE_NF_BIT) == TYPE_NF_BIT;
    }

    function isFungible
    (
        uint256 _id
    )
    public pure
    returns (bool)
    {
        return _id & TYPE_NF_BIT == 0;
    }

    function getNonFungibleIndex
    (
        uint256 _id
    )
    public pure
    returns (uint256)
    {
        return _id & NF_INDEX_MASK;
    }

    function isNonFungibleBaseType
    (
        uint256 _id
    )
    public pure
    returns (bool)
    {
        return (_id & TYPE_NF_BIT == TYPE_NF_BIT) && (_id & NF_INDEX_MASK == 0);
    }

    function onwerOf
    (
        uint256 _id
    )
    public view
    returns (address)
    {
        if(isNonFungible(_id)){
            return nfiOwners[_id];
        } else {
            return address(0);
        }
    }

    function nonFungibleByIndex
    (
        uint256 _nfiType,
        uint128 _index
    )
    external view
    returns (uint256)
    {
        require(isNonFungibleBaseType(_nfiType),"should be non fungible type");
        require(uint256(_index) <= items[_nfiType].totalSupply, "should be lower or equal to ");

        uint256 nfiId = _nfiType | uint256(_index);

        return nfiId;
    }

    function approve
    (
        address _spender,
        uint256[] _ids,
        uint256[] _currentValues,
        uint256[] _values
    )
    external returns (bool)
    {
        uint256 _id;
        uint256 _value;

        for (uint256 i = 0; i < _ids.length; ++i) {
            _id = _ids[i];
            _value = _values[i];

            if (isNonFungible(_id)) {
                require(_value == 1 || _value == 0,"value shold be ");
                require(nfiOwners[_id] == msg.sender, "should be token owner.");
                require(allowances[_id][msg.sender][_spender] == _currentValues[i], "should be equal to allowance");
            }
            else 
            {
                require(_value == 0 || allowances[_id][msg.sender][_spender] == _currentValues[i], "should value id 0 or allowance is equal to current value");
            }
            allowances[_id][msg.sender][_spender] = _value;
            emit Approval(msg.sender, _spender, _id, _currentValues[i], _value);
        }
        return true;
    }

    function transfer
    (
        address _to,
        uint256[] _ids,
        uint256[] _values
    )
    external returns (bool)
    {
        uint256 _id;
        uint256 _value;
        uint256 _type;

        for (uint256 i = 0; i < _ids.length; ++i) {
            _id = _ids[i];
            _value = _values[i];
            _type = _ids[i] & TYPE_MASK;
            // check whether token is nft or not

            if (isNonFungible(_id)) {
                // non-fungibleの場合
                require(_value == 1, "token value should be 1");
                require(nfiOwners[_id] == msg.sender, "msg.sender should be token owner.");
                nfiOwners[_id] = _to;
            }

            items[_type].balances[msg.sender] = items[_type].balances[msg.sender].sub(_value);
            items[_type].balances[_to] = items[_type].balances[_to].add(_value);

            emit Transfer(msg.sender, msg.sender, _to, _id, _value);
        }
        return true;
    }

    function transferFrom
    (
        address _from,
        address _to,
        uint256[] _ids,
        uint256[] _values
    )
    external returns (bool)
    {
        uint256 _id;
        uint256 _value;
        uint256 _type;

        if(_from == tx.origin) {
            for(uint256 i = 0; i < _ids.length; ++i) {
                _id = _ids[i];
                _value = _values[i];

                if (isNonFungible(_id)) {
                    require(_value == 1, "value should be 1");
                    require(nfiOwners[_id] == _from, "value should be 1");
                    nfiOwners[_id] = _to;
                    _id = _id & TYPE_MASK;
                }

                items[_id].balances[_from] = items[_id].balances[_from].sub(_value);
                items[_id].balances[_to] = items[_id].balances[_to].add(_value);

                emit Transfer(msg.sender, _from, _to, _id, _value);
            }
            return true;
        }
        else 
        {
            for (uint256 j = 0; j < _ids.length; ++j) {
                _id = _ids[j];
                _value = _values[j];
                _type = _id & TYPE_MASK;

                if (isNonFungible(_id)) {
                    require(_value == 1, "value should be 1");
                    nfiOwners[_id] = _to;
                    //nft の場合はid
                    allowances[_id][_from][msg.sender] = allowances[_type][_from][msg.sender].sub(_value);
                } else {
                    //ftの場合は_type
                    //safeMathがallowanceの確認になっている
                    allowances[_type][_from][msg.sender] = allowances[_type][_from][msg.sender].sub(_value);
                }

                items[_type].balances[_from] = items[_type].balances[_from].sub(_value);
                items[_type].balances[_to] = items[_type].balances[_to].add(_value);

                emit Transfer(msg.sender, _from, _to, _id, _value);
            }
            return true;
        }
    }

    function balanceOf
    (
        uint256 _typeId,
        address _owner
    )
    external view
    returns (uint256)
    {
        uint256 _type = _typeId & TYPE_MASK;
        return items[_type].balances[_owner];
    }


    function nonFungibleOwnedTokens(address _owner, uint256 _id) external view returns (uint256[]) {
        uint256 _type = _id & TYPE_MASK;
        uint256 tokenCount = this.balanceOf(_type, _owner);
        require(isNonFungible(_type), "should be non-fungible");

        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalNfTokens = this.totalSupply(_type);
            uint256 resultIndex = 0;

            uint256 nfTokenId;

            for (nfTokenId = 1; nfTokenId <= totalNfTokens; nfTokenId++) {
                uint256 tokenId = _type | nfTokenId;
                if (nfiOwners[tokenId] == _owner) {
                    result[resultIndex] = nfTokenId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

    function ownerOf
    (
        uint256 _id
    ) 
    public view
    returns (address)
    {
        if(isNonFungible(_id)){
            return nfiOwners[_id];
        } else {
            return address(0);
        }
    }

    function name(uint256 _id) external view returns(string){
        uint256 _type = _id & TYPE_MASK;
        return items[_type].name;
    }

    function symbol(uint256 _id) external view returns (string) {
        uint256 _type = _id & TYPE_MASK;
        return symbols[_type];
    }

    function tokenDecimal
    (
        uint256 _id
    )
    external view
    returns (uint256)
    {
        uint256 _type = _id & TYPE_MASK;
        return decimals[_type];
    }

    function totalSupply
    (
        uint256 _typeId
    )
    external view
    returns (uint256)
    {
        uint256 _type = _typeId & TYPE_MASK;
        return items[_type].totalSupply;
    }
    
    function uri
    (
        uint256 _id
    )
    external view
    returns (string)
    {
        return metadataURIs[_id];
    }
}

contract GameBase is ERC1155NonFungible, Ownable {

    event LotteryLog(address indexed _from, bool _success, string _type,uint _tokenId, uint _now);
    uint256 public nonce;
    uint public matePrice;
    struct NonFungibleMetaData {
        uint id;
        uint genes;
        string name;
        uint winCount;
        uint papaId;
        uint momId;
        uint mateIndex;
        uint raceIndex;
        uint saleDuration;
        uint totalPrize;
        bool isOnSale;
        bool isOnSireSale;
    }
    mapping(uint256 => NonFungibleMetaData) nonFungibleIdToMetadata;
    GeneFunctionInterface geneFunction;
    RaceFunctionInterface raceFunction;

    function mintFungible
    (
        string _name,
        uint256 _totalSupply,
        uint256 _lotteryRate,
        address _tokenContent,
        string _uri,
        uint8 _decimals,
        string _symbol,
        bool _isNFI
    )
    external onlyOwner
    {
        uint256 _type = (++nonce << 128);
        if (_isNFI) {
            require(_totalSupply == 0, "Non-fungible token supply should be 0 at first.");
            _type = _type | TYPE_NF_BIT;
        }
        items[_type].tokenContent = FungibleItemExecInterface(_tokenContent);
        items[_type].name = _name;
        items[_type].totalSupply = _totalSupply;
        items[_type].lotteryRate = _lotteryRate;
        metadataURIs[_type] = _uri;
        decimals[_type] = _decimals;
        symbols[_type] = _symbol;

        items[_type].balances[msg.sender] = _totalSupply;
        emit Mint(nonce, _name, _totalSupply, _uri, _decimals, _symbol, _isNFI);
    }

    function setGeneFunction(address _geneAddress) external onlyOwner{
        geneFunction = GeneFunctionInterface(_geneAddress);
    }

    function setRaceFunction(address _raceAddress) external onlyOwner {
        raceFunction = RaceFunctionInterface(_raceAddress);
    }

    function _mintNonFungible
    (
        string _name,
        uint _momId,
        uint _papaId,
        uint _nfi,
        address _to
    )
    private
    {
        require(_to != address(0), "_to should not be address(0)");
        require(_papaId != _momId || _momId ==0 &&  _papaId == 0,"papaID should not be equal to mamaId,  papaID and mamaId should not be 0. ");
        NonFungibleMetaData memory mom = nonFungibleIdToMetadata[_momId];
        NonFungibleMetaData memory papa = nonFungibleIdToMetadata[_papaId];
        uint newGene = geneFunction.generateGenes(papa.genes, mom.genes, _name);
        NonFungibleMetaData memory metaData = NonFungibleMetaData({
            id: _nfi,
            genes: newGene,
            name: _name,
            winCount: 0,
            papaId: _papaId,
            momId: _momId,
            mateIndex:(newGene % (10 ** 30) / (10 ** 29)) + (newGene % (10 ** 29) / (10 ** 28)),
            raceIndex:(newGene % (10 ** 32) / (10 ** 31)) + (newGene % (10 ** 31) / (10 ** 30)),
            saleDuration: 0,
            totalPrize: 0,
            isOnSale: false,
            isOnSireSale: false
        });
        nonFungibleIdToMetadata[_nfi] = metaData;
        nfiOwners[_nfi] = _to;
    }

    function mintNonFungible
    (
        uint256 _type,
        address _to,
        string _name
    )
    external onlyOwner
    {
        require(isNonFungible(_type), "should be non fungible type");
        uint256 _startIndex = items[_type].totalSupply;
        uint256 _nfi = _type | (_startIndex  + 1);
        items[_type].balances[_to] = items[_type].balances[_to].add(1);
        _mintNonFungible(_name,0,0, _nfi, _to);
        items[_type].totalSupply = items[_type].totalSupply.add(1);
    }


    function setMatePrice(uint _price) external onlyOwner {
        matePrice = _price;
    }

    function mateHorses(uint _type,uint _papaId, uint _mamaId, string _name) external payable {
        require(_papaId != _mamaId && msg.value >= matePrice,"papa and mama should be diffrence and msg.value is higher or equal to matePrice");
        require(nfiOwners[_papaId] == msg.sender && nfiOwners[_mamaId] == msg.sender,"user should be owner of both papa and mama.");
        NonFungibleMetaData storage papa = nonFungibleIdToMetadata[_papaId];
        NonFungibleMetaData storage mama = nonFungibleIdToMetadata[_mamaId];
        require(papa.mateIndex >= 1 && mama.mateIndex >= 1, "mateIndex should be remained.");
        uint _startIndex = items[_type].totalSupply;
        uint256 _nfi = _type | (_startIndex  + 1);
        papa.mateIndex -= 1;
        mama.mateIndex -= 1;
        _mintNonFungible(_name,_papaId,_mamaId,_nfi,msg.sender);
    }

    function setURI
    (
        uint256 _id,
        string _uri
    )
    external onlyOwner
    {
        metadataURIs[_id] = _uri;
    }   

}

contract GameAuction is GameBase {

    struct Auction {
        address seller;
        uint128 startingPrice;
        uint128 endingPrice;
        uint64 duration;
        uint64 startedAt;
    }
    event AuctionCreated(uint256 tokenId, uint256 startingPrice, uint256 endingPrice, uint256 duration);
    mapping (uint => Auction) tokenIdToAuction;

    function createAuction(
            uint _tokenId,
            uint _startingPrice,
            uint _endingPrice,
            uint _duration,
            address _seller
        )
        external
    {
        require(_startingPrice == uint256(uint128(_startingPrice)));
        require(_endingPrice == uint256(uint128(_endingPrice)));
        require(_duration == uint256(uint64(_duration)));
        require(ownerOf(_tokenId) == msg.sender);
        Auction memory auction = Auction(
            _seller,
            uint128(_startingPrice),
            uint128(_endingPrice),
            uint64(_duration),
            uint64(now)
        );
        _addAuction(_tokenId, auction);
    }

    function _addAuction(uint256 _tokenId, Auction _auction) internal {
        require(_auction.duration >= 1 minutes);

        tokenIdToAuction[_tokenId] = _auction;

        emit AuctionCreated(
            uint256(_tokenId),
            uint256(_auction.startingPrice),
            uint256(_auction.endingPrice),
            uint256(_auction.duration)
        );
    }
}

contract GameMating is GameAuction {

    function setItemPrice(uint _type, uint _price) external onlyOwner {
        items[_type].itemPrice = _price;
    }

    function execLottery(uint256 _fungibleType) external {
        require(now - items[_fungibleType].lastLot[msg.sender] > 24 hours);
        items[_fungibleType].lotterySeedNum.add(1);
        uint _seed = uint(keccak256(abi.encodePacked(bytes32(items[_fungibleType].lotterySeedNum)^blockhash(block.number-1))));
        items[_fungibleType].lastLot[msg.sender] = now;
        if((_seed % 100) < 5) {
            items[_fungibleType].balances[msg.sender] += 1;
            emit LotteryLog(msg.sender, true, items[_fungibleType].name,_fungibleType, now);
        }
    }
    function() public payable{}
}

contract FungibleItemExecInterface {
    // アイテムは基本的にgeneを書き換えて新しいものを返す。大元のコントラクトはそれをただ置き換えるだけ
    function execItemEffect(uint256 _gene) external returns(uint256);
}

contract RaceFunctionInterface {
    function generateWinnerIndex(bytes32 _nonce, uint _gene1, uint _gene2) external view returns(uint);
    function horseStrengthBalance(uint _gene1, uint _gene2) external view returns(uint, uint);
}

contract GeneFunctionInterface {
    function generateGenes(uint,uint,string) external view returns(uint);
    function generateReplaceGene(uint) external view returns(uint);
}