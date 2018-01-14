pragma solidity ^0.4.11;

// contract ERC20 {
//     function transfer(address _to, uint256 _value) public;
//     function buy() payable public;
// }

contract Loaning {

    address public buyer;
    uint public loanRequestAmount;
    uint public totalAmountLoaned;
    uint public interestRate;
    uint public priceOfProperty;
    // ERC20 public Token;

    mapping(address => uint256) public balanceOf;

    //mapping(address => uint256) public ownerships;
    uint totalSupply;
    uint totalDividends;
    uint decimals;

    bool loanFilled = false;
    bool loanClosed = false;
    bool loanPaid;

    event LoanFilled(address recipient, uint totalAmountLoaned);
    event FundTransfer(address loaner, uint amount, bool isLoan);

    /**
    * Constructor function
    *
    * Buyer is set as owner
     */
    function Loaning(
        uint propertyValueInEther,
        uint requestedAmountInEther
    ) {
        buyer = msg.sender;
        priceOfProperty = propertyValueInEther * 1 ether;
        loanRequestAmount = requestedAmountInEther * 1 ether;
        // Token = ERC20(0x1f6864af9fd76178b6819ad13ef0238481633cf1); //REPLACE WITH TOKEN ADDRESS
        totalSupply = 100;
        //ownerships[buyer] += calcOwnership(propertyValueInEther - loanRequestAmount, loanRequestAmount);
        // Token.buy
    }

    /**
    * Fallback function to call whenever anyone sends funds
     */
    function () payable {
        require(!loanClosed);
        uint amount = msg.value;
        require(amount <= loanRequestAmount);
        balanceOf[msg.sender] += amount;
        totalAmountLoaned += amount;
       // ownerships[msg.sender] = calcOwnership(amount, loanRequestAmount);
        loanRequestAmount -= amount;
        FundTransfer(msg.sender, amount, true);
    }

    /**
    * Provides buyer an option to close the loan
     */
    function closeLoan() external {
        require(msg.sender==buyer);
        loanFilled = false;
    }

    /**
    * Check if goal was reached
    * Checks if the goal or time limit has been reached and ends the campaign
     */
     function checkGoalReached() {
         if (totalAmountLoaned == loanRequestAmount) {
             loanFilled = true;
             LoanFilled(buyer, totalAmountLoaned);
         }
     }

     /**
     * Withdraw the funds
     * Checks to see if loanRequestAmount or time limit has been reached, and if so, and the funding goal was reached,
     * sends the entire amount to the buyer.  If the loanRequestAmount was not reached, each contributor can withdraw
     * the amount they contributed.
      */
    function safeWithdrawal() {
        if (!loanFilled) {
            uint amount = balanceOf[msg.sender];
            balanceOf[msg.sender] = 0;
            if (amount > 0) {
                if (msg.sender.send(amount)) {
                    FundTransfer(msg.sender, amount, false);
                } else {
                    balanceOf[msg.sender] = amount;
                }
            }
        }

        if (loanFilled && buyer == msg.sender) {
            if (buyer.send(totalAmountLoaned)) {
                loanPaid = false;
                FundTransfer(buyer, totalAmountLoaned, false);
            } else {
                //If we fail to send the funds to the buyer, unlock loaners balance
                loanFilled = false;
            }
        }

    }

    // function calcOwnership(uint payment, uint amountRemaining) public returns (uint256) {
    //     return (amountRemaining - payment) / totalSupply;
    // }

    // function transferOwnership(address _to) public returns (bool success) {
    //     uint256 oldOwnership = ownerships[msg.sender];
    //     ownerships[msg.sender] = 0;
    //     ownerships[_to] = oldOwnership;
    //     return true;
    // }

    // function purchaseLoanerOwnership(address ownershipOwner) payable public returns (bool success) {
    //   uint256 ownershipWorth = ownerships[ownershipOwner] * priceOfProperty;
    //   uint amount = msg.value;
    //   require(msg.sender.balance >= amount);
    //   if (transferOwnership(msg.sender) && amount == ownershipWorth) {
    //       ownershipOwner.transfer(amount);
    //       return true;
    //   }
    // } 
}