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

router.put('/:id', validateActionId, (req, res) => {
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