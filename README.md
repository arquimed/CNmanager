# CNmanager
Community networks (CN) are networks built by citizens and organisations who pool their resources, often classifed as common pool resources (CPR), and coordinate their efforts to build network infrastructures. They are characterised as being open (everyone has the right to know how they are built), free (access to them is driven by the non-discriminatory principle), and neutral (any technical solution available may be used to extend the network, and the network can be used to transmit data of any kind by any participant, including for commercial purposes). (Baig et al. 2016) So far, the largest CN in the world is Guifi.net. with more than 60.000 operative nodes at present time. It was born in 2004 in response to the lack of investment in rural areas of Catalonia from the big ISP providers. In spite of its distributed nature by design, this infrastructure in commons does still need a centralized Foundation that takes care of Licencing, Monitoring, Conflicts Resolution, Expenditures Declaration and Economic Compensation for its multiple stakeholders and participants. It also gives Guifi.net a legal entity. Funding of investments is achieved by the operators by creating sponsorship requests in the Guifi.net website. 

Despite its huge success, CN still represent a very small percentage of total network deployment. Several factors limit their growth: 
  1) Public regulations do not favor the development of CN, 
  2) The funding process is not streamlined, 
  3) There is no economic incentives for non-interested third parties for investing and participating in the growth of the CN,
  4) It does not scale well: compensation calculations need to be done by a single authority -the Foundation-, 
  5) Closed hardware makes routing configuration tedious for the non-techie.
  
On the other hand, blockchain technologies are especially helpful in enabling trustless cooperation between parties without the need of any central authority, by providing a public ledger and smart-contract execution. In order to address some of the abovementioned limiting factors for CN growth, we propose a blockchain enabled governance platform for creating, managing and promoting Common Networks worldwide. This platform will allow for:

  1) Streamlined investment in Capex, 
  2) Automatic Economic Compensation, 
  3) Internet Bandwidth Tokenization and 
  4) Semi-automatic Conflict Resolution, 
  5) Internet Bandwidth Market Trading. 
  
In order to align the interests of all the different market participants, a new double token system is created: the Scipio Platform Token (SPT), which will allow for preferential access to sponsorships and will accrue value over time, and the Internet Bandwidth Token (IBT), which will be issued by the operators in order to raise the funds needed for network development.

The Sciptio Platform is meant to be used as a tool by existing entities such as Guifi.net, or to substitute the need for a centralized foundation in those areas where there is none yet.


## The problem
Currently, there are two main activities that need to be performed by a central entity (in Guifi.net case, the Foundation)

### Conﬂicts resolution system.
A systematic and clear procedure for resolution of conﬂicts with a scale of graduated sanctions has been developed. It consists of three stages—conciliation, mediation, and arbitration—all of them driven by a lawyer chosen from a set of volunteers. The cost of the procedures is charged to the responsible party or to both parties in case of a tie. This system was developed based on experience and has deﬁned in a precise manner to help in addressing these conﬂicts in a quick and standard way, with help from lawyers, and scalable for a grow-ing community. It was developed at a time when the ﬂame wars between a few participants threatened the entire project. The Foundation had to take a leading role in its development and implementation.

### Economic compensation system. 
The economic compensation system has been developed and implemented to compensate for imbalances between in- vestment in the commons infrastructure and network usage among the professionals. Expenditures declared by the professionals are periodically cleared according to the network usage. The calculations are performed by the Foundation and are made available to the professionals. The Foundation centralizes and manages the billing system (each professional only makes or receives a single payment). A typical income for the Foundation is a percentage, depending on each profes-sional type, which is charged to the result of these calculations.24 In addition, professionals are allowed to charge a reasonable amount for opportunistic connections25 until theirs investment are covered. The economic compensation system also provides for mea- sures to compensate those who, having contributed critical infrastructure, want to withdraw from the CPR.

## Internet Bandwidth Tokenization and Auction. 
The Scipio platform allows internet operators to tokenize and sell the internet bandwidth they serve. An operator connected to the platform issues its own internet tokens within the Scipio platform, where 1 internet token represents 1 TB/s of bandwidth to be delivered in a certain time in the future.

Each infrastructure in commons connected to the Scipio platform will organize an auction for the sale of tokenized internet bandwidth. Scipio token holders will have a priority access to such auctions and their allocation will depend on the number of Scipio tokens they have. 

Each new infraestructure in common offers more economical internet to the users of the Scipio platform through the auction mechanism, which sets the lowest price for internet per 1 TBs (or one internet token). The auction opens to SPT token holders first. SPT token holders will have 48 hours advanced access. After this period has elapsed, the remaining internet bandwidth is offered to all Scipio platform participants.

(./images/IBT%20MODEL.png)

Through tokenization of internet bandwidth:
1. Internet operators are able to pre-sell their service in a global market and acquire necessary capital, increasing project’s attractiveness.
2. Investors gain better investment terms (lower costs and higher liquidity) as well as access to telecommunications projects across the globe in a standardized way. These developments make internet bandwidth an appealing asset class.

The lowest price offering is set by the auctioning party. Current and historical internet bandwidth prices are visible on the platform. This gives market price reference for internet and acts as a reference ceiling for the maximum internet bandwidth price.


The owner of these internet tokens has the following options:
1. First - use the internet when it is produced, if the internet was purchased from a development project in the buyer’s home market. Note that Scipio will physically deliver internet, once Scipio enters a token owner’s home market and begins operation under an independent internet supplier’s legal framework.
2. Second - sell the internet before capacity is installed within the Scipio platform to any other user.

If the token holder decides to choose the second option, he can i) cash out the proceeds immediately or at a future date; or ii) reinvest the received amount in infrastructure in commons and keep storing value via internet bandwidth tokens. The value of this token will never drop below its book value - the market cost of delivering internet connectivity.

## Blockchain Function
### Network Topology
In order to have a unified source of truth regarding network topology, all node information is stored on the blockchain. Changes on the variable states can only be done by node/infraestructure owners. Changes on variable states (addition/deletion/modification of node info) generate an Event.

### Streamlined Capex Investment: the auction.
Example of an auction.
Let’s say that a local operator wants to extend the fiber cable installation from the closest village to his village. The total ammount to invest is 100.000€, from which he wants to fund 50.000€ by issuing and selling tokenised future bandwitdh. Therefore he creates 810.000 IBTs and sets initial price at 20% discount of market price (0.061 € / TB). He sets the timeframe, location, id, and set up details. The platform previously does the project due dilligence.

Maximum amount of raisable funding: 50% of total investment. The rest should be raised by promotors. This is needed in order to align incentives and prevent dishonest behavior.

0.9% of the tokens sold are donated to the Platform Token Holders, that are immediately available through the Common Pool. 


### Streamlined Opex Declaration: expense reporting and peer validation
In order to achieve a trustless system for expense reporting, the following system is planned:
1. Expense Declaration: the operator uploads expense information on the blockchain. The expense is then associated to its address and is left in Pending State. 
2. Expense Peer-Review: the expense is anonymized and is subject to peer validation. Peers can be: a) other operators, b) public administrations, c) other participants. A reputation system for validators may be set in order to incentivize honest behavior, associated with a small retribution. This recognition can be included in the Compensation Table. Expense documents can be stored in IPFS.
a. Minimum Set of Information: invoice number, invoiced party, invoice amount.
3. Expense Validation: once a given expense has received at least 2 validations from peers, it is included in the compensation table as a Validated Expense. The state is then changed to “Validated”. Upon compensation calculation, only validated expenses will be considered.
### Consumption Tracking
In order to know how much consumption each operator has, the following process is planned:
1. Request for tracked consumption information: the operator consults the declared consumption for all the router ports and vWLAN tags assigned to it. This information is automatically written in the blockchain, as it is aggregated and uploaded at a municipal level. 
2. Validation: the operator then verifies that the info received matches its inner consumption database. If it does, it marks the consumption to be VALIDATED. If it doesn’t, it raises an ISSUE and opens a verification process. 
3. Overall settling: once all operators verify their consumption, the information is then ready to be used in the compensation table. An operator that does not verify its consumption will be automatically excluded from the Compensation Table.

### Income Tracking
One of the main challenges of the system is to know how much revenue each operator gets from customers. The main reason to use an internal Internet Bandwidth Token (IBT) is precisely to allow a proper tracking of the operator revenues. But before describing the process of Income Tracking, it is necessary to define the use of the IBT token.
Each operator has a certain number of IBTs, which are minted on the auction process. The operator sells part of these newly minted IBTs in order to fund the infrastructure, and keeps the rest for customer allocation. Customers may purchase IBTs from the operator itself or from other participants in the Scipio Platform. Payment for internet connectivity is done in IBTs, therefore, all transactions are registered in the Blokckchain.
All the operators issue their bills using a standardised model in which the contributions to the CPR are explicitly stated as i) contribution to the deployment of infrastructure or ii) contribution to  its  maintenance  (currently  17€  and  6€  for  optical fibre customers and 4€ and 4€ for WiFi customers, respectively). 

So, the process is as it follows:
1. Automated Invoicing: in the end of each billing period (monthly, weekly,etc), invoicing is automatically done through the Scipio Platform (which can be customized for the operator). The contribution to the CPR can algorithmically be calculated based on the information of total expenses declared -and validated- and the total customer base. Besides that, this process insures that the operators are properly reinvesting these funds by cross-comparing theses lists with the expenses validated.
a. Customers who fail to transact successfully may be have service withdrawn, as per operators terms of service. This process may be done within a one-way payment channel (further work). Many subscription models can be supported (pay-per-gb, fixed tariff, etc).
2. Income Validation: once the automated settlement has been executed, the income information from blockchain is aggregated and ready to be included in the Compensation Table.
Privacy and / or anonymity of these transactions should be further studied. As this process is conducted on-blockchain, no possible issues can be raised.
Automatic Economic Compensation
Only after all the preceding steps have been successfully performed, can the automatic economic compensation system be triggered. First of all, we define the different participants of the Compensation Table:
Participants in the Compensation Table
- Investors: those who only contribute to the CN and do not receive income from customers.
- Operators: those who contribute to the CN and received income from customers. Oportunistic operators -those who use the existing network as a means of transport of its services- are also included in this category. 
Expense Validators: those who with their work validate the expenses of the operators. A fair hourly fee must be set in order to retribute this work.
- Public Administrations: in order to incentivize their collaboration -needed for infrastructure permits and network growth-, public administration may be included in the Compensation Table as “facilitators”. It can be seen as an indirect taxation for Common Network development. The logic here is to give them incentives to join in order to compete with the big traditional ISP, who normally win most of public tenders.
- Scipio Platform: it contributes with the technological development in software and hardware, legal entity, marketing and PR efforts.
- Validators: they contribute by validating the expenses of the participants and are rewarded for doing that work.


## Smart Contract Design

### The SPT Crowdsale Smart Contract (PENDING)
Logic: manage the ICO funding process. Investors send ETH and in exchange they receive SPT token at a pre-fixed ratio (to be set).
- Hard-capped
- Unsold tokens should be burned

### The Scipio Platform Token Contract (SPT) (IMPLEMENTED)
Logic: specifies an ERC-20 token that allows for preferential participation in internet bandwidth auctions (as per pro-rata) and access to the IBT pool (also as per pro-rata). 

### The Internet Bandwitdh Token Contract (IBT)  - (IMPLEMENTED)
The code for this contract is a result of grouping on a single contract the DetailedERC20.sol 1and MintableToken.sol2 functions. Additionally, the IBT token is ERC20 and Ownable. It has all the standard functions from the OpenZeppelin templates and one function added: addMinter(). This function adds an address to the allowed addresses that can mint new tokens, and can only be called by the owner of the IBT contract.

### The IBT Token Crowdsale Contract (IMPLEMENTED)
The code for this contract has been retrieved from the OpenZeppelin template Crowndsale.sol.It can only be deployed by the participant. It is used so that investors and potential customers can purchase the IBT token. The proceeds from the token sale in ETH go to the instance of the participant smart contract that deploys the crowdsale. It is launched from an instance of ParticipantManager Smart Contract.

### Participant Factory (IMPLEMENTED)
Logic: it should create all child smart contracts used in the dApp. It is deployed once and is owned by Sciptio Foundation.

### The Participant Manager (IMPLEMENTED)
Logic: This Smart Contract will have all the business logic that applies to platform participants, from participant creation / deletion to the processes related to participants: a) Expense Declaration, b) Expense Validation c) Validate Consumption information, d) Manage issues, e) Customer management (to be implemented).

### The Conflict Resolution Contract (PENDING)
Logic: manage the disputes that may arise between operators and / or Platform and operators. 

### The Compensation Mechanism (OFF-CHAIN - IMPLEMENTED IN TESTS)
Logic: 
1) For period p, retrieve validated expenses per participant and their consumptions and calculate the total ammount of each variables and the relative weight of each participant (including Validator and Foundation expenses as a participant). These info is appended on the blockchain not as state variable but as events. [TO BE IMPLEMENTED: for now the states are modified on-chain and reset in every period]
2) For period p, those who have a negative net position, automatically trigger a function to top up the Compensation Table SC with the debited ammount (therefore this SC should be payable)
3) Re-distribute the credited funds as per compensation table results to beneficiary participants.
Notes:
- This SC should have allowance set up so that it can “spend” IBT-tokens. NOTE: another option could be to use wrapped ether for this functionality so that this allowance can be set.
- This “compensation” function should be triggered periodically. The period is set by the Foundation.

PENDING WORK
- Automating Consumption information feed from ISP stations periodically. At the moment the input is done manually.
- IPFS integration: for expense document upload. Only metadata is stored on blockchain.
- Front-End


