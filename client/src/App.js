import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Navbar from './components/Navbar/Navbar';
import Navbar2 from './components/Navbar2';
import "./App.css";
import { ThemeProvider } from "styled-components";
import {Container} from './components/styles/Container.styled'
import Header from "./components/Header";
import GlobalStyles from "./components/styles/Global";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Payment from "./Payment";
import Home from "./Home";
import Redeem  from "./Redeem";
import Account from "./Account";
import Home22 from "./HomeSection";
import transactions from './transactions'
import transfer from './transfer'

class App extends Component {
  render() {
    return (
      <Router>
      <div  className="App">
        <Navbar2 />
        <GlobalStyles />
        <Switch>
          <Route path="/" exact><Home /></Route> 
          <Route path="/Home" exact><Home /></Route> 
          <Route path="/Payment" component={Payment}/>
          <Route path="/Redeem" component={Redeem}/>
          <Route path="/Account" component={Account}/>
          <Route path="/transactions" component={transactions}/>
          <Route path="/transfer" component={transfer}/>
        </Switch>
      </div>
      </Router>
      
    );
  }
}

export default App;
