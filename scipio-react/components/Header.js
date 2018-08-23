import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes'; //this module allows us to use links to redirect users

export default () => {
    return (
        <Menu style={{ marginTop:'10px' }}>    
           <Link route="/">
                <a className="item">
                    Scipio
                </a>
           </Link>
            <Menu.Menu position='right'>
                <Link route="/">
                    <a className="item">
                        Participants
                    </a>
                </Link>

                <Link route="/participants/new">
                    <a className="item">
                        +
                    </a>
                </Link>

            </Menu.Menu>
        </Menu>
    );
}
