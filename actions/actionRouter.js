const express = require('express');

const Actions = require('./../data/helpers/actionModel');

const router = express.Router();
router.use('/:id', idExists);

//RETURNS ALL ACTIONS FOR ALL PROJECT ✔
router.get('/', (req, res) => {
	console.log('yo');
	Actions.get()
		.then(action => {
			res.status(200).json(action);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error getting actions'
			});
		});
});

//ID OF ACTION ✔
router.get('/:id', (req, res) => {
	const { id } = req.params;
	Actions.get(id)
		.then(action => {
			console.log('action', action);
			res.status(200).json(action);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error getting this action'
			});
		});
});

//POSTING AN ACTION ALREADY HAPPENING IN projectRouter.js

//DELETE ACTION
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	console.log('here');
	Actions.remove(id)
		.then(deleted => {
			res.status(200).json(deleted);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error deleting the action'
			});
		});
});

//UPDATE ACTION
router.put('/:id', bodyExists, (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	Actions.update(id, changes)
		.then(updated => {
			res.status(200).json(updated);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error updating this action'
			});
		});
});

//MIDDLEWARE
function idExists(req, res, next) {
	const id = req.params.id;
	console.log('idd', id);

	Actions.get(id).then(action => {
		console.log('action');
		if (action) {
			console.log(req.body);
			next();
		} else {
			res.status(400).json({ message: 'invalid action id' });
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
