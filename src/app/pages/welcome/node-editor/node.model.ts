export class Node {
	constructor (
		public id: string,
		public name: string,
		public description: string,
		public takesInput: boolean,
		public hasOutput: boolean) {
	}
}
