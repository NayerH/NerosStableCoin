//esversion:8
const Neros = artifacts.require("./Neros.sol");
const NerosNFT = artifacts.require("./NerosNFT.sol");
const NerosNFTCoin = artifacts.require("./NerosNFTCoin.sol");

contract("Neros", accounts => {
  it("should mint 1000 NRO tokens in the correct account.", async () => {
    const nerosInstance = await Neros.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    //1000 NRO tokens entered as 1000 * 100 due to decimals being 2
    const decimals = 100
    await nerosInstance.fiatToCoins(accounts[0], 1000 * decimals, { from: accounts[0] });

    // Get stored value
    const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    assert.equal(finalAccountBalance.valueOf() - initialAccountBalance.valueOf() , 1000 * decimals, "1000 NRO were not minted into the correct account.");
  });

  it("should burn 100 NRO tokens from the correct account.", async () => {
    const nerosInstance = await Neros.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    //100 NRO tokens entered as 100 * 100 due to decimals being 2
    const decimals = 100
    await nerosInstance.coinsToFiat(accounts[0], 100 * decimals, { from: accounts[0] });

    // Get stored value
    const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    assert.equal(initialAccountBalance.valueOf() - finalAccountBalance.valueOf(), 100 * decimals, "100 NRO were not burnt from the correct account.");
  });
  it("should transfer 150 NRO tokens one account to another.", async () => {
    const nerosInstance = await Neros.deployed();
    const initialAccount1Balance = await nerosInstance.balanceOf.call(accounts[0]);
    const initialAccount2Balance = await nerosInstance.balanceOf.call(accounts[1]);
    //100 NRO tokens entered as 100 * 100 due to decimals being 2
    const decimals = 100
    await nerosInstance.transfer(accounts[1], 150 * decimals, { from: accounts[0] });

    // Get Final balances
    const finalAccount1Balance = await nerosInstance.balanceOf.call(accounts[0]);
    const finalAccount2Balance = await nerosInstance.balanceOf.call(accounts[1]);
    assert.equal(initialAccount1Balance.valueOf() - finalAccount1Balance.valueOf(), 150 * decimals, "150 NRO were not deducted from the correct account.");
    assert.equal(finalAccount2Balance.valueOf() - initialAccount2Balance.valueOf(), 150 * decimals, "150 NRO were not added to the correct account.");
  });
  it("should have a total supply of 900 tokens.", async () => {
    const nerosInstance = await Neros.deployed();
    const totalSupply = await nerosInstance.totalSupply.call();
    const decimals = 100

    assert.equal(totalSupply.valueOf(), 900 * decimals, "total supply is not 900 tokens after minting 1000 and burning 100.");
  });
});

contract("NerosNFTCoin", accounts => {
  it("should mint 1000 NROC tokens in the correct account.", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    //1000 NRO tokens entered as 1000 * 100 due to decimals being 2
    const decimals = 1;
    await nerosInstance.mintNFTCoin(accounts[0], 1000 * decimals, { from: accounts[0] });

    // Get stored value
    const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    assert.equal(finalAccountBalance.valueOf() - initialAccountBalance.valueOf() , 1000 * decimals, "1000 NRO were not minted into the correct account.");
  });

  it("should burn 200 NROC tokens from the correct account.", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    //100 NRO tokens entered as 100 * 100 due to decimals being 2
    const decimals = 1;
    await nerosInstance.burnNFTCoin(accounts[0], 200 * decimals, { from: accounts[0] });

    // Get stored value
    const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    assert.equal(initialAccountBalance.valueOf() - finalAccountBalance.valueOf(), 200 * decimals, "200 NRO were not burnt from the correct account.");
  });
  it("should transfer 200 NROC tokens one account to another.", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();
    const initialAccount1Balance = await nerosInstance.balanceOf.call(accounts[0]);
    const initialAccount2Balance = await nerosInstance.balanceOf.call(accounts[1]);
    //100 NRO tokens entered as 100 * 100 due to decimals being 2
    const decimals = 1;
    await nerosInstance.transfer(accounts[1], 200 * decimals, { from: accounts[0] });

    // Get Final balances
    const finalAccount1Balance = await nerosInstance.balanceOf.call(accounts[0]);
    const finalAccount2Balance = await nerosInstance.balanceOf.call(accounts[1]);
    assert.equal(initialAccount1Balance.valueOf() - finalAccount1Balance.valueOf(), 200 * decimals, "200 NRO were not deducted from the correct account.");
    assert.equal(finalAccount2Balance.valueOf() - initialAccount2Balance.valueOf(), 200 * decimals, "200 NRO were not added to the correct account.");
  });
  it("should have a total supply of 800 tokens.", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();
    const totalSupply = await nerosInstance.totalSupply.call();
    const decimals = 1;

    assert.equal(totalSupply.valueOf(), 800 * decimals, "total supply is not 800 tokens after minting 1000 and burning 200.");
  });
  it("should set the price of one token to 0.01 Ether.", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();
    await nerosInstance.setPrice(web3.utils.toWei('0.01'), {from: accounts[0]});
    const currPrice = await nerosInstance.price.call();


    assert.equal(currPrice.valueOf(), web3.utils.toWei('0.01'), "total supply is not 800 tokens after minting 1000 and burning 200.");
  });
  it("should allow an account to buy 1 NROC tokens from owner.", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();
    const initialAccount1Balance = await nerosInstance.balanceOf.call(accounts[0]);
    const initialAccount2Balance = await nerosInstance.balanceOf.call(accounts[1]);

    const decimals = 1;
    await nerosInstance.buyNFTCoin({ from: accounts[1], value: web3.utils.toWei('0.01')});

    // Get Final balances
    const finalAccount1Balance = await nerosInstance.balanceOf.call(accounts[0]);
    const finalAccount2Balance = await nerosInstance.balanceOf.call(accounts[1]);
    assert.equal(initialAccount1Balance.valueOf() - finalAccount1Balance.valueOf(), 1 * decimals, "1 NROC was not deducted from the correct account.");
    assert.equal(finalAccount2Balance.valueOf() - initialAccount2Balance.valueOf(), 1 * decimals, "1 NROC was not added to the correct account.");
  });
  it("should allow owner to extract the ether balance held in the smart contract.", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();
    const initialContractBalance = await web3.eth.getBalance(nerosInstance.address);
    const initialOwnerBalance = await web3.eth.getBalance(accounts[0]);

    const decimals = 1;
    await nerosInstance.withdrawEtherBalance({ from: accounts[0] });

    // Get Final balances
    const finalContractBalance = await web3.eth.getBalance(nerosInstance.address);
    const finalOwnerBalance = await web3.eth.getBalance(accounts[0]);
    assert.equal(initialContractBalance.valueOf() - finalContractBalance.valueOf(), web3.utils.toWei('0.01'), "Ether was not withdrawn from the contract.");
    assert(finalOwnerBalance.valueOf() - initialOwnerBalance.valueOf() > web3.utils.toWei('0.009'), "Ether was not added to the owner's account.");
  });
});

contract("NerosNFT", accounts => {
  it("should mint 1 NROT token in the correct account with the correct details.", async () => {
    const nerosInstance = await NerosNFT.deployed();
    const nerosNFTCoinInstance = await NerosNFTCoin.deployed();
    await nerosNFTCoinInstance.mintNFTCoin(accounts[1], 2, { from: accounts[0] });

    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[1]);

    await nerosInstance.createNFT("QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A", { from: accounts[1] });

    const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[1]);
    assert.equal(finalAccountBalance.valueOf() - initialAccountBalance.valueOf() , 1, "1 NROT was not minted into the correct account.");

    const ownerOfNFT = await nerosInstance.ownerOf.call(0);
    assert.equal(ownerOfNFT, accounts[1], "NROT token owner set incorrectly.");

    const ownedNFTs = await nerosInstance.getMyNFTs.call({ from: accounts[1]});
    assert(ownedNFTs[0].valueOf() == 0, "Array of owned NFTs does not reflect ownership");

    const tokenURI = await nerosInstance.tokenURI.call(0);
    assert(tokenURI === "https://ipfs.io/ipfs/QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A", "token URI was not correctly set");

    const isTransferable = await nerosInstance.isTransferable.call(0);
    assert(!isTransferable, "should be set as not transferable");

    const isForSale = await nerosInstance.isForSale.call(0);
    assert(!isForSale, "should be set as not for sale");
  });

  it("should add and remove admins only by the owner.", async () => {
    const nerosInstance = await NerosNFT.deployed();

    const isAdminBegin = await nerosInstance.admins.call(accounts[2]);
    assert(!isAdminBegin, "account should not be set as admin at the beginning");

    await nerosInstance.addOrRemoveAdmin(accounts[2], true, {from : accounts[0]});
    const isAdminMid = await nerosInstance.admins.call(accounts[2]);
    assert(isAdminMid, "account should be set as admin at the after calling the method by the owner");

    await nerosInstance.addOrRemoveAdmin(accounts[2], false, {from : accounts[0]});
    const isAdminEnd = await nerosInstance.admins.call(accounts[2]);
    assert(!isAdminEnd, "account should not be set as admin at the after calling the method by the owner");
  });

  it("should allow admin to set NFT as transferable, and user to be able to transfer it afterwards", async () => {
    const nerosInstance = await NerosNFT.deployed();
    await nerosInstance.setTransferable(true, { from : accounts[0]})
    const isTransferable = await nerosInstance.isTransferable.call(0);
    assert(isTransferable, "should be set as transferable after call by admin");

    await nerosInstance.safeTransferFrom(accounts[1], accounts[2], 0, { from : accounts[1]});
    const ownerOfNFT = await nerosInstance.ownerOf.call(0);
    assert.equal(ownerOfNFT, accounts[2], "owner incorrectly set after transfer, transfer not completed successfully");
  });

  it("should allow token owner to offer it for sale", async () => {
    const nerosInstance = await NerosNFT.deployed();
    await nerosInstance.setForSale(0, true, { from : accounts[2]})
    const isForSale = await nerosInstance.isForSale.call(0);
    assert(isForSale, "should be set as available for sale");

    const forSaleArr = await nerosInstance.getAllForSale.call();
    assert.equal(forSaleArr[0].valueOf(), 0, "NFT should be offered for sale after instructed so by the token owner");
  });

  it("should allow token owner to burn it for redemption", async () => {
    const nerosInstance = await NerosNFT.deployed();
    try{
      await nerosInstance.burn(0, { from : accounts[1]});
      assert(false, "Cannot complete burning if not owner");
    } catch(e) {
      await nerosInstance.burn(0, { from : accounts[2]});
    }

    try{
      const ownerOfNFT = await nerosInstance.ownerOf.call(0);
      assert(false, "Cannot complete burning if owner is not reset to zero address");
    } catch(e) {
      assert(true);
    }
  });
});

contract("Integration", accounts => {
  it("should mint 1100 NRO token in a normal account with the correct details.", async () => {
    const nerosInstance = await Neros.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[1]);

    //1000 NRO tokens entered as 1000 * 100 due to decimals being 2
    const decimals = 100
    await nerosInstance.fiatToCoins(accounts[1], 1100 * decimals, { from: accounts[1] });

    // Get stored value
    const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[1]);
    assert.equal(finalAccountBalance.valueOf() - initialAccountBalance.valueOf() , 1100 * decimals, "1100 NRO were not minted into the correct account.");

    const totalSupply = await nerosInstance.totalSupply.call();
    assert.equal(totalSupply.valueOf(), 1100 * decimals, "total supply is not 1100 tokens after minting.");
  });

  it("should have a balance of 11 NROC tokens in the owner's account.", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();

    const totalSupply = await nerosInstance.totalSupply.call();
    assert.equal(totalSupply.valueOf(), 11, "total supply is not 11 NROC tokens after minting 1100 NRO tokens.");

    const accountBalance = await nerosInstance.balanceOf.call(accounts[0]);
    assert.equal(accountBalance.valueOf(), 11, "11 NROC were not minted into the correct owner's account.");
  });

  it("should allow normal user to purchase NROC tokens from the owner", async () => {
    const nerosInstance = await NerosNFTCoin.deployed();
    const initialAccount1Balance = await nerosInstance.balanceOf.call(accounts[0]);
    const initialAccount2Balance = await nerosInstance.balanceOf.call(accounts[2]);

    const decimals = 1;
    await nerosInstance.buyNFTCoin({ from: accounts[2], value: web3.utils.toWei('0.001')});

    // Get Final balances
    const finalAccount1Balance = await nerosInstance.balanceOf.call(accounts[0]);
    const finalAccount2Balance = await nerosInstance.balanceOf.call(accounts[2]);
    assert.equal(initialAccount1Balance.valueOf() - finalAccount1Balance.valueOf(), 1 * decimals, "1 NROC was not deducted from the correct account.");
    assert.equal(finalAccount2Balance.valueOf() - initialAccount2Balance.valueOf(), 1 * decimals, "1 NROC was not added to the correct account.");
  });

  it("should mint 1 NROT token in the correct account with the correct details, deducting 1 NROC", async () => {
    const nerosInstance = await NerosNFT.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[2]);

    const nerosNFTCoinInstance = await NerosNFTCoin.deployed();
    const initialAccountBalanceNROC = await nerosNFTCoinInstance.balanceOf.call(accounts[2]);

    await nerosInstance.createNFT("QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A", { from: accounts[2] });

    const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[2]);
    assert.equal(finalAccountBalance.valueOf() - initialAccountBalance.valueOf() , 1, "1 NROT was not minted into the correct account.");

    const finalAccountBalanceNROC = await nerosNFTCoinInstance.balanceOf.call(accounts[2]);
    assert.equal(initialAccountBalanceNROC.valueOf() - finalAccountBalanceNROC.valueOf(), 1, "1 NROC was not burnt from the minting account account.");

    const ownerOfNFT = await nerosInstance.ownerOf.call(0);
    assert.equal(ownerOfNFT, accounts[2], "NROT token owner set incorrectly.");

    const ownedNFTs = await nerosInstance.getMyNFTs.call({ from: accounts[2]});
    assert(ownedNFTs[0].valueOf() == 0, "Array of owned NFTs does not reflect ownership");

    const tokenURI = await nerosInstance.tokenURI.call(0);
    assert(tokenURI === "https://ipfs.io/ipfs/QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A", "token URI was not correctly set");

    const isTransferable = await nerosInstance.isTransferable.call(0);
    assert(!isTransferable, "should be set as not transferable");

    const isForSale = await nerosInstance.isForSale.call(0);
    assert(!isForSale, "should be set as not for sale");
  });

  it("should not allow to transfer NFT token without being transferable", async () => {
    const nerosInstance = await NerosNFT.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[2]);
    try {
      await nerosInstance.safeTransferFrom(accounts[2], accounts[1], 0, { from : accounts[2]});
      assert(false);
    } catch(e) {
      const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[2]);
      assert.equal(finalAccountBalance.valueOf() - initialAccountBalance.valueOf() , 0, "1 NROT non-transferable token was transfered.");

      const ownerOfNFT = await nerosInstance.ownerOf.call(0);
      assert.equal(ownerOfNFT, accounts[2], "NROT token owner set incorrectly.");
    }
  });

  it("should allow admin to set NFT as transferable", async () => {
    const nerosInstance = await NerosNFT.deployed();
    await nerosInstance.setTransferable(true, { from : accounts[0]});
    const isTransferable = await nerosInstance.isTransferable.call(0);
    assert(isTransferable, "should be set as transferable after call by admin");
  });

  it("should not allow to transfer NFT token without being transferable", async () => {
    const nerosInstance = await NerosNFT.deployed();
    const nroInstance = await Neros.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[2]);
    try {
      await nroInstance.exchangeNFT(accounts[2], 0, 100, { from : accounts[1]});
      assert(false);
    } catch(e) {
      const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[2]);
      assert.equal(finalAccountBalance.valueOf() - initialAccountBalance.valueOf() , 0, "1 NROT non-transferable token was transfered.");

      const ownerOfNFT = await nerosInstance.ownerOf.call(0);
      assert.equal(ownerOfNFT, accounts[2], "NROT token owner set incorrectly.");

      const isForSale = await nerosInstance.isForSale.call(0);
      assert(!isForSale, "should not be set as available for sale");
    }
  });

  it("should allow token owner to offer it for sale", async () => {
    const nerosInstance = await NerosNFT.deployed();
    await nerosInstance.setForSale(0, true, { from : accounts[2]})
    const isForSale = await nerosInstance.isForSale.call(0);
    assert(isForSale, "should be set as available for sale");

    const forSaleArr = await nerosInstance.getAllForSale.call();
    assert.equal(forSaleArr[0].valueOf(), 0, "NFT should be offered for sale after instructed so by the token owner");
  });

  it("should allow potential buyer of NFT token to purchase it from the owner", async () => {
    const nerosInstance = await NerosNFT.deployed();
    const nroInstance = await Neros.deployed();

    const initialAccount1BalanceNROT = await nerosInstance.balanceOf.call(accounts[1]);
    const initialAccount1BalanceNRO = await nroInstance.balanceOf.call(accounts[1]);
    const initialAccount2BalanceNROT = await nerosInstance.balanceOf.call(accounts[2]);
    const initialAccount2BalanceNRO = await nroInstance.balanceOf.call(accounts[2]);

    const decimals = 100;
    await nroInstance.exchangeNFT(accounts[2], 0, 100 * decimals, { from : accounts[1] });

    const finalAccount1BalanceNROT = await nerosInstance.balanceOf.call(accounts[1]);
    const finalAccount1BalanceNRO = await nroInstance.balanceOf.call(accounts[1]);
    assert.equal(finalAccount1BalanceNROT.valueOf() - initialAccount1BalanceNROT.valueOf() , 1, "1 NROT not added to new owner's possession.");
    assert.equal(initialAccount1BalanceNRO.valueOf() - finalAccount1BalanceNRO.valueOf() , 100 * decimals, "100 NRO tokens were not moved out of the new nft owner's possession.");

    const finalAccount2BalanceNROT = await nerosInstance.balanceOf.call(accounts[2]);
    const finalAccount2BalanceNRO = await nroInstance.balanceOf.call(accounts[2]);
    assert.equal(finalAccount2BalanceNRO.valueOf() - initialAccount2BalanceNRO.valueOf(), 100 * decimals, "100 NRO tokens were not added to the old nft owner's possession.");
    assert.equal(initialAccount2BalanceNROT.valueOf() - finalAccount2BalanceNROT.valueOf(), 1, "1 NROT token was not moved out of the old nft owner's possession.");
  });

  it("should allow NRO holder to redeem 100 NRO.", async () => {
    const nerosInstance = await Neros.deployed();
    const initialAccountBalance = await nerosInstance.balanceOf.call(accounts[1]);
    //100 NRO tokens entered as 100 * 100 due to decimals being 2
    const decimals = 100
    await nerosInstance.coinsToFiat(accounts[1], 100 * decimals, { from: accounts[1] });

    // Get stored value
    const finalAccountBalance = await nerosInstance.balanceOf.call(accounts[1]);
    assert.equal(initialAccountBalance.valueOf() - finalAccountBalance.valueOf(), 100 * decimals, "100 NRO were not burnt from the correct account.");
  });

  it("should allow NFT token owner to burn it for redemption", async () => {
    const nerosInstance = await NerosNFT.deployed();
    await nerosInstance.burn(0, { from : accounts[1]});

    try{
      const ownerOfNFT = await nerosInstance.ownerOf.call(0);
      assert(false, "cannot complete burning if owner is not reset to zero address");
    } catch(e) {
      assert(true);
    }
  });
});
