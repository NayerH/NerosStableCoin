//jshint esversion: 8
const path = require("path");
const dotenv = require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.RINKEBY_INFURA_MNEUMONIC, "https://rinkeby.infura.io/v3/3a391e10858348afb9498e865cc50134", 0);
      },
      network_id: 4
    }
  },
  compilers: {
    solc: {
      version: "0.8.13"
    }
  }
};
