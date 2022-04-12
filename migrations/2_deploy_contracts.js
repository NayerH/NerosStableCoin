//jshint esversion: 8
let Neros = artifacts.require("./Neros.sol");
let BankHandler = artifacts.require("./BankHandler.sol");
let GetStockPrice = artifacts.require("./GetStockPrice.sol");
let GetCarInfo = artifacts.require("./GetCarInfo.sol");
let NerosNFT = artifacts.require("./NerosNFT.sol");

module.exports = async function(deployer) {
  await deployer.deploy(BankHandler);
  let bankHandlerInstance = await BankHandler.deployed();
  await deployer.deploy(Neros, bankHandlerInstance.address);
  await deployer.deploy(GetStockPrice);
  await deployer.deploy(GetCarInfo);
  await deployer.deploy(NerosNFT);
};
