// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract NerosNFT is IERC721 {
  string public name;
  string public symbol;

  mapping(address => uint) private balances;
  mapping(uint => address) private owners;
  mapping(uint256 => address) private tokenApprovals;
  mapping(address => mapping(address => bool)) private operatorApprovals;

  constructor(string memory _name, string memory _symbol){
      name = _name;
      symbol = _symbol;
  }

  function balanceOf(address owner) public view returns (uint) {
      require(owner != address(0), "NerosNFT: address owner cannot be the zero address");
      return balances[owner];
  }

  function ownerOf(uint tokenId) public view returns (address owner) {
      require(owners[tokenId] != address(0), "NerosNFT: Token with entered ID does not exist");
      return owners[tokenId];
  }

   function getApproved(uint tokenId) public view returns (address operator) {
       require(owners[tokenId] != address(0), "NerosNFT: Token with entered ID does not exist");
       return tokenApprovals[tokenId];
   }

   function isApprovedForAll(address owner, address operator) public view returns (bool) {
       return operatorApprovals[owner][operator];
   }

   function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) public {
        _transfer(from, to, tokenId);
        require(checkSafeCondition(from, to, tokenId, data), "NerosNFT: transfer cannot complete to a smart contract not implementing ERC721Receiver");
   }

   function safeTransferFrom(address from, address to, uint256 tokenId) public {
        this.safeTransferFrom(from, to, tokenId, "");
   }

   function transferFrom(address from, address to, uint256 tokenId) public {
        _transfer(from, to, tokenId);
   }

   function _transfer(address from, address to, uint256 tokenId) internal {
        require(from != address(0), "NerosNFT: from address entered cannot be the zero address");
        require(to != address(0), "NerosNFT: to address entered cannot be the zero address");
        require(owners[tokenId] == from, "NerosNFT: Token with entered ID is not owned by the from address");

        require(isApprovedOrIsOwner(msg.sender, tokenId), "NerosNFT: Sender is neither the owner nor approved to do this transaction");

        //reset approve for the token with a new owner
        _approve(address(0), tokenId);
        balances[from]--;
        balances[to]++;
        owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
   }

   function approve(address to, uint256 tokenId) public {
       address owner = owners[tokenId];
       require(to != owner, "NerosNFT: owner cannot approve himself/herself");
       require(msg.sender == owner || isApprovedForAll(owner, msg.sender), "NerosNFT: caller must own the token or be approved for all");
       _approve(to, tokenId);
   }

   function _approve(address to, uint256 tokenId) internal {
       tokenApprovals[tokenId] = to;
       emit Approval(owners[tokenId], to, tokenId);
   }

   function setApprovalForAll(address operator, bool approved) public {
       require(msg.sender != operator, "NerosNFT: sender cannot set approval for himself/herself");
       operatorApprovals[msg.sender][operator] = approved;
       emit ApprovalForAll(msg.sender, operator, approved);
   }

    function isApprovedOrIsOwner(address caller, uint tokenId) internal view returns (bool){
        return (owners[tokenId] == caller) || getApproved(tokenId) == caller || isApprovedForAll(owners[tokenId], caller);
    }

    function safeMint(address to, uint256 tokenId) internal {
        safeMint(to, tokenId, "");
    }

    function safeMint(address to, uint256 tokenId, bytes memory data) internal {
        require(to != address(0), "NerosNFT: to address entered cannot be the zero address");
        require(owners[tokenId] == address(0), "NerosNFT: a token with the specified ID is already minted");

        balances[to]++;
        owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
        require(
            checkSafeCondition(address(0), to, tokenId, data),
            "NerosNFT: transfer cannot complete to a smart contract not implementing ERC721Receiver"
        );
    }

    function burn(uint256 tokenId) public {
        require(owners[tokenId] != address(0), "NerosNFT: no token with the specified ID was minted before");
        require(owners[tokenId] == msg.sender, "NerosNFT: a token with the specified ID is not owned by the sender");

        _approve(address(0), tokenId);
        balances[msg.sender]--;
        delete owners[tokenId];

        emit Transfer(msg.sender, address(0), tokenId);
    }


    function checkSafeCondition(address from, address to, uint256 tokenId, bytes memory data) internal returns (bool){
        if(isContract(to)){
            try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, data) returns (bytes4 retval) {
                return (retval == IERC721Receiver.onERC721Received.selector);
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("NerosNFT: transfer cannot complete to a smart contract not implementing ERC721Receiver");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == type(IERC721).interfaceId;
    }
}
