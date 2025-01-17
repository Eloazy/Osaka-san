const { EmbedBuilder } = require('discord.js')
const API = require("../tornApi/createKey.js")
const UpdateTime = 5
var reroll = 0
var message = 0
module.exports = async function(interaction, id) {
	console.log('allt')
	createEmbed(interaction, id).then((response) => {
		var interval = setInterval(async function() {
			updateEmbed(interaction, id)
		}, UpdateTime*1000)
	})
}

//				clearInterval(interval)

async function updateEmbed(interaction, id) {
	var embed = await formEmbed(id)
	interaction.channel.messages.fetch(message).then(msg => msg.edit({ embeds: [embed] }))
}

async function createEmbed(interaction, id) {
	var embed = await formEmbed(id)
	interaction.reply({ embeds: [embed] });
	message = await interaction.fetchReply()		
}

async function formEmbed(id) {
	const text = await getMembers(id)
	const colors = ["#e81416", "#ffa500", "#faeb36", "#79c314" , "#487de7", "#4b369d", "#70369d"]
	const info = new EmbedBuilder()
		.setColor(colors[reroll])
		.setTitle('Pomnie Watching: ', id)
		.setDescription(`${text}`)
		.setFooter({ text: `${UpdateTime} seconds update cycle`})
		.setTimestamp()
		reroll++
		if(reroll > 6) {reroll=0}
	return info
}
async function getMembers(id) {
	const data = await API(1, 2, 53051, "enemyWatcher", null)
	var text = null
	text = 'Members:\n'
	for(var i = 0 ; i < data.members.length ; i++) {
		var emojiList = [':ok:', ':hospital:', ':police_car:', ':airplane_small:', ':no_entry:', ':four_leaf_clover:', ':question:']
		var statusList = [':green_circle:', ':yellow_circle:', ':red_circle:']
		var emoji = null
		var status = null
		if(data.members[i].status.state == "Okay") {emoji = emojiList[0]}
		else if(data.members[i].status.state == "Hospital") {emoji = `${emojiList[1]} ${data.members[i].status.details} <t:${data.members[i].status.until}:R>`}
		else if(data.members[i].status.state == "Jail") {emoji = `${emojiList[2]} ${data.members[i].status.details} <t:${data.members[i].status.until}:R>`}
		else if(data.members[i].status.state == "Abroad" || data.members[i].status.state == "Traveling") {emoji = `${emojiList[3]} ${data.members[i].status.details} <t:${data.members[i].status.until}:R>`}
		else if(data.members[i].status.state == "Federal") {emoji = `${emojiList[4]} ${data.members[i].status.details}`}
		else if(data.members[i].status.state == "Fallen") {emoji = `${emojiList[5]}`}
		else {emoji = emojiList[6]}

		if(data.members[i].last_action.status == "Online") {status = statusList[0]}
		else if(data.members[i].last_action.status == "Idle") {status = statusList[1] + 'LA: '+data.members[i].last_action.relative}
		else {status = statusList[2] + 'LA: '+data.members[i].last_action.relative}

		text += `${status} | ${data.members[i].name} | ${emoji}\n`
		emoji = null ; status = null ;
	}
	return text
}