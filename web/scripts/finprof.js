console.log("init finprof.js");

var contracts = [];
var ethAddress;
var ethExists;
var database;
var accounts;
var loanContract;
var contractAddress;
var web3;

$(document).ready(function(){

  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    var config = {
        apiKey: "AIzaSyC1pgrWGDF8At5uZE2H5B7a4E6eGHc84Y4",
        authDomain: "dip-requests.firebaseapp.com",
        databaseURL: "https://dip-requests.firebaseio.com",
        projectId: "dip-requests",
        storageBucket: "dip-requests.appspot.com",
        messagingSenderId: "406091213507"
      };

    firebase.initializeApp(config);
    database = firebase.database();


  $("#userDiv").hide()
  $("#userConfigDiv").hide();
  loginConfig();

  accounts = web3.eth.accounts;

  //web3.eth.defaultAccount = web3.eth.accounts[0];
  /*
  loanabi = web3.eth.contract([{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"closeLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"priceOfProperty","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"loanRequestAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalAmountLoaned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"interestRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"propertyValueInEther","type":"uint256"},{"name":"requestedAmountInEther","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"totalAmountLoaned","type":"uint256"}],"name":"LoanFilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loaner","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"isLoan","type":"bool"}],"name":"FundTransfer","type":"event"}]);
  */
  //var loanContract = loanabi.at("0xfa9eaf99d307c0d69ad2d688e9d4a2d421bfbad1");

  if(localStorage.getItem("eth") != null) {
    $("#userConfigDiv").show();
    $("#ethAddress").val(localStorage.getItem("eth"));
    if(localStorage.getItem("amount") != null) {
      $("#requestAmount").val(localStorage.getItem("amount"));
    }
  }


});

/*
* Handles submit button press
* ! Creates contract params
*   LOCAL STRING name: space-separated first and last names
*   LOCAL STRING dob: date of birth in format MM/DD/YYYY
*   LOCAL STRING address: street address of user
*   LOCAL STRING city: city of user home address
*   LOCAL STRING state: state of user home address
*   LOCAL STRING zip: zip code of home address
*   LOCAL INT mhp: current monthly housing payment
*   LOCAL INT iyi: current individual yearly income (gross)
*   LOCAL INT ayi: current additional yearly income (gross)
*   LOCAL INT requested: amount of money requested in loan
*   LOCAL INT invested: amount of money wput up for investment
* RETURNS void
*/
function userEstablishment(ethAddress) {
  var investor = false;

  var profile = [];
  var ethAddr = ethAddress;
  var name;
  var dob;
  var address;
  var city;
  var state;
  var zip;

  var requested;
  var invested;
  var truth = false;

  var propy;



  $("#submit").on("click", function(e) {
    e.preventDefault();

    //Human profile: stored privately for record keeping/prior financial history verification
    name = $("#first").val() + ' ' + $("#last").val();;
    dob = $("#dob").val();
    address = $("#street").val();
    city = $("#city").val();
    state = $("#state").val();
    zip = $("#zip").val();

    if($("#requestAmount").val() !== undefined || $("#requestAmount").val() !== '') {
      requested = $("#requestAmount").val();
      propy = $("#propy").val();
      investor = false;
    } else {
      invested = $("#invested").val();
      investor = true;
      propy = "";
      //set propy to localstored result from selection
    }

    truth = $("#truth").is(':checked');

    if(dob != null) {
      profile.push(name);
      profile.push(dob);
      profile.push(address);
      profile.push(city);
      profile.push(state);
    }

    var profileString = profile.join()



    loanRequestAmount = parseInt(requested) * 751879699248120;
    priceOfProperty = parseInt($("#propval").val()) * 751879699248120;

    console.log(priceOfProperty);
    console.log(loanRequestAmount);

    var established = true;
    var loaningContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"closeLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"priceOfProperty","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"loanRequestAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalAmountLoaned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"interestRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"propertyValueInEther","type":"uint256"},{"name":"requestedAmountInEther","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"totalAmountLoaned","type":"uint256"}],"name":"LoanFilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loaner","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"isLoan","type":"bool"}],"name":"FundTransfer","type":"event"}]);
    var loaning = loaningContract.new(
       priceOfProperty,
       loanRequestAmount,
       {
         from: web3.eth.accounts[0],
         data: '0x60606040526000600960006101000a81548160ff0219169083151502179055506000600960016101000a81548160ff021916908315150217905550341561004557600080fd5b60405160408061091983398101604052808051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550670de0b6b3a76400008202600481905550670de0b6b3a7640000810260018190555060646006819055505050610834806100e56000396000f300606060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806301cb3b20146101b3578063232fa733146101c85780634fe2241a146101dd5780635375e1ca146102065780636eacc1481461022f57806370a08231146102585780637150d8ae146102a55780637c3a00fd146102fa578063fd6b7ef814610323575b6000600960019054906101000a900460ff161515156100b757600080fd5b34905060015481111515156100cb57600080fd5b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555080600260008282540192505081905550806001600082825403925050819055507fe842aea7a5f1b01049d752008c53c52890b1a6daf660cf39e8eec506112bbdf633826001604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182151515158152602001935050505060405180910390a150005b34156101be57600080fd5b6101c6610338565b005b34156101d357600080fd5b6101db6103f0565b005b34156101e857600080fd5b6101f0610468565b6040518082815260200191505060405180910390f35b341561021157600080fd5b61021961046e565b6040518082815260200191505060405180910390f35b341561023a57600080fd5b610242610474565b6040518082815260200191505060405180910390f35b341561026357600080fd5b61028f600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061047a565b6040518082815260200191505060405180910390f35b34156102b057600080fd5b6102b8610492565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561030557600080fd5b61030d6104b7565b6040518082815260200191505060405180910390f35b341561032e57600080fd5b6103366104bd565b005b60015460025414156103ee576001600960006101000a81548160ff0219169083151502179055507fee83e807554a6f74ea1994c12aabfdd8e8a31246394aa2093079d03e3d60b1676000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561044b57600080fd5b6000600960006101000a81548160ff021916908315150217905550565b60045481565b60015481565b60025481565b60056020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b6000600960009054906101000a900460ff16151561066357600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000811115610662573373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501561061c577fe842aea7a5f1b01049d752008c53c52890b1a6daf660cf39e8eec506112bbdf633826000604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182151515158152602001935050505060405180910390a1610661565b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5b5b600960009054906101000a900460ff1680156106cb57503373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b15610805576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6002549081150290604051600060405180830381858888f19350505050156107e8576000600960026101000a81548160ff0219169083151502179055507fe842aea7a5f1b01049d752008c53c52890b1a6daf660cf39e8eec506112bbdf66000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166002546000604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182151515158152602001935050505060405180910390a1610804565b6000600960006101000a81548160ff0219169083151502179055505b5b505600a165627a7a72305820a9931e9221f712a6c3a732a08ad6681b58f864d85c22c8d798946a2e9496ef350029',
         gas: '4700000'
       }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
             loanContract = contract;
             contractAddress = contract.address;
             console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
             console.log(contract.loanRequestAmount.getData());
             web3.eth.sendTransaction({to:contract.address,from:ethAddr,data:contract.loanRequestAmount.getData()}, function(e,r) {console.log(parseInt(r,16))});

             if(established)
             {
               addRequest(ethAddr,contractAddress,requested,propy);
               established = false;
             }


        }
     })

  });

}

function addRequest(ethAddress, contractAddress, amount, propyurl) {

  if(accounts.indexOf(ethAddress) > -1) {
    web3.eth.defaultAccount = accounts.indexOf(ethAddress);
  }

  var dateOfSubmission = new Date(Date.now()).toLocaleString();
  var rootRef = firebase.database().ref();
  var requests = rootRef.child('requests').child(contractAddress.toString()).set({
    'eth': ethAddress,
    'amount': amount,
    'for': propyurl,
    'on': dateOfSubmission
  });

  //return contractInstance;
}

/*
* Handles login button press
* RETURNS void
*/
function loginConfig() {
  console.log("Configuring login");
  //User lookup procedure
  $(".btn-secondary").on("click", function(e) {
    e.preventDefault();
    console.log("init search");
    ethAddress = $("#ethAddress").val();
    console.log("ethAddress: " + ethAddress);
    ethExists = searchEthAddress(ethAddress);
    //If active contract found for user, display contract local variables
    if(ethExists) {
      $("#userDiv").show();
    } else {
      //Else, make new user profile and attach contract
      $('#userConfigDiv').show();
      userEstablishment(ethAddress);
    }
  });

  $('#ethAddress').keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      ethAddress = $("#ethAddress").val();
      console.log("ethAddress: " + ethAddress);
      ethExists = searchEthAddress(ethAddress);
      //If active contract found for user, display contract local variables
      if(ethExists) {
        $("#userDiv").show();
      } else {
        //Else, make new user profile and attach contract
        $('#userConfigDiv').show();
        userEstablishment(ethAddress);
      }
    }
  });
}

/*
* Searches for ethAddress among contracted users
* PARAM STRING ethAddress: the reference address being searched for
* RETURNS BOOLEAN: truth condition for whether address is contracted
*/
function searchEthAddress(ethAddress) {
  return false;
}

function getBracket() {
  return 1;
}
