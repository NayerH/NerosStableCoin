import React, { Component, useEffect, useState } from 'react';
import { Container, FormWrap,Icon,FormContent,Form,FormH1 } from './AccountElement';
import Neros from '../../contracts/Neros.json'
import getWeb3 from "../../getWeb3";
import NerosNFT from '../../contracts/NerosNFT.json'
import NerosNFTCoin from '../../contracts/NerosNFTCoin.json'
class Account extends Component{
    state = {
        storageValue: 0,
        web3: null,
        accounts: null,
        contract: null,
        amount:'',
        addressTo:'',
        loading:false,
        errorMessage:'',
        success:false,
        balanceCurr:0,
        balanceCurr2:0,
        admin2:false
         };

         componentDidMount = async () => {
            try {

              // Get network provider and web3 instance.
              const web3 = await getWeb3();
              // Use web3 to get the user's accounts.
              const accounts = await web3.eth.getAccounts();
              console.log(accounts);
              // Get the contract instance.
              const networkId = await web3.eth.net.getId();
              const deployedNetwork = Neros.networks[networkId];

              const instance = new web3.eth.Contract(
                Neros.abi,
                deployedNetwork && deployedNetwork.address,
              );
              console.log(instance)
              let balance=await instance.methods.balanceOf(accounts[0]).call();
              balance=balance/100;
              console.log(balance)

              const deployedNetwork2 = NerosNFT.networks[networkId];

              const instance2 = new web3.eth.Contract(
                NerosNFT.abi,
                deployedNetwork2 && deployedNetwork2.address,
              );
              const balance2=await instance2.methods.balanceOf(accounts[0]).call();

              const deployedNetwork3 = NerosNFTCoin.networks[networkId];

              const instance3 = new web3.eth.Contract(
                NerosNFTCoin.abi,
                deployedNetwork3 && deployedNetwork3.address,
              );

              let isAdmin=await instance3.methods.admins(accounts[0]).call();
              console.log(isAdmin+"hiiiiiiiii")
              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance,balanceCurr:balance,balanceCurr2:balance2,admin2:isAdmin });
            } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
            }
          };
    render(){
   return(
       <>
       <Container>
           <FormWrap>
               <FormContent>
               <Icon to="/">Neros</Icon>
               <FormH1>Account Summary</FormH1>
               <div style={{
                color:'#01BF71',
                display: 'flex',
                margin:50,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
               <div class="ui centered card">
  <div class="content">
    <a class="header">Youssef</a>
    <div class="meta">
      <span class="date">Joined in 2013</span>
    </div>
    <div class="description">
      NRO Balance: {this.state.balanceCurr/1000000}
    </div>
    <div class="description">
      NROT Balance: {this.state.balanceCurr2}
    </div>
  </div>
  <div class="extra content">
    <a>
      <i class="user icon"></i>
      is Admin: {this.state.admin2}
    </a>
  </div>
</div>
</div>
</FormContent>
           </FormWrap>
       </Container>
       </>
   )
    }
}

export default Account;
