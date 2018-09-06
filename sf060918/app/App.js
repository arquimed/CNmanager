import React from 'react'
import {
  AragonApp,
  Button,
  Text,
  Field,
  observe
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'

const AppContainer = styled(AragonApp)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default class App extends React.Component {
  render () {
    return (
      <AppContainer>
        <div>
          <ObservedCount observable={this.props.observable} />
          <Button onClick={() => this.props.app.decrement(1)}>Decrement</Button>
          <Button onClick={() => this.props.app.increment(1)}>Increment</Button>
        </div>
        <div>
          <Button onClick={ () => this.props.app.createChildParticipant("Guifi","0xca35b7d915458ef540ade6068dfe2f44e8fa733c")}>Create New Participant</Button>
          <ObservedAddress participants={this.props.participants} />
        </div>
        <div>
          <Button onClick={ () => this.props.app.call('getDeployedParticipantContracts').subscribe((name) => console.log(`Tha name is ${name}`))}>Get Name</Button> 
        </div>

      </AppContainer>
    )
  }
}

const ObservedCount = observe(
  (state$) => state$,
  { count: 0 }
)(
  ({ count }) => <Text.Block style={{ textAlign: 'center' }} size='xxlarge'>{count}</Text.Block>
)

const ObservedAddress = observe(
  (state$) => state$,
  { participants: '' }  //this variable has to correspond to the initial state in main.js
)(
  ({ participants }) => <Text.Block style={{ textAlign: 'center' }} size='xxlarge'>{participants}</Text.Block>
)

