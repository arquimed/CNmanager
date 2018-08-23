'use strict';

var routes = require('next-routes')();

routes.add('/participants/new', '/participants/new').add('/participants/:address', '/participants/show').add('/participants/:address/expenses', '/participants/expenses/index').add('/participants/:address/expenses/new', '/participants/expenses/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFNLFNBQVMsQUFBZjs7QUFFQSxPQUNHLEFBREgsSUFDTyxBQURQLHFCQUM0QixBQUQ1QixxQkFFRyxBQUZILElBRU8sQUFGUCwwQkFFaUMsQUFGakMsc0JBR0csQUFISCxJQUdPLEFBSFAsbUNBRzBDLEFBSDFDLGdDQUlHLEFBSkgsSUFJTyxBQUpQLHVDQUk4QyxBQUo5Qzs7QUFNQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2RlbW9jcml0dXMvRG9jdW1lbnRzL1Byb2plY3RzL1NjaXBpb1BsYXRmb3JtL3NjaXBpby1yZWFjdCJ9