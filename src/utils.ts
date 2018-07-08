export function findIndex<T>(array: T[], callback: (point: T) => boolean) {
	for (let index = 0; index < array.length; index++) {
		if (callback(array[index])) {
			return index;
		}
	}
	return -1;
}
