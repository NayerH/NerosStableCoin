import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Message,Step,Select,Checkbox,Radio, Container, Header, Button,Card,Icon,Grid,Form ,Image} from 'semantic-ui-react';
// import { NextResponse } from 'next/server';
import {Link} from "react-router-dom";
import Neros from './contracts/Neros.json'
import NerosNFT from './contracts/NerosNFT.json'
import NerosNFTCoin from './contracts/NerosNFTCoin.json'
import getWeb3 from "./getWeb3";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Button2 } from "./components/Button2";
import { FaYandexInternational } from 'react-icons/fa';
import NavGen from './components/NavGen';
import * as IPFS from 'ipfs-core'

class Nft extends Component{



    state = {
        storageValue: 0,
        web3: null,
        accounts: null,
        contract: null,
        amount:'',
        name:'',
        loading:false,
        errorMessage:'',
        success:false,
        balanceCurr:0,
        id:'',
        image: null
         };

         componentDidMount = async () => {
            try {

             this.handleChange=this.handleChange.bind(this);
             this.onSubmit=this.onSubmit.bind(this);
              // Get network provider and web3 instance.
              const web3 = await getWeb3();
              // Use web3 to get the user's accounts.
              const accounts = await web3.eth.getAccounts();
              console.log(accounts);
              // Get the contract instance.
              const networkId = await web3.eth.net.getId();
              const deployedNetwork = NerosNFTCoin.networks[networkId];
              console.log(deployedNetwork && deployedNetwork.address)
              const instance = new web3.eth.Contract(
                NerosNFTCoin.abi,
                deployedNetwork && deployedNetwork.address,
              );
              console.log(instance)
              const balance=await instance.methods.balanceOf(accounts[0]).call();
              console.log(balance)

              const deployedNetwork2 = NerosNFT.networks[networkId];
              console.log(deployedNetwork && deployedNetwork.address)
              const instance2 = new web3.eth.Contract(
                NerosNFT.abi,
                deployedNetwork2 && deployedNetwork2.address,
              );

              const token=await instance2.methods.tokenCounter().call();
              console.log(token)
            //   let total= await instance.methods.totalSupply().call();
            //   console.log(total)

              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance,balanceCurr:balance,id:token });
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
                const node = await IPFS.create()
    //SHOULD BE A BUFFER AS AN INPUT FROM THE USER
    const imageData = this.state.image

    //A BUSINESS MODEL CAN BE CREATED TO ENCOURAGE PEOPLE TO MINT NFTS WHICH IS TO INSERT AN IMAGE WITH THE STOCK WHILE MINTING BY THE USER FOR
    //HIGHER USER SATISFACTION AND TO MAKE IT A MORE UNIQUE EXPERIENCE
    const imageUploadResult = await node.add(imageData)
    const imageURI = imageUploadResult.path
    //GET ID FROM TOKEN COUNTER
    const id = this.state.id
    //INPUT FROM USER
    const stockName = this.state.name;
    //INPUT FROM USER
    const stocksQuatity = this.state.amount;

    let data = JSON.stringify({
        name: "NeroNFT #" + id,
        description: stockName + " - Stocks",
        quantity: stocksQuatity,
        image: this.state.image
    })

    const results = await node.add(data)
    console.log(results.path);
    try{
        const web3 = await getWeb3();
              // Use web3 to get the user's accounts.
              const accounts = await web3.eth.getAccounts();
              console.log(accounts);
              // Get the contract instance.
              const networkId = await web3.eth.net.getId();
              const deployedNetwork = NerosNFT.networks[networkId];
              console.log(deployedNetwork && deployedNetwork.address)
              const instance = new web3.eth.Contract(
                NerosNFT.abi,
                deployedNetwork && deployedNetwork.address,
              );

        await instance.methods.createNFT(results.path).send({
            from:accounts[0]
        }
        )

        this.setState({loading:false});
        this.setState({success:true})}
        catch(err){
            this.setState({errorMessage:err.message})
            this.setState({loading:false});
        }
    this.setState({loading:false});

            // this.setState({loading:true});
            // const { accounts, contract } = this.state;
            // const web3 = await getWeb3();
            // const x=this.state.addressTo;
            // console.log(x)
            // //const accounts = await web3.eth.getAccounts();
            // console.log(this.state.addressTo);
            // const newamt=this.state.amount*1000000;
            // if(this.state.amount<=this.state.balanceCurr){
            // await contract.methods.transfer(this.state.addressTo,newamt).send({
            //     from:accounts[0]
            // }
            // )

            // this.setState({loading:false});
            // this.setState({success:true})}
          }
            catch(err){
                this.setState({errorMessage:err.message})
                this.setState({loading:false});
            }
        };
        handleChange(event){
            this.setState({amount:event.target.value});
        }
        handleChange2(event){
            this.setState({name:event.target.value});
        }
        handleChange3(event){
            this.setState({image:event.target.value});
        }

        onFileChange = event => {
    
          // Update the state
          this.setState({ selectedFile: event.target.files[0] });
        
        };
        
        // On file upload (click the upload button)
        onFileUpload = () => {
        
          // Create an object of formData
          const formData = new FormData();
        
          // Update the formData object
          formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
          );
        
          // Details of the uploaded file
          console.log(this.state.selectedFile);
        
          // Request made to the backend api
          // Send formData object
          axios.post("api/uploadfile", formData);
        };

        onImageChange = event => {
          if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
              image: URL.createObjectURL(img)
            });
          }
        };

    render(){
        return(
          <div>
          <NavGen />
            <div style={{
                display: 'flex',
                margin:100,
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            <Container >
            <Grid>
    <Grid.Column textAlign="center">
    <Header as='h2' icon>
    <Icon name='btc' />
    NFT
    <Header.Subheader>
      Please fill the below to finalize your transaction
    </Header.Subheader>
    <div style={{
                color:'#01BF71',
                display: 'flex',
                margin:50,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
    NROC balance = {this.state.balanceCurr}
    </div>
    </Header>

    </Grid.Column>
    </Grid>
    <Form onSubmit={this.onSubmit} error={this.state.errorMessage} >

        <Form.Group widths='equal'>
          <Form.Input
          //error={{ content: 'Please enter your first name', pointing: 'below' }}
          fluid label='First name'
          placeholder='First name'
          id='form-input-first-name'
           />
          <Form.Input  fluid label='Last name' placeholder='Last name' />

        </Form.Group>
        <Form.Group widths='equal'>
        <Form.Input required
        fluid label='Please enter the number of stocks'
        placeholder='stocks'
        value={this.state.amount}
        onChange={this.handleChange.bind(this)} />
        <Form.Input required
        fluid label='Stock name'
        placeholder='name'
        value={this.state.name}
        onChange={this.handleChange2.bind(this)} />
        </Form.Group>
        <div className="mb-1">
     NFT upload <span className="font-css top">*</span>
     {/* <div>
            <h3>
              Upload NFT
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
        </div> */}
        <div>
            <img src={this.state.image} />
            <h1>Select Image</h1>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
</div>

        <Form.Checkbox required label='I agree to the Terms and Conditions' />
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Form.Button loading={this.state.loading} >Mint</Form.Button>
      </Form>
      </Container>
        </div></div>
        )
    }

}
const acc2='0x513a223fEB29833Ba36a3D2386d80BF8b3dE0d10'
export default Nft
