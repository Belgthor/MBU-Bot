const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = '!'
client.on('ready', function () {
	console.log('I am ready!')
	resetAtMidnight()
});
client.on('message', function(message){
	if (message.author.bot) { return }
	if (!message.content.startsWith(prefix)) { return }
	if (!message.member.roles.find(x => x.name === 'Server Admin')) {
		message.delete()
		message.channel.send('you need the \'Server Admin\' role')
			.then((msg) => {msg.delete(5000); return})
	}
	let msg = message.content.toUpperCase()
	let sender = message.author
	let args = message.content.slice(prefix.length).split(' ')
	let command = args.shift()
	if (msg.startsWith(prefix + 'PURGE')) {
		async function purge(){
			message.channel.fetchMessages()
				.then(msg => {msg.forEach((x) => {if(!x.pinned){x.delete()}})})
				.catch(error => console.log(error))
		}
		purge()
	} else if (msg.startsWith(prefix + 'PING')) {
		message.delete()
		message.channel.send('pong')
			.then(msg => msg.delete(5000))
	} else {
		message.delete()
		message.channel.send('command does not exist')
			.then(msg => msg.delete(5000))
	}
})
function test(){
	var channel = client.channels.get('453112305165795328')
	var channel2 = client.channels.get('341625208085413899')
	channel.send('message')
	channel2.send('message')
	console.log('message')
}
function resetAtMidnight(){
	var channel = client.channels.get('453112305165795328')
	var channel2 = client.channels.get('341625208085413899')
	var now = new Date()
	//now.setHours(now.getHours() - 6)
	console.log(now)
	var night = new Date(now.getFullYear(),now.getMonth(),now.getDate() + 1,0,0,0)
	//night.setHours(night.getHours() - 6)
	console.log(night.getDate() + ' - ' + now.getDate())
	//if(night.getDate() <= now.getDate()) {night.setDate(night.getDate() + 1)}
	console.log(night)
	var msToMidnight = night.getTime() - now.getTime()
	msToMidnight = msToMidnight + (6000 * 60 * 60)
	var hours = (msToMidnight / (1000 * 60 * 60)).toFixed(1)
	console.log(hours + 'hrs till midnight')
	channel.send(hours + 'hrs till midnight')
	channel2.send(hours + 'hrs till midnight')
	setTimeout(function(){
		test()
		resetAtMidnight()
	}, msToMidnight)
}
client.login(process.env.BOT_TOKEN);
