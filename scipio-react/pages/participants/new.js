import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { factory } from "../../factory";
import web3 from '../../web3';
import { Router } from '../../routes';


class ParticipantNew extends Component {
  state = {
    participantName: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      //let ParticipantFactoryABI=[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"participantsList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participantContribution","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FACTORY_OWNER","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participantConsumption","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"participantIncome","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DEFAULT_VALIDATOR","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newParticipantAddress","type":"address"},{"indexed":true,"name":"owner","type":"address"}],"name":"newParticipantCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_nameParticipant","type":"string"},{"name":"_participantOwner","type":"address"}],"name":"createChildParticipant","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDeployedParticipantContracts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_participant","type":"address"},{"name":"_expense","type":"uint256"}],"name":"setNewExpense","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
      //let ParticipantFactoryAddress='0xf636de395a122e6ba10b281a9eb1c7ac8c73be25';
      //const factoryInstance = web3.eth.contract(ParticipantFactoryABI).at(ParticipantFactoryAddress);
      
      const accounts = await web3.eth.getAccounts();
      //const participants = await factory.getDeployedParticipantContracts();
      let name = "neuer";
      let newParticipantOwner='0xe66cc54d2a232c4b669f0d9291429593219e1ec1';
      console.log(newParticipantOwner);
      console.log('The button has been pushed');
      //await factoryInstance.createChildParticipant(this.state.name, "0xe66cc54d2a232c4b669f0d9291429593219e1ec1", {from: accounts[0]});
      
      /*
      await factory.createChildParticipant(this.state.name"0xe66cc54d2a232c4b669f0d9291429593219e1ec1", newParticipantOwner)
        .send({
          from: accounts[0]
        });
*/  
      const participants = await factory.getDeployedParticipantContracts.call().then(function(error, result) {
        if(!error) return result;
        else 
          console.log(error);
      });
        
      //console.log(participants);
      /*var meta;
      factory.deployed().then(function(instance) {
        meta = instance;
        return meta.DEFAULT_PARTICIPANT_NAME.call({from: accounts[0]});
      }).then(function(name) {
        // If this callback is called, the call was successfully executed.
        // Note that this returns immediately without any waiting.
        // Let's print the return value.
        console.log(name);
      }).catch(function(e) {
        // There was an error! Handle it.
        console.log("There was an error!!!")
      });*/
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Participant</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Participant Name</label>
            <Input
              label="name"
              labelPosition="right"
              value={this.state.participantName}
              onChange={event =>
                this.setState({ participantName: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default ParticipantNew;