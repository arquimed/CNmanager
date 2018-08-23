'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/democritus/Documents/Projects/ScipioPlatform/scipio-react/components/Header.js';

//this module allows us to use links to redirect users

exports.default = function () {
    return _react2.default.createElement(_semanticUiReact.Menu, { style: { marginTop: '10px' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 7
        }
    }, _react2.default.createElement(_routes.Link, { route: '/', __source: {
            fileName: _jsxFileName,
            lineNumber: 8
        }
    }, _react2.default.createElement('a', { className: 'item', __source: {
            fileName: _jsxFileName,
            lineNumber: 9
        }
    }, 'Scipio')), _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', __source: {
            fileName: _jsxFileName,
            lineNumber: 13
        }
    }, _react2.default.createElement(_routes.Link, { route: '/', __source: {
            fileName: _jsxFileName,
            lineNumber: 14
        }
    }, _react2.default.createElement('a', { className: 'item', __source: {
            fileName: _jsxFileName,
            lineNumber: 15
        }
    }, 'Participants')), _react2.default.createElement(_routes.Link, { route: '/participants/new', __source: {
            fileName: _jsxFileName,
            lineNumber: 20
        }
    }, _react2.default.createElement('a', { className: 'item', __source: {
            fileName: _jsxFileName,
            lineNumber: 21
        }
    }, '+'))));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSGVhZGVyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiTWVudSIsIkxpbmsiLCJtYXJnaW5Ub3AiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFTOztBQUNULEEsQUFBQSxBQUFTLEFBQVk7Ozs7OztBQUFhLEFBRWxDOztrQkFBZSxZQUFNLEFBQ2pCOzJCQUNJLEFBQUMsdUNBQUssT0FBTyxFQUFFLFdBQWYsQUFBYSxBQUFZO3NCQUF6Qjt3QkFBQSxBQUNHO0FBREg7S0FBQSxrQkFDRyxBQUFDLDhCQUFLLE9BQU4sQUFBWTtzQkFBWjt3QkFBQSxBQUNLO0FBREw7dUJBQ0ssY0FBQSxPQUFHLFdBQUgsQUFBYTtzQkFBYjt3QkFBQTtBQUFBO09BRlIsQUFDRyxBQUNLLEFBSUosNEJBQUMsY0FBRCxzQkFBQSxBQUFNLFFBQUssVUFBWCxBQUFvQjtzQkFBcEI7d0JBQUEsQUFDSTtBQURKO3VCQUNJLEFBQUMsOEJBQUssT0FBTixBQUFZO3NCQUFaO3dCQUFBLEFBQ0k7QUFESjt1QkFDSSxjQUFBLE9BQUcsV0FBSCxBQUFhO3NCQUFiO3dCQUFBO0FBQUE7T0FGUixBQUNJLEFBQ0ksQUFLSixrQ0FBQSxBQUFDLDhCQUFLLE9BQU4sQUFBWTtzQkFBWjt3QkFBQSxBQUNJO0FBREo7dUJBQ0ksY0FBQSxPQUFHLFdBQUgsQUFBYTtzQkFBYjt3QkFBQTtBQUFBO09BZmhCLEFBQ0ksQUFNSSxBQU9JLEFBQ0ksQUFRbkI7QUF4QkQiLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2RlbW9jcml0dXMvRG9jdW1lbnRzL1Byb2plY3RzL1NjaXBpb1BsYXRmb3JtL3NjaXBpby1yZWFjdCJ9