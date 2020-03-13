const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', validateActionId, (req, res) => {

});

router.delete('/:id', validateActionId, (req, res) => {

});

router.put('/:id', validateActionId, (req, res) => {

});

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(400).json({ message: "Invalid project ID" });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The post information could not be retrieved" });
    });

  next();
};

module.exports = router;