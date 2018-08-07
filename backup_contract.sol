pragma solidity ^0.4.17;
import "./SafeMath.sol";

contract SuperNodeFactory {
    address[] public deployedSuperNodes;

    
    //This function will allow to create instances of SuperNodeManager smart contract.
    function createSuperNode(string id, string area) public {
   
        address newSuperNode = new SuperNodeManager(id, area);
        deployedSuperNodes.push(newSuperNode);
    }

    function getDeployedSuperNodes() public view returns (address[]) {
        return deployedSuperNodes;
    }
}


contract SuperNodeManager {
  
   
        constructor(string id, string area) public{
        ownerSuperNode = msg.sender;
        idSuperNode = id;
        areaSuperNode = area;
      
    }
    
    using SafeMath for uint256;
    using SafeMath for uint;
    using SafeMath for int256;
    using SafeMath for int;

    modifier restricted() {
        require(msg.sender == ownerSuperNode);
        _;
    }
    
    
    struct Expenses {
        string description;
       // address recipient;
        string IPFSHash;
        uint cost;
        
    }

    Expenses[] public expenses;
    address ownerSuperNode;
    string idSuperNode;
    string areaSuperNode;
    address[] connectedNodes;
    address[] linksToOtherSuperNodes;
    uint minimumContribution=100;   //this should probably be specified on Constructor --> TO BE REVIEWED
    mapping(address => bool) public contributors;
    mapping(address => uint) public ammountContributed; //ammount contributed per each contributor
    uint public contributorsCount;
    uint public totalContributed;
    uint public totalExpensesCost;
    
    event NewExpense(/*address indexed to,*/ uint256 value);
    
    
    function contribute() public payable  {
       require(msg.value > minimumContribution);
        
        totalContributed += msg.value;
        contributors[msg.sender] = true;
        contributorsCount++;
    }
    
    function GetContributorProrata (address contributor) public view returns (uint, uint){
        return (ammountContributed[contributor] , totalContributed);
    }
   
   
    function CreateNewExpense(string description, /*address recipient, */string IPFSHash, uint cost) public  {
        Expenses memory newExpense = Expenses({
            description: description,
            //recipient: recipient,
            IPFSHash: IPFSHash,
            cost: cost
          
        });

        expenses.push(newExpense);
        totalExpensesCost = totalExpensesCost.add(newExpense.cost);
        
        emit NewExpense(/*newExpense.recipient,*/  newExpense.cost );
    }
  
   
}