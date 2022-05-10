import React, { Component } from "react";
import { Table, Label } from "semantic-ui-react";
import axios from "axios";
import LatestBlocks from "./components/Latest-Blocks";
import LatestTxs from "./components/Latest-Txs";
import { Card, Grid, Icon } from "semantic-ui-react";

const apiKey = '319BG7QADE163YKDR3ZSQ6DRIFWUE6X2FD';
const endpoint = `https://api-rinkeby.etherscan.io/api`;
const address='0x5b98F45189B3FDc5a8a35566Da63AEa7653bCFC2';

class transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      transactions2: [],
      gas:[],
      nonce:[],
      value:[],
      hash:[],
      blockNo: "",
      latestBlock: 0,
    };

  }

  
    async componentDidMount() {
      // get the ethereum price
      axios
        .get(endpoint + `?module=stats&action=ethprice&apikey=${apiKey}`)
        .then(res => {
          const { result } = res.data;
          this.setState(
            {
              ethUSD: result.ethusd,
              ethBTC: result.ethbtc
            },
            () => {
              // get the market cap of ether in USD
              axios
                .get(endpoint + `?module=stats&action=ethsupply&apikey=${apiKey}`)
                .then(res => {
                  const { result } = res.data;
                  // in wei
                  const priceWei = result.toString();
  
                  // in ether
                  const priceEth = priceWei.slice(0, priceWei.length - 18);
                  console.log(result, priceWei, priceEth);
                  // convert eth in USD
                  this.setState({
                    marketCap: parseInt(priceEth) * this.state.ethUSD
                  });
                });
            }
          );
        });
  
      // get the latest block number
      axios
        .get(endpoint + `?module=proxy&action=eth_blockNumber&apikey=${apiKey}`)
        .then(res => {
          this.setState({
            latestBlock: parseInt(res.data.result),
            blockNo: res.data.result // save block no in hex
          });
  
          // get the block difficulty
          axios
            .get(
              endpoint +
                `?module=proxy&action=eth_getBlockByNumber&tag=${res.data.result}&boolean=true&apikey=${apiKey}`
            )
            .then(blockDetail => {
              const { result } = blockDetail.data;
  
              const difficulty = parseInt(result.difficulty).toString();
  
              // convert difficulty in Terra Hash
              // instead of dividing it with 10^12 we'll slice it
              const difficultyTH = `${difficulty.slice(0, 4)}.${difficulty.slice(
                4,
                6
              )} TH`;
  
              this.setState({
                difficulty: difficultyTH
              });
            });
        });
    }
  
    getLatestBlocks = () => {
      if (this.state.latestBlock) {
        return <LatestBlocks latestBlock={this.state.latestBlock}></LatestBlocks>;
      }
    };
  
    getLatestTxs = () => {
      if (this.state.blockNo) {
        return <LatestTxs blockNo={this.state.blockNo}></LatestTxs>;
      }
    };
  

  render() {
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>{this.getLatestBlocks()}</Grid.Column>
            <Grid.Column>{this.getLatestTxs()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default transactions;