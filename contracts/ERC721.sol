// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract ERC721 is IERC721, IERC721Metadata {
  string public name;
  string public symbol;
  address public owner;

  mapping(address => uint) private balances;
  mapping(uint => address) private owners;
  mapping(uint256 => address) private tokenApprovals;
  mapping(address => mapping(address => bool)) private operatorApprovals;
  mapping(uint256 => string) private tokenURIs;

  mapping(uint256 => bool) public isTransferable;
  mapping(address => bool) public admins;

  constructor(string memory _name, string memory _symbol){
      name = _name;
      symbol = _symbol;
      owner = msg.sender;
      admins[owner] = true;
  }
  modifier onlyOwner() {
      require(msg.sender == owner, "ERC721: Only owner is allowed to do this functionality");
      _;
  }
  modifier onlyAdmin() {
      require(admins[msg.sender], "ERC721: Only admins are allowed to do this functionality");
      _;
  }

  function balanceOf(address _owner) public view returns (uint) {
      require(_owner != address(0), "ERC721: address owner cannot be the zero address");
      return balances[_owner];
  }

  function ownerOf(uint tokenId) public view returns (address) {
      require(owners[tokenId] != address(0), "ERC721: Token with entered ID does not exist");
      return owners[tokenId];
  }

   function getApproved(uint tokenId) public view returns (address) {
       require(owners[tokenId] != address(0), "ERC721: Token with entered ID does not exist");
       return tokenApprovals[tokenId];
   }

   function isApprovedForAll(address _owner, address operator) public view returns (bool) {
       return operatorApprovals[_owner][operator];
   }

   function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) public {
        _transfer(from, to, tokenId);
        require(checkSafeCondition(from, to, tokenId, data), "ERC721: transfer cannot complete to a smart contract not implementing ERC721Receiver");
   }

   function safeTransferFrom(address from, address to, uint256 tokenId) public {
        this.safeTransferFrom(from, to, tokenId, "");
   }

   function transferFrom(address from, address to, uint256 tokenId) public {
        _transfer(from, to, tokenId);
   }

   function _transfer(address from, address to, uint256 tokenId) internal {
        require(from != address(0), "ERC721: from address entered cannot be the zero address");
        require(to != address(0), "ERC721: to address entered cannot be the zero address");
        require(owners[tokenId] == from, "ERC721: Token with entered ID is not owned by the from address");
        require(isTransferable[tokenId], "ERC721: Token cannot be transfered yet as transfer of stock ownership is not yet verified");
        require(isApprovedOrIsOwner(msg.sender, tokenId), "ERC721: Sender is neither the owner nor approved to do this transaction");

        //reset approve for the token with a new owner
        _approve(address(0), tokenId);
        balances[from]--;
        balances[to]++;
        owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
   }

   function setTransferable(uint tokenId, bool transferable) public onlyAdmin {
        isTransferable[tokenId] = transferable;
   }

   function addOrRemoveAdmin(address admin, bool add) public onlyOwner {
        admins[admin] = add;
   }

   function approve(address to, uint256 tokenId) public {
       address _owner = owners[tokenId];
       require(to != _owner, "ERC721: owner cannot approve himself/herself");
       require(msg.sender == _owner || isApprovedForAll(_owner, msg.sender), "ERC721: caller must own the token or be approved for all");
       _approve(to, tokenId);
   }

   function _approve(address to, uint256 tokenId) internal {
       tokenApprovals[tokenId] = to;
       emit Approval(owners[tokenId], to, tokenId);
   }

   function setApprovalForAll(address operator, bool approved) public {
       require(msg.sender != operator, "ERC721: sender cannot set approval for himself/herself");
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
        require(to != address(0), "ERC721: to address entered cannot be the zero address");
        require(owners[tokenId] == address(0), "ERC721: a token with the specified ID is already minted");

        balances[to]++;
        owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
        require(
            checkSafeCondition(address(0), to, tokenId, data),
            "ERC721: transfer cannot complete to a smart contract not implementing ERC721Receiver"
        );
    }

    function burn(uint256 tokenId) public {
        require(owners[tokenId] != address(0), "ERC721: no token with the specified ID was minted before");
        require(owners[tokenId] == msg.sender, "ERC721: a token with the specified ID is not owned by the sender");

        _approve(address(0), tokenId);
        balances[msg.sender]--;
        isTransferable[tokenId] = false;

        delete owners[tokenId];
        delete tokenURIs[tokenId];

        emit Transfer(msg.sender, address(0), tokenId);
    }

    //METADATA
    function setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(owners[tokenId] != address(0), "ERC721: cannot set URI of a nonexistent token");
        tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint tokenId) public view returns(string memory) {
        require(owners[tokenId] != address(0), "ERC721: cannot get URI of nonexistent token");

        return string(abi.encodePacked(baseURI(), tokenURIs[tokenId]));
    }

    function baseURI() internal pure returns(string memory) {
      return "https://ipfs.io/ipfs/";
    }


    function checkSafeCondition(address from, address to, uint256 tokenId, bytes memory data) internal returns (bool){
        if(isContract(to)){
            try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, data) returns (bytes4 retval) {
                return (retval == IERC721Receiver.onERC721Received.selector);
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer cannot complete to a smart contract not implementing ERC721Receiver");
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