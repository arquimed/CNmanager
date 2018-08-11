pragma solidity ^0.4.17;
import "./SafeMath.sol";
import "./ParticipantFactory.sol";
import "./IBT.sol";

contract ParticipantManager {
    
    ParticipantFactory factory;
    IBT token;

    using SafeMath for uint256;
    using SafeMath for uint;
    using SafeMath for int256;
    using SafeMath for int;

    modifier onlyParticipant() {
        require(msg.sender == ownerParticipant);
        _;
    }
    
    modifier onlyValidator() {
        require(msg.sender == validator);
        _;
    }
    
    modifier onlyFactoryOwner() {
        require(msg.sender == factoryOwner);
        _;
    }
    
    constructor(string _name, address _owner, address _factoryAddress, address _factoryOwner, address _defaultValidator, address _tokenAddress) public {
        name = _name;
        ownerParticipant = _owner;
        factoryContractAddress= _factoryAddress;
        factoryOwner = _factoryOwner;
        validator = _defaultValidator;
        
        factory = ParticipantFactory(_factoryAddress);
    
        token = IBT(_tokenAddress);
        
      
    }
    
    address public ownerParticipant;
    address public participantContractAddress = this;
    address public factoryContractAddress;
    address public factoryOwner;
    address public validator;
    address[] activeCustomers;
    string public  participantType;
    string public  name;
    uint public  totalExpensesCost;
    uint public totalValidatedExpenses;
    uint public numExpenses;
    uint private expenseId;
    

  
    event newExpenseToValidate(address indexed participantContractAddress, address indexed validator, uint ammount);
    event ValidatedExpense (address indexed participantContractAddress, address indexed validator, uint ammount);
    event newAssetEvent (address indexed participantContractAddress, uint ammountCapex, uint ammountCapexToBeFunded );
    event newConsumptionUpdated (address indexed _participantContractAddress, uint _newConsumptionTB);
    
    //Class Declaration
    mapping (uint => Expense) public expenses;
    mapping (address => uint ) public endOfServiceDate;
    
    Asset[] public assets; //declaration of array of Asset object
    Customer[] public customers;
   // Invoice[] public invoices;  //declaration of array of customer invoices
    
    //Struct Definitions
    struct Expense {
        uint id;
       // address recipient;
       // string IPFSHash;
        uint cost;
        bool isValidated;
       
    }
    
  
   
    enum CustomerStatus { Active, Inactive} CustomerStatus customerStatus;
    struct Customer {
        string id;
        address addressCustomer;
        bool isActive;
        
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
    
    //Functions that create instances of defined classes
      function CreateNewAsset(string tittle, string budgetId, uint ammountCapex, uint ammountCapexToBeFunded, uint ammountOpex, bool isFunded, uint zoneId,AssetStatus estado, uint totalConsumptionTB ) public onlyParticipant returns (bool success) {
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
            emit newAssetEvent(this, newAsset.ammountCapex, newAsset.ammountCapexToBeFunded);
            return true;
        }
        
        
    // TOKEN RELATED METHODS: MINT, TRANSFER
    function mintNewIBT (uint _mintedIBT) public onlyParticipant returns (bool success){
        token.mint(participantContractAddress, _mintedIBT);
        return true;
        
   }
        
        
    

     //Creates a new expense object and leaves them ready for validation
    
     function CreateNewExpense(uint cost) public onlyParticipant returns (bool success) {
        /*Expense storage newExpense = Expenses({
            id: _expenseId,
            //recipient: recipient,
            IPFSHash: IPFSHash,
            cost: cost,
            isValidated: false
          
        });*/
        
        expenseId = numExpenses++;
         // Creates new struct and saves in storage. We leave out the mapping type.
        expenses[expenseId] = Expense(expenseId,cost, false);
        
        totalExpensesCost = totalExpensesCost.add(cost);
        emit newExpenseToValidate(this, validator, cost);
        return true;
      
    }
    

    function validate(uint campaignID) public onlyValidator {
        Expense storage e = expenses[campaignID];
        // Creates a new temporary memory struct, initialised with the given values
        // and copies it over to storage.
        // Note that you can also use Funder(msg.sender, msg.value) to initialise.
        e.isValidated=true;
        
        //we call the function from factory contract to update the total amount of costs    
       factory.setNewExpense(this,e.cost);
       
       //we emit an event so we can track how many expeses have been validated by who later in Javascript
        emit ValidatedExpense (this, validator, e.cost);
        totalValidatedExpenses+= e.cost;
       // c.funders[c.numFunders++] = Funder({addr: msg.sender, amount: msg.value});
        //c.amount += msg.value;
    }
    
   
    
     //MANAGEMENT functions
    function setNewValidator(address _validator) public onlyFactoryOwner returns (bool){
        validator = _validator;
        return true;
        
    }
    
    //STATE modifying functions
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
    
  
    //updates consumption aggregate of Participant    
    function UpdateTotalConsumptionTB(uint i, uint consumptionTB) public onlyParticipant returns (bool success){
        assets[i].totalConsumptionTB = consumptionTB;
        emit newConsumptionUpdated(this, assets[i].totalConsumptionTB);
        return success;
        
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
