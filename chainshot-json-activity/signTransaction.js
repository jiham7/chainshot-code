const { FeeMarketEIP1559Transaction } = require('@ethereumjs/tx');
const { default: Common, Chain, Hardfork } = require('@ethereumjs/common');
const axios = require('axios');
require('dotenv').config()

const common = new Common({chain: Chain.Rinkeby, hardfork: Hardfork.London });

const PRIVATE_KEY = process.env.PRIVATE_KEY; // if you set up .dotenv file correctly, your private key will be accessed automatically using `process.env`

// Add your Alchemy/Infura endpoint (make sure it is a Rinkeby endpoint for this one!)
const ALCHEMY_ENDPOINT = "https://eth-rinkeby.alchemyapi.io/v2/yY9_l7SmNVi9kIHGJxyu_UF3rn-msb2W";

const txParams = {
  "nonce": 1, // you will need to change this!
  "gasLimit": "0x5208",
  "maxPriorityFeePerGas": "0x3b9aca00",
  "maxFeePerGas": "0x3b9acaff",
  "to": "0xd7596A02E5e25C4EC8606f9f9094178A6442E6c2", // choose someone to send some ETH to!
  "value": "0x5af3107a4000", // .0001 ether
  "chainId": "0x04", // rinkeby chain id
  "type": "0x02" // eip 1559
}

const tx = FeeMarketEIP1559Transaction.fromTxData(txParams, { common });

const privateKey = Buffer.from(PRIVATE_KEY, 'hex');

const signedTx = tx.sign(privateKey);

const serializedTx = signedTx.serialize();

const rawTx = "0x" + serializedTx.toString("hex");

axios.post(ALCHEMY_ENDPOINT, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_sendRawTransaction",
  params: [rawTx]
}).then((response) => {
  if(response.data.error) {
    console.log(response.data.error);
  }
  else {
    console.log("Tx hash: " + response.data.result);
  }
});