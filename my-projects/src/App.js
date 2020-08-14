import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [project, setProject] = useState();
	useEffect(() => {
		axios
			.get('http://localhost:8000/api/projects')
			.then(res => {
				console.log(res.data);
				setProject(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	console.log(project);
	if (!project) {
		return <h1>Searching for projects</h1>;
	} else {
		return (
			<div className='App'>
				<h1>My Projects</h1>
				{project.map(pro => (
					<>
						<h1>{pro.name}</h1>
						<p>{pro.description}</p>
						<button>Edit</button>
						<button>X</button>
					</>
				))}
			</div>
		);
	}
}

export default App;
