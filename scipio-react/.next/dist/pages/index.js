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

var _factory = require('../factory');

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/democritus/Documents/Projects/ScipioPlatform/scipio-react/pages/index.js?entry';


var ParticipantIndex = function (_Component) {
    (0, _inherits3.default)(ParticipantIndex, _Component);

    function ParticipantIndex() {
        (0, _classCallCheck3.default)(this, ParticipantIndex);

        return (0, _possibleConstructorReturn3.default)(this, (ParticipantIndex.__proto__ || (0, _getPrototypeOf2.default)(ParticipantIndex)).apply(this, arguments));
    }

    (0, _createClass3.default)(ParticipantIndex, [{
        key: 'renderParticipants',
        value: function renderParticipants() {
            // this is going to give us a list of objects, one per campaign
            var items = this.props.participants.map(function (address) {
                return {
                    header: address,
                    description: _react2.default.createElement(_routes.Link, { route: '/participants/' + address, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 22
                        }
                    }, _react2.default.createElement('a', {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 23
                        }
                    }, 'View Participant')),
                    fluid: true
                };
            });

            return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 30
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 35
                }
            }, _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 36
                }
            }, _react2.default.createElement('h3', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                }
            }, 'Active Participants'), _react2.default.createElement(_routes.Link, { route: '/participants/new', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 40
                }
            }, _react2.default.createElement('a', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 41
                }
            }, _react2.default.createElement(_semanticUiReact.Button, {
                floated: 'right',
                content: 'Create Participant',
                icon: 'add circle',
                primary: true //this equals to primary={true}
                , __source: {
                    fileName: _jsxFileName,
                    lineNumber: 42
                }
            }))), this.renderParticipants()));
        }
    }], [{
        key: 'getInitialProps',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var participants;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _factory.factory.getDeployedParticipantContracts();

                            case 2:
                                participants = _context.sent;

                                console.log(participants);
                                return _context.abrupt('return', { participants: participants });

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getInitialProps() {
                return _ref.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    return ParticipantIndex;
}(_react.Component);

exports.default = ParticipantIndex; //if we don't export the component, reacts throws error.
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiZmFjdG9yeSIsIkNhcmQiLCJCdXR0b24iLCJMYXlvdXQiLCJMaW5rIiwiUGFydGljaXBhbnRJbmRleCIsIml0ZW1zIiwicHJvcHMiLCJwYXJ0aWNpcGFudHMiLCJtYXAiLCJoZWFkZXIiLCJhZGRyZXNzIiwiZGVzY3JpcHRpb24iLCJmbHVpZCIsInJlbmRlclBhcnRpY2lwYW50cyIsImdldERlcGxveWVkUGFydGljaXBhbnRDb250cmFjdHMiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBZTs7QUFDeEIsQUFBUyxBQUFNOztBQUNmLEFBQU8sQUFBWTs7OztBQUNuQixBQUFTLEFBQVk7Ozs7Ozs7SSxBQUdmOzs7Ozs7Ozs7Ozs2Q0FRbUIsQUFDakI7QUFDQTtnQkFBTSxhQUFRLEFBQUssTUFBTCxBQUFXLGFBQVgsQUFBd0IsSUFBSSxtQkFBVyxBQUNqRDs7NEJBQU8sQUFDSyxBQUNSO2lEQUNBLEFBQUMsOEJBQUssMEJBQU4sQUFBOEI7c0NBQTlCO3dDQUFBLEFBQ0s7QUFETDtxQkFBQSxrQkFDSyxjQUFBOztzQ0FBQTt3Q0FBQTtBQUFBO0FBQUEsdUJBSkYsQUFHSCxBQUNLLEFBR0w7MkJBUEosQUFBTyxBQU9JLEFBRWQ7QUFUVSxBQUNIO0FBRlIsQUFBYyxBQVlkLGFBWmM7O2lEQVlQLEFBQUMsc0JBQUQsQUFBTSxTQUFNLE9BQVosQUFBbUI7OEJBQW5CO2dDQUFQLEFBQU8sQUFDVjtBQURVO2FBQUE7Ozs7aUNBR0YsQUFDTDttQ0FDQSxBQUFDOzs4QkFBRDtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNJLGNBQUE7OzhCQUFBO2dDQUFBLEFBRUk7QUFGSjtBQUFBLCtCQUVJLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQUZKLEFBRUksQUFFQSx3Q0FBQSxBQUFDLDhCQUFLLE9BQU4sQUFBWTs4QkFBWjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksY0FBQTs7OEJBQUE7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQzt5QkFBRCxBQUNhLEFBQ1Q7eUJBRkosQUFFWSxBQUNSO3NCQUhKLEFBR1MsQUFDTDt5QkFKSixLQUFBLEFBSWM7QUFIVjs4QkFESjtnQ0FOWixBQUlJLEFBQ0ksQUFDSSxBQVFQO0FBUk87dUJBUmhCLEFBQ0EsQUFDSSxBQWNLLEFBQUssQUFLakI7Ozs7Ozs7Ozs7Ozt1Q0E1QzhCLGlCQUFBLEFBQVEsQTs7aUNBQTdCO0Esd0RBQ047O3dDQUFBLEFBQVEsSUFBUixBQUFZO2lFQUNMLEVBQUUsYyxBQUFGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTGdCLEEsQUFrRC9COztrQkFBQSxBQUFlLEEsa0JBQWtCIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9ob21lL2RlbW9jcml0dXMvRG9jdW1lbnRzL1Byb2plY3RzL1NjaXBpb1BsYXRmb3JtL3NjaXBpby1yZWFjdCJ9