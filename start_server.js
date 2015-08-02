
(function(port = 3031, id){
  module.exports = function(app) {
    app.listen(port);
    console.log(`
      server pid ${id}
      listening on port ${port}
      in ${app.get('env')} mode
    `);
  };
})(process.env.PORT, process.pid);
