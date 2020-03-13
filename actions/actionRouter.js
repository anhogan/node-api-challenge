const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The action data could not be retrieved" });
    });
});

router.get('/:id', validateActionId, (req, res) => {
  Actions.get(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The action data could not be retrieved" });
    });
});

router.delete('/:id', validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      console.log(`Successfully deleted ${action}`);
      Actions.get()
        .then(actions => {
          res.status(200).json(actions);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The action data could not be retrieved" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The action could not be deleted" })
    });
});

router.put('/:id', validateActionId, validateAction, validateLength, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      console.log(`Successfully updated ${action}`);
      Actions.get()
        .then(actions => {
          res.status(200).json(actions);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The action data could not be retrieved" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The action could not be updated" })
    });
});

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(400).json({ message: "Invalid action ID" });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The action information could not be retrieved" });
    });

  next();
};

function validateAction(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing action data" });
  } else if (!req.body.notes || !req.body.description) {
    res.status(400).json({ message: "Actions require a description and notes to be created" });
  };

  next();
};

// Still posts description - fix this
function validateLength(req, res, next) {
  if (req.body.description) {
    const arr = Array.from(req.body.description);
    console.log(arr);
    if (arr.length > 128) {
      res.status(400).json({ message: "Description must be less than 128 characters" });
    };
  };

  next();
};

module.exports = router;