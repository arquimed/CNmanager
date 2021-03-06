pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./ParticipantManager.sol";
//import "./Roles.sol";
//import "./RBAC.sol";



contract ParticipantFactory is Ownable /* , RBAC */{

    using SafeMath for uint;
    using SafeMath for int;
   
    address[] public participantsList;
   
    address public FACTORY_OWNER;
    address public DEFAULT_VALIDATOR;

    
    mapping(address => uint) public participantConsumption;
    mapping(address => uint) public participantContribution;
    mapping(address => uint) public participantIncome;
    mapping(address => bool) public isParticipant;
   
    
    address validator;
    address tokenAddress;
    uint public test;
    uint private counter=0;
    
    event newParticipantCreated (address indexed newParticipantAddress, address indexed owner);
    
    constructor(address _tokenAddress) public{
        FACTORY_OWNER = msg.sender;
        DEFAULT_VALIDATOR = msg.sender;
        tokenAddress = _tokenAddress;
       // addRole(this,"FOUNDATION");
        
    }
    
 
    //address defaultFactoryOwner = 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;
    string DEFAULT_TYPE="A";
    string DEFAULT_PARTICIPANT_NAME="GUIFI";
    
    function createChildParticipant(string _nameParticipant, address _participantOwner) public onlyOwner {
      // insert check if the sent ether is enough to cover the car asset ...
        address newParticipant = new ParticipantManager(_nameParticipant, _participantOwner,this, FACTORY_OWNER, DEFAULT_VALIDATOR, tokenAddress);            
        participantsList.push(newParticipant);   
        isParticipant[newParticipant]=true;
        emit newParticipantCreated(newParticipant, _participantOwner);
   }

   function getDeployedParticipantContracts() public view returns (address[]) {
      return participantsList;
   }
   
   
    /*function getPair(uint8 i) constant public returns (address _participant, address _owner) {

        return (pairParticipantsOwners[i][0],pairParticipantsOwners[i][1]);
    }*/
    
    
    function setNewExpense (address _participant, uint _expense) public returns (bool success) {
        participantContribution[_participant] =  participantContribution[_participant].add(_expense);
        return true;
    }
    
     
    function setNewConsumption (address _participant, uint _contribution) public returns (bool success) {
        require(isParticipant[_participant]== true);
        participantConsumption[_participant] =  participantConsumption[_participant].add(_contribution);
        return true;
    }
   
  
    address private toBeResetParticipant;
    function resetParticipantStates () public onlyOwner returns (bool success){
       for (uint i=0; i<participantsList.length; i++) {
            toBeResetParticipant=participantsList[i];
            participantContribution[toBeResetParticipant]=0;
            participantConsumption[toBeResetParticipant]=0;
        }
        return success;
    }
}
