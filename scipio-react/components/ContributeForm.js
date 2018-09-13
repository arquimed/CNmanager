import React, {Component} from 'react';
import {Form,Input, Message, Button} from 'semantic-ui-react';
import Participant from '../participant';
import web3 from '../web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value:'',
        errorMessage:'',
        loading: false
    };
    
    onSubmit = async event => {
        event.preventDefault();

        const participant = Participant(this.props.address);

        this.setState({loading:true, errorMessage:''});

        try{
            const accounts = await web3.eth.getAccounts();
            await participant.CreateNewAsset().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/participants/${this.props.address}`);
        }catch (err){
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading:false, value:''});
    };
    
    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Expense Cost</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label ="DAI" 
                        labelPosition="right" 
                    
                    />
                </Form.Field>
                <Message error header="Oooops!" content={this.state.errorMessage}/>
                <Button primary loading={this.state.loading}>Add Cost</Button>

            </Form>


        );

    }
}

export default ContributeForm;