//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NerosNFTCoin is ERC20 {
  address public owner;
  mapping(address => bool) public admins;
  uint public price = 0.001 ether;

  constructor() ERC20 ("NerosNFTCoin", "NROC") {
    owner = msg.sender;
    admins[msg.sender] = true;
  }
  modifier onlyOwner() {
      require(msg.sender == owner, "NerosNFTCoin: Only owner is allowed to do this functionality");
      _;
  }
  modifier onlyAdmin() {
      require(admins[msg.sender], "NerosNFTCoin: Only admin contract is allowed to do this functionality");
      _;
  }

  function setAdmin(address _admin) public onlyOwner {
    admins[_admin] = true;
  }

  function mintNFTCoin(address to, uint amount) public onlyAdmin {
    _mint(to, amount);
  }
  function burnNFTCoin(address from, uint amount) public {
    _burn(from, amount);
  }

  function decimals() public pure override returns (uint8) {
      return 0;
  }

  function setPrice(uint _price) public onlyOwner {
    price = _price;
  }

  function buyNFTCoin() public payable {
    require(msg.value >= price, "NerosNFTCoin: User must send along some Ether to obtain NROC");
    _transfer(owner, msg.sender, msg.value/price);
  }

  function withdrawEtherBalance() public onlyOwner {
    require(payable(owner).send(address(this).balance));
  }
}
