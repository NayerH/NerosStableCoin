//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721.sol";
import "./NerosNFTCoin.sol";

contract NerosNFT is ERC721 {
  uint256 public tokenCounter;
  NerosNFTCoin private nerosNFTCoin;

  constructor(address _nerosNFTCoin) ERC721 ("NerosNFT", "NROT"){
      tokenCounter = 0;
      nerosNFTCoin = NerosNFTCoin(_nerosNFTCoin);
  }

  function createNFT(string memory tokenURI) public returns (uint256) {
      uint256 newItemId = tokenCounter;
      //BURN NerosNFTCoin
      nerosNFTCoin.burnNFTCoin(msg.sender, 1);
      safeMint(msg.sender, newItemId);
      setTokenURI(newItemId, tokenURI);
      tokenCounter++;
      return newItemId;
  }
}
