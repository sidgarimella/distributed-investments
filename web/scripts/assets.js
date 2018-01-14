var web3;
$(document).ready(function(){
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var accounts = web3.eth.accounts;
  var ethAdd;
  var ethInd;
  $("#ethLogin").click(function () {

    ethAddress = $("#ethAddress").val();
    if(accounts.indexOf(ethAddress) > -1) {
      web3.eth.defaultAccount = accounts.indexOf(ethAddress);
    }
    getAccountTransactions(ethAddress,0,200);
  });

  /*
  loanabi = web3.eth.contract([{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"closeLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"priceOfProperty","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"loanRequestAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalAmountLoaned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"interestRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"propertyValueInEther","type":"uint256"},{"name":"requestedAmountInEther","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"totalAmountLoaned","type":"uint256"}],"name":"LoanFilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loaner","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"isLoan","type":"bool"}],"name":"FundTransfer","type":"event"}]);
  */
  //var loanContract = loanabi.at("0xfa9eaf99d307c0d69ad2d688e9d4a2d421bfbad1");
});


function getAccountTransactions(accAddress, startBlockNumber, endBlockNumber) {
  // You can do a NULL check for the start/end blockNumber

  console.log("Searching for transactions to/from account \"" + accAddress + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = web3.eth.getBlock(i, true);

    if (block != null && block.transactions != null) {
      block.transactions.forEach( function(e) {
        if (accAddress == "*" || accAddress == e.from || accAddress == e.to) {
          console.log("   from            : " + e.from + "\n"
            + "   to              : " + e.to + "\n"
            + "   value           : " + e.value + "\n"
            + "   gasPrice        : " + e.gasPrice);
        }
        if(e.to != '0x0' && e.value != 0) {
          ('#payments tbody').append('<tr class="child"><td>' + e.value + '</td>><td>' + e.from + '</td><td>' + 'CONTRACT' + '</td>');
        }
      })
    }
  }
}
