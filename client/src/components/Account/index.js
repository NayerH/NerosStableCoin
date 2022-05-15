import React, { Component, useEffect, useState } from 'react';
import { Container, FormWrap,Icon,FormContent,Form,FormH1 } from './AccountElement';
import Neros from '../../contracts/Neros.json'
import getWeb3 from "../../getWeb3";

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
        balanceCurr:0
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
              console.log(deployedNetwork && deployedNetwork.address)
              const instance = new web3.eth.Contract(
                Neros.abi,
                deployedNetwork && deployedNetwork.address,
              );
              console.log(instance)
              const balance=await instance.methods.balanceOf(accounts[0]).call();
              console.log(balance)
              let total= await instance.methods.totalSupply().call();
              console.log(total)
              
              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance,balanceCurr:balance });
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
      Balance: {this.state.balanceCurr} NRO
    </div>
  </div>
  <div class="extra content">
    <a>
      <i class="user icon"></i>
      22 Friends
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