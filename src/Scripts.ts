import {IOMethods, Conversation, ConversationInputNode, ConversationNode} from "./Conversation";
import { Message } from "discord.js";

export class Game{
	io: IOMethods;

	constructor(io: IOMethods){
		this.io = io;
	}

	async Introduction(): Promise<void> {
		const convo = new Conversation();
		const cn = (input: string) => new ConversationNode(this.io, input);
		convo.add([
			cn(`Welcome to the game, ${this.io.name()}. You got tired of making widgets at Faceless Co. ` +
				"For some reason you never got around to signing their restrictive Non-Compete agreement and you " +
				"always knew that you could make these widgets better than any faceless company could"),
			cn("You have a loan from the bank for 10k. Sounds like a lot of money but it goes fast. " +
				"You can make one widget a day by hand, but you know that wont scale, and you have to sell all the widgets that you make yourself." + 
				"Build an inventory, sell your product. Build a living for yourself.")
		]);
		await convo.execute();
	}

	async MainMenu(){

	}
}

