var IBT = artifacts.require("IBT");


module.exports = function(deployer) {
  deployer.deploy(IBT); // if constructor expects arguments, add them here such as deployer.deply(IBT, argument1, argument 2)
};