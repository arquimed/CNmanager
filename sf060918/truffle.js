var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "yyEjBkPnAv5c93SQBGZn";
var mnemonic = "fiscal debate bonus alien large print skirt sun vote spell march marble";

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/"+infura_apikey),
      network_id: 4,
      gas: 6712390
      
    }
  
  }
}
