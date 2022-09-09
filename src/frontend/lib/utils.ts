const typedKeys = <T extends Record<string, unknown>>(object: T): (keyof T)[] => {
	return Object.keys(object).filter(s => !(parseInt(s, 10) >= 0)) as (keyof T)[];
};

const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export { typedKeys, capitalizeFirstLetter };
