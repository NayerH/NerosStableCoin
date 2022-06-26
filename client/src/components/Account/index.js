import React, { Component, useEffect, useState } from 'react';
import {Message,Step,Select,Checkbox,Radio, Container, Header, Button,Card,Icon,Grid,Form } from 'semantic-ui-react';
import Neros from '../../contracts/Neros.json'
import getWeb3 from "../../getWeb3";
import NerosNFT from '../../contracts/NerosNFT.json'
import NerosNFTCoin from '../../contracts/NerosNFTCoin.json'
import {NavBtn,NavBtnLink,Form4,SerivicesH3,Form3,SerivicesWrapperOwnerAdmin,ServicesIcon2,Form2,FormButton,FormContent,FormH1,FormInput,FormLabel,FormWrap,SerivicesContainer,SerivicesCard,SerivicesH11,SerivicesH1,SerivicesH2,SerivicesP,SerivicesWrapper,ServicesIcon,SerivicesWrapperOwner} from './AccountElement'
import prof from '../../images/prof.svg'
import admin from '../../images/admin.svg'
import * as IPFS from 'ipfs-core'
import { CID } from 'multiformats/cid'
import { base58btc } from 'multiformats/bases/base58'
import { base64 } from "multiformats/bases/base64"
import { Button4 } from "../Button4";

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
        desc:'',
        addOrRemove:'',
        isloading:'loading',
        acceptOrReject:'',
        enter1:false,
        enter2:false,
        currToken:0,
        fin:[],
        currentTokenAddress:2,
        saleornot:true,
        responseImg: null
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
              var mynftsarray = await instance2.methods.getMyNFTs().call({ from:accounts[0] });
              let lengtharr=mynftsarray.length

              console.log("myNFts:",mynftsarray)
              console.log("array length:",lengtharr)
              //Should be instance2 because it should be NerosNFT not NerosNFTCoin
              let isAdmin=await instance2.methods.admins(accounts[0]).call();
              console.log("isAdmin: ",isAdmin)
              //Should be instance2 because it should be NerosNFT not NerosNFTCoin
              let owner2=await instance2.methods.owner().call();
              console.log(owner2)

              let forSale =await instance2.methods.getAllForSale().call();
              console.log("getAllForSale: ", forSale)
              // Set web3, accounts, and contract to the state, and then proceed with an
              // example of interacting with the contract's methods.
              this.setState({ web3, accounts, contract: instance,balanceCurr:balance,balanceCurr2:balance2 });
              this.setState({admin2:isAdmin,address:accounts,owner:owner2});
              console.log(this.state.admin2)

               let x=await instance2.methods.tokenCounter().call();
              let tokenToCheck=await instance2.methods.tokenIdToCheck().call();
              let token=await instance2.methods.tokenURI(tokenToCheck).call();
              this.setState({currToken:x})
              console.log("ana currToken:",x)

              fetch(token)
              .then(response => response.json())
              .then((res)=>{
                fetch('https://ipfs.io/ipfs/' + res.image)
                .then(responseImg => {
                  console.log("RESPONSE IMG: ",responseImg.url)
                  this.setState({
                    quantity:res.quantity,
                    name:res.name,
                    desc:res.description,
                    responseImg: responseImg.url
                  })
                })


              })
              const employees = {
                accounting: []
              };

              for (let i = 0; i < lengtharr; i++){
                let token=await instance2.methods.tokenURI(mynftsarray[i]).call();
                let forSale=await instance2.methods.isForSale(mynftsarray[i]).call();
                fetch(token)
                .then(response => response.json())
                .then((res)=>{
                  // this.setState({quantity:[this.state.quantity,res.quantity],
                  // name:[this.state.name,res.name],desc:[this.state.desc,res.description]})

                  employees.accounting.push({
                    "name" : res.name,
                    "description"  : res.description,
                    "quantity"       : res.quantity,
                    "image":'https://ipfs.io/ipfs/'+res.image,
                    "id":mynftsarray[i],
                    "isforSale":forSale
                });
                // data[i].name=res.name
                // data[i].description=res.description
                // data[i].quantity=res.quantity

                })
                console.log(employees)


              }
              this.setState({fin:employees.accounting})


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

            await instance2.methods.addOrRemoveAdmin(this.state.addressInput,this.state.addOrRemove).send({
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

        onSubmit22=async(event)=>{
          event.preventDefault();
          try{
          this.setState({loading:true});
          console.log("ana mashy S755555")
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const deployedNetwork2 = NerosNFT.networks[networkId];
          //console.log(this.state.addressInput)
          const instance2 = new web3.eth.Contract(
            NerosNFT.abi,
            deployedNetwork2 && deployedNetwork2.address,
          );

          console.log("ana COunter before:",this.state.counter)
          console.log(this.state.acceptOrReject)
          await instance2.methods.setTransferable(this.state.acceptOrReject).send({
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

      onSubmit3=async(event)=>{
        event.preventDefault();
        try{
        this.setState({loading:true});
        console.log("ana gowa onsubmit 3")
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork2 = NerosNFT.networks[networkId];
        //console.log(this.state.addressInput)
        const instance2 = new web3.eth.Contract(
          NerosNFT.abi,
          deployedNetwork2 && deployedNetwork2.address,
        );
        console.log("ana el current token address",this.state.currentTokenAddress)
        await instance2.methods.setForSale(this.state.currentTokenAddress,this.state.saleornot).send({
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



          handleChange(event){
            this.setState({addressInput:event.target.value});
        }


        handleClick(button) {

            this.setState({addOrRemove:button})


        }
        handleClick2(button) {

          this.setState({acceptOrReject:button})
          console.log("hi ana gowa el onclick2")


      }
      handleClick3(button,button2) {
        this.setState({saleornot:button2})
        this.setState({currentTokenAddress:button})
        console.log("men gowa e handleclik",this.state.currentTokenAddress)


    }
    onSubmit2=async(event)=>{
      event.preventDefault()
      await this.setState({nothing:event})
    }

    render(){


      const employees = {
        accounting: this.state.fin
      };

      //let srcc=displayImage(employees.accounting.image)
      var populate = employees.accounting.map((value) => {
        if(!value.isforSale)
        {
        return(


            <SerivicesCard>
              <ServicesIcon src={value.image} />
              <SerivicesH2>{value.name}</SerivicesH2>
              <SerivicesP>
                Type: {value.description}
              </SerivicesP>
              <SerivicesP>
                Quantity: {value.quantity}
              </SerivicesP>
              <SerivicesP>
                ID: {value.id}
              </SerivicesP>
              <div>
              <button  onClick={this.handleClick3.bind(this,value.id,true)}  class="ui positive  {this.state.isloading}  button">Offer for sale</button>
              </div>
            </SerivicesCard>


        )
      }
        else
        {
          return(

            <SerivicesCard>
              <ServicesIcon src={value.image} />
              <SerivicesH2>{value.name}</SerivicesH2>
              <SerivicesP>
                Type: {value.description}
              </SerivicesP>
              <SerivicesP>
                Quantity: {value.quantity}
              </SerivicesP>
              <SerivicesP>
                ID: {value.id}
              </SerivicesP>
              <div>
              <button  onClick={ this.handleClick3.bind(this,value.id,false)}  class="ui negative  {this.state.isloading}  button">Cancel sale</button>
                  </div>
            </SerivicesCard>


          )
        }
    });

      if(this.state.address==this.state.owner)
      {
      return(

        <SerivicesContainer>
          <SerivicesH1>Account Summary</SerivicesH1>
          <SerivicesWrapperOwnerAdmin>

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
                isAdmin:True
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
                  <button  onClick={() => this.handleClick(true)}  class="ui positive  {this.state.isloading}  button">Add</button>
                  <div class="or"></div>
                  <button onClick={() => this.handleClick(false)}  class="negative ui  button"loading={this.state.loading}>Remove</button>
                  </div>
                </FormContent>
              </FormWrap>

              </Form2>
            </SerivicesCard>
            <SerivicesCard>
              <ServicesIcon src={this.state.responseImg} />
              <SerivicesH3>NFTs pending</SerivicesH3>

              <Form3 onSubmit={this.onSubmit22} error={this.state.errorMessage}>
              <FormWrap>
                <FormContent>
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
               <button onClick={() => this.handleClick2(true)} class="ui positive button">Accept</button>
               <div class="or"></div>
               <button onClick={() => this.handleClick2(false)} class="negative ui  button">Burn</button>
               </div>
               </FormContent>
               </FormWrap>
             </Form3>

            </SerivicesCard>
          </SerivicesWrapperOwnerAdmin>
        </SerivicesContainer>
      )
  }
  else if(this.state.admin2 && (this.state.address!=this.state.owner)){
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
              <ServicesIcon src={this.state.responseImg} />
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
  <button onClick={() => this.handleClick2(true)} class="ui positive  button"loading={this.state.loading}>Accept</button>
  <div class="or"></div>
  <button onClick={() => this.handleClick2(false)} class="negative ui  button"loading={this.state.loading}>Burn</button>
</div>
            </SerivicesCard>

          </SerivicesWrapperOwner>
        </SerivicesContainer>
    )
  }
  else
  {

    return(
      <SerivicesContainer>
        <div style={{
          display: 'flex',
          margin:50,
          alignItems: 'center',
          justifyContent: 'center',
      }}>
          <SerivicesH1>Account Summary</SerivicesH1>
          </div>
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
                isAdmin:False
              </SerivicesP>
              <SerivicesP>
                isOwner:False
              </SerivicesP>
            </SerivicesCard>
            </SerivicesWrapper>

          <SerivicesContainer >
          <Form4 onSubmit={this.onSubmit3} error={this.state.errorMessage}>
            <div style={{
          display: 'flex',
          margin:10,
          alignItems: 'center',
          justifyContent: 'center',
      }}>
          <SerivicesH1>My NFTs</SerivicesH1>
          </div>
          <SerivicesWrapperOwnerAdmin>
            {populate}
          </SerivicesWrapperOwnerAdmin>
          </Form4>
          <Form4 onSubmit={this.onSubmit2} error={this.state.errorMessage}>
              <NavBtn>
                <NavBtnLink>
                Load more
                </NavBtnLink>
              </NavBtn>
            </Form4>
          </SerivicesContainer>


        </SerivicesContainer>

    )
  }
}
}

export default Account;
