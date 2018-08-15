const Factory = artifacts.require("ParticipantFactory");
const Participant = artifacts.require("ParticipantManager");

contract('Compensation table test', async (accounts) => {
    
   
    
    it("should deploy Factory Contract", async () => {
        let factory = await Factory.deployed();
        assert(factory);
    });
    
       
    it("should Create Child Participant with GUIFI as name using ASYNC AWAIT", async () => {
    
    let factory = await Factory.deployed();
    let newParticipant = await factory.createChildParticipant(accounts[1], {from: accounts[0]});
    let pAddress = await newParticipant.logs[0].args.newParticipantAddress;
    let newInstance = await Participant.at(pAddress);
    let name = await newInstance.name.call();
    assert.equal("GUIFI",name);
    //assert.equal("GUIFI", participantName);
    });

    it("should make COMPENSATION calculations and resolve compensation table", async () => {
        let accountFoundation = accounts[0];
        let participant1 = accounts[1];
        let participant2 = accounts[2];
        let participant3 = accounts[3];

        let factory = await Factory.deployed();

        let p1 = await factory.createChildParticipant(participant1, {from: accountFoundation});
        let p1Address = await p1.logs[0].args.newParticipantAddress;
        let pInstance1 = await Participant.at(p1Address);

        let p2 = await factory.createChildParticipant(participant2, {from: accountFoundation});
        let p2Address = await p2.logs[0].args.newParticipantAddress;
        let pInstance2 = await Participant.at(p2Address);

        let p3 = await factory.createChildParticipant(participant3, {from: accountFoundation});
        let p3Address = await p3.logs[0].args.newParticipantAddress;
        let pInstance3 = await Participant.at(p3Address);
        
        /*console.log(`3 different owners have been created with addresses:
                    1) ${p1Address}
                    2) ${p2Address}
                    3) ${p3Address} `);*/

        //let name = await p1.name.call();


        ///////////////////////////////////////////////////////////////
        //DECLARATION OF EXPENSES TO VALIDATE FOR 3 TEST PARTICIPANTS//
        ///////////////////////////////////////////////////////////////
       
        
        await pInstance1.CreateNewExpense(5, {from: participant1}).then(function(result) {
            let expenseCreator = result.logs[0].args.participantContractAddress;
            let expenseCost = result.logs[0].args.ammount;
            console.log(`Participant ${expenseCreator} has added an expense to validate of cost ${expenseCost} `);
        })

        await pInstance2.CreateNewExpense(0, {from: participant2}).then(function(result) {
            let expenseCreator = result.logs[0].args.participantContractAddress;
            let expenseCost = result.logs[0].args.ammount;
            console.log(`Participant ${expenseCreator} has added an expense to validate of cost ${expenseCost} `);
        })

        await pInstance3.CreateNewExpense(10, {from: participant3}).then(function(result) {
            let expenseCreator = result.logs[0].args.participantContractAddress;
            let expenseCost = result.logs[0].args.ammount;
            console.log(`Participant ${expenseCreator} has added an expense to validate of cost ${expenseCost} `);
        })

        let totalValidatedExpenses; 

        let p1Expenses = await pInstance1.validate(0, {from: accountFoundation}).then(function(result){
            let expenseCreator = result.logs[0].args.participantContractAddress;
            let validatedCost = parseInt(result.logs[0].args.ammount);
            let timeOfValidation = result.logs[0].args.time;
            console.log(`Expense 0 of ${expenseCreator} with cost of ${validatedCost} has been validated at ${timeOfValidation}`);
            return validatedCost;
        });

        let p2Expenses = await pInstance2.validate(0, {from: accountFoundation}).then(function(result){
            let expenseCreator = result.logs[0].args.participantContractAddress;
            let validatedCost = result.logs[0].args.ammount;
            let timeOfValidation = result.logs[0].args.time;
            console.log(`Expense 0 of ${expenseCreator} with cost of ${validatedCost} has been validated at ${timeOfValidation}`);
            return validatedCost;
        });

        let p3Expenses = await pInstance3.validate(0, {from: accountFoundation}).then(function(result){
            let expenseCreator = result.logs[0].args.participantContractAddress;
            let validatedCost = result.logs[0].args.ammount;
            let timeOfValidation = result.logs[0].args.time;
            console.log(`Expense 0 of ${expenseCreator} with cost of ${validatedCost} has been validated at ${timeOfValidation}`);
            return validatedCost;
        });

        

        totalValidatedExpenses = parseInt(p1Expenses) + parseInt(p2Expenses) + parseInt(p3Expenses);
        let p1RelativeExpenses = p1Expenses/totalValidatedExpenses;
        let p2RelativeExpenses = p2Expenses/totalValidatedExpenses;
        let p3RelativeExpenses = p3Expenses/totalValidatedExpenses;
        console.log(`Total expenses in [EUR] is: ${totalValidatedExpenses}`);
        console.log(`Participant 1 (${p1Address} has a relative expense of ${p1RelativeExpenses}`);
        console.log(`Participant 2 (${p2Address} has a relative expense of ${p2RelativeExpenses}`);
        console.log(`Participant 3 (${p3Address} has a relative expense of ${p3RelativeExpenses}`);


        ///////////////////////////////////////////////////////////////////
        //DECLARATION OF CONSUMPTIONS TO VALIDATE FOR 3 TEST PARTICIPANTS//
        ///////////////////////////////////////////////////////////////////
       
        let totalConsumption;

        let p1Consumption = await pInstance1.UpdateConsumptionTB(6 , {from: participant1}).then(function(result){
            let consumptionDeclarer = result.logs[0].args.participantContractAddress;
            let consumption = parseInt(result.logs[0].args.newConsumptionTB);
            let time= result.logs[0].args.time;
            console.log(`Consumption of ${consumptionDeclarer} of a total of ${consumption} TB has been declared at ${time}`);
            return consumption;
        });
        let p2Consumption = await pInstance2.UpdateConsumptionTB(6 , {from: participant2}).then(function(result){
                let consumptionDeclarer = result.logs[0].args.participantContractAddress;
                let consumption = parseInt(result.logs[0].args.newConsumptionTB);
                let time= result.logs[0].args.time;
                console.log(`Consumption of ${consumptionDeclarer} of a total of ${consumption} TB has been declared at ${time}`);
                return consumption;
        });
                
        let p3Consumption = await pInstance3.UpdateConsumptionTB(0 , {from: participant3}).then( function(result){
                    let consumptionDeclarer = result.logs[0].args.participantContractAddress;
                    let consumption = parseInt(result.logs[0].args.newConsumptionTB);
                    let time= result.logs[0].args.time;
                    console.log(`Consumption of ${consumptionDeclarer} of a total of ${consumption} TB has been declared at ${time}`);
                    return consumption;

        });

        totalConsumption=p1Consumption + p2Consumption + p3Consumption;

        let p1RelativeConsumption = p1Consumption/totalConsumption;
        let p2RelativeConsumption = p2Consumption/totalConsumption;
        let p3RelativeConsumption = p3Consumption/totalConsumption;
        console.log(`Total consumption in TB is: ${totalConsumption}`);
        console.log(`Participant 1 (${p1Address} has a relative consumption of ${p1RelativeConsumption}`);
        console.log(`Participant 2 (${p2Address} has a relative consumption of ${p2RelativeConsumption}`);
        console.log(`Participant 3 (${p3Address} has a relative consumption of ${p3RelativeConsumption}`);

            
        ///////////////////////////////////////////////////////////////////
        //                   NET POSITION CALCULATION                    //
        ///////////////////////////////////////////////////////////////////

        let p1NetPosition = p1RelativeExpenses - p1RelativeConsumption;
        let p2NetPosition = p2RelativeExpenses - p2RelativeConsumption;
        let p3NetPosition = p3RelativeExpenses - p3RelativeConsumption;

        console.log(`Participant 1 (${p1Address} has a net position of ${p1NetPosition}`);
        console.log(`Participant 2 (${p2Address} has a net position of ${p2NetPosition}`);
        console.log(`Participant 3 (${p3Address} has a net position of ${p3NetPosition}`);

        let p1Result = p1NetPosition * totalValidatedExpenses;
        let p2Result = p2NetPosition * totalValidatedExpenses;
        let p3Result = p3NetPosition * totalValidatedExpenses;

        console.log(`Participant 1 (${p1Address} result is ${p1Result} ETH`);
        console.log(`Participant 2 (${p2Address} result is ${p2Result} ETH`);
        console.log(`Participant 3 (${p3Address} result is ${p3Result} ETH`);

           
        /*PENDING WORK: 
              1) SORT WHICH PARTICIPANTS HAVE A NEGATIVE NET POSITION AND SEND ETH TO FACTORY CONTRACT ADDRESS
              2) FACTORY SHOULD THEN SEND FUNDS TO THE PARTICIPANTS WITH A POSITIVE NET POSITION.
              */
        

        //eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1], value: web3.toWei(0.05, "ether")})

        assert.equal(15,totalValidatedExpenses);
        //assert.equal("GUIFI", participantName);
        });
});

/*
event newExpenseToValidate(address indexed participantContractAddress, address indexed validator, uint ammount);
event ValidatedExpense (address indexed participantContractAddress, address indexed validator, uint ammount, uint time);
event newConsumptionUpdated (address indexed _participantContractAddress, uint _newConsumptionTB, uint time);
*/

/*
PAS 1: crear 3 participants. El primer serà un operador que exten xarxa i ofereix serveis. El segon serà un operador oportunista. El tercer serà un inversor.
2) Afegir 1 expense a cada participar. Participant 1: 500. Participant 2: 0. Participant 3: 1000.
3) Validar els expenses de cada participant (sense modificar el validador per defecte que es accountFactory)
4) Afegir una consumption a cada participant. Participant 1: 600. Participant 2: 600. Participant 3: 0.
5) Calcular el total de expenses i aportació relativa.
6) calcular el total de consum i consum relatiu.
7) calcular la posició neta de cada participant.
8) per als participants amb posició negativa (a pagar), calcular total a pagar i transferir diners a Factory.
9) Un cop reb els diners Factory, aquesta envia els fons als participants amb posició positiva. 
*/