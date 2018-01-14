var TitleToken = artifacts.require("./TitleToken.sol");
var Loaning = artifacts.require("./Loaning.sol");

module.exports = function(deployer) {
  deployer.deploy(TitleToken);
  deployer.deploy(Loaning);
};
