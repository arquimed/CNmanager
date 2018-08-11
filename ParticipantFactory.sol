pragma solidity ^0.4.17;
import "./SafeMath.sol";
import "./Ownable.sol";
import "./ParticipantManager.sol";


contract ParticipantFactory is Ownable {

    using SafeMath for uint;
    using SafeMath for int;
   
    address[] public participantsList;
    address public FACTORY_ADDRESS = this;
    address public FACTORY_OWNER;
    address public DEFAULT_VALIDATOR;

    
    mapping(address => uint) public participantConsumption;
    mapping(address => uint) public participantContribution;
    mapping(address => uint) public participantIncome;
   
    
    address validator;
    address tokenAddress;
    uint public test;
    
    event newParticipantCreated (address indexed newParticipantAddress, address indexed owner);
    
    constructor(address _tokenAddress) public{
        FACTORY_OWNER = msg.sender;
        DEFAULT_VALIDATOR = msg.sender;
        tokenAddress = _tokenAddress;
        
    }
    
 
  
     function setTest(uint a) public {
        test = a;
       
    }
    
    function getTest() public view returns(uint) {
        return test ;
    }
    
    //address defaultFactoryOwner = 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;
    string DEFAULT_TYPE="A";
    string DEFAULT_PARTICIPANT_NAME="GUIFI";
    
    function createChildParticipant(address _participantOwner) public onlyOwner {
      // insert check if the sent ether is enough to cover the car asset ...
        address newParticipant = new ParticipantManager(DEFAULT_PARTICIPANT_NAME, _participantOwner, FACTORY_ADDRESS, FACTORY_OWNER, DEFAULT_VALIDATOR, tokenAddress);            
        participantsList.push(newParticipant);   
       // emit newParticipantCreated(newParticipant, "0xca35b7d915458ef540ade6068dfe2f44e8fa733c");
   }

   function getDeployedParticipantContracts() public view returns (address[]) {
      return participantsList;
   }
   
   
    /*function getPair(uint8 i) constant public returns (address _participant, address _owner) {

        return (pairParticipantsOwners[i][0],pairParticipantsOwners[i][1]);
    }*/
    
    
    function setNewExpense (address _participant, uint _expense) public {
       
        participantContribution[_participant] =  participantContribution[_participant].add(_expense);
      
        
    }
    
     
    
    
    
}

