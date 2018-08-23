
const routes = require('next-routes')();

routes
  .add('/participants/new', '/participants/new')
  .add('/participants/:address', '/participants/show')
  .add('/participants/:address/expenses', '/participants/expenses/index')
  .add('/participants/:address/expenses/new', '/participants/expenses/new');

module.exports = routes;
