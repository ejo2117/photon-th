import React, { useState, useEffect } from 'react';
import { getPrescriptions } from '@services/database';
import { Prescription } from 'types';
import { CircularProgress, VStack } from '@chakra-ui/react';

const PharmacistView = () => {
	const [prescriptions, setPrescriptions] = useState<Prescription[]>(null);

	useEffect(() => {
		const fetchData = async () => {
			const rxData = await getPrescriptions();
			setPrescriptions(rxData);
		};

		fetchData();
		return () => {
			setPrescriptions(null);
		};
	}, []);

	return (
		<VStack w='100%'>
			{prescriptions ? <div>{JSON.stringify(prescriptions)}</div> : <CircularProgress isIndeterminate />}
		</VStack>
	);
};

export default PharmacistView;
