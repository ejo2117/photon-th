/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const app = express();
app.use(express.json());
const port = 3000;

const seedDB = desiredPatients => {
	const db = {
		patients: {},
		prescriptions: {},
	};
	for (let i = 0; i < desiredPatients; i++) {
		const pid = uuidv4();
		db.patients[pid] = {
			id: pid,
			avatar: faker.image.avatar(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			prescriptions: [],
		};
	}
	return db;
};

const database = seedDB(15);
app.get('/', (req, res) => {
	res.json({
		message: 'hello world!',
	});
});

app.get('/patients', (req, res) => {
	res.json(Object.values(database.patients));
});

app.get('/patients/:id', (req, res) => {
	const value = database.patients[req.params.id];
	if (value) {
		res.json(value);
	}
	res.sendStatus(404);
});

app.get('/patients/:id/prescriptions', (req, res) => {
	const values = [];
	const prescriptions = Object.entries(database.prescriptions);

	for (let i = 0; i < prescriptions.length; i++) {
		const rx = prescriptions[i][1];
		if (rx.patientId === req.params.id) values.push(rx);
	}

	if (values) {
		res.json(values);
		return;
	}
	res.sendStatus(404);
});

app.post('/patients', (req, res) => {
	const { firstName, lastName } = req.body || {};
	if (!firstName || !lastName) {
		res.status(400).send('Error: Missing required fields');
		return;
	}
	const id = uuidv4();
	database.patients[id] = {
		id,
		firstName,
		lastName,
		prescriptions: [],
		avatar: faker.image.avatar(),
	};
	res.json(database.patients[id]);
});

app.get('/prescriptions', (req, res) => {
	res.json(Object.values(database.prescriptions));
});

app.post('/prescriptions', (req, res) => {
	const { patientId } = req.body || {};
	if (!patientId || !database.patients[patientId]) {
		res.status(400).send('Error: Provided field is invalid or has no match');
		return;
	}
	const id = uuidv4();
	database.prescriptions[id] = {
		id,
		patientId,
		status: 'Pending',
	};
	database.patients[patientId].prescriptions.push(id);
	res.json(database.prescriptions[id]);
});

app.post('/update-status', (req, res) => {
	const { id, status } = req.body || {};
	if (!id || !status || !database.prescriptions[id]) {
		res.status(400).send('Error: Provided fields are invalid or have no match');
		return;
	}
	database.prescriptions[id].status = status;
	res.json(database.prescriptions[id]);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
