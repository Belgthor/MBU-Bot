const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'
client.on('ready', () => {
	console.log('I am ready!');
});
client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;
	let msg = message.content.toUpperCase();
	let sender = message.author;
	let cont = message.content.slice(prefix.length).split(' ');
	let args = cont.slice(1);
	if (msg.startsWith(prefix + 'PURGE')) {
		async function purge(){
			message.delete();
			if (!message.member.roles.find('name', 'Server Admin'))
				message.channel.send('You need the \'Server Admin\' role');
				return;
			if (isNaN(args[0])){
				message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
				return;
			}
			message.channel.send('pass')
			const fetched = await message.channel.fetchMessages({limit: args[0]})
			message.channel.bulkDelete(fetched)
				.catch(error => message.channel.send('Error: $(error)'))
		}
		purge();
	} else
	if (msg.startsWith(prefix + 'PING')) {
		message.channel.send('pong');
	}
});
client.login(process.env.BOT_TOKEN);
