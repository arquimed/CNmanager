import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Participant from '../../participant';
import web3 from '../../web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';
var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}); // leaving out the arguments will default to these values

class ParticipantShow extends Component {
  static async getInitialProps(props) {
    
    const participantContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"ownerParticipant","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"activeCrowdsalesList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"IBT_TokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalConsumptions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"validator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factoryOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalExpensesCost","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalValidatedExpenses","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factoryContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nameParticipant","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numExpenses","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"participantBalanceInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"customerRevenue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"endOfServiceDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"expenses","outputs":[{"name":"id","type":"uint256"},{"name":"cost","type":"uint256"},{"name":"isValidated","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"participantContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"customers","outputs":[{"name":"id","type":"string"},{"name":"addressCustomer","type":"address"},{"name":"isActive","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"assets","outputs":[{"name":"tittle","type":"string"},{"name":"budgetId","type":"string"},{"name":"ammountCapex","type":"uint256"},{"name":"ammountCapexToBeFunded","type":"uint256"},{"name":"ammountOpex","type":"uint256"},{"name":"isFunded","type":"bool"},{"name":"zoneId","type":"uint256"},{"name":"estado","type":"uint8"},{"name":"totalConsumptionTB","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"IBT_MARKET_RATE_IN_WEI","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"participantType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_owner","type":"address"},{"name":"_factoryAddress","type":"address"},{"name":"_factoryOwner","type":"address"},{"name":"_defaultValidator","type":"address"},{"name":"_tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":true,"name":"validator","type":"address"},{"indexed":false,"name":"ammount","type":"uint256"}],"name":"newExpenseToValidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":true,"name":"validator","type":"address"},{"indexed":false,"name":"ammount","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"ValidatedExpense","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":false,"name":"ammountCapex","type":"uint256"},{"indexed":false,"name":"ammountCapexToBeFunded","type":"uint256"}],"name":"newAssetEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":false,"name":"newConsumptionTB","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"newConsumptionUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":false,"name":"CrowdsaleContractAddress","type":"address"}],"name":"CrowdsaleCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":false,"name":"CrowdsaleContractAddress","type":"address"},{"indexed":false,"name":"_ammount","type":"uint256"}],"name":"CrowdsaleFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"minter","type":"address"},{"indexed":false,"name":"mintedTokens","type":"uint256"}],"name":"newIBTMinted","type":"event"},{"constant":false,"inputs":[{"name":"tittle","type":"string"},{"name":"budgetId","type":"string"},{"name":"ammountCapex","type":"uint256"},{"name":"ammountCapexToBeFunded","type":"uint256"},{"name":"ammountOpex","type":"uint256"},{"name":"isFunded","type":"bool"},{"name":"zoneId","type":"uint256"},{"name":"estado","type":"uint8"},{"name":"totalConsumptionTB","type":"uint256"}],"name":"CreateNewAsset","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_mintedIBT","type":"uint256"}],"name":"mintNewIBT","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newRateInETH","type":"uint256"}],"name":"updateTokenRate","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"createNewCrowdsale","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_CrowdsaleId","type":"uint256"},{"name":"_ammount","type":"uint256"}],"name":"addIBTtoCrowdsaleContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cost","type":"uint256"}],"name":"CreateNewExpense","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"validate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_validator","type":"address"}],"name":"setNewValidator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_payment","type":"uint256"}],"name":"extendService","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"SetWorking","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"SetPlanned","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"SetInactive","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getAssetStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"string"}],"name":"createNewCustomer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"consumptionTB","type":"uint256"}],"name":"UpdateConsumptionTB","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSummary","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]);
    const participant = participantContract.at(props.query.address);
 

    //const summary = await participant.getSummary();

    let summary = participant.nameParticipant.call(function (err, res) {
      if(!err){
       // console.log(`The name is ${result}`);
        console.log(`Imprimeixo el NOM de forma ASINCRONA: ${res}`);
        return res;
        
      }
     else
       console.error(error);
     });

     console.log(summary);
    

    console.log(`Imprimeixo nom de forma SÍNCRONA ${summary}`);
    
    return {
      ownerParticipant: props.query.address,
      name: "HOLAAAA!"
     // balance: summary[1],
      //requestsCount: summary[2],
     // approversCount: summary[3],
      //manager: summary[4]
    };
  }
    //const participantContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"ownerParticipant","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"activeCrowdsalesList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"IBT_TokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalConsumptions","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"validator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factoryOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalExpensesCost","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalValidatedExpenses","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factoryContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nameParticipant","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numExpenses","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"participantBalanceInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"customerRevenue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"endOfServiceDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"expenses","outputs":[{"name":"id","type":"uint256"},{"name":"cost","type":"uint256"},{"name":"isValidated","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"participantContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"customers","outputs":[{"name":"id","type":"string"},{"name":"addressCustomer","type":"address"},{"name":"isActive","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"assets","outputs":[{"name":"tittle","type":"string"},{"name":"budgetId","type":"string"},{"name":"ammountCapex","type":"uint256"},{"name":"ammountCapexToBeFunded","type":"uint256"},{"name":"ammountOpex","type":"uint256"},{"name":"isFunded","type":"bool"},{"name":"zoneId","type":"uint256"},{"name":"estado","type":"uint8"},{"name":"totalConsumptionTB","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"IBT_MARKET_RATE_IN_WEI","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"participantType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_owner","type":"address"},{"name":"_factoryAddress","type":"address"},{"name":"_factoryOwner","type":"address"},{"name":"_defaultValidator","type":"address"},{"name":"_tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":true,"name":"validator","type":"address"},{"indexed":false,"name":"ammount","type":"uint256"}],"name":"newExpenseToValidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":true,"name":"validator","type":"address"},{"indexed":false,"name":"ammount","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"ValidatedExpense","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":false,"name":"ammountCapex","type":"uint256"},{"indexed":false,"name":"ammountCapexToBeFunded","type":"uint256"}],"name":"newAssetEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":false,"name":"newConsumptionTB","type":"uint256"},{"indexed":false,"name":"time","type":"uint256"}],"name":"newConsumptionUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":false,"name":"CrowdsaleContractAddress","type":"address"}],"name":"CrowdsaleCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"participantContractAddress","type":"address"},{"indexed":false,"name":"CrowdsaleContractAddress","type":"address"},{"indexed":false,"name":"_ammount","type":"uint256"}],"name":"CrowdsaleFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"minter","type":"address"},{"indexed":false,"name":"mintedTokens","type":"uint256"}],"name":"newIBTMinted","type":"event"},{"constant":false,"inputs":[{"name":"tittle","type":"string"},{"name":"budgetId","type":"string"},{"name":"ammountCapex","type":"uint256"},{"name":"ammountCapexToBeFunded","type":"uint256"},{"name":"ammountOpex","type":"uint256"},{"name":"isFunded","type":"bool"},{"name":"zoneId","type":"uint256"},{"name":"estado","type":"uint8"},{"name":"totalConsumptionTB","type":"uint256"}],"name":"CreateNewAsset","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_mintedIBT","type":"uint256"}],"name":"mintNewIBT","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newRateInETH","type":"uint256"}],"name":"updateTokenRate","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"createNewCrowdsale","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_CrowdsaleId","type":"uint256"},{"name":"_ammount","type":"uint256"}],"name":"addIBTtoCrowdsaleContract","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cost","type":"uint256"}],"name":"CreateNewExpense","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"campaignID","type":"uint256"}],"name":"validate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_validator","type":"address"}],"name":"setNewValidator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_payment","type":"uint256"}],"name":"extendService","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"SetWorking","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"SetPlanned","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"SetInactive","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getAssetStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"string"}],"name":"createNewCustomer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"consumptionTB","type":"uint256"}],"name":"UpdateConsumptionTB","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSummary","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]);
   // const participant = participantContract.at(props.query.address);
   // const participant = Participant(props.query.address);
   // console.log(`The address of the Participant Contract is ${participant.address}`);
    //console.log(`The object "participant" returns this: ${participant}`);
    
   // const summary = await campaign.methods.getSummary().call();
  
   /* const name = await participant.nameParticipant(function(error, result){
      if(!error){
        console.log(`The name is ${result}`);
        console.log(`Imprimeixo el NOM de forma ASINCRONA: ${result}`);
        return result;
        
      }
     else
       console.error(error);
     });*/
     /*
     const summary = await participant.getSummary(function(error, result){
      if(!error){
          console.log(JSON.stringify(result[0]));
          return result;
      }
      else{
        console.error(error);
      } 
   });*/
        
  
  
  renderCards() {
    const {
      nameParticipant,
      ownerParticipant
      /*validator,
      participantBalanceInWei,
      totalValidatedExpenses,
      numExpenses,
      totalConsumptions*/
    } = this.props;

    const items = [
      {
        header: nameParticipant,
        meta: 'Participant Name',
        description:
          'The name of the Participant of the Common Network',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: ownerParticipant,
        meta: 'Participant Contract',
        description:
          'This is the address of the owner of the participant'
      }/*
      {
        header: validator,
        meta: 'Validator',
        description:
          'Address of expenses validator assigned to this participant'
      },
      {
        header: totalValidatedExpenses,
        meta: 'Validated Expenses',
        description:
          'Expenses that have been validated'
      },
      {
        header: numExpenses,
        meta: 'Number of Invoices',
        description:
          'Total number of invoices uploaded'
      },
      {
        header: totalConsumptions,
        meta: 'Consumptions',
        description:
          'Total Consumption of Participant in TB'
      },
      {
        header: web3.utils.fromWei(participantBalanceInWei, 'ether'),
        meta: 'Participant Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.'
      }*/
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Participant Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/participants/${this.props.address}/expenses`}>
                <a>
                  <Button primary>View Expenses</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        

      </Layout>
    );
  }
}

export default ParticipantShow;