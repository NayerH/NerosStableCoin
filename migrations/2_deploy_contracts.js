//jshint esversion: 8
let Neros = artifacts.require("./Neros.sol");
let BankHandler = artifacts.require("./BankHandler.sol");

module.exports = async function(deployer) {
  await deployer.deploy(BankHandler);
  let bankHandlerInstance = await BankHandler.deployed();
  await deployer.deploy(Neros, bankHandlerInstance.address);
};
