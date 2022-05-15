import React, { Component } from "react";
import * as IPFS from 'ipfs-core'
import "./App.css";
import getWeb3 from "./getWeb3";
import Navbar2 from './components/Navbar2';
import NavGen from './components/NavGen';
import GlobalStyles from "./components/styles/Global";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Payment from "./Payment";
import Home from "./Home";
import Redeem  from "./Redeem";
import Account from "./Account";
import transactions from './transactions'
import transfer from './transfer'
import About from "./About";
import Nft from "./Nft";


class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  // componentDidMount = async () => {
  //   try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();

      // // Use web3 to get the user's accounts.
      // const accounts = await web3.eth.getAccounts();
      // console.log(accounts);
      // // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // console.log(networkId);

      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts}, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  // runExample = async () => {
  //   const node = await IPFS.create()
  //   //SHOULD BE A BUFFER AS AN INPUT FROM THE USER
  //   const imageData = ""

  //   //A BUSINESS MODEL CAN BE CREATED TO ENCOURAGE PEOPLE TO MINT NFTS WHICH IS TO INSERT AN IMAGE WITH THE STOCK WHILE MINTING BY THE USER FOR
  //   //HIGHER USER SATISFACTION AND TO MAKE IT A MORE UNIQUE EXPERIENCE
  //   const imageUploadResult = await node.add(imageData)
  //   const imageURI = imageUploadResult.path
  //   //GET ID FROM TOKEN COUNTER
  //   const id = 1
  //   //INPUT FROM USER
  //   const stockName = "TSLA";
  //   //INPUT FROM USER
  //   const stocksQuatity = 3;

  //   let data = JSON.stringify({
  //       name: "NeroNFT #" + id,
  //       description: stockName + " - Stocks",
  //       quantity: stocksQuatity,
  //       image: imageURI
  //   })

  //   const results = await node.add(data)
  //   console.log(results.path);

    // const stream = node.cat("QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A")
    // let data = ''
    //
    // for await (const chunk of stream) {
    //   // chunks of data are returned as a Buffer, convert it back to a string
    //   data += chunk.toString()
    // }
    //
    // console.log(data)
  // };

  render() {
    return (
      <Router>
      <div  className="App">
        
        <GlobalStyles />
        <Switch>
          <Route path="/" exact><Home /></Route> 
          <Route path="/Home" exact><Home /></Route> 
          <Route path="/Payment" component={Payment}/>
          <Route path="/Redeem" component={Redeem}/>
          <Route path="/Account" component={Account}/>
          <Route path="/transactions" component={transactions}/>
          <Route path="/transfer" component={transfer}/>
          <Route path="/About" component={About}/>
          <Route path="/Nft" component={Nft}/>
        </Switch>
      </div>
      </Router>
      
    );
  }
}

export default App;
