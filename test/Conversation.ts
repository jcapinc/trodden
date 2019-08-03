import {describe, it} from 'mocha';
import {assert} from 'chai';
import * as sinon from 'sinon';
import { ConversationFactory, IOMethods, ConversationOptionNode, Conversation, ConversationInputNode } from '../src/Conversation';

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

describe("the conversation execution system", () => {
	it("can build a simple dialogue chain quickly", async () => {
		const [io, spy] = makeIO();
		const factory = new ConversationFactory(io);
		const dialogueStrings = [];
		for(let i = 97; i <= 97 + 26; i++) dialogueStrings.push(String.fromCharCode(i));
		const conversation = factory.buildSimpleDialogue(dialogueStrings);
		await conversation.execute();
		dialogueStrings.map(dialogue => assert(spy.calledWith(dialogue)));
	});

	it("executes a conversation option", async () => {
		const [io] = makeIO();
		const actionSpy = sinon.stub().returns(new Promise(resolve => resolve(void(0))));
		const inactionSpy = sinon.stub().returns(new Promise(resolve => resolve(void(0))));
		const option = new ConversationOptionNode(io,"test conversation",[{
			key:"blarg",
			text:"b",
			action: inactionSpy
		},{
			key: userInput,
			text: "a",
			action: actionSpy
		}]);
		const conversation = new Conversation();
		conversation.add(option);
		await conversation.execute();
		assert(actionSpy.called);
		assert(!inactionSpy.called)
	});

	it("accepts an arbitrary input", async () => {
		const inputSpy = sinon.stub().returns(new Promise(resolve => resolve(void(0))));
		const [io] = makeIO();
		const conversation = new Conversation();
		conversation.add(new ConversationInputNode(io,"a",inputSpy));
		await conversation.execute();
		assert(inputSpy.called);
		assert(inputSpy.calledWith(userInput));
	});
});