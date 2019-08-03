var discord = require('discord.js');
var dotenv = require('dotenv');
var Scripts_1 = require("./src/Scripts");
dotenv.config();
var client = new discord.Client();
client.once("message", function (message) {
    var io = {
        text: async, dialogue: function () {
            message.channel.send(dialogue);
        },
        input: async() };
    await;
    new Promise(function (resolve) {
        var listener = function (newMessage) {
            if (newMessage.channel.id !== message.channel.id)
                return;
            client.off("message", listener);
            resolve(newMessage.content);
        };
        client.on("message", listener);
    }),
        image;
    async();
    void (0);
});
Scripts_1.Introduction(io).then(function (name) {
    console.log(name);
    io.text("Hello, " + name);
    process.exit(0);
});
;
client.on("ready", function () {
    console.log("ready");
});
client.login(process.env.token);
