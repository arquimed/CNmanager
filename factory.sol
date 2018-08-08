pragma solidity ^0.4.17;
import "./SafeMath.sol";
import "./Ownable.sol";


contract ParticipantFactory is Ownable {
    using SafeMath for uint256;
    using SafeMath for uint;
    using SafeMath for int256;
    using SafeMath for int;
   
    address[] public participantsList;
    address[][] pairParticipantsOwners;
    address public FACTORY_ADDRESS = this;
    uint public test;
    
    mapping(address => uint) public participantConsumption;
    mapping(address => uint) public participantContribution;
    mapping(address => uint) public participantIncome;
    address validator;
    
    event newParticipantCreated (address indexed newParticipantAddress, address indexed owner);
    
    constructor() public{
        FACTORY_ADDRESS = msg.sender;
        validator = 0xdd870fa1b7c4700f2bd7f44238821c26f7392148;
      
    }
  
     function setTest(uint a) public {
        test = a;
       
    }
    
    function getTest() public view returns(uint) {
        return test ;
    }
    
    
    function createChildParticipant(string _type, string _name, address _owner) public onlyOwner {
      // insert check if the sent ether is enough to cover the car asset ...
        address newParticipant = new ParticipantManager(_type, _name, _owner, FACTORY_ADDRESS);            
        participantsList.push(newParticipant);   
        pairParticipantsOwners.push([newParticipant,_owner]); //update array of participants / owners
        emit newParticipantCreated(newParticipant, _owner);
   }

   function getDeployedParticipantContracts() public view returns (address[]) {
      return participantsList;
   }
   
   
    function getPair(uint8 i) constant public returns (address _participant, address _owner) {

        return (pairParticipantsOwners[i][0],pairParticipantsOwners[i][1]);
    }
    
    
    function setNewExpense (address _participant, uint _expense) public payable returns (bool done) {
        participantContribution[_participant] =  participantContribution[_participant].add(_expense);
        return true;
        
    }
    
     
    
    
    
}


contract ParticipantManager {
    
 
   
    ParticipantFactory factory;

   
    using SafeMath for uint256;
    using SafeMath for uint;
    using SafeMath for int256;
    using SafeMath for int;

    modifier restricted() {
        require(msg.sender == ownerParticipant);
        _;
    }
    
    modifier onlyValidator() {
        require(msg.sender == validator);
        _;
    }
    
    constructor(string _type, string _name, address _owner, address _factoryOwner) public {
        participantType = _type;
        name = _name;
        ownerParticipant = _owner;
       
        participantContractAddress=this;
     
        factory = ParticipantFactory(_factoryOwner);
        
      
    }
    

    
    address public ownerParticipant;
    string public  participantType;
    string public  name;
    uint public  totalExpensesCost;
    uint public totalValidatedExpenses;
    address public participantContractAddress;
    address public parentFactory;
    address validator=0xdd870fa1b7c4700f2bd7f44238821c26f7392148;
    address[] ActiveCustomers;
  
    event newExpenseToValidate(address indexed participantContractAddress, address indexed validator, uint ammount);
    event ValidatedExpense (address indexed participantContractAddress, address indexed validator, uint ammount);
    event newAssetEvent (address indexed participantContractAddress, uint ammountCapex, uint ammountCapexToBeFunded );
    event newConsumptionUpdated (address indexed _participantContractAddress, uint _newConsumptionTB);
    
    Expenses[] public expenses; //declaration of Expense object
    Asset[] public assets; //declaration of array of Asset object
    Customer[] public customers;
   // Invoice[] public invoices;  //declaration of array of customer invoices
    
    //definition of Expenses Struct
    struct Expenses {
        string description;
       // address recipient;
        string IPFSHash;
        uint cost;
        bool isValidated;
       
    }
    
    //definition of Customer Struct
    enum CustomerStatus { Active, Inactive} CustomerStatus customerStatus;
    struct Customer {
        string id;
        address addressCustomer;
        bool isActive;
        
    }
    
    //The following functions change asset struct properties
     enum AssetStatus { Working, Planned, Inactive, Testing, Building, Reserved, Dropped} AssetStatus status;

    function SetWorking(uint i) public{
        assets[i].estado = AssetStatus.Working;
    }

    function SetPlanned(uint i) public{
        assets[i].estado = AssetStatus.Planned;
    }
    
    function SetInactive(uint i) public{
        assets[i].estado = AssetStatus.Inactive;
    }


    function getAssetStatus(uint i) constant public returns (uint){
      return uint(assets[i].estado);
    }
    
    //Creates new customer. MODIFICATORS TO BE DEFINED
    function createNewCustomer (string _id) public returns (bool success){
        Customer memory newCustomer = Customer({
            id:_id,
            addressCustomer: msg.sender,
            isActive:true
        });
        
        customers.push(newCustomer);
    
        return true;
        
        
    }
    //Asset struct definition
    struct Asset {
       string tittle;
       string budgetId;
       uint ammountCapex;
       uint ammountCapexToBeFunded;
       uint ammountOpex;
       bool isFunded;
       uint zoneId;
       AssetStatus estado;
       uint totalConsumptionTB;
    }
    
    //creates new asset object
    function CreateNewAsset(string tittle, string budgetId, uint ammountCapex, uint ammountCapexToBeFunded, uint ammountOpex, bool isFunded, uint zoneId,AssetStatus estado, uint totalConsumptionTB ) public restricted returns (bool success) {
            Asset memory newAsset = Asset({
                tittle: tittle,
                budgetId: budgetId,
                ammountCapex: ammountCapex,
                ammountCapexToBeFunded: ammountCapexToBeFunded,
                ammountOpex: ammountOpex,
                isFunded: isFunded,
                zoneId: zoneId,
                estado: estado,
                totalConsumptionTB: totalConsumptionTB
            });
            
            assets.push(newAsset);
            emit newAssetEvent(participantContractAddress, newAsset.ammountCapex, newAsset.ammountCapexToBeFunded);
            return true;
        }
    
    //updates consumption aggregate of Participant    
    function UpdateTotalConsumptionTB(uint i, uint consumptionTB) public restricted returns (bool success){
        assets[i].totalConsumptionTB = consumptionTB;
        emit newConsumptionUpdated(participantContractAddress, assets[i].totalConsumptionTB);
        return success;
        
    }
    
    
    //Creates a new expense object and leaves them ready for validation
     function CreateNewExpense(string description, /*address recipient, */string IPFSHash, uint cost, bool isValidated) public restricted {
        Expenses memory newExpense = Expenses({
            description: description,
            //recipient: recipient,
            IPFSHash: IPFSHash,
            cost: cost,
            isValidated: isValidated
          
        });
        expenses.push(newExpense);
        totalExpensesCost = totalExpensesCost.add(newExpense.cost);
        emit newExpenseToValidate(participantContractAddress, validator, newExpense.cost);
        
       // factory.setNewExpense(participantContractAddress, totalExpensesCost);
        
       
    }
    
    //This function validates the expenses and add the ammount to the sumatory of validated expenses.
    function ValidateExpense(uint i) public onlyValidator returns (bool success){
        require(expenses[i].isValidated==false);
       
        totalValidatedExpenses= totalValidatedExpenses.add(expenses[i].cost);
        expenses[i].isValidated=true;
        emit ValidatedExpense(participantContractAddress, msg.sender, expenses[i].cost);
        
        return true;
        
    }
    
    
    //TEST FUNCTIONS FOR GETTING / SETTING INFORMATION FROM / TO PARTICIPANT FACTORY
   function factorySetTest(uint a) public returns(bool success) {
       factory.setTest(a);
       return true;
   }
   
      //TEST FUNCTIONS FOR GETTING / SETTING INFORMATION FROM / TO PARTICIPANT FACTORY
   function factoryGetTest() public view returns(uint) {
        return factory.getTest();
   }
   
 
   
   
}
