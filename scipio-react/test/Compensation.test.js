const Factory = artifacts.require("ParticipantFactory");
const Participant = artifacts.require("ParticipantManager");
const StableCoin = artifacts.require("StableCoin");

contract('Compensation table test', async (accounts) => {
    
   
    
    it("should deploy Factory Contract", async () => {
        let factory = await Factory.deployed();
        assert(factory);
    });
    
       /*
    it("should Create Child Participant with GUIFI as name using ASYNC AWAIT", async () => {
    
    let factory = await Factory.deployed();
    let nameP="Player1";
    let newParticipant = await factory.createChildParticipant(nameP,accounts[1], {from: accounts[0]});
    let pAddress = await newParticipant.logs[0].args.newParticipantAddress;
    let newInstance = await Participant.at(pAddress);
    //let name = await newInstance.name.call().then(function(result) {
    //    return result;
    //});
    assert.equal("Player1",name);
    //assert.equal("GUIFI", participantName);
    });
*/
    it("should make COMPENSATION calculations and resolve compensation table", async () => {
        let accountFoundation = accounts[0];
        let participantAddresses =[];
        let participant1 = accounts[1];
        let participant2 = accounts[2];
        let participant3 = accounts[3];
        participantAddresses[0]=participant1;
        participantAddresses[1]=participant2;
        participantAddresses[2]=participant3;

        //instance creation

        let factory = await Factory.deployed();
        let stableCoin = await StableCoin.deployed();

        //Participant Creation and dummy balance assignation of stable coins
        let p1Name="Guifi";
        let p2Name="Neuer";
        let p3Name="Soier";

        let p1 = await factory.createChildParticipant(p1Name,participant1, {from: accountFoundation});
        let p1Address = await p1.logs[0].args.newParticipantAddress;
        let pInstance1 = await Participant.at(p1Address);
        await stableCoin.transfer(participant1, 1000 ,{from: accountFoundation});
   

        let p2 = await factory.createChildParticipant(p2Name,participant2, {from: accountFoundation});
        let p2Address = await p2.logs[0].args.newParticipantAddress;
        let pInstance2 = await Participant.at(p2Address);
        await stableCoin.transfer(participant2, 1000,{from: accountFoundation});

        let p3 = await factory.createChildParticipant(p3Name, participant3, {from: accountFoundation});
        let p3Address = await p3.logs[0].args.newParticipantAddress;
        let pInstance3 = await Participant.at(p3Address);
        await stableCoin.transfer(participant3, 1000 , {from: accountFoundation});

        let balanceP1 = await stableCoin.balanceOf.call(participant1, {from: accountFoundation});
        let balanceP2 = await stableCoin.balanceOf.call(participant2, {from: accountFoundation});
        let balanceP3 = await stableCoin.balanceOf.call(participant3, {from: accountFoundation});
        
   

        console.log(`Participant ${p1Name} has a balance of ${balanceP1} DAI`);
        console.log(`Participant ${p2Name} has a balance of ${balanceP2} DAI`);
        console.log(`Participant ${p3Name} has a balance of ${balanceP3} DAI`);

        /*console.log(`3 different owners have been created with addresses:
                    1) ${p1Address}
                    2) ${p2Address}
                    3) ${p3Address} `);*/

        //let name = await p1.name.call();


        ///////////////////////////////////////////////////////////////
        //DECLARATION OF EXPENSES TO VALIDATE FOR 3 TEST PARTICIPANTS//
        ///////////////////////////////////////////////////////////////
       
        
        await pInstance1.CreateNewExpense(50, {from: participant1}).then(function(result) {
            let expenseCreator = result.logs[0].args.participantContractAddress;
            let expenseCost = result.logs[0].args.ammount;
            console.log(`Participant ${expenseCreator} has added an expense to validate of cost ${expenseCost} `);
        })

        await pInstance2.CreateNewExpense(0, {from: participant2}).then(function(result) {
            let expenseCreator = result.logs[0].args.participantContractAddress;
            let expenseCost = result.logs[0].args.ammount;
            console.log(`Participant ${expenseCreator} has added an expense to validate of cost ${expenseCost} `);
        })

        await pInstance3.CreateNewExpense(100, {from: participant3}).then(function(result) {
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

        let p1ValidatedExpense = await factory.participantContribution.call(p1Address);
        let p2ValidatedExpense = await factory.participantContribution.call(p2Address);
        let p3ValidatedExpense = await factory.participantContribution.call(p3Address);/*.then(function(result){
            return result;    
        });*/
        console.log(`Participant 3 has validated expenses of ${p3ValidatedExpense} DAI`);



        

        totalValidatedExpenses = parseInt(p1Expenses) + parseInt(p2Expenses) + parseInt(p3Expenses);
        let p1RelativeExpenses = p1ValidatedExpense/totalValidatedExpenses;
        let p2RelativeExpenses = p2ValidatedExpense/totalValidatedExpenses;
        let p3RelativeExpenses = p3ValidatedExpense/totalValidatedExpenses;
        console.log(`Total expenses in [EUR] is: ${totalValidatedExpenses}`);
        console.log(`Participant 1 - ${p1Name} - (${p1Address} has a relative expense of ${p1RelativeExpenses}`);
        console.log(`Participant 2 - ${p2Name} - (${p2Address} has a relative expense of ${p2RelativeExpenses}`);
        console.log(`Participant 3 - ${p3Name} - (${p3Address} has a relative expense of ${p3RelativeExpenses}`);


        ///////////////////////////////////////////////////////////////////
        //DECLARATION OF CONSUMPTIONS TO VALIDATE FOR 3 TEST PARTICIPANTS//
        ///////////////////////////////////////////////////////////////////
       
        let totalConsumption;

        let p1Consumption = await pInstance1.UpdateConsumptionTB(60 , {from: participant1}).then(function(result){
            let consumptionDeclarer = result.logs[0].args.participantContractAddress;
            let consumption = parseInt(result.logs[0].args.newConsumptionTB);
            let time= result.logs[0].args.time;
            console.log(`Consumption of ${consumptionDeclarer} of a total of ${consumption} TB has been declared at ${time}`);
            return consumption;
        });
        let p2Consumption = await pInstance2.UpdateConsumptionTB(60 , {from: participant2}).then(function(result){
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

        let p1ValidatedConsumption = parseInt(await factory.participantConsumption.call(p1Address));
        let p2ValidatedConsumption = parseInt(await factory.participantConsumption.call(p2Address));
        let p3ValidatedConsumption = parseInt(await factory.participantConsumption.call(p3Address));/*.then(function(result){
            return result;    
        });*/
        console.log(`Participant 1 has validated CONSUMPTIONS of ${p1ValidatedConsumption} TB`);
        console.log(`Participant 2 has validated CONSUMPTIONS of ${p2ValidatedConsumption} TB`);
        console.log(`Participant 3 has validated CONSUMPTIONS of ${p3ValidatedConsumption} TB`);

        totalConsumption=p1ValidatedConsumption + p2ValidatedConsumption + p3ValidatedConsumption;

        let p1RelativeConsumption = p1ValidatedConsumption/totalConsumption;
        let p2RelativeConsumption = p2ValidatedConsumption/totalConsumption;
        let p3RelativeConsumption = p3ValidatedConsumption/totalConsumption;
        console.log(`Total consumption in TB is: ${totalConsumption}`);
        console.log(`Participant 1 - ${p1Name} - (${p1Address}  has a relative consumption of ${p1RelativeConsumption}`);
        console.log(`Participant 2 - ${p2Name} - (${p2Address}  has a relative consumption of ${p2RelativeConsumption}`);
        console.log(`Participant 3 - ${p3Name} - (${p3Address}  has a relative consumption of ${p3RelativeConsumption}`);

            
        ///////////////////////////////////////////////////////////////////
        //                   NET POSITION CALCULATION                    //
        ///////////////////////////////////////////////////////////////////

        let p1NetPosition = p1RelativeExpenses - p1RelativeConsumption;
        let p2NetPosition = p2RelativeExpenses - p2RelativeConsumption;
        let p3NetPosition = p3RelativeExpenses - p3RelativeConsumption;

        console.log(`Participant 1  ${p1Name} - (${p1Address} has a net position of ${p1NetPosition}`);
        console.log(`Participant 2  ${p2Name} - (${p2Address} has a net position of ${p2NetPosition}`);
        console.log(`Participant 3  ${p3Name} - (${p3Address} has a net position of ${p3NetPosition}`);

        let results = [];
        results[0] = p1NetPosition * totalValidatedExpenses;
        results[1] = p2NetPosition * totalValidatedExpenses;
        results[2] = p3NetPosition * totalValidatedExpenses;

        console.log(`Participant 1 ${p1Name} - (${p1Address} result is ${results[0]} ETH`);
        console.log(`Participant 2 ${p2Name} - (${p2Address} result is ${results[1]} ETH`);
        console.log(`Participant 3 ${p3Name} - (${p3Address} result is ${results[2]} ETH`);

        ///////////////////////////////////////////////////////////////////
        //                   COMPENSATION RESOLUTION                     //
        ///////////////////////////////////////////////////////////////////
        
        //We increase approval for the 3 test participants 
        //so that Foundation Account can spend ERC20 Stable Coin tokens
       
        await stableCoin.increaseApproval(accountFoundation , 1000, {from: participant1}).then(function(result){
            let owner = result.logs[0].args.owner;
            let spender = result.logs[0].args.spender;
            let value= result.logs[0].args.value;
            console.log(`Particpant ${owner} has approved ${spender} to spend up to ${value} StableCoins`);
            return value;
        });

        await stableCoin.increaseApproval(accountFoundation , 1000, {from: participant2}).then(function(result){
            let owner = result.logs[0].args.owner;
            let spender = result.logs[0].args.spender;
            let value= result.logs[0].args.value;
            console.log(`Particpant ${owner} has approved ${spender} to spend up to ${value} StableCoins`);
            return value;
        });

        await stableCoin.increaseApproval(accountFoundation , 1000, {from: participant3}).then(function(result){
            let owner = result.logs[0].args.owner;
            let spender = result.logs[0].args.spender;
            let value= result.logs[0].args.value;
            console.log(`Particpant ${owner} has approved ${spender} to spend up to ${value} StableCoins`);
            return value;
        });


        //Once Foundation has approval for spending funds, it starts moving funds

        let foundationBalance = await stableCoin.balanceOf.call(accountFoundation, {from: accountFoundation});
        console.log(`Balance of Account Foundation BEFORE compensation is ${foundationBalance} Stable Coins`);
        for (let i = 0; i<3; i++){
            if (results[i] <=0){
                balanceToTransfer= Math.abs(results[i]);
                await stableCoin.transferFrom(participantAddresses[i], accountFoundation, balanceToTransfer, {from: accountFoundation}).then(function(result){
                    let from = result.logs[0].args.from;
                    let to = result.logs[0].args.to;
                    let value= result.logs[0].args.value;
                    console.log(`Participant ${from} has transfered ${to}: ${value} StableCoins`);
                    return value;
                }) 
            }else{
                continue;
            }
            
        }
        
        foundationBalance = await stableCoin.balanceOf.call(accountFoundation, {from: accountFoundation});
        console.log(`\nBalance of Account Foundation AFTER collecting debitors is ${foundationBalance} Stable Coins`);
        
        //Foundation sends to the those participants with positive balance participants the ammount credited
        for (let i = 0; i<3; i++){
            if (results[i] >0){
                balanceToTransfer= results[i];
                await stableCoin.transfer(participantAddresses[i], balanceToTransfer, {from: accountFoundation}).then(function(result){
                    let from = result.logs[0].args.from;
                    let to = result.logs[0].args.to;
                    let value= result.logs[0].args.value;
                    console.log(`Participant ${from} has transfered ${to}: ${value} StableCoins`);
                    return value;
                }) 
            }else{
                continue;
            }
            
        }

        foundationBalance = await stableCoin.balanceOf.call(accountFoundation, {from: accountFoundation});
        console.log(`Balance of Account Foundation AFTER sending funds to creditors is ${foundationBalance} Stable Coins`);

        let participant1Balance = await stableCoin.balanceOf.call(participant1, {from: accountFoundation});
        let participant2Balance = await stableCoin.balanceOf.call(participant2, {from: accountFoundation});
        let participant3Balance = await stableCoin.balanceOf.call(participant3, {from: accountFoundation});

        console.log(`\nBalance of Account Foundation AFTER sending funds to creditors is ${foundationBalance} Stable Coins`);
        console.log(`Balance of Participant1 AFTER compensation is ${participant1Balance} Stable Coins`);
        console.log(`Balance of Participant2 AFTER compensation is ${participant2Balance} Stable Coins`);
        console.log(`Balance of Participant3 AFTER compensation is ${participant3Balance} Stable Coins`);


        await factory.resetParticipantStates({from: accountFoundation});
        p3ValidatedExpense = await factory.participantContribution.call(p3Address);/*.then(function(result){
            return result;    
        });*/
       
        //We check for the expenses status again
        p1ValidatedExpense = await factory.participantContribution.call(p1Address);
         p2ValidatedExpense = await factory.participantContribution.call(p2Address);
         p3ValidatedExpense = await factory.participantContribution.call(p3Address);

        console.log(`\nParticipant 1 has validated expenses of ${p1ValidatedExpense} DAI AFTER RESETTING STATE`);
        console.log(`Participant 2 has validated expenses of ${p2ValidatedExpense} DAI AFTER RESETTING STATE`);
        console.log(`Participant 3 has validated expenses of ${p3ValidatedExpense} DAI AFTER RESETTING STATE`);

        //We check for the consumption status again
         p1ValidatedConsumption = await factory.participantConsumption.call(p1Address);
         p2ValidatedConsumption = await factory.participantConsumption.call(p2Address);
         p3ValidatedConsumption = await factory.participantConsumption.call(p3Address);
        console.log(`\nParticipant 1 has validated CONSUMPTIONS of ${p1ValidatedConsumption} TB AFTER RESETTING STATE`);
        console.log(`Participant 2 has validated CONSUMPTIONS of ${p2ValidatedConsumption} TB AFTER RESETTING STATE`);
        console.log(`Participant 3 has validated CONSUMPTIONS of ${p3ValidatedConsumption} TB AFTER RESETTING STATE`);



        /*PENDING WORK: 
              1) SORT WHICH PARTICIPANTS HAVE A NEGATIVE NET POSITION AND SEND ETH TO FACTORY CONTRACT ADDRESS
              2) FACTORY SHOULD THEN SEND FUNDS TO THE PARTICIPANTS WITH A POSITIVE NET POSITION.
              */
        

     

        assert.equal(150,totalValidatedExpenses);
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