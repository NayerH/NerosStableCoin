//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NerosNFTCoin is ERC20 {
  address public owner;
  mapping(address => bool) public admins;

  constructor() ERC20 ("NerosNFTCoin", "NROC") {
    owner = msg.sender;
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
  function burnNFTCoin(address from, uint amount) public onlyAdmin {
    _burn(from, amount);
  }
}
