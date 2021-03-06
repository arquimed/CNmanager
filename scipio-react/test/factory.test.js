const Token = artifacts.require("IBT");
const Factory = artifacts.require("ParticipantFactory");
const Participant = artifacts.require("ParticipantManager");
const CrowdsaleIBT = artifacts.require("CrowdsaleIBT");

//require('truffle-test-utils').init();


contract('IBT test', async (accounts) => {
  let accountFoundation = accounts[0];
  let accountParticipant = accounts[1];
  let unauthorisedAccount = accounts[2];
  let tokenBuyerAccount = accounts[3];
  let customer1 = accounts[10];
  let customer2= accounts[11];
  let customer3= accounts[12];

  it("should deploy a token with symbol IBT", async () => {
    let token = await Token.deployed();
    //let factory = await Factory.deployed();
   // let factoryOwner = accounts[0];
    //let participantOwner = accounts[1];

    let tokenSymbol = await token.symbol.call();
    assert.equal(tokenSymbol, "IBT");
  });

  it("should deploy Factory Contract", async () => {
    let factory = await Factory.deployed();
    assert(factory);
  });


  it("should Create Child Participant and deploy new contract", async () => {
    let token = await Token.deployed(); 
    let factory = await Factory.deployed();
    let participantName="Neuer";
    let newParticipant = await factory.createChildParticipant(participantName, accounts[1], {from: accounts[0]});

    //let participantName = await newParticipant.name.call();
    //console.log(newParticipant);
    assert(newParticipant);
    //assert.equal("GUIFI", participantName);
  });

  it("should Create Child Participant with GUIFI as name using ASYNC AWAIT", async () => {
    let token = await Token.deployed(); 
    let factory = await Factory.deployed();
    let participantName="Neuer";
    let newParticipant = await factory.createChildParticipant(participantName, accounts[1], {from: accounts[0]});
    let pAddress = await newParticipant.logs[0].args.newParticipantAddress;
    let newInstance = await Participant.at(pAddress);
    let name = await newInstance.nameParticipant.call();
    assert.equal("Neuer",name);
    //assert.equal("GUIFI", participantName);
  });

  it("should add minter role to IBT contract", async () => {
    let token = await Token.deployed(); 
    let factory = await Factory.deployed();
    let participantName="Neuer";
    let newParticipant = await factory.createChildParticipant(participantName, accounts[1], {from: accounts[0]});
    let pAddress = await newParticipant.logs[0].args.newParticipantAddress;
    await token.addMinter(pAddress, {from: accountFoundation});
    //let approved = await token.allowedToMint[pAddress].call();
    //let approved = await token.checkMinter(pAddress, {from: accountFoundation});
   
    let isApproved = await token.checkMinter.call(pAddress, {from: accountFoundation}).then(function(approved) {
      // If this callback is called, the call was successfully executed.
      // Note that this returns immediately without any waiting.
      // Let's print the return value.
      //console.log(approved);
      return approved;
      
    });

    assert.equal(true,isApproved);

  });

  it("should mint new IBT tokens from authorised account", async () => {
    // parent contract initialization
    let token = await Token.deployed(); 
    let factory = await Factory.deployed();
    //creation of child participant using Factory
    let participantName="Neuer";
    let newParticipant = await factory.createChildParticipant(participantName, accounts[1], {from: accounts[0]});

    //creation of newParticipant instance of deployed contract
    let pAddress = await newParticipant.logs[0].args.newParticipantAddress;
    let newInstance = await Participant.at(pAddress);
    
    //console.log(`The address of the newly created participant contract is ${pAddress}`);
    //adds participant contract address to list of allowed minting addresses
    await token.addMinter(accounts[1], {from: accountFoundation});
    
    //checks that the address has been added succesfully 
    let isApproved = await token.checkMinter.call(accounts[1], {from: accountFoundation}).then(function(approved) {
      // If this callback is called, the call was successfully executed.
      // Note that this returns immediately without any waiting.
      // Let's print the return value.
      //console.log(`The address ${accounts[1]} is approved for minting new IBT (${approved})`);
      return approved;
    });

    

    let newIBT = 1000000000000000;
    
    //console.log(`isminted value is ${isMinted}`)
       
    //check that the newly minted tokens are in the participant contract balance.
    let amountMinted = await token.mint(accounts[1], newIBT, {from: accounts[1]}).then(function(result) {
        let beneficiary = result.logs[0].args.to;
        let amountMinted = result.logs[0].args.amount;
        //console.log(`the beneficiary ${beneficiary} minted and received ${amountMinted.toNumber()} tokens`);
        return amountMinted;
    }); 
    
    token.balanceOf.call(accounts[1], {from: accounts[1]}).then(function(result){
        console.log(`Balance of Account 1 ${accounts[1]} is ${result} tokens`);
        let newBalance = result;
        assert.equal(1000000000000000,newBalance);
    });
  });

  
  it("should Mint, create new Crowdsale Contract and allow third account to purchase tokens from it", async () => {
    // parent contract initialization
    let token = await Token.deployed(); 
    let factory = await Factory.deployed();
    //creation of child participant using Factory
    let participantName="Neuer";
    let newParticipant = await factory.createChildParticipant(participantName, accounts[1], {from: accounts[0]});

    //creation of newParticipant instance of deployed contract
    let pAddress = await newParticipant.logs[0].args.newParticipantAddress;
    let newInstance = await Participant.at(pAddress);
    
    console.log(`The address of the newly created participant contract is ${pAddress}`);
    //adds participant contract address to list of allowed minting addresses
    await token.addMinter(accounts[1], {from: accountFoundation});
    
    //checks that the address has been added succesfully 
    let isApproved = await token.checkMinter.call(accounts[1], {from: accountFoundation}).then(function(approved) {
      // If this callback is called, the call was successfully executed.
      // Note that this returns immediately without any waiting.
      // Let's print the return value.
      console.log(`The address ${accounts[1]} is approved for minting new IBT (${approved})`);
      return approved;
    });

    //creation of crowdsale contract and instance initialization
    let newCrowdsale = await newInstance.createNewCrowdsale({from: accountParticipant});
    console.log(`New crowdsale contract address is ${newCrowdsale.logs[0].args.CrowdsaleContractAddress}`);
    let crowdsaleAddress = await newCrowdsale.logs[0].args.CrowdsaleContractAddress;
    let crowdsale = CrowdsaleIBT.at(crowdsaleAddress);

    //minting of new IBT tokens are assigned to crowdsale contract directly
    let newIBT = 1000000000000000;
         
    let amountMinted = await token.mint(crowdsaleAddress, newIBT, {from: accounts[1]}).then(function(result) {
        let beneficiary = result.logs[0].args.to;
        let amountMinted = result.logs[0].args.amount;
        console.log(`the beneficiary ${beneficiary} minted and received ${amountMinted.toNumber()} tokens`);
        return amountMinted;
    }); 
    
    //await token.increaseApproval(accountParticipant,amountMinted, {from: accountParticipant});
    token.balanceOf.call(crowdsaleAddress, {from: accountParticipant}).then(function(result){
      console.log(`Balance of Crowdsale Contract Address ${crowdsaleAddress} is ${result} tokens`);
      let crowdsaleBalance = result;
     assert.equal(1000000000000000,crowdsaleBalance);
    });

 
    
    //increase approval so that Crowdsale Contract can transfer IBT tokens sold.
    await token.increaseApproval(crowdsaleAddress,amountMinted, {from: accountFoundation});
    let allowance = token.allowance.call(accountFoundation, crowdsaleAddress).then(function(result){
        console.log(`Allowance for CrodsaleAddress ${crowdsaleAddress} is ${result} in wei`);
        //assert.equal(1000000000000000, result);
        return result;

    });
    
    //purchase 50000000 weis in tokens
    let purchasedInWei= 50000000;
    await crowdsale.buyTokens(customer1, {from: customer1, value: purchasedInWei});
    let buyTokens = await CrowdsaleIBT.at(crowdsaleAddress).buyTokens(account[10] ,{from: accounts[1], value:50000000});

    //await crowdsale.buyTokens(accounts[10], {from: accounts[10], value: 5000000, gas:1000000});
    
    //let newBalance = await token.balanceOf.call(customer1);

    //console.log(`Balance of purchaser with address ${customer1} is ${result} tokens`);
     
    assert(buyTokens);
    //assert.equal(50000000, 500);


  
    
  });

  // let newBalanceOfBeneficiary = await web3.eth.getBalance(accounts[9]);

  it("should create new Crowdsale Contract", async () => {
    let token = await Token.deployed(); 
    let factory = await Factory.deployed();
    let participantName="Neuer";
    let newParticipant = await factory.createChildParticipant(participantName, accounts[1], {from: accounts[0]});
    let pAddress = await newParticipant.logs[0].args.newParticipantAddress;
    let newInstance = await Participant.at(pAddress);

    let newCrowdsale = await newInstance.createNewCrowdsale({from: accountParticipant});
   // console.log(newCrowdsale);
    console.log(newCrowdsale.logs[0].args.CrowdsaleContractAddress);
    let crowdsaleAddress = await newCrowdsale.logs[0].args.CrowdsaleContractAddress;
    let crowdsale = await Participant.at(crowdsaleAddress);
    
   
     assert(crowdsale);

  });









});


  /*
  it("can mint", async () => {
    let token = await Token.deployed(); 
    let factory = await Factory.deployed();
    let newParticipant = await factory.

  });


// exemple per a cridar una funció:
// await meta.sendCoin(account_two, amount, {from: account_one});

//exemple per a cridar una funció que només consulta estat (amb un argument)
//let balance1 = await meta.getBalance.call(account_one)


it("should Create Child Participant with GUIFI as name using THEN", async () => {
    let token = await Token.deployed(); 
    let factory = await Factory.deployed();
    //let participant = await ParticipantManager.deployed();

    let newInstance;

    let p = factory.createChildParticipant(accounts[1], {from: accounts[0]}).then(function(result) {
        //console.log(result.logs);
        return instanceAddress = result.logs[0].args.newParticipantAddress;
    }).then(function(instance) {
        newInstance = Participant.at(instance);
        //console.log(newInstance);
        return newInstance.name.call();

        }).then(function(name) {
          console.log(name);
          assert.equal("GUIFI",name);
          return name; 
        });

    
       
    });
    */
