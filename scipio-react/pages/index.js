import React, { Component } from 'react';
import { factory } from "../factory";
import { Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';


class ParticipantIndex extends Component {
    
   static async getInitialProps() {
        const participants = await factory.getDeployedParticipantContracts();
        //console.log(participants);
        return { participants };
    }
   
    renderParticipants() {
        // this is going to give us a list of objects, one per campaign
        const items = this.props.participants.map(address => {
            return {
                header: address,
                description: (
                <Link route={`/participants/${address}`}>     
                     <a>View Participant</a>
                 </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
        <Layout>
            <div>
                
                <h3>Active Participants</h3>

                <Link route="/participants/new">
                    <a>
                        <Button
                            floated ="right"
                            content="Create Participant"
                            icon="add circle"
                            primary   //this equals to primary={true}
                        />
                    </a>
                </Link><Link route="/participants/new">
                    <a>
                        <Button
                            floated ="right"
                            content="Create Participant"
                            icon="add circle"
                            primary   //this equals to primary={true}
                        />
                    </a>
                </Link>
                {this.renderParticipants()}

            </div> 
        </Layout>
        );
    }
}

export default ParticipantIndex; //if we don't export the component, reacts throws error.