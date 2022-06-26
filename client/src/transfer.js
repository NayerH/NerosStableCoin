import React, { Component, useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Message,Step,Select,Checkbox,Radio, Container, Header, Button,Card,Icon,Grid,Form ,Image} from 'semantic-ui-react';
// import { NextResponse } from 'next/server';
import {Link} from "react-router-dom";
import Neros from './contracts/Neros.json'
import getWeb3 from "./getWeb3";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Button2 } from "./components/Button2";
import { FaYandexInternational } from 'react-icons/fa';
import NavGen from './components/NavGen';


class transfer extends Component{



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

             this.handleChange=this.handleChange.bind(this);
             this.onSubmit=this.onSubmit.bind(this);
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

          onSubmit=async(event)=>{
            event.preventDefault();
            try{
            this.setState({loading:true});
            const { accounts, contract } = this.state;
            const web3 = await getWeb3();
            const x=this.state.addressTo;
            console.log(x)
            //const accounts = await web3.eth.getAccounts();
            console.log(this.state.addressTo);
            const newamt=this.state.amount*100;
            if(this.state.amount<=this.state.balanceCurr){
            await contract.methods.transfer(this.state.addressTo,newamt).send({
                from:accounts[0]
            }
            )

            this.setState({loading:false});
            this.setState({success:true})}
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
            this.setState({addressTo:event.target.value});
        }

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
    <Icon name='exchange' />
    Transfer
    <Header.Subheader>
      Please fill the below to finalize your transfer
    </Header.Subheader>
    <div style={{
                color:'#01BF71',
                display: 'flex',
                margin:50,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
    NRO balance = {this.state.balanceCurr/100}
    </div>
    </Header>

    </Grid.Column>
    </Grid>
    <Form onSubmit={this.onSubmit} error={this.state.errorMessage} >

        <Form.Group widths='equal'>
          <Form.Input
          type="number"
          fluid label='First name'
          placeholder='First name'
          id='form-input-first-name'
           />
          <Form.Input type="number"  fluid label='Last name' placeholder='Last name' />

        </Form.Group>
        <Form.Group widths='equal'>
        <Form.Input required
        type="number"
        fluid label='Please enter the amount'
        placeholder='amount in $'
        value={this.state.amount}
        onChange={this.handleChange.bind(this)} />
        <Form.Input required
        fluid label='Please enter the address you are going to transfer to'
        placeholder='address of the receipient'
        value={this.state.addressTo}
        onChange={this.handleChange2.bind(this)} />
        </Form.Group>


        <Form.Checkbox required label='I agree to the Terms and Conditions' />
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Form.Button loading={this.state.loading} >Transfer</Form.Button>
      </Form>
      </Container>
        </div></div>
        )
    }

}
const acc2='0x513a223fEB29833Ba36a3D2386d80BF8b3dE0d10'
export default transfer
