const Discord = require('discord.js')
const client = new Discord.Client()
const moment = require('moment')
const tz = require('moment-timezone')
const prefix = '!'
var botChannel
var questChannel
var nfChannel
client.on('ready', function () {
	botChannel = client.channels.get('451983884377260033')
	questChannel = client.channels.get('508830653991878666')
	nfChannel = client.channels.get('341625208085413899')
	botChannel.send('I am ready!')
	resetAtMidnight()
});
client.on('message', function(message){
	if (message.author.bot) { return }
	if (!message.content.startsWith(prefix)) { return }
	if (!message.member.roles.find(x => x.name === 'Server Admin')) {
		message.delete()
		message.channel.send('you need the \'Server Admin\' role')
			.then((msg) => {msg.delete(5000); return})
			.catch(error => botChannel.send(error))
	}
	let msg = message.content.toUpperCase()
	let sender = message.author
	let args = message.content.slice(prefix.length).split(' ')
	let command = args.shift()
	if (msg.startsWith(prefix + 'PURGE')) {
		async function purge(){
			message.channel.fetchMessages()
				.then(msg => {msg.forEach((x) => {if(!x.pinned){x.delete()}})})
				.catch(error => botChannel.send(error))
		}
		purge()
	} else if (msg.startsWith(prefix + 'PING')) {
			message.delete()
			message.channel.send('pong')
				.then(msg => msg.delete(5000))
				.catch(error => botChannel.send(error))
	} else {
		message.delete()
		message.channel.send('command does not exist')
			.then(msg => msg.delete(5000))
			.catch(error => botChannel.send(error))
	}
})
function deleteMessages(){
	questChannel.fetchMessages()
	.then(msg => {msg.forEach((x) => {if(!x.pinned){x.delete()}})})
	.catch(error => botChannel.send(error))
}
function resetAtMidnight(){
	var now = moment().tz('America/Winnipeg')
	var next = moment().tz('America/Winnipeg').add(1, 'd').set('hour',0).set('minute',0).set('second',0).set('millisecond',0)
	var msToMidnight = next.diff(now)
	var hours = (msToMidnight / (1000 * 60 * 60)).toFixed(1)
	botChannel.send(hours + 'hrs till midnight')
	setTimeout(function(){
		deleteMessages()
		resetAtMidnight()
	}, msToMidnight)
}
client.login(process.env.BOT_TOKEN)
