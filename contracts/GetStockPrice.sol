//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract ChainlinkExample is ChainlinkClient {
  using Chainlink for Chainlink.Request;

  uint256 public currentPrice;
  address public owner;

  address ORACLE_ADDRESS = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
  string constant JOBID = "3b7ca0d48c7a4b2da9268456665d11ae";
  uint256 constant private ORACLE_PAYMENT = 100000000000000000;

  constructor() {
    setPublicChainlinkToken();
    setChainlinkOracle(ORACLE_ADDRESS);
    owner = msg.sender;
  }
  function requestBytes(string memory ticker) public onlyOwner
  {
    bytes32 specId = stringToBytes32(JOBID);
    Chainlink.Request memory req = buildChainlinkRequest(specId, address(this), this.fulfillBytes.selector);
    req.add("get",string(abi.encodePacked("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=XXXXXXX&symbol=", ticker)));
    string[] memory path = new string[](2);
    path[0] = "Global Quote";
    path[1] = "05. price";
    req.addStringArray("path", path);
    req.addInt("times", 100);
    sendChainlinkRequestTo(ORACLE_ADDRESS, req, ORACLE_PAYMENT);
  }

  event RequestFulfilled(
    bytes32 indexed requestId,
    uint256 _price
  );

  function fulfillBytes(
    bytes32 requestId,
    uint256 _price
  )
    public
    recordChainlinkFulfillment(requestId)
  {
    emit RequestFulfilled(requestId, _price);
    currentPrice = _price;
  }

  // withdrawLink allows the owner to withdraw any extra LINK on the contract
  function withdrawLink()
    public
    onlyOwner
  {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // A helper funciton to make the string a bytes32
  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }
    assembly { // solhint-disable-line no-inline-assembly
      result := mload(add(source, 32))
    }
  }
}
