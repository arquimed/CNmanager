pragma solidity ^0.4.18;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/zeppelin/math/SafeMath.sol";
import "./ParticipantManager.sol";

contract ParticipantFactory is AragonApp {
    using SafeMath for uint256;

    /// Events
    event Increment(address indexed entity, uint256 step);
    event Decrement(address indexed entity, uint256 step);

    /// State
    uint256 public value;

    /// ACL
    bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");
   // bytes32 constant public FOUNDATION_ROLE = keccak256("FOUNDATION_ROLE");

    
    /**
     * @notice Increment the counter by `step`
     * @param step Amount to increment by
     */
    function increment(uint256 step) auth(INCREMENT_ROLE) external {
        value = value.add(step);
        Increment(msg.sender, step);
    }

    /**
     * @notice Decrement the counter by `step`
     * @param step Amount to decrement by
     */
    function decrement(uint256 step) auth(DECREMENT_ROLE) external {
        value = value.sub(step);
        Decrement(msg.sender, step);
    }
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
    
    function ParticipantFactory(/*address _tokenAddress*/) public{
        FACTORY_OWNER = msg.sender;
        DEFAULT_VALIDATOR = msg.sender;
       // tokenAddress = _tokenAddress;
       // addRole(this,"FOUNDATION");
        
    }

    function getName() public returns (address) {
        return FACTORY_OWNER;
    }
    
 
    //address defaultFactoryOwner = 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;
    string DEFAULT_TYPE="A";
    string DEFAULT_PARTICIPANT_NAME="GUIFI";
  
    function createChildParticipant(string _nameParticipant, address _participantOwner) public auth(INCREMENT_ROLE) {
      // insert check if the sent ether is enough to cover the car asset ...
        address _newParticipant = new ParticipantManager(_nameParticipant, _participantOwner,this, FACTORY_OWNER, DEFAULT_VALIDATOR/*, tokenAddress*/);            
        participantsList.push(_newParticipant);   
        isParticipant[_newParticipant]=true;
        newParticipantCreated(_newParticipant, _participantOwner);
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
    function resetParticipantStates () public auth(INCREMENT_ROLE) returns (bool success){
       for (uint i=0; i<participantsList.length; i++) {
            toBeResetParticipant=participantsList[i];
            participantContribution[toBeResetParticipant]=0;
            participantConsumption[toBeResetParticipant]=0;
        }
        return success;
    }
}
