
export interface IOMethods {
	text: (output: string) => Promise<void>;
	input: () => Promise<string>;
	image: (url: string, name: string) => Promise<void>;
	name: () => string;
}

export class Conversation {
	nodes: ConversationNode[] = [];

	add(nodeOrNodes: ConversationNode | ConversationNode[]): number {
		if (nodeOrNodes instanceof ConversationNode) {
			return this.nodes.push(nodeOrNodes);
		}
		let last: number;
		for (let node of nodeOrNodes) {
			last = this.add(node)
		}
		return last;
	}

	async execute(): Promise<void>{
		await Promise.all(this.nodes.map(node => node.execute(this)));
	}
}

export interface ConversationOption{
	key: string;
	text: string;
	action: (convo: Conversation) => Promise<void>;
}

export class ConversationNode{
	io: IOMethods;
	dialogue: string;
	constructor(io: IOMethods, dialogue: string){
		this.io = io;
		this.dialogue = dialogue;
	}
	static build(io: IOMethods, dialogue: string){
		return new this(io, dialogue);
	}
	async execute(conversation: Conversation): Promise<void>{
		await this.io.text(this.dialogue);
	}
}

export class ConversationOptionNode extends ConversationNode{

	options: ConversationOption[];
	newline: string = "\n";
	preamble: string = "Do you want to...";
	invalid: string = "invalid choice";

	constructor(io: IOMethods, dialogue: string, options: ConversationOption[]){
		super(io,dialogue);
		this.options = options;
	}
	
	async execute(conversation: Conversation): Promise<void>{
		super.execute(conversation);
		await this.io.text(this.options.reduce((carry,option) => {
			carry = `${carry}${this.newline}${option.key}: `;
			return carry;
		}, this.preamble));
		let choice = await this.io.input();
		let option = this.options.find( option => option.key === choice );
		if(option === undefined){
			await this.io.text(this.invalid);
			return await this.execute(conversation);
		}
		return option.action(conversation);
	}
}

export class ConversationInputNode extends ConversationNode {
	action: (string) => Promise<void>;
	validation: (string) => boolean;
	invalidResponse: string = "Invalid Input";

	constructor(io: IOMethods, dialogue: string, action: (string) => Promise<void>, validation?: (string) => boolean){
		super(io, dialogue);
		this.action = action;
		this.validation = validation != undefined 
			? validation 
			: (_:string) => true;
	}

	async execute(conversation: Conversation){
		await super.execute(conversation);
		const choice = await this.io.input();
		if(!this.validation(choice)){
			await this.io.text(this.invalidResponse);
			return await this.execute(conversation);
		}
		return await this.action(choice);
	}
}

export class ConversationFactory {
	io: IOMethods;
	constructor(io: IOMethods){
		this.io = io;
	}
	buildSimpleDialogue(dialogues: string[]): Conversation{
		const convo = new Conversation()
		dialogues.map(dialogue => convo.add(new ConversationNode(this.io, dialogue)))
		return convo;
	}
}
