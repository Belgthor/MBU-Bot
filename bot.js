const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'
client.on('ready', () => {
	console.log('I am ready!');
});
client.on('message', message => {
	if (message.author.bot) { return; }
	if (!message.content.startsWith(prefix)) { return; }
	let msg = message.content.toUpperCase();
	let sender = message.author;
	let args = message.content.slice(prefix.length).split(/ +/g);
	let command = args.shift();
	if (msg.startsWith(prefix + 'PURGE')) {
		async function purge(){
			message.delete();
			if (!message.member.roles.find('name', 'Server Admin')) {
				message.channel.send('You need the \'Server Admin\' role').then(msg => msg.delete(5000))
				return;
			}
			message.channel.fetchMessages()
				.then(msg => msg.forEach((x) => {if(!x.pinned){x.delete()}}))
				//.then(msg => message.channel.send(`Deleted ${msg.size} messages`)
				//.then(msg => msg.delete(5000))
				.catch(error => message.channel.send(`Error: ${error}`))
				
			//if (isNaN(args[0])) {
				//message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
				//return;
			//}
			//message.channel.bulkDelete(100)
				//.then(msg => message.channel.send('Success deleted ' + msg.size + ' messages'))
				//.catch(error => message.channel.send('Error: ${error}'))
				//.then(msg => msg.delete(5000))
		}
		purge();
	} else if (msg.startsWith(prefix + 'PING')) {
		message.delete();
		message.channel.send('pong')
			.then(msg => msg.delete(5000))
	} else {
		message.channel.send('that I do not know');
	}
});
client.login(process.env.BOT_TOKEN);
