const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.A);
console.log(process.env.B);
client.login(token);

client.on('message', message => {
	if (message.content === `${prefix}ping`) {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}
    else if (message.content.startsWith(`${prefix}Beep`)) {
        message.channel.send('Boop');
    }
    else if (message.content.startsWith(`${prefix}random manga`)) {
        const number = Math.floor(Math.random() * 136861);
        message.channel.send(`https://anilist.co/manga/${number}`);
    }
    else if (message.content.startsWith(`${prefix}random anime`)) {
        const number = Math.floor(Math.random() * 136862);
        message.channel.send(`https://anilist.co/anime/${number}`);
    }

});
