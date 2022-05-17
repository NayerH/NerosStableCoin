import React, { Component, useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Message,Step,Select,Checkbox,Radio, Container, Header, Button,Card,Icon,Grid,Form } from 'semantic-ui-react';
// import { NextResponse } from 'next/server';
import {Link} from "react-router-dom";
import Neros from './contracts/Neros.json'
import getWeb3 from "./getWeb3";
import { Button2 } from "./components/Button2";
import NavGen from './components/NavGen';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  const steps = [
    {
      key: 'Redeem',
      active: true,
      icon: 'payment',
      title: 'Payment',
      description: 'Choose your payment method',
    },
    {
      key: 'checkout',

      icon: 'check',
      title: 'checkout',
      description: 'confrim your info',
    },
    { key: 'confirm',
    disabled: true,
    icon: 'info',
    title: 'Confirm Order' },
  ]

class Redeem extends Component{

    state = {
        storageValue: 0,
        web3: null,
        accounts: null,
        contract: null,
        amount:'',
        loading:false,
        errorMessage:'',
        success:false
         };

  componentDidMount = async () => {
    try {

     this.handleChange=this.handleChange.bind(this);
     this.onSubmit=this.onSubmit.bind(this);
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("hi");
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

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
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
       //const accounts = await web3.eth.getAccounts();
       const newamt=this.state.amount*100;
       await contract.methods.coinsToFiat(accounts[0],newamt).send({
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
       this.setState({amount:event.target.value});
   }
    render(){
        if(this.state.success){
            return(
            <Message positive>
            <Message.Header>You have successfully redeemed {this.state.amount} Neros</Message.Header>
            <p>
              Go to the <b>transactions</b> page to see now.
            </p>
            <Link to="/transactions"><Button2 >view history</Button2></Link>
          </Message>
            )
        }
        return(
            <div><NavGen />
        <div style={{
          display: 'flex',
          margin:100,
          alignItems: 'center',
          justifyContent: 'center',
      }}>

            <Container>
            <Grid>

    <Grid.Column textAlign="center">
    <Header as='h2' icon>
    <Icon name='money bill alternate outline icon' />
    Redeem
    <Header.Subheader>
      Please fill the below to finalize your redemption process
    </Header.Subheader>
    </Header>
    </Grid.Column>
    </Grid>
    <Form onSubmit={this.onSubmit} error={this.state.errorMessage} >
    <Form.Group inline>
          <label>Payment method</label>
          <Form.Field
            control={Radio}
            label='Master card'
            value='1'
          />
          <Form.Field
            control={Radio}
            label='Visa'
            value='2'

          />
          <Form.Field
            control={Radio}
            label='Paypal'
            value='3'

          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
          //error={{ content: 'Please enter your first name', pointing: 'below' }}
          fluid label='First name'
          placeholder='First name'
          id='form-input-first-name'
           />
          <Form.Input fluid label='Last name' placeholder='Last name' />
          <Form.Select
            fluid
            label='Gender'
            options={options}
            placeholder='Gender'
          />

        </Form.Group>
        <Form.Group widths='equal'>

        <Form.Input fluid label='Card number' placeholder='Card number' />
        <Form.Input fluid label='Security code' placeholder='Security code' />
        <Form.Input fluid label='Card expiration' placeholder='MM YY' />

        </Form.Group>
        <Form.Group widths='equal'>
        <Form.Input
        fluid label='Please enter the amount'
        placeholder='amount in Neros'
        value={this.state.amount}
        onChange={this.handleChange.bind(this)} />

        </Form.Group>

        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Form.Button loading={this.state.loading} >Submit</Form.Button>
      </Form>
      <Step.Group items={steps} />
      </Container>
        </div></div>
        )
    }
}

export default Redeem;
