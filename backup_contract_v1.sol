pragma solidity ^0.4.17;
import "./SafeMath.sol";

contract SuperNodeFactory {
  
    using SafeMath for uint256;
    using SafeMath for uint;
    using SafeMath for int256;
    using SafeMath for int;
   
    address[] public deployedSuperNodes;
    address public Foundation = this;
    
    mapping(address => mapping(address => uint)) public outFlowsGB;  // mapping of SupperNodes --> Nodes --> GB served 
    mapping(address => mapping(address => uint)) public inFlowsGB;   //mapping of SuperNodes --> Links --> GB received
    mapping(address => mapping(address => uint)) public inFlowsIncome;  //mapping of Supernodes --> Nodes --> Inflow of Income received from that node
    mapping(address => uint) public superNodeTotalExpense;
    
    // mapping(uint => mapping(uint => uint)) mymap;
    
    //This function will allow to create instances of SuperNodeManager smart contract.
    function createSuperNode(string id, string area) public {
   
        address newSuperNode = new SuperNodeManager(id, area);
        deployedSuperNodes.push(newSuperNode);
    }

    function getDeployedSuperNodes() public view returns (address[]) {
        return deployedSuperNodes;
    }
    
    function setOutFlowGB(address _from, address _to, uint _value) public {
        outFlowsGB[_from][_to]= outFlowsGB[_from][_to].add(_value);
        
    }
    
    function setInFlowGB(address _superNodeOrigin, address _superNodeReceiver, uint _value) public {
        inFlowsGB[_superNodeReceiver][_superNodeOrigin]=inFlowsGB[_superNodeReceiver][_superNodeOrigin].add(_value);
        
    }
    
    
    function addInFlowIncome(address _superNode, address _node, uint _value) public {
        inFlowsIncome[_superNode][_node]=inFlowsIncome[_superNode][_node].add(_value);
        
    }
    
    function addSuperNodeExpense(address _superNode, uint _expense) public {
        superNodeTotalExpense[_superNode]=superNodeTotalExpense[_superNode].add(_expense);
        
    }
    
   
}


contract SuperNodeManager {
    
    SuperNodeFactory factory;
   
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
        bool isValidated;
        
    }

    Expenses[] public expenses;
    address ownerSuperNode;
    string idSuperNode;
    string areaSuperNode;
    address[] public connectedNodes;
    address[] linksToOtherSuperNodes;
    uint minimumContribution=100;   //this should probably be specified on Constructor --> TO BE REVIEWED
    mapping(address => bool) public contributors;
    mapping(address => uint) public ammountContributed; //ammount contributed per each contributor
    //mapping(address => uint) public outFlowGB;  // mapping of addresses and their outFlowGB (GB served by their SuperNode in current period)
    mapping(address => uint) public inFlowIncome;
    //mapping(address => uint) public inFlowGB;
    uint public contributorsCount;
    uint public totalContributed;
    uint public totalExpensesCost;
    uint public totalInflowIncome;
    uint public totalInflowGB;
    
    event NewExpense(/*address indexed to,*/ uint256 value);
    event NewOutFlowGB(address emiter, address receiver, uint gb);
    event NewInflowIncome(address SuperNode, address sender, uint value);
    event NewInflowGB(address supernode, address origin, uint gb);
    event NewExpense(address supernode, uint expense);
    
    function contribute() public payable  {
       require(msg.value > minimumContribution);
        
        totalContributed += msg.value;
        contributors[msg.sender] = true;
        ammountContributed[msg.sender]=msg.value;
        contributorsCount++;
    }
    
    function GetContributorProrata (address contributor) public view returns (uint, uint){
        return (ammountContributed[contributor] , totalContributed);
    }
    
    function NodeSignUp (address newNode) external {
        connectedNodes.push(newNode);
        
        
    }
    
    // We manually add GB served to node from SuperNode. In the future, this value should be retrieved dinamically.
    function AddOutFlowGB (address _to, uint _outFlowGB) public  {
            factory.setOutFlowGB(this, _to, _outFlowGB);
            
            emit NewOutFlowGB(this, _to, _outFlowGB);
    }
    
     // We manually add Income received from nodes in exchange of internet service. In the future, this value should be managed dinamically.
    function AddInflowIncome() public payable {
        require(msg.sender!=ownerSuperNode);
        
       // totalInflowIncome = totalInflowIncome.add(msg.value);
        factory.addInFlowIncome(this,msg.sender,msg.value);
       
        emit NewInflowIncome(this, msg.sender, msg.value);
        
        
    }
    
    function AddInflowGB (address _superNodeOrigin, uint _inflowGB) public {
        totalInflowGB = totalInflowGB.add(_inflowGB);
        factory.setInFlowGB(this,_superNodeOrigin,_inflowGB);
        
       // inFlowGB[_superNodeOrigin]=_inflowGB;   //actualitzem mapping amb llistat de adreces origen que ens proporcionen GB
        
        emit NewInflowGB(this, _superNodeOrigin, _inflowGB);
        
    }
    
   
    function CreateNewExpense(string description, /*address recipient, */string IPFSHash, uint cost, bool isValidated) public {
        Expenses memory newExpense = Expenses({
            description: description,
            //recipient: recipient,
            IPFSHash: IPFSHash,
            cost: cost,
            isValidated: isValidated
          
        });

        expenses.push(newExpense);
        totalExpensesCost = totalExpensesCost.add(newExpense.cost);
        
        emit NewExpense(/*newExpense.recipient,*/  newExpense.cost );
    }
    
    function approveExpense(uint index) public  {
        require(ownerSuperNode==msg.sender);
        Expenses storage expense = expenses[index];

       // require(approvers[msg.sender]);
        //require(!request.approvals[msg.sender]);

        expense.isValidated = true;
        
        // after expense is validated, the total ammount of the expenses related to this SuperNode is updated in the Factory contract.
        factory.addSuperNodeExpense(this, expense.cost);
        
        emit NewExpense(this,expense.cost);
        
        
        

    }
   
   
}




