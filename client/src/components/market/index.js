import React, { Component, useEffect, useState } from 'react';
import {Message,Step,Select,Checkbox,Radio, Container, Header, Button,Card,Icon,Grid,Form } from 'semantic-ui-react';
import Neros from '../../contracts/Neros.json'
import getWeb3 from "../../getWeb3";
import NerosNFT from '../../contracts/NerosNFT.json'
import NerosNFTCoin from '../../contracts/NerosNFTCoin.json'
import {ServicesIcon2,Form2,FormButton,FormContent,FormH1,FormInput,FormLabel,FormWrap,SerivicesContainer,SerivicesCard,SerivicesH11,SerivicesH1,SerivicesH2,SerivicesP,SerivicesWrapper,ServicesIcon,SerivicesWrapperOwner} from './marketElements'
import prof from '../../images/prof.svg'
import admin from '../../images/admin.svg'
import * as IPFS from 'ipfs-core'
import { CID } from 'multiformats/cid'
import { base58btc } from 'multiformats/bases/base58'
import { base64 } from "multiformats/bases/base64"


function show_image(src, width, height, alt) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;

  // This next line will just add it to the <body> tag
  document.body.appendChild(img);
}



class market extends Component{
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
        admin2:'',
        admin:'',
        address:'',
        source:'',
        addressInput:'',
        name:[],
        quantity:[],
        desc:[],
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
              balance=balance;
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

              let owner2=await instance3.methods.owner().call();
              console.log(owner2)

              let NFTs=await instance2.methods.tokenCounter().call();
              console.log(NFTs)
              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance,balanceCurr:balance,balanceCurr2:balance2 });
              this.setState({admin2:isAdmin,address:accounts,owner:owner2});
              console.log(this.state.admin2)

              
              for (let i = 0; i < NFTs; i++){
              let token=await instance2.methods.tokenURI(i).call();
              // fetch(token)
              // .then(response => response.json())
              // .then(res => 
              //   fetch('https://ipfs.io/ipfs/' + res.image)
              //   .then(responseImg => console.log(responseImg))
              // )
              
              fetch(token)
              .then(response => response.json())
              .then((res)=>{
                this.setState({quantity:[this.state.quantity,res.quantity],
                name:[this.state.name,res.name],desc:[this.state.desc,res.description]})
                console.log(res)

              })


            }
            var allUsers = [];

// Populate users array
            for(var key in this.state.name) {
            allUsers.push(this.state.name[key]);
             }
             for(var key in this.state.desc) {
                allUsers.push(this.state.desc[key]);
                 }
                 for(var key in this.state.quantity) {
                    allUsers.push(this.state.quantity[key]);
                     }
                console.log(allUsers)
              
              
            } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
            }
          };

          onSubmit=async(event)=>{
            event.preventDefault();
            try{
            this.setState({loading:true});
            console.log("ana mashy S7")
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork2 = NerosNFT.networks[networkId];
            console.log(this.state.addressInput)
            const instance2 = new web3.eth.Contract(
              NerosNFT.abi,
              deployedNetwork2 && deployedNetwork2.address,
            );
            await instance2.methods.addOrRemoveAdmin(this.state.addressInput,true).send({
                from:accounts[0]
            }
            )
            this.setState({loading:false});
            this.setState({success:true})}
            catch(err){
                this.setState({errorMessage:err.message})
                this.setState({loading:false});
              
            }
        };

          handleChange(event){
            this.setState({addressInput:event.target.value});
        }

        

          
    render(){
    
      return(
        
        <SerivicesContainer>
          <SerivicesH1>NFTs for sale</SerivicesH1>
          <SerivicesWrapperOwner>
            <SerivicesCard>
              <ServicesIcon src={"https://ipfs.io/ipfs/QmVRtrFSwGpr3gpyLvJCbcngUgpiR1FPmHXAyd5NJLQkf7"} />
              <SerivicesH2>{this.state.name}</SerivicesH2>
              <SerivicesP>
                Type: {this.state.desc}
              </SerivicesP>
              <SerivicesP>
                Quantity: {this.state.quantity}
              </SerivicesP>
            </SerivicesCard>
          </SerivicesWrapperOwner>
        </SerivicesContainer>
      )
  
}
}

export default market;
