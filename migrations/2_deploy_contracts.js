//jshint esversion: 8
let Neros = artifacts.require("./Neros.sol");
let BankHandler = artifacts.require("./BankHandler.sol");
let GetStockPrice = artifacts.require("./GetStockPrice.sol");
let GetCarInfo = artifacts.require("./GetCarInfo.sol");
let NerosNFT = artifacts.require("./NerosNFT.sol");
let NerosNFTCoin = artifacts.require("./NerosNFTCoin.sol");

module.exports = async function(deployer) {
  await deployer.deploy(BankHandler);
  let bankHandlerInstance = await BankHandler.deployed();

  await deployer.deploy(NerosNFTCoin);
  let nerosNFTCoinInstance = await NerosNFTCoin.deployed();

  await deployer.deploy(Neros, bankHandlerInstance.address, nerosNFTCoinInstance.address);
  let nerosInstance = await Neros.deployed();

  await deployer.deploy(NerosNFT, nerosNFTCoinInstance.address, nerosInstance.address);
  let nerosNFTInstance = await NerosNFT.deployed();

  nerosInstance.setNerosNFT(nerosNFTInstance.address);

  //SET ADMINS IN NerosNFTCoin Contract
  nerosNFTCoinInstance.setAdmin(nerosInstance.address);
  nerosNFTCoinInstance.setAdmin(nerosNFTInstance.address);

  await deployer.deploy(GetStockPrice);
  await deployer.deploy(GetCarInfo);

};
