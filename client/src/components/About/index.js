import React, { Component, useEffect, useState } from 'react';
import { Button2 } from '../Button2'
import { Column2, ImgWrap,InfoContainer,InfoRow,InfoWrapper,Column1,TextWrapper,TopLine,Heading ,Subtitle,BtnWrap,Img, NavBtnLink,NavBtn, TopLine2} from './InfoElements';
import Neros from '../../contracts/Neros.json'
import getWeb3 from "../../getWeb3";
import { render } from 'react-dom';

class About  extends Component{
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
              let balance=await instance.methods.balanceOf(accounts[0]).call();
              console.log(balance)
              balance = balance/100;
              console.log(balance)
              
              let total = await instance.methods.totalSupply().call();
              console.log(total)
              total = total/100;
              console.log(total)

              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance,balanceCurr:total });
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
        <InfoContainer lightBg={false} id={'about'} >
            <InfoWrapper>
                <InfoRow imgStart={false}>
                    <Column1>
                    <TextWrapper>
                        <TopLine>Neros Stablecoin</TopLine>
                        <Heading lightText={true}>Since 2022
                        </Heading>
                        <Subtitle darkText={false}>Stablecoins are booming nowadays but most of the current companies have a lot of serious problems involving fraud and swindling. With the brand new Neros stablecoin, we gurantee you 1:1 backup which unlike most of the other competitors, is 100% liquid assets. This gurantees you redeemability at any time with no questions asked.</Subtitle>
                    </TextWrapper>
                   <TextWrapper>
                   <TopLine2>
                    Total supply: {this.state.balanceCurr} NRO
                    </TopLine2>
                    <TopLine2>
                      ----------------
                    </TopLine2>
                    <TopLine2>
                    Bank Balance: {this.state.balanceCurr} USD
                    </TopLine2>
                    </TextWrapper>
                    </Column1>
                    <Column2>
                    <ImgWrap>
                    <Img src={require('../../images/31.svg')} alt={'car'} />
                    </ImgWrap>
                    </Column2>
                </InfoRow>
            </InfoWrapper>
        </InfoContainer>
        </>
    )}
}

export default About;
