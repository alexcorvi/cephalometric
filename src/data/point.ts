import { observable, computed } from 'mobx';

export class Point {
	@observable id: string = '';
	@observable description: string = '';
	@observable top: number = 0;
	@observable left: number = 0;
	@computed
	get added() {
		return this.top !== 0 && this.left !== 0;
	}
	constructor(id: string, description: string) {
		this.id = id;
		this.description = description;
	}
}
