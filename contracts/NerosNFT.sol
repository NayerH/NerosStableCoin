//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721.sol";

contract NerosNFT is ERC721 {
  uint256 public tokenCounter;
  address public owner;

  constructor() ERC721 ("NerosNFT", "NROT"){
      tokenCounter = 0;
      owner = msg.sender;
  }
  modifier isOwner() {
      require(msg.sender == owner, "NerosNFT: Only owner is allowed to do this functionality");
      _;
  }

  function createNFT(string memory tokenURI) public returns (uint256) {
      uint256 newItemId = tokenCounter;
      safeMint(msg.sender, newItemId);
      setTokenURI(newItemId, tokenURI);
      tokenCounter++;
      return newItemId;
  }
}
