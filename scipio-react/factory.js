import web3 from './web3';
// Import libraries we need.
/* In order to get the ABI in the right format, we can use console from truffle at rinkeby and get the JSON with the following line:

JSON.stringify(NameOfContract.abi) 

*/

let ParticipantFactoryABI=[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"participantsList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participantContribution","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FACTORY_OWNER","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participantConsumption","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participantIncome","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEFAULT_VALIDATOR","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newParticipantAddress","type":"address"},{"indexed":true,"name":"owner","type":"address"}],"name":"newParticipantCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_nameParticipant","type":"string"},{"name":"_participantOwner","type":"address"}],"name":"createChildParticipant","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDeployedParticipantContracts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_participant","type":"address"},{"name":"_expense","type":"uint256"}],"name":"setNewExpense","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
let ParticipantFactoryAddress='0xf636de395a122e6ba10b281a9eb1c7ac8c73be25';


const factory = web3.eth.contract(ParticipantFactoryABI).at(ParticipantFactoryAddress);
//web3.eth.contract(ParticipantFactoryABI, ParticipantFactoryAddress);

export {factory};