const express = require('express');

const Projects = require('../data/helpers/projectModel');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
  const data = { ...req.body, completed: false };

  Projects.insert(data)
    .then(project => {
      console.log(`Successfully created ${project}`);
      Projects.get()
        .then(projects => {
          res.status(201).json(projects);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The project data could not be retrieved" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The project could not be created" });
    });
});

router.post('/:id/actions', validateProjectId, validateAction, validateLength, (req, res) => {
  const data = { ...req.body, project_id: req.params.id, completed: false };

  Actions.insert(data)
    .then(action => {
      console.log(` Successfully created ${action}`);
      Projects.getProjectActions(req.params.id)
        .then(actions => {
          res.status(201).json(actions);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The action data could not be retrieved" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The action could not be created" });
    });
});

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The project data could not be retrieved" });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The project data could not be retrieved" });
    });
});

router.get('/:id/actions', validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The action data could not be retrieved" });
    });
});

router.delete('/:id', validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      console.log(`Successfully deleted ${project}`);
      Projects.get()
        .then(projects => {
          res.status(200).json(projects);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The project data could not be retrieved" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The project could not be deleted" })
    })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      console.log(`Successfully updated ${project}`);
      Projects.get()
        .then(projects => {
          res.status(200).json(projects);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The project data could not be retrieved" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The project could not be updated" })
    })
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