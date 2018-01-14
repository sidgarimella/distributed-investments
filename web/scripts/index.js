console.log("init index.js");

var database;
var web3;

$(document).ready(function(){
  $("#mini-loader").hide();
  $("#tableCloth").hide();
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
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



  $("#go").on("click", function(e) {
    var req = $("#requestAmount").val();
    localStorage.setItem("amount",req);
    var eth = $("#ethAddress").val();
    localStorage.setItem("eth",eth);
    window.location.href = 'finprof.html';
  });

  $("#explore").on("click", function(e) {
    var req = $("#investAmount").val();
    localStorage.setItem("amount",req);
    var eth = $("#ethAddress").val();
    localStorage.setItem("eth",eth);
    $("#mainPage").fadeOut(300);
    $("#mainPhrase").fadeOut(400);
    $("#landing").hide();
    if(isNaN(parseInt(req))) {
      getRequests(1000000);
    } else {
      getRequests(parseInt(req));
    }

  });

});

function getRequests(max) {
  $("#tableCloth").fadeIn(2000);
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

      var amount = json[key]["amount"];
      var propertyURL = json[key]["for"];
      var dateStamp = json[key]["on"];
      console.log(json);
      console.log(parseInt(max));
      if(max >= parseInt(json.amount)) {
        var table = document.getElementById("queryResults");

        var row = table.insertRow(1);

        var loan = row.insertCell(0);
        var property = row.insertCell(1);
        var address = row.insertCell(2);
        var date = row.insertCell(3);
        var fund = row.insertCell(4);

        loan.innerHTML = json.amount;
        property.innerHTML = json.for;
        address.innerHTML = child.key;
        date.innerHTML = json.on.substring(0,json.on.indexOf(','));
        fund.innerHTML = "<button class='funding' id='"+child.key.toString()+"'>Fund</button>"
        $("#"+child.key.toString()).click(function(){

          $('.ui.modal').modal();
            $("#cco").text("Contract at " + child.key.toString());
            $("#infoco").text("User at _" + "_ is asking for $" + json.amount.toString() + " to be paid back in monthly payments of $" + "_ at an APR of 4%. Failure of the recipient to meet first payment deadline will mean all principal is returned as co-ownership of any capital assets bought through loan. A balance of $" +  "_ remains until this contract can be fulfilled.")
            if(localStorage.getItem("eth") != null && localStorage.getItem("eth") !== undefined) {
                $("#ethAddress").val(localStorage.getItem("eth"));
            }
            $("#fund").click(function(){
              var iA = $("#investAmount").val() * 751879699248120;
              var eth = $("#ethAddress").val();
              console.log(iA);
              web3.eth.defaultAccount = web3.eth.accounts[web3.eth.accounts.indexOf(json.eth)];

              var loaningContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"checkGoalReached","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"closeLoan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"priceOfProperty","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"loanRequestAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalAmountLoaned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"interestRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"safeWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"propertyValueInEther","type":"uint256"},{"name":"requestedAmountInEther","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"totalAmountLoaned","type":"uint256"}],"name":"LoanFilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"loaner","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"isLoan","type":"bool"}],"name":"FundTransfer","type":"event"}]);

              var contract = loaningContract.at(child.key);

              web3.eth.sendTransaction({from:ethAddr,to:child.key,value:iA}, function(e,r) {console.log(r);});
            });

        });


      }
      $('.modal-backdrop').click(function(){
        $('.ui.modal').hide();
      });

    });
  });


}
