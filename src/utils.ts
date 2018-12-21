export function findIndex<T>(array: T[], callback: (point: T) => boolean) {
	for (let index = 0; index < array.length; index++) {
		if (callback(array[index])) {
			return index;
		}
	}
	return -1;
}

export function inRange(input: number, min: number, max: number) {
	return input >= min && input <= max;
}
