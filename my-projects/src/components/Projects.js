import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Actions from './Actions.js';

const Projects = props => {
	const [action, setAction] = useState({});
	console.log('this', props.project);

	if (!props.project) {
		return <h1>Searching for projects</h1>;
	} else {
		return (
			<div>
				{/* {props.project.map(pro => (
					<>
						<h1>pro.name</h1>
						<p>pro.description</p>
						<button>Edit</button>
						<button>X</button>
						<Actions action={action} />
					</>
				))} */}
			</div>
		);
	}
};

export default Projects;
