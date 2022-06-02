//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721.sol";
import "./NerosNFTCoin.sol";

contract NerosNFT is ERC721 {
  uint256 public tokenCounter;
  uint256 public tokenIdToCheck;

  NerosNFTCoin private nerosNFTCoin;
  address private nerosContract;

  constructor(address _nerosNFTCoin, address _nerosContract) ERC721 ("NerosNFT", "NROT"){
      tokenCounter = 0;
      tokenIdToCheck = 0;
      nerosNFTCoin = NerosNFTCoin(_nerosNFTCoin);
      nerosContract = _nerosContract;
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

  function setTransferable(bool transferable) public onlyAdmin {
      if(transferable){
        isTransferable[tokenIdToCheck] = true;
      } else {
        burn(tokenIdToCheck);
      }
      tokenIdToCheck++;
  }

  function setForSale(uint tokenId, bool forSale) public {
    require(isApprovedOrIsOwner(msg.sender, tokenId), "NerosNFT: Sender is neither the owner nor approved to do this transaction");
    isForSale[tokenId] = forSale;
    if(forSale) {
      _approve(nerosContract, tokenId);
    } else {
      _approve(address(0), tokenId);
    }
  }

  function getAllForSale() public view returns (int[] memory) {
    int[] memory res = new int[](tokenCounter + 1);
    uint index = 0;
    for(uint i = 0; i < tokenCounter; i++){
      if(isForSale[i]){
         res[index++] = int(i);
      }
    }
    int[] memory resFinal = new int[](index);
    for(uint i = 0; i < index; i++){
      resFinal[i] = res[i];
    }
    return resFinal;
  }

  function getMyNFTs() public view returns (uint[] memory) {
    uint length = ownedTokens[msg.sender].length;
    uint[] memory res = new uint[](length);
    for(uint i = 0; i < length; i++) {
      res[i] = ownedTokens[msg.sender][i];
    }
    return res;
  }

  function exchangeNFT(address from, address to, uint256 tokenId) public {
    require(isForSale[tokenId], "NerosNFT: This token is not for sale");
    safeTransferFrom(from, to, tokenId);
  }
}
