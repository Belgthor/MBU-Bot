const Discord = require('discord.js')
const client = new Discord.Client()
const botChannel = client.channels.get('451983884377260033')
const prefix = '!'
client.on('ready', function () {
	botChannel.send('I am online')
	resetAtMidnight()
});
function deleteMessages(){
	botChannel.fetchMessages()
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
client.login(process.env.BOT_TOKEN);
