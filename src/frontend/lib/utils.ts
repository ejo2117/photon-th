const typedKeys = <T extends Record<string, unknown>>(object: T): (keyof T)[] => {
	return Object.keys(object).filter(s => !(parseInt(s, 10) >= 0)) as (keyof T)[];
};

export default typedKeys;
