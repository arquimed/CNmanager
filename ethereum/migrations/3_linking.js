var SafeMath = artifacts.require('SafeMath');
var IBT = artifacts.require("IBT");
var CrowdsaleIBT = artifacts.require("CrowdsaleIBT");
var ParticipantFactory = artifacts.require("ParticipantFactory");
var ParticipantManager = artifacts.require("ParticipantManager");
var accounts = web3.eth.getAccounts(function(err,res){accounts=res;});

module.exports = function(deployer) {
    deployer.deploy(SafeMath);
    deployer.link(SafeMath, [IBT,CrowdsaleIBT,ParticipantFactory,ParticipantManager]);
    
    var a, b;

    deployer.then(function() {
        return IBT.new();
    }).then(function(instance) {
        a=instance;
        //deply ParticipantFactory with IBT token contract address as argument
        return deployer.deploy(ParticipantFactory, a.address);
    });/*.then(function(instance){
        factory=instance;

        return factory.createChildParticipant(accounts[1], {from: accounts[0]});

    });*/
   
    //deployer.deploy([IBT, ParticipantFactory]);
    
}
/*
var a, b;
deployer.then(function() {
  // Create a new version of A
  return A.new();
}).then(function(instance) {
  a = instance;
  // Get the deployed instance of B
  return B.deployed();
}).then(function(instance) {
  b = instance;
  // Set the new instance of A's address on B via B's setA() function.
  return b.setA(a.address);
});

*/
/*
// Deploy library LibA, then link LibA to contract B, then deploy B.
deployer.deploy(LibA);
deployer.link(LibA, B);
deployer.deploy(B);

// Link LibA to many contracts
deployer.link(LibA, [B, C, D]);
*/