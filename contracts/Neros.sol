//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./IERC20.sol";
import "./BankHandler.sol";
import "./NerosNFTCoin.sol";

contract Neros is ERC20Interface {
    string public name;
    string public symbol;
    address public owner;
    uint public _totalSupply;
    uint8 public decimals;
    BankHandler private bankHandler;
    NerosNFTCoin private nerosNFTCoin;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    constructor(address _bankHandler, address _nerosNFTCoin) {
        name = "Neros";
        symbol = "NRO";
        owner = msg.sender;
        _totalSupply = 0;
        decimals = 6;
        bankHandler = BankHandler(_bankHandler);
        nerosNFTCoin = NerosNFTCoin(_nerosNFTCoin);
    }

    modifier isOwner () {
        require(msg.sender == owner, "Neros: Only owner is allowed to do this functionality");
        _;
    }

    function mintNewTokens(uint amount, address to) internal {
        require(to != address(0), "Neros: To address cannot be a zero address for minting");

        _totalSupply += amount;
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function burnTokens(uint amount, address from) internal {
        require(from != address(0), "Neros: Address to burn coins from cannot be a zero address");
        require(balances[from] >= amount, "Neros: Amount to be burn must be larger than address balance.");

        balances[from] -= amount;
        _totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    function fiatToCoins(address to, uint tokens) public {
        //BANK DETAILS INPUT
        bankHandler.withdrawMoney();
        //CALLS mintNewTokens
        mintNewTokens(tokens, to);
        //MINT NerosNFTCoin
        nerosNFTCoin.mintNFTCoin(owner, tokens/100);
    }

    function coinsToFiat(address from, uint tokens) public {
        //BANK DETAILS INPUT
        bankHandler.refundMoney();
        //CALLS burnTokens
        burnTokens(tokens, from);
    }

    function _transferFrom(address from, address to, uint tokens) internal {
        require(balances[msg.sender] >= tokens, "Neros: Your balance is too low to transfer this amouut of Neros.");
        require(to != address(0), "Neros: To address cannot be a zero address");
        require(from != address(0), "Neros: From address cannot be a zero address");

        balances[from] -= tokens;
        balances[to] += tokens;
        emit Transfer(from, to, tokens);
    }

    function changeAllowance(address tokenOwner, address spender, uint amount) internal {
        require(spender != address(0), "Neros: approved spender address cannot be the zero address");
        require(tokenOwner != address(0), "Neros: approved owner address cannot be the zero address");

        allowed[tokenOwner][spender] = amount;
        emit Approval(tokenOwner, spender, amount);
    }

    function totalSupply() public view override returns (uint256){
        return _totalSupply;
    }
    function balanceOf(address tokenOwner) public view override returns (uint){
        return balances[tokenOwner];
    }
    function allowance(address tokenOwner, address spender) public view override returns (uint){
        return allowed[tokenOwner][spender];
    }
    function transfer(address to, uint tokens) public override returns (bool){
        _transferFrom(msg.sender, to, tokens);
        return true;
    }
    function approve(address spender, uint tokens)  public override returns (bool){
        changeAllowance(msg.sender, spender, tokens);
        return true;
    }
    function transferFrom(address from, address to, uint tokens) public override returns (bool){
        require(allowance(from, msg.sender) >= tokens, "Neros: Insufficient balance for approval of this amount of Neros.");
        changeAllowance(from, msg.sender, allowance(from, msg.sender) - tokens);
        _transferFrom(from, to, tokens);
        return true;
    }
}
