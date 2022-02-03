const provider = require('./provider');

async function getTotalBalance(addresses) {
    var requests = [];
    addresses.forEach((address, i)=>{
        const request = {
            jsonrpc: "2.0",
            id: i+1,
            method: "eth_getBalance",
            params: [
                address,
                'latest'
            ]
        }
        requests.push(request);
    });
    const responses = await provider.send(requests);
    var totalBalance = 0;
    responses.forEach((response)=>{
        totalBalance += parseInt(response.result, 16);
    });
    // return the total balance of all the addresses 
    return totalBalance;
}

module.exports = getTotalBalance;