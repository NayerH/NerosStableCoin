import React, { Component, useEffect, useState } from 'react';
import { Container, FormWrap,Icon,FormContent,Form,FormH1 } from './AccountElement';
import Neros from '../../contracts/Neros.json'
import getWeb3 from "../../getWeb3";
import NerosNFT from '../../contracts/NerosNFT.json'
import NerosNFTCoin from '../../contracts/NerosNFTCoin.json'
import {SerivicesContainer,SerivicesCard,SerivicesH11,SerivicesH1,SerivicesH2,SerivicesP,SerivicesWrapper,ServicesIcon} from './AccountElement'
import prof from '../../images/prof.svg'
import * as IPFS from 'ipfs-core'
import { CID } from 'multiformats/cid'
import { base58btc } from 'multiformats/bases/base58'
import { base64 } from "multiformats/bases/base64"


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
        address:''
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
              this.setState({ web3, accounts, contract: instance,balanceCurr:balance,balanceCurr2:balance2 });
              this.setState({admin2:isAdmin,address:accounts});
              console.log(this.state.admin2)

              const node = await IPFS.create()
              let token=await instance2.methods.tokenURI("1").call();
              console.log(token)
              const stream = node.cat('QmYtsuhi18YzMpu3tMa5xVoA3UYTw5qFLPaEdfx85joLSv')
              let data = ''
              for await (const chunk of stream) {
              // chunks of data are returned as a Buffer, convert it back to a string
              data += chunk.toString()
               }

              console.log(data)
              
              // const stream = node.cat(token)
              // let data = ''
              // console.log(stream)
              // CID.parse(stream,base64.decoder)
              // for await (const chunk of stream) {
              //   // chunks of data are returned as a Buffer, convert it back to a string
                
              //   data += chunk.toString()
              //  }

              // console.log(data)
            } catch (error) {
              // Catch any errors for any of the above operations.
              alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
              );
              console.error(error);
            }
          };
    render(){
      if(!this.state.admin2)
      {
      return(
        <SerivicesContainer>
          <SerivicesH1>Account Summary</SerivicesH1>
          <SerivicesWrapper>
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
                isAdmin:{this.state.admin2}
              </SerivicesP>
            </SerivicesCard>
          </SerivicesWrapper>

          

        </SerivicesContainer>
      )
  }
  else
  {
    return(
      <SerivicesContainer>
          <SerivicesH1>Account Summary</SerivicesH1>
          <SerivicesWrapper>
            <SerivicesCard>
              <ServicesIcon src={prof} />
              <SerivicesH2>Youssef</SerivicesH2>
              <SerivicesP>
                NRO balance: {this.state.balanceCurr/100}
              </SerivicesP>
              <SerivicesP>
                NROT balance: {this.state.balanceCurr2}
              </SerivicesP>
              <SerivicesP>
                isAdmin:{this.state.admin2}
              </SerivicesP>
            </SerivicesCard>
          </SerivicesWrapper>

        </SerivicesContainer>

    )
  }
}
}

export default Account;
