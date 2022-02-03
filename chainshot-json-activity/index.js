const axios = require('axios');

// copy-paste your URL from Alchemy
const ALCHEMY_URL = "https://eth-mainnet.alchemyapi.io/v2/WkBpsEEulFydfuY69Cb5Ig0Xqdq8S3-H";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getTransactionCount",
  params: [
    "0xd7596A02E5e25C4EC8606f9f9094178A6442E6c2", // block 46147
    'latest' // retrieve the full transaction object in transactions array
  ]
}).then((response) => {
  console.log(response.data.result);
});