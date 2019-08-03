import { IOMethods } from "./src/Conversation";
import * as discord from 'discord.js';
import * as dotenv from 'dotenv';
import { Game } from "./src/Scripts";
dotenv.config();

const client = new discord.Client();
client.once("message", message => {
	const io: IOMethods = {
		text: async dialogue => {
			message.channel.startTyping();
			const base = 500;
			const interval = base + Math.round(base * Math.random());
			await new Promise(resolve => setTimeout(resolve,interval));
			message.channel.stopTyping()
			await message.channel.send(dialogue);
		},

		input: async () => await new Promise(resolve => {
			const listener = newMessage => {
				if(newMessage.channel.id !== message.channel.id) return;
				client.off("message",listener);
				resolve(newMessage.content);
			};
			client.on("message",listener);
		}),

		image: async () => void(0),
		name: () => message.member.user.username
	};

	const game = new Game(io);
	game.Introduction();
});

client.login(process.env.token);
