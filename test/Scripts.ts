import { describe, it } from 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { IOMethods } from '../src/Conversation';
import { Introduction } from '../src/Scripts';

const userInput = "generic user input a"
function makeIO(): [IOMethods,sinon.SinonSpy<any,any>]{
	const fake = sinon.fake();
	return [{
		text: async (output: string) => {
			fake(output);
		},
		image: async (_: string) => void(0),
		input: async () => {
			fake("input requested")
			return userInput;
		}
	},fake];
}	

describe("the scripts", () => {
	it("introduce", async () => {
		const [io,spy] = makeIO();
		const name = await Introduction(io);
		expect(name).to.equal(userInput);
		assert(spy.called);
	});
});