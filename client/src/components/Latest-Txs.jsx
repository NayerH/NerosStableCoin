import React, { Component } from "react";
import {
  Table,
  Label
} from "semantic-ui-react";
import axios from "axios";

const apiKey = `319BG7QADE163YKDR3ZSQ6DRIFWUE6X2FD`;
const endpoint = `https://api.etherscan.io/api`;

class LatestTxs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  componentDidMount = () => {
    this.getTxs();
  };

  getTxs = async () => {
    //const { blockNo } = this.props;

    // get the block transaction
    const blockDetail = await axios.get(
        `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x5b98F45189B3FDc5a8a35566Da63AEa7653bCFC2&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=319BG7QADE163YKDR3ZSQ6DRIFWUE6X2FD`
    );
    console.log(blockDetail)

    const transactions = blockDetail.data.result;
    console.log(transactions)
    let txsDetails = [];
    //for (let i = 0; i > 2; i = i + 1) {
      //const tx = transactions[i];
      txsDetails.push(
        <Table.Row key={0}>
          <Table.Cell>
            <Label color="blue">Tx</Label> {transactions[0].hash}
          </Table.Cell>
          <Table.Cell>
            From {transactions[0].from} <br></br>
            To {transactions[0].to}
          </Table.Cell>
          <Table.Cell>
            Block Number {transactions[0].blockNumber} <br></br>
            
          </Table.Cell>
          <Table.Cell>
            {" "}
            <Label color="blue">Eth</Label> {parseInt(transactions[0].value) / 10 ** 18}
          </Table.Cell>
        </Table.Row>
      );
      txsDetails.push(
        <Table.Row key={1}>
          <Table.Cell>
            <Label color="blue">Tx</Label> {transactions[1].hash}
          </Table.Cell>
          <Table.Cell>
            From {transactions[1].from} <br></br>
            To {transactions[1].to}
          </Table.Cell>
          <Table.Cell>
            Block Number {transactions[1].blockNumber} <br></br>
            
          </Table.Cell>
          <Table.Cell>
            {" "}
            <Label color="blue">Eth</Label> {parseInt(transactions[1].value) / 10 ** 18}
          </Table.Cell>
        </Table.Row>
      );
      txsDetails.push(
        <Table.Row key={2}>
          <Table.Cell>
            <Label color="blue">Tx</Label> {transactions[2].hash}
          </Table.Cell>
          <Table.Cell>
            From {transactions[2].from} <br></br>
            To {transactions[2].to}
          </Table.Cell>
          <Table.Cell>
            Block Number {transactions[2].blockNumber} <br></br>
            
          </Table.Cell>
          <Table.Cell>
            {" "}
            <Label color="blue">Eth</Label> {parseInt(transactions[2].value) / 10 ** 18}
          </Table.Cell>
        </Table.Row>
      );
      txsDetails.push(
        <Table.Row key={3}>
          <Table.Cell>
            <Label color="blue">Tx</Label> {transactions[3].hash}
          </Table.Cell>
          <Table.Cell>
            From {transactions[3].from} <br></br>
            To {transactions[3].to}
          </Table.Cell>
          <Table.Cell>
            Block Number {transactions[3].blockNumber} <br></br>
            
          </Table.Cell>
          <Table.Cell>
            {" "}
            <Label color="blue">Eth</Label> {parseInt(transactions[3].value) / 10 ** 18}
          </Table.Cell>
        </Table.Row>
      );
      txsDetails.push(
        <Table.Row key={4}>
          <Table.Cell>
            <Label color="blue">Tx</Label> {transactions[4].hash}
          </Table.Cell>
          <Table.Cell>
            From {transactions[4].from} <br></br>
            To {transactions[4].to}
          </Table.Cell>
          <Table.Cell>
            Block Number {transactions[4].blockNumber} <br></br>
            
          </Table.Cell>
          <Table.Cell>
            {" "}
            <Label color="blue">Eth</Label> {parseInt(transactions[4].value) / 10 ** 18}
          </Table.Cell>
        </Table.Row>
      );
    

    this.setState({
      transactions: txsDetails
    });
  };

  render() {
    return (
      <div>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.Cell style={{ color: "#1d6fa5" }}>
                <h4> Latest Transactions</h4>
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.state.transactions}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default LatestTxs;