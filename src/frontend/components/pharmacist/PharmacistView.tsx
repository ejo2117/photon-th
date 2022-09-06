import React, { useState, useEffect } from 'react';
import { getPrescriptions } from '@services/database';
import type { Prescription } from 'types';
import { CircularProgress, VStack } from '@chakra-ui/react';
import PrescriptionsList from './PrescriptionsList';

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
			{prescriptions ? (
				<PrescriptionsList prescriptions={prescriptions} setPrescriptions={setPrescriptions} />
			) : (
				<CircularProgress isIndeterminate />
			)}
		</VStack>
	);
};

export default PharmacistView;
