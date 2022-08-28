import React, { useState, useEffect } from 'react';
import Title from '@components/Title';
import { createPatient, getPatients } from '@services/database';

const App = () => {
	const [patients, setPatients] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const newPatient = await createPatient({
				firstName: 'John',
				lastName: 'Doe',
			});
			setPatients([newPatient]);
		};
		fetchData();
	}, []);

	return (
		<>
			<Title />
			{patients && <h1>{JSON.stringify(patients[0])}</h1>}
		</>
	);
};

export default App;
