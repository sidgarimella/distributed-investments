var web3;
var database;



$(document).ready(function () {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  database;

  var config = {
      apiKey: "AIzaSyC1pgrWGDF8At5uZE2H5B7a4E6eGHc84Y4",
      authDomain: "dip-requests.firebaseapp.com",
      databaseURL: "https://dip-requests.firebaseio.com",
      projectId: "dip-requests",
      storageBucket: "dip-requests.appspot.com",
      messagingSenderId: "406091213507"
    };
    try {
      firebase.initializeApp(config);
      database = firebase.database();
    } catch(e) {

    }
  $("#ethLogin").on("click", function(e) {
    $("#unfulfilled tbody child").remove();
    var eth = $("#ethAddress").val();
    localStorage.setItem("eth",eth);
    loadData(eth);
  });

});

function loadData(ethAddr) {

  web3.eth.setDefaultAccount = web3.eth.accounts[web3.eth.accounts.indexOf(ethAddr)];


  var rootRef = firebase.database().ref();
  var requests = rootRef.child('requests');
  requests.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      console.log(child.key+": "+child.val());

      var json = child.val();
        var key;
        for (var field in json) {
            key = field;
            break;
        }

      var eth = json[key]["eth"];
      var amount = json[key]["amount"];
      var propertyURL = json[key]["for"];
      var dateStamp = json[key]["on"];

      if(ethAddr.toString() == json.eth.toString() && isFulfilledContract(json.eth,child.key.toString()) != -1) {
        var table = document.getElementById("unfulfilled");


        $('#unfulfilled tbody').append('<tr class="child"><td></td>><td>' + json.amount + '</td><td>' + json.for + '</td><td>' + child.key + '</td>');
        /*
        var raised = row.insertCell(0);
        var loan = row.insertCell(1);
        var propyurl = row.insertCell(2);
        var contract = row.insertCell(3);

        loan.innerHTML = json.amount;
        propyurl.innerHTML = json.for;
        contract.innerHTML = child.key;
        */

      }
    })
  });
}


function isFulfilledContract(ethAddr, contractAddress) {
  var loaningContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"closeLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"priceOfProperty","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"loanRequestAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalAmountLoaned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"interestRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"propertyValueInEther","type":"uint256"},{"name":"requestedAmountInEther","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"totalAmountLoaned","type":"uint256"}],"name":"LoanFilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loaner","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"isLoan","type":"bool"}],"name":"FundTransfer","type":"event"}]);
  var contract = loaningContract.at(contractAddress.toString());
  var loanedAmount = 0;
  web3.eth.sendTransaction({from:ethAddr,data:contract.loanRequestAmount.getData()}, function(e,r) {console.log(parseInt(r,16)); loanedAmount = parseInt(r,16);});
  return true;
}
