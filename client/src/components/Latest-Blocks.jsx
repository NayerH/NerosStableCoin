import React, { Component } from "react";
import {
  Table,
  Label
} from "semantic-ui-react";

import axios from "axios";

const apiKey = `319BG7QADE163YKDR3ZSQ6DRIFWUE6X2FD`;
const endpoint = `https://api-rinkeby.etherscan.io/api`;

class LatestBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    };
  }

  componentDidMount = () => {
    this.getBlocks();
  };

  getBlocks = async () => {
    const { latestBlock } = this.props;

    let blocks = [];

    for (let i = 0; i < 5; i = i + 1) {
      // get the block transaction
      const blockDetail = await axios.get(
        endpoint +
          `?module=proxy&action=eth_getBlockByNumber&tag=${(
            latestBlock - i
          ).toString(16)}&boolean=true&apikey=${apiKey}`
      );
      console.log(blockDetail)

      const {result}  = blockDetail.data;
      blocks.push(
        <Table.Row key={i}>
          <Table.Cell>
            <Label color="blue">Bk</Label> {latestBlock - i}
          </Table.Cell>
          <Table.Cell>
            Miner {result.miner} <br></br>
            Txs {result.length}
          </Table.Cell>
          <Table.Cell>
            <Label color="blue">Size </Label> {parseInt(result.size)} bytes
          </Table.Cell>
        </Table.Row>
      );

      this.setState({
        blocks: blocks
      });
    }
  };

  render() {
    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.Cell style={{ color: "#1d6fa5" }}>
              <h4>Latest Blocks</h4>
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.state.blocks}</Table.Body>
      </Table>
    );
  }
}

export default LatestBlocks;