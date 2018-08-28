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
    it("should resolve compensation. Total balance of DAI tokens of participants should remain constant after compensation.", async () => {
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

        //once we have created the participants, we assign the different contract addresses to an array so we can iterate later in the loops.
        let arrayParticipants = [];
        arrayParticipants = await factory.getDeployedParticipantContracts.call({from: accountFoundation});


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

        let validatedExpenses = [];
        totalValidatedExpenses = 0;

        for (let i = 0; i< arrayParticipants.length; i++){
            validatedExpenses[i]=await factory.participantContribution.call(arrayParticipants[i]);
            totalValidatedExpenses = totalValidatedExpenses + parseInt(validatedExpenses[i]);
            console.log(`Participant ${i} has validated expenses of ${validatedExpenses[i]} DAI`);
            console.log(`The total balance of validated expenses has been updated to ${totalValidatedExpenses} DAI`);
        }
        
        //initialization of array that will store relative expense
        let relativeExpenses = [];
      
        for (let i = 0; i< arrayParticipants.length; i++){
            relativeExpenses[i]=validatedExpenses[i]/totalValidatedExpenses;
            console.log(`Participant ${i} - ${arrayParticipants[i]} has a relative expense of ${relativeExpenses[i]}`);
        }

        console.log(`Total expenses in [DAI] is: ${totalValidatedExpenses}`);
        console.log("\n\n********************************************************************************\n\n");        // console.log(`Participant 1 - ${p1Name} - (${p1Address} has a relative expense of ${p1RelativeExpenses}`);
    


        ///////////////////////////////////////////////////////////////////
        //DECLARATION OF CONSUMPTIONS TO VALIDATE FOR 3 TEST PARTICIPANTS//
        ///////////////////////////////////////////////////////////////////
       
       
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

        let validatedConsumption = [];
        let totalConsumption=0;

        for (let i = 0; i< arrayParticipants.length; i++){
            validatedConsumption[i]=await factory.participantConsumption.call(arrayParticipants[i]);
            totalConsumption = totalConsumption + parseInt(validatedConsumption[i]);
            console.log(`Participant ${i} - ${arrayParticipants[i]} has a validated consumption of ${ validatedConsumption[i]}`);
            console.log(`The total balance of validated consumption has been updated to ${totalConsumption} TB`);
        }

        console.log("\n\n********************************************************************************\n\n");
      
       let relativeConsumption = [];
       for (let i = 0; i< arrayParticipants.length; i++){
            relativeConsumption[i]=validatedConsumption[i]/totalConsumption;
            console.log(`Participant ${i} - ${arrayParticipants[i]} has a relative consumption of ${relativeConsumption[i]}`);
        }
        console.log("\n\n*************************************************\n\n");

            
        ///////////////////////////////////////////////////////////////////
        //                   NET POSITION CALCULATION                    //
        ///////////////////////////////////////////////////////////////////

        let netPosition = [];

        for (let i = 0; i< arrayParticipants.length; i++){
            netPosition[i]=relativeExpenses[i] - relativeConsumption[i]
            console.log(`Participant ${i} - ${p1Address} has a net position of ${netPosition[i]}`);
        }

        console.log("\n\n********************************************************************************\n\n");
       
        let results = [];

        for (let i = 0; i< arrayParticipants.length; i++){
            results[i]=netPosition[i] * totalValidatedExpenses;
            console.log(`Participant ${i} - ${p1Address} result is ${results[i]} DAI`);
        }
        console.log("\n\n********************************************************************************\n\n");       
       
        ///////////////////////////////////////////////////////////////////
        //                   COMPENSATION RESOLUTION                     //
        ///////////////////////////////////////////////////////////////////

        //We check for participant balances of StableCoin ERC-20 token and save them in a variable - to be used later
        let balanceBeforeCompensation= [];
        let totalBalanceBeforeCompensation=0;
        for (let i = 0; i< participantAddresses.length; i++){
            balanceBeforeCompensation[i] =  await stableCoin.balanceOf.call(participantAddresses[i], {from: accountFoundation});
            totalBalanceBeforeCompensation = totalBalanceBeforeCompensation + parseInt(balanceBeforeCompensation[i]);

            console.log(`Balance of Account ${i} - ${participantAddresses[i]} BEFORE compensation is ${balanceBeforeCompensation[i]} Stable Coins`);
        }
        console.log(`Total balance in all participant contracts BEFORE compensation is ${totalBalanceBeforeCompensation}`);
        console.log("\n\n********************************************************************************\n\n");



        //We increase approval for the 3 test participants 
        //so that Foundation Account can spend ERC20 Stable Coin token
      
        for (let i = 0; i< participantAddresses.length; i++){
            await stableCoin.increaseApproval(accountFoundation , 1000, {from: participantAddresses[i]}).then(function(result){
                let owner = result.logs[0].args.owner;
                let spender = result.logs[0].args.spender;
                let value= result.logs[0].args.value;
                console.log(`Particpant ${owner} has approved ${spender} to spend up to ${value} StableCoins`);
                return value;
            });
        }
        console.log("\n\n********************************************************************************\n\n"); 
        //Once Foundation has approval for spending funds, it starts moving funds

        let foundationBalance = await stableCoin.balanceOf.call(accountFoundation, {from: accountFoundation});
        console.log(`Balance of Account Foundation BEFORE compensation is ${foundationBalance} Stable Coins`);
        console.log("\n\n********************************************************************************\n\n");

        for (let i = 0; i<3; i++){
            if (results[i] <=0){
                balanceToTransfer= Math.abs(results[i]);    //convert to positive as net position is negative
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
        console.log("\n\n********************************************************************************\n\n");
        //Foundation sends to the those participants with positive balance participants the ammount credited
                  
        for (let i = 0; i< arrayParticipants.length; i++){
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
        let balanceAfterCompensation = [];
        let totalBalanceAfterCompensation = 0;
        
        for (let i = 0; i< participantAddresses.length; i++){
            balanceAfterCompensation[i] =  await stableCoin.balanceOf.call(participantAddresses[i], {from: accountFoundation});
            totalBalanceAfterCompensation = totalBalanceAfterCompensation + parseInt(balanceAfterCompensation[i]);

            console.log(`Balance of Account ${i} - ${participantAddresses[i]} AFTER compensation is ${balanceAfterCompensation[i]} Stable Coins`);
        }
        console.log(`Total balance in all participant contracts AFTER compensation is ${totalBalanceAfterCompensation}`);
        console.log("\n\n********************************************************************************\n\n");
        
        //reset state variables in Factory contract
        await factory.resetParticipantStates({from: accountFoundation});
     
        //We check for the consumption status again
        for (let i = 0; i< arrayParticipants.length; i++){
            validatedConsumption[i]=await factory.participantConsumption.call(arrayParticipants[i]);
            console.log(`Participant ${i} has validated CONSUMPTIONS of ${validatedConsumption[i]} TB AFTER RESETTING STATE`);
        }

        //We check for the expenses status again
        for (let i = 0; i< arrayParticipants.length; i++){
            validatedExpenses[i]=await factory.participantContribution.call(arrayParticipants[i]);
            console.log(`Participant ${i} has validated expenses of ${validatedExpenses[i]} DAI AFTER RESETTING STATE`);
        
        }

        
        assert.equal(totalBalanceBeforeCompensation,totalBalanceAfterCompensation);
       
        });
});

