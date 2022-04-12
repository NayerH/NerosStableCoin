//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract GetCarInfo is ChainlinkClient {
  using Chainlink for Chainlink.Request;

  address public owner;
  string public model;
  string public make;
  uint256 public modelYear;

  address ORACLE_ADDRESS = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
  string constant JOBIDSTR = "187bb80e5ee74a139734cac7475f3c6e";
  string constant JOBIDINT = "3b7ca0d48c7a4b2da9268456665d11ae";
  uint256 constant private ORACLE_PAYMENT = 100000000000000000;

  constructor() {
    setPublicChainlinkToken();
    setChainlinkOracle(ORACLE_ADDRESS);
    owner = msg.sender;
  }
  function requestCarInfo(string memory vin) public onlyOwner
  {
    getVinData(vin, 1);
    getVinData(vin, 2);
    getVinData(vin, 3);
  }

  function getVinData(string memory vin, uint caseNum) internal {
    bytes32 specId = stringToBytes32(JOBIDSTR);
    bytes4 selector;
    string memory pathStr;
    if(caseNum == 1){
        selector = this.fulfillModel.selector;
        pathStr = "Results.8.Value";
    } else if (caseNum == 2) {
        selector = this.fulfillMake.selector;
        pathStr = "Results.6.Value";
    } else {
        selector = this.fulfillModelYear.selector;
        pathStr = "Results.9.Value";
        specId = stringToBytes32(JOBIDINT);
    }
    Chainlink.Request memory req = buildChainlinkRequest(specId, address(this), selector);
    req.add("get",string(abi.encodePacked("https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/", vin, "?format=json")));
    req.add("path", pathStr);
    sendChainlinkRequestTo(ORACLE_ADDRESS, req, ORACLE_PAYMENT);
  }

  event RequestModelFulfilled(
    bytes32 indexed requestId,
    string indexed model
  );

  event RequestMakeFulfilled(
    bytes32 indexed requestId,
    string indexed make
  );

  event RequestModelYearFulfilled(
    bytes32 indexed requestId,
    uint256 indexed modelYear
  );

  function fulfillModel(
    bytes32 requestId,
    bytes32 _modelB
  )
    public
    recordChainlinkFulfillment(requestId)
  {
    string memory _model = bytes32ToString(_modelB);
    emit RequestModelFulfilled(requestId, _model);
    model = _model;
  }

  function fulfillMake(
    bytes32 requestId,
    bytes32 _makeB
  )
    public
    recordChainlinkFulfillment(requestId)
  {
    string memory _make = bytes32ToString(_makeB);
    emit RequestMakeFulfilled(requestId, _make);
    make = _make;
  }

  function fulfillModelYear(
    bytes32 requestId,
    uint _modelYear
  )
    public
    recordChainlinkFulfillment(requestId)
  {
    emit RequestModelYearFulfilled(requestId, _modelYear);
    modelYear = _modelYear;
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

  function bytes32ToString(bytes32 _bytes32) private pure returns (string memory) {
    uint8 i = 0;
    while(i < 32 && _bytes32[i] != 0) {
        i++;
    }
    bytes memory bytesArray = new bytes(i);
    for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
        bytesArray[i] = _bytes32[i];
    }
    return string(bytesArray);
}
}
