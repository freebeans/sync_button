var express = require('express');
var router = express.Router();
var EventEmitter = require('events');

var state = true;

var stateEmitter = new EventEmitter();

/* GET users listing. */
router.post('/state', function(req, res, next) {
  state = !state;
  stateEmitter.emit('stateChanged');
  res.end();
});

router.get('/statefast', function(req, res, next) {
  res.send({
    state: state
  });
});

router.get('/state', function(req, res, next) {

  var called = false;

  // Função que termina a requisição
  var returnState = function() {


    if (!called) {
      called = true;

      stateEmitter.removeListener('stateChanged', returnState);

      res.send({
        state: state
      });
    }
  }

  // Aguarda mudança de estado...
  stateEmitter.once('stateChanged', returnState);

  // ou estouro do callback.
  setTimeout(returnState, 60000);

});

module.exports = router;
