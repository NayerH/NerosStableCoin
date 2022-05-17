import React, { Component } from "react";
import getWeb3 from "./getWeb3";
// import Navbar from './components/Navbar/Navbar';
// import Navbar2 from './components/Navbar2';
import * as IPFS from 'ipfs-core'

import "./App.css";
// import { ThemeProvider } from "styled-components";
// import {Container} from './components/styles/Container.styled'
// import Header from "./components/Header";
// import GlobalStyles from "./components/styles/Global";
// import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Payment from "./Payment";
// import Home from "./Home";
// import Redeem  from "./Redeem";
// import Account from "./Account";
// import Home22 from "./HomeSection";
// import transactions from './transactions'
// import transfer from './transfer'

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId);

      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts}, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    // const node = await IPFS.create()
    // //SHOULD BE A BUFFER AS AN INPUT FROM THE USER
    // const imageData = ""
    //
    // //A BUSINESS MODEL CAN BE CREATED TO ENCOURAGE PEOPLE TO MINT NFTS WHICH IS TO INSERT AN IMAGE WITH THE STOCK WHILE MINTING BY THE USER FOR
    // //HIGHER USER SATISFACTION AND TO MAKE IT A MORE UNIQUE EXPERIENCE
    // const imageUploadResult = await node.add(imageData)
    // const imageURI = imageUploadResult.path
    // //GET ID FROM TOKEN COUNTER
    // const id = 1
    // //INPUT FROM USER
    // const stockName = "TSLA";
    // //INPUT FROM USER
    // const stocksQuatity = 3;
    //
    // let data = JSON.stringify({
    //     name: "NeroNFT #" + id,
    //     description: stockName + " - Stocks",
    //     quantity: stocksQuatity,
    //     image: imageURI
    // })

    // const results = await node.add(data)
    // console.log(results.path);
    fetch('https://ipfs.io/ipfs/QmRAkhi8xdcynvs4YryS4nbEsjuJMLhuWFBkeqfYHEvxXc')
        .then(response => response.json())
        .then(res => console.log(res))
    // const stream = node.cat("QmRAkhi8xdcynvs4YryS4nbEsjuJMLhuWFBkeqfYHEvxXc")
    // data = ''
    // let chunks = []
    // for await (const chunk of stream) {
    //   // chunks of data are returned as a Buffer, convert it back to a string
    //   chunks.push(chunk)
    // }
    //
    // console.log(JSON.parse(chunks.toString()));
  };

  render() {
    return (
      <Router>
      <div  className="App">

        <Switch>

        </Switch>
      </div>
      </Router>

    );
  }
}

export default App;
