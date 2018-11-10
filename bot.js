const Discord = require('discord.js');
const embed = new Discord.RichEmbed()
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
				message.channel.send('You need the \'Server Admin\' role').then(msg => msg.delete(10000))
				return;
			}
			message.channel.fetchMessages({limit: 1})
				.then(msg => msg.delete())
				.catch(error => message.channel.send('Error: ' + error))
			//if (isNaN(args[0])) {
				//message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
				//return;
			//}
			//message.channel.bulkDelete(100)
				//.then(msg => message.channel.send('Success deleted ' + msg.size + ' messages'))
				//.catch(error => message.channel.send('Error: ${error}'))
				//.then(msg => msg.delete(10000))
		}
		purge();
	} else if (msg.startsWith(prefix + 'PING')) {
			embed.setTitle('Title')
			embed.setColor(0xFF0000)
			embed.setDescription('Description')
			embed.setURL('URL')
			embed.setAuthor('Author')
		message.channel.send(embed);
	} else {
		message.channel.send('that I do not know');
	}
});
client.login(process.env.BOT_TOKEN);
