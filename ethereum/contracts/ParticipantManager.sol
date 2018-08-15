pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./ParticipantFactory.sol";
import "./IBT.sol";
import "./CrowdsaleIBT.sol";

//ESTAT ON M'HE QUEDAT: HE CONSEGUIT QUE AQUEST SC PUGUI CRIDAR LA FUNCIÓ DE MIN DEL IBT I REBRE ELS NOUS TOKENS ASSIGNATS. FALTARÁ AFEGIR FUNCIÓ DE TRANSFERIR FONS D'AQUEST CONTRACTE AL CONTRACTE DE CROWDSALE I TOTA LA DINAMICA DE CLIENTS.
contract ParticipantManager {
    
    ParticipantFactory factory;
    IBT token;

    using SafeMath for uint256;
    using SafeMath for uint;
    using SafeMath for int256;
    using SafeMath for int;

    function() external payable {
        //EMPTY FALLBACK FUNCTION IS ADDED BECAUSE WE NEED THE CONTRACT TO ACCEPT ETH FROM CROWDSALE CONTRACTS
    }
    
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
        IBT_TokenAddress = _tokenAddress;
        
      
    }
    
    address public ownerParticipant;
    address public participantContractAddress = this;
    address public factoryContractAddress;
    address public factoryOwner;
    address public validator;
    address public IBT_TokenAddress;
    address[] activeCustomers;
    mapping (address => uint) public customerRevenue;
    address[] public activeCrowdsalesList;
    string public  participantType;
    string public  name;
    uint public  totalExpensesCost;
    uint public participantBalanceInWei= address(participantContractAddress).balance;
    uint public totalValidatedExpenses;
    uint public totalConsumptions;
    uint public IBT_MARKET_RATE_IN_WEI=1;
    uint public numExpenses;
    uint private expenseId;
    

  
    event newExpenseToValidate(address indexed participantContractAddress, address indexed validator, uint ammount);
    event ValidatedExpense (address indexed participantContractAddress, address indexed validator, uint ammount, uint time);
    event newAssetEvent (address indexed participantContractAddress, uint ammountCapex, uint ammountCapexToBeFunded );
    event newConsumptionUpdated (address indexed participantContractAddress, uint newConsumptionTB, uint time);
    event CrowdsaleCreated (address indexed participantContractAddress, address CrowdsaleContractAddress);
    event CrowdsaleFunded(address indexed participantContractAddress, address CrowdsaleContractAddress, uint _ammount);
    event newIBTMinted(address indexed minter, uint mintedTokens);

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
        token.mint(this, _mintedIBT);
        emit newIBTMinted(this, _mintedIBT);
        return true;
        
   }
    
    function updateTokenRate (uint _newRateInETH) public onlyParticipant returns (bool success){
        IBT_MARKET_RATE_IN_WEI = _newRateInETH;
        return true;
        
    }
    
    
    function createNewCrowdsale () public onlyParticipant returns (bool success){
        address newCrowdsale = new CrowdsaleIBT(IBT_MARKET_RATE_IN_WEI,this, token);   
        activeCrowdsalesList.push(newCrowdsale);
        emit CrowdsaleCreated(this, newCrowdsale);
        return true;
        
    }
    
    
    function addIBTtoCrowdsaleContract (uint _CrowdsaleId, uint _ammount) public onlyParticipant returns (bool success){
        token.transfer(activeCrowdsalesList[_CrowdsaleId], _ammount );
        emit CrowdsaleFunded(this, activeCrowdsalesList[_CrowdsaleId], _ammount);
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
        emit ValidatedExpense (this, validator, e.cost, now);
        totalValidatedExpenses+= e.cost;
       // c.funders[c.numFunders++] = Funder({addr: msg.sender, amount: msg.value});
        //c.amount += msg.value;
    }
    
   
    
     //MANAGEMENT functions
    function setNewValidator(address _validator) public onlyFactoryOwner returns (bool){
        validator = _validator;
        return true;
        
    }
    
  
    function extendService(uint _payment) public returns (bool success){
        token.transferFrom(msg.sender, this, _payment);
        customerRevenue[msg.sender]+= _payment;
        
        return success;
        
        
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
    function UpdateConsumptionTB(uint consumptionTB) public onlyParticipant returns (bool success){
        //assets[i].totalConsumptionTB = consumptionTB;
        totalConsumptions+=consumptionTB;
        emit newConsumptionUpdated(this, consumptionTB, now);
        return success;
        
    }
    
    
}