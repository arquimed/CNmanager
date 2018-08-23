'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _participant = require('../../participant');

var _participant2 = _interopRequireDefault(_participant);

var _web = require('../../web3');

var _web2 = _interopRequireDefault(_web);

var _ContributeForm = require('../../components/ContributeForm');

var _ContributeForm2 = _interopRequireDefault(_ContributeForm);

var _routes = require('../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/democritus/Documents/Projects/ScipioPlatform/scipio-react/pages/participants/show.js?entry';


var ParticipantShow = function (_Component) {
  (0, _inherits3.default)(ParticipantShow, _Component);

  function ParticipantShow() {
    (0, _classCallCheck3.default)(this, ParticipantShow);

    return (0, _possibleConstructorReturn3.default)(this, (ParticipantShow.__proto__ || (0, _getPrototypeOf2.default)(ParticipantShow)).apply(this, arguments));
  }

  (0, _createClass3.default)(ParticipantShow, [{
    key: 'render',

    /*
      renderCards() {
        const {
          balance,
          manager,
          minimumContribution,
          requestsCount,
          approversCount
        } = this.props;
    
        const items = [
          {
            header: manager,
            meta: 'Address of Manager',
            description:
              'The manager created this campaign and can create requests to withdraw money',
            style: { overflowWrap: 'break-word' }
          },
          {
            header: minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description:
              'You must contribute at least this much wei to become an approver'
          },
          {
            header: requestsCount,
            meta: 'Number of Requests',
            description:
              'A request tries to withdraw money from the contract. Requests must be approved by approvers'
          },
          {
            header: approversCount,
            meta: 'Number of Approvers',
            description:
              'Number of people who have already donated to this campaign'
          },
          {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Campaign Balance (ether)',
            description:
              'The balance is how much money this campaign has left to spend.'
          }
        ];
    
        return <Card.Group items={items} />;
      }
    */
    value: function render() {
      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }, 'Participants Show'));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
        var ParticipantManagerABI, participant, summary;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ParticipantManagerABI = [{ "constant": true, "inputs": [], "name": "ownerParticipant", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "activeCrowdsalesList", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "IBT_TokenAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalConsumptions", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "validator", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factoryOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalExpensesCost", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalValidatedExpenses", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factoryContractAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "nameParticipant", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numExpenses", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "participantBalanceInWei", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "customerRevenue", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "endOfServiceDate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "expenses", "outputs": [{ "name": "id", "type": "uint256" }, { "name": "cost", "type": "uint256" }, { "name": "isValidated", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "participantContractAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "customers", "outputs": [{ "name": "id", "type": "string" }, { "name": "addressCustomer", "type": "address" }, { "name": "isActive", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "assets", "outputs": [{ "name": "tittle", "type": "string" }, { "name": "budgetId", "type": "string" }, { "name": "ammountCapex", "type": "uint256" }, { "name": "ammountCapexToBeFunded", "type": "uint256" }, { "name": "ammountOpex", "type": "uint256" }, { "name": "isFunded", "type": "bool" }, { "name": "zoneId", "type": "uint256" }, { "name": "estado", "type": "uint8" }, { "name": "totalConsumptionTB", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "IBT_MARKET_RATE_IN_WEI", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "participantType", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_owner", "type": "address" }, { "name": "_factoryAddress", "type": "address" }, { "name": "_factoryOwner", "type": "address" }, { "name": "_defaultValidator", "type": "address" }, { "name": "_tokenAddress", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "participantContractAddress", "type": "address" }, { "indexed": true, "name": "validator", "type": "address" }, { "indexed": false, "name": "ammount", "type": "uint256" }], "name": "newExpenseToValidate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "participantContractAddress", "type": "address" }, { "indexed": true, "name": "validator", "type": "address" }, { "indexed": false, "name": "ammount", "type": "uint256" }, { "indexed": false, "name": "time", "type": "uint256" }], "name": "ValidatedExpense", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "participantContractAddress", "type": "address" }, { "indexed": false, "name": "ammountCapex", "type": "uint256" }, { "indexed": false, "name": "ammountCapexToBeFunded", "type": "uint256" }], "name": "newAssetEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "participantContractAddress", "type": "address" }, { "indexed": false, "name": "newConsumptionTB", "type": "uint256" }, { "indexed": false, "name": "time", "type": "uint256" }], "name": "newConsumptionUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "participantContractAddress", "type": "address" }, { "indexed": false, "name": "CrowdsaleContractAddress", "type": "address" }], "name": "CrowdsaleCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "participantContractAddress", "type": "address" }, { "indexed": false, "name": "CrowdsaleContractAddress", "type": "address" }, { "indexed": false, "name": "_ammount", "type": "uint256" }], "name": "CrowdsaleFunded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "minter", "type": "address" }, { "indexed": false, "name": "mintedTokens", "type": "uint256" }], "name": "newIBTMinted", "type": "event" }, { "constant": false, "inputs": [{ "name": "tittle", "type": "string" }, { "name": "budgetId", "type": "string" }, { "name": "ammountCapex", "type": "uint256" }, { "name": "ammountCapexToBeFunded", "type": "uint256" }, { "name": "ammountOpex", "type": "uint256" }, { "name": "isFunded", "type": "bool" }, { "name": "zoneId", "type": "uint256" }, { "name": "estado", "type": "uint8" }, { "name": "totalConsumptionTB", "type": "uint256" }], "name": "CreateNewAsset", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_mintedIBT", "type": "uint256" }], "name": "mintNewIBT", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newRateInETH", "type": "uint256" }], "name": "updateTokenRate", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "createNewCrowdsale", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_CrowdsaleId", "type": "uint256" }, { "name": "_ammount", "type": "uint256" }], "name": "addIBTtoCrowdsaleContract", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "cost", "type": "uint256" }], "name": "CreateNewExpense", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "campaignID", "type": "uint256" }], "name": "validate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_validator", "type": "address" }], "name": "setNewValidator", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_payment", "type": "uint256" }], "name": "extendService", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "i", "type": "uint256" }], "name": "SetWorking", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "i", "type": "uint256" }], "name": "SetPlanned", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "i", "type": "uint256" }], "name": "SetInactive", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "i", "type": "uint256" }], "name": "getAssetStatus", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_id", "type": "string" }], "name": "createNewCustomer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "consumptionTB", "type": "uint256" }], "name": "UpdateConsumptionTB", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getSummary", "outputs": [{ "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "address" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
                participant = _web2.default.eth.contract(ParticipantManagerABI).at(props.query.address);

                console.log(participant);
                _context.next = 5;
                return participant.methods.getSummary().call();

              case 5:
                summary = _context.sent;
                //THIS IS THE LINE OF CODE THAT CAUSES PAGE TO CRASH
                console.log(summary);
                return _context.abrupt('return', {
                  /* address: props.query.address,
                   minimumContribution: summary[0],
                   balance: summary[1],
                   requestsCount: summary[2],
                   approversCount: summary[3],
                   manager: summary[4]
                  */});

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return ParticipantShow;
}(_react.Component);

exports.default = ParticipantShow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3BhcnRpY2lwYW50cy9zaG93LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FyZCIsIkdyaWQiLCJCdXR0b24iLCJMYXlvdXQiLCJQYXJ0aWNpcGFudCIsIndlYjMiLCJDb250cmlidXRlRm9ybSIsIkxpbmsiLCJQYXJ0aWNpcGFudFNob3ciLCJwcm9wcyIsIlBhcnRpY2lwYW50TWFuYWdlckFCSSIsInBhcnRpY2lwYW50IiwiZXRoIiwiY29udHJhY3QiLCJhdCIsInF1ZXJ5IiwiYWRkcmVzcyIsImNvbnNvbGUiLCJsb2ciLCJtZXRob2RzIiwiZ2V0U3VtbWFyeSIsImNhbGwiLCJzdW1tYXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTSxBQUFNOztBQUNyQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFpQjs7OztBQUN4QixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBTyxBQUFvQjs7OztBQUMzQixBQUFTLEFBQVk7Ozs7Ozs7SUFHZixBOzs7Ozs7Ozs7O1NBaUJOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQStDVyxBQUNQOzZCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLE9BQUEsa0JBQ0UsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBRkosQUFDRSxBQUNFLEFBSUw7Ozs7OzJHLEFBdEU0Qjs7Ozs7bUJBQ3ZCO0Esd0NBQXNCLENBQUMsRUFBQyxZQUFELEFBQVksTUFBSyxVQUFqQixBQUEwQixJQUFHLFFBQTdCLEFBQW9DLG9CQUFtQixXQUFVLENBQUMsRUFBQyxRQUFELEFBQVEsSUFBRyxRQUE3RSxBQUFpRSxBQUFDLEFBQWtCLGNBQVksV0FBaEcsQUFBMEcsT0FBTSxtQkFBaEgsQUFBa0ksUUFBTyxRQUExSSxBQUFDLEFBQWdKLGNBQVksRUFB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QS9ILEFBQW9ILEFBQWtCLGFBQVcsRUFBQyxRQUFELEFBQVEsSUFBRyxRQUE1SixBQUFpSixBQUFrQixhQUFXLEVBQUMsUUFBRCxBQUFRLElBQUcsUUFBcFAsQUFBMkQsQUFBOEssQUFBa0IsY0FBWSxXQUF2USxBQUFpUixPQUFNLG1CQUF2UixBQUF5UyxRQUFPLFFBQWhULEFBQXVULEEsQUFBN25TLEFBQ3BCO0EsOEJBQWMsY0FBQSxBQUFLLElBQUwsQUFBUyxTQUFULEFBQWtCLHVCQUFsQixBQUF5QyxHQUFHLE1BQUEsQUFBTSxNQUFsRCxBQUF3RCxBLEFBRTVFOzt3QkFBQSxBQUFRLElBQVIsQUFBWTs7dUJBQ1UsWUFBQSxBQUFZLFFBQVosQUFBb0IsYUFBcEIsQSxBQUFpQzs7bUJBQWpEO0EsbUNBQTBEO0FBQ2hFO3dCQUFBLEFBQVEsSUFBUixBQUFZOztBLEFBQ0w7Ozs7OztvQkFBQSxBQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVHlCLEEsQUEwRTlCOztrQkFBQSxBQUFlIiwiZmlsZSI6InNob3cuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL2hvbWUvZGVtb2NyaXR1cy9Eb2N1bWVudHMvUHJvamVjdHMvU2NpcGlvUGxhdGZvcm0vc2NpcGlvLXJlYWN0In0=