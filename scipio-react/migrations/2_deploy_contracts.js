var IBT = artifacts.require("IBT");
var stableCoin = artifacts.require("StableCoin");
var SPT = artifacts.require("SPT");

module.exports = function(deployer) {
  deployer.deploy(IBT); // if constructor expects arguments, add them here such as deployer.deply(IBT, argument1, argument 2)
  deployer.deploy(stableCoin);
  deployer.deploy(SPT);

};