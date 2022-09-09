import { useState } from 'react';

const useSessionStorage = (key: string, defaultValue?: string) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = window.sessionStorage.getItem(key);
			if (value) {
				return JSON.parse(value);
			}
			window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
			return defaultValue;
		} catch (error) {
			return defaultValue;
		}
	});
	const setValue = (newValue: string) => {
		try {
			window.sessionStorage.setItem(key, JSON.stringify(newValue));
			setStoredValue(newValue);
		} catch (error) {
			console.error(error);
		}
	};
	return [storedValue, setValue] as const;
};

export default useSessionStorage;
