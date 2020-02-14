const express = require('express');

//db
const Projects = require('./../data/helpers/projectModel');
const Actions = require('./../data/helpers/actionModel');

const router = express.Router();
router.use('/:id', idExists);

//gets all projects ✔
router.get('/', (req, res) => {
	console.log(req.body);
	Projects.get()
		.then(project => {
			console.log(project);
			res.status(200).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error getting projects'
			});
		});
});

//GETS THE Project
//Getting project object ✔
//Gets invalid user id through middleware ✔
router.get('/:id', (req, res) => {
	const id = req.params.id;

	Projects.get(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error getting the user'
			});
		});
});

//GETTING Actions FROM A Project ✔
router.get('/:id/actions', (req, res) => {
	const { id } = req.params;
	Projects.getProjectActions(id)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error getting actions from this project'
			});
		});
});

//CREATE PROJECT
//posting with name works - creates user ✔
router.post('/', bodyExists, (req, res) => {
	console.log(req.body);
	console.log('projectrouter');
	Projects.insert(req.body)
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error creating project'
			});
		});
});

//CREATE ACTIONS
//creates action for a project ✔
router.post('/:id/actions', bodyExists, (req, res) => {
	const project_id = req.params.id;
	const body = { ...req.body, project_id: project_id };
	console.log('project_id', project_id);
	console.log('body', body);
	Actions.insert(body)
		.then(user => {
			console.log('inside then');
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error creating action'
			});
		});
});

//Delete Project
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Projects.remove(id)
		.then(removed => {
			console.log('removed', removed);
			res.status(200).json(removed);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error deleting project'
			});
		});
});

//UPDATES PROJECTS ✔
router.put('/:id', bodyExists, (req, res) => {
	const { id } = req.params;

	const changes = req.body;
	console.log('changes', changes);

	Projects.update(id, changes)
		.then(updated => {
			console.log('updated', updated);
			res.status(200).json(updated);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error updating the project'
			});
		});
});

//MIDDLEWARE
function idExists(req, res, next) {
	const id = req.params.id;
	console.log('idd', id);

	Projects.get(id).then(project => {
		console.log('project');
		if (project) {
			console.log(req.body);
			console.log('project', project);
			next();
		} else {
			res.status(400).json({ message: 'invalid project id' });
		}
	});
}

function bodyExists(req, res, next) {
	function isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	}

	const body = { ...req.body };
	console.log('body', req.body);

	if (isEmpty(req.body)) {
		res.status(400).json({ message: 'missing action data' });
	} else if (!req.body.description) {
		res.status(400).json({ message: 'missing required description field' });
	} else if (!req.body.notes) {
		res.status(400).json({ message: 'missing required notes field' });
	} else {
		next();
	}
}

module.exports = router;
