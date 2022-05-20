module.exports = app => {
  app.use('/auth', require('./auth'));
  app.use('/todos', require('./todos'));
  app.use('/habits', require('./habits'));
  app.use('/summary', require('./summary'))
}