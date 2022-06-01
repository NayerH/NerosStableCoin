import React, { Component, useEffect, useState } from 'react';
import {Message,Step,Select,Checkbox,Radio, Container, Header, Button,Card,Icon,Grid,Form } from 'semantic-ui-react';
import Neros from '../../contracts/Neros.json'
import getWeb3 from "../../getWeb3";
import NerosNFT from '../../contracts/NerosNFT.json'
import NerosNFTCoin from '../../contracts/NerosNFTCoin.json'
import GetStockPrice from '../../contracts/GetStockPrice.json'
import {Form4,ServicesIcon2,Form2,FormButton,FormContent,FormH1,FormInput,FormLabel,FormWrap,SerivicesContainer,SerivicesCard,SerivicesH11,SerivicesH1,SerivicesH2,SerivicesP,SerivicesWrapper,ServicesIcon,SerivicesWrapperOwner} from './marketElements'
import prof from '../../images/prof.svg'
import admin from '../../images/admin.svg'
import * as IPFS from 'ipfs-core'
import { CID } from 'multiformats/cid'
import { base58btc } from 'multiformats/bases/base58'
import { base64 } from "multiformats/bases/base64"
import { SerivicesWrapperOwnerAdmin } from '../Account/AccountElement';
import img from '../../images/11.svg'
import { Button2 } from "../Button2";


function show_image(src, width, height, alt) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;

  // This next line will just add it to the <body> tag
  document.body.appendChild(img);
}

var someData = [
  {name: "Max", description: "Mustermann", quantity: 40},
  {name: "Hagbard", description: "Celine", quantity: 44},
  {name: "Karl", description: "Koch", quantity: 42},
];



const data =
    [
    {
        id: 1,
        name : "Game Of Throne S01 E01" ,
        description: "THis is description",
        quantity: "Hi I am test content"
    },
{
    id: 1,
        name : "Game Of Throne S01 E01" ,
        description: "THis is description",
        quantity: "Hi I am test content"
},
{
   id: 1,
        name : "Game Of Throne S01 E01" ,
        description: "THis is description",
        quantity: "Hi I am test content"
}
];


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
        fin:[],
        imgsrc:[],
        image:null,
        currentTokenAddress:0,
        currentTokenDesc:'',
        currentTokenOwner:''
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

              let NFTs=await instance2.methods.tokenCounter().call();
              let forSale =await instance2.methods.getAllForSale().call();
              console.log(forSale)
              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance,balanceCurr:balance,balanceCurr2:balance2 });
              this.setState({admin2:isAdmin,address:accounts,owner:owner2});
              console.log(this.state.admin2)
              const ownerAddress=await instance2.methods.ownerOf(this.state.currentTokenAddress).call();
              this.setState({currentTokenOwner:ownerAddress})
              const employees = {
                accounting: []
              };
              

              for (let i = 0; i < forSale.length; i++){
              let token=await instance2.methods.tokenURI(forSale[i]).call();
              // fetch(token)
              // .then(response => response.json())
              // .then(res =>
              //   fetch('https://ipfs.io/ipfs/' + res.image)
              //   .then(responseImg => this.setState({imgsrc:responseImg.url}))
              // )

              fetch(token)
              .then(response => response.json())
              .then((res)=>{
                // this.setState({quantity:[this.state.quantity,res.quantity],
                // name:[this.state.name,res.name],desc:[this.state.desc,res.description]})
                 
                employees.accounting.push({ 
                  "name" : res.name,
                  "description"  : res.description,
                  "quantity"       : res.quantity,
                  "image":'https://ipfs.io/ipfs/'+res.image
              });
              // data[i].name=res.name
              // data[i].description=res.description
              // data[i].quantity=res.quantity

              })
              console.log(employees)


            }
            
            this.setState({fin:employees.accounting})
            var allUsers = [];

// Populate users array
            // for(var key in this.state.name) {
            // allUsers.push(this.state.name[key]);
            //  }
            //  for(var key in this.state.desc) {
            //     allUsers.push(this.state.desc[key]);
            //      }
            //      for(var key in this.state.quantity) {
            //         allUsers.push(this.state.quantity[key]);
            //          }
            //     console.log(allUsers)


            } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
            }
          };

          

          onImageChange = event => {
            if (event.target.files && event.target.files[0]) {
              let img = event.target.files[0];
              this.setState({
                image: URL.createObjectURL(img)
              });
            }
          };


          onSubmit=async(event)=>{
            event.preventDefault();
            try{
            this.setState({loading:true});
            console.log("ana gowa onsubmit 3")
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const deployedNetwork = Neros.networks[networkId];
            //console.log(this.state.addressInput)
            const instance = new web3.eth.Contract(
              Neros.abi,
              deployedNetwork && deployedNetwork.address,
            );
            const deployedNetwork2 = NerosNFT.networks[networkId];

              const instance2 = new web3.eth.Contract(
                NerosNFT.abi,
                deployedNetwork2 && deployedNetwork2.address,
              );
              const deployedNetwork3 = GetStockPrice.networks[networkId];

              const instance3 = new web3.eth.Contract(
                GetStockPrice.abi,
                deployedNetwork3 && deployedNetwork3.address,
              );
              console.log("current token desc",this.state.currentTokenDesc)
            await instance3.methods.requestStockPrice(this.state.currentTokenDesc).send({
              from:accounts[0]
          }
          )
            await delay(45000);
            const currPrice=await instance3.methods.currentPrice().call();
            await instance.methods.exchangeNFT(this.state.currentTokenOwner,this.state.currentTokenAddress,currPrice).send({
                from:accounts[0]
            }
            )
    
    
    
    
            this.setState({loading:false});
            this.setState({success:true})
    
          }
    
            catch(err){
                this.setState({errorMessage:err.message})
                this.setState({loading:false});
    
            }
        };

        handleClick(button,button2) {
          this.setState({currentTokenAddress:button})
          this.setState({currentTokenDesc:button2})
          console.log("men gowa e handleclik",this.state.currentTokenAddress)
  
  
      }

          


    render(){

      
      const employees = {
        accounting: this.state.fin
      };
      
     
      //let srcc=displayImage(employees.accounting.image)
      let populate =  employees.accounting.map((value) => {
        return(
          
            <SerivicesCard>
              <ServicesIcon src={img} />
              <SerivicesH2>{value.name}</SerivicesH2>
              <SerivicesP>
                Type: {value.description}
              </SerivicesP>
              <SerivicesP>
                Quantity: {value.quantity}
              </SerivicesP>
              <button  onClick={this.handleClick.bind(this,value.id,value.description)}  class="ui positive  {this.state.isloading}  button">Acquire NFT</button>
                
            </SerivicesCard>
          
        )
    });
   
    console.log(populate)

      return(

        <SerivicesContainer>
          <Form4 onSubmit={this.onSubmit} error={this.state.errorMessage}>
          <div style={{
          display: 'flex',
          margin:50,
          alignItems: 'center',
          justifyContent: 'center',
      }}>
          <SerivicesH1>NFTs for sale</SerivicesH1>
          </div>
          <SerivicesWrapperOwnerAdmin>
            {populate}
            </SerivicesWrapperOwnerAdmin>
            </Form4>
        </SerivicesContainer>
      )

}
}

export default market;
