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
    address public ownerFactory;

    
    address public factory = this;
    
    mapping(address => uint) public participantConsumption;
    mapping(address => uint) public participantContribution;
    mapping(address => uint) public participantIncome;
    address validator;
    
    event newParticipantCreated (address indexed newParticipantAddress, address indexed owner);
    
    constructor() public{
        ownerFactory = msg.sender;
        validator = 0xdd870fa1b7c4700f2bd7f44238821c26f7392148;
      
    }
  
    function createChildParticipant(string _type, string _name, address _owner) public onlyOwner {
      // insert check if the sent ether is enough to cover the car asset ...
        address newParticipant = new ParticipantManager(_type, _name, _owner, ownerFactory);            
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
    
 
   
/*
    function register(string _text){
        Name name = Name(watch_addr);
        name.register(_text);
    }*/
   
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
    
    constructor(string _type, string _name, address _owner, address _factoryOwner) public payable{
        ownerParticipant = _owner;
        participantType = _type;
        name = _name;
        participantContractAddress=this;
        parentFactory = _factoryOwner;
        
      
    }
    
    ParticipantFactory factory = ParticipantFactory(parentFactory); //we declare instance of parent contract
    
    address public ownerParticipant;
    string public  participantType;
    string public  name;
    uint public  totalExpensesCost;
    uint public totalValidatedExpenses;
    address public participantContractAddress;
    address public parentFactory;
    address validator=0xdd870fa1b7c4700f2bd7f44238821c26f7392148;
  
    event newExpenseToValidate(address indexed participantContractAddress, address indexed validator, uint ammount);
    event ValidatedExpense (address indexed participantContractAddress, address indexed validator, uint ammount);
    event newAssetEvent (address indexed participantContractAddress, uint ammountCapex, uint ammountCapexToBeFunded );
    event newConsumptionUpdated (address indexed _participantContractAddress, uint _newConsumptionTB);
    
    Expenses[] public expenses; //declaration of Expense object
    Asset[] public assets; //declaration of array of Asset object
    Invoice[] public invoices;  //declaration of array of customer invoices
    
    struct Expenses {
        string description;
       // address recipient;
        string IPFSHash;
        uint cost;
        bool isValidated;
       
    }

    
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
        
    function UpdateTotalConsumptionTB(uint i, uint consumptionTB) public restricted returns (bool success){
        assets[i].totalConsumptionTB = consumptionTB;
        emit newConsumptionUpdated(participantContractAddress, assets[i].totalConsumptionTB);
        return success;
        
    }
    
    

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
    
    function ValidateExpense(uint i) public onlyValidator returns (bool success){
        require(expenses[i].isValidated==false);
       
        totalValidatedExpenses= totalValidatedExpenses.add(expenses[i].cost);
        expenses[i].isValidated=true;
        emit ValidatedExpense(participantContractAddress, msg.sender, expenses[i].cost);
        
        return true;
        
    }
    
   
 
   
   
}