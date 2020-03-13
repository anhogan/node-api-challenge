const express = require('express');

const Projects = require('../data/helpers/projectModel');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {

});

router.post('/:id/actions', validateProjectId, validateAction, validateLength, (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', validateProjectId, (req, res) => {

});

router.get('/:id/actions', validateProjectId, (req, res) => {

});

router.delete('/:id', validateProjectId, (req, res) => {

});

router.put('/:id', validateProjectId, validateProject, (req, res) => {

});

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if (!project) {
        res.status(400).json({ message: "Invalid project ID" });
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The post information could not be retrieved" });
    });

  next();
};

function validateProject(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Projects require a name and description to be created" });
  };

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

function validateLength(req, res, next) {
  if (req.body.description) {
    const arr = Array.from(req.body.description)
    if (arr.length > 128) {
      res.status(400).json({ message: "Description must be less than 128 characters" });
    };
  };

  next();
}

module.exports = router;