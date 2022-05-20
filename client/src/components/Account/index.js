import React, { Component, useEffect, useState } from 'react';
import {Message,Step,Select,Checkbox,Radio, Container, Header, Button,Card,Icon,Grid,Form } from 'semantic-ui-react';
import Neros from '../../contracts/Neros.json'
import getWeb3 from "../../getWeb3";
import NerosNFT from '../../contracts/NerosNFT.json'
import NerosNFTCoin from '../../contracts/NerosNFTCoin.json'
import {ServicesIcon2,Form2,FormButton,FormContent,FormH1,FormInput,FormLabel,FormWrap,SerivicesContainer,SerivicesCard,SerivicesH11,SerivicesH1,SerivicesH2,SerivicesP,SerivicesWrapper,ServicesIcon,SerivicesWrapperOwner} from './AccountElement'
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
        admin2:'',
        admin:'',
        address:'',
        source:'',
        addressInput:'',
        name:'',
        quantity:0,
        desc:''
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
              //Should be instance2 because it should be NerosNFT not NerosNFTCoin
              let isAdmin=await instance2.methods.admins(accounts[0]).call();
              console.log("isAdmin: ",isAdmin)
              //Should be instance2 because it should be NerosNFT not NerosNFTCoin
              let owner2=await instance2.methods.owner().call();
              console.log(owner2)

              let NFTs=await instance2.methods.getMyNFTs().call();
              console.log(NFTs)
              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance,balanceCurr:balance,balanceCurr2:balance2 });
              this.setState({admin2:isAdmin,address:accounts,owner:owner2});
              console.log(this.state.admin2)


              let token=await instance2.methods.tokenURI("1").call();
              // fetch(token)
              // .then(response => response.json())
              // .then(res =>
              //   fetch('https://ipfs.io/ipfs/' + res.image)
              //   .then(responseImg => console.log(responseImg))
              // )

              fetch(token)
              .then(response => response.json())
              .then((res)=>{
                this.setState({quantity:res.quantity,
                name:res.name,desc:res.description})
                console.log(res)

              })


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
      console.log(this.state.quantity)
      if(this.state.admin2)
      {
      return(

        <SerivicesContainer>
          <SerivicesH1>Account Summary</SerivicesH1>
          <SerivicesWrapperOwner>

            <SerivicesCard>
              <ServicesIcon src={prof} />
              <SerivicesH2>Youssef (Admin)</SerivicesH2>
              <SerivicesP>
                NRO balance: {this.state.balanceCurr/100}
              </SerivicesP>
              <SerivicesP>
                NROT balance: {this.state.balanceCurr2}
              </SerivicesP>
              <SerivicesP>
                isAdmin:True
              </SerivicesP>
              <SerivicesP>
                isOwner:False
              </SerivicesP>
            </SerivicesCard>
            <SerivicesCard>
              <ServicesIcon src={"https://ipfs.io/ipfs/QmVRtrFSwGpr3gpyLvJCbcngUgpiR1FPmHXAyd5NJLQkf7"} />
              <SerivicesH2>NFTs pending</SerivicesH2>
              <SerivicesP>
                Name: {this.state.name}
              </SerivicesP>
              <SerivicesP>
                Type: {this.state.desc}
              </SerivicesP>
              <SerivicesP>
                Quantity: {this.state.quantity}
              </SerivicesP>
              <div class="ui buttons">
  <button class="ui positive loading={this.state.loading} button">Accept</button>
  <div class="or"></div>
  <button class="negative ui loading={this.state.loading} button">Burn</button>
</div>
            </SerivicesCard>
          </SerivicesWrapperOwner>
        </SerivicesContainer>
      )
  }
  else if(this.state.address===this.state.owner){
    return(
    <SerivicesContainer>
          <SerivicesH1>Account Summary</SerivicesH1>
          <SerivicesWrapperOwner>

            <SerivicesCard>
              <ServicesIcon src={prof} />
              <SerivicesH2>Youssef (Boss)</SerivicesH2>
              <SerivicesP>
                NRO balance: {this.state.balanceCurr/100}
              </SerivicesP>
              <SerivicesP>
                NROT balance: {this.state.balanceCurr2}
              </SerivicesP>
              <SerivicesP>
                isAdmin:False
              </SerivicesP>
              <SerivicesP>
                isOwner:True
              </SerivicesP>
            </SerivicesCard>
            <SerivicesCard>
              <ServicesIcon src={admin} />
              <SerivicesH2>Add/Remove Admins</SerivicesH2>
              <Form2 onSubmit={this.onSubmit} error={this.state.errorMessage}>
              <FormWrap>
                <FormContent>
                  <FormLabel>Please enter the address of the Admin you would like to add/remove</FormLabel>
                  <FormInput required
                  value={this.state.addressInput}
                  onChange={this.handleChange.bind(this)} />
                  <div class="ui buttons">
                  <button class="ui positive loading={this.state.loading} button">Add</button>
                  <div class="or"></div>
                  <button class="negative ui loading={this.state.loading} button">Remove</button>
                  </div>
                </FormContent>
              </FormWrap>

              </Form2>
            </SerivicesCard>
          </SerivicesWrapperOwner>
        </SerivicesContainer>
    )
  }
  else
  {
    return(
      <SerivicesContainer>
          <SerivicesH1>Account Summary</SerivicesH1>
          <SerivicesWrapperOwner>
            <SerivicesCard>
              <ServicesIcon src={prof} />
              <SerivicesH2>Address:{this.state.address}</SerivicesH2>
              <SerivicesP>
                NRO balance: {this.state.balanceCurr/100}
              </SerivicesP>
              <SerivicesP>
                NROT balance: {this.state.balanceCurr2}
              </SerivicesP>
              <SerivicesP>
                isAdmin:False
              </SerivicesP>
              <SerivicesP>
                isOwner:False
              </SerivicesP>
            </SerivicesCard>
            <SerivicesCard>
              <ServicesIcon src={"https://ipfs.io/ipfs/QmVRtrFSwGpr3gpyLvJCbcngUgpiR1FPmHXAyd5NJLQkf7"} />
              <SerivicesH2>My NFTs</SerivicesH2>

            </SerivicesCard>
          </SerivicesWrapperOwner>

        </SerivicesContainer>

    )
  }
}
}

export default Account;
