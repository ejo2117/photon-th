import React, { useState, useEffect } from 'react';
import Title from './components/Title';

const App = () => {
	const [patients, setPatients] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:8080/api/patients');
			const data = await response.json();
			setPatients(data);
		};
		fetchData();
	}, []);

	return (
		<>
			<Title />
			{patients && <h1>{patients[0].firstName}</h1>}
		</>
	);
};

export default App;
