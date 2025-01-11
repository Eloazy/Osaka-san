const { EmbedBuilder } = require('discord.js')
const requestData = require('../tornApi/createKey.js')
var reroll = 1
var data = 0
var message = 0

module.exports = async function(interaction) {
	data = await requestData(1, 1, 50169, "chainWatcher", null)
	createEmbed(interaction).then((response) => {
		var interval = setInterval(async function() {
			if(await chainCheck() == 'died') {
				interaction.followUp('Chain DIED')
				clearInterval(interval).then((response) => {console.log("chainWatcher stopped")})
			}
			else {
				updateEmbed(interaction)
			}
		}, 5000)
	})
}

function chainCheck() {
	if(data.chain.cooldown == 0 && data.chain.current == 0) {
		return 'died'
	}
	else if(data.chain.cooldown == 0 && data.chain.current > 0){
		if(data.chain.timeout <= 20) {interaction.followUp('<@&1321151394337787905> Chain Will DIE!!')}
	}
	else {
		//exception
	}

}

async function createEmbed(interaction) {
	const chain = new EmbedBuilder()
		.setColor("#e81416")
		.setTitle('Embers Chain!!')
		.setDescription('the chain is the heart, the soul of the faction\nOffer your energy and help keep the chain alive')
		.addFields(
			{ name: 'Attacks:', value: `${data.chain.current}/${data.chain.max}`, inline: true },
			{ name: 'Time Left:', value: `${data.chain.timeout} seconds left`, inline: true },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Started:', value: `<t:${data.chain.start}:R>`, inline: true },
			{ name: 'Modifier:', value: `${data.chain.modifier}`, inline: true },
		)
		.setFooter({ text: '5 seconds Update'})
		.setTimestamp()
	interaction.reply({ embeds: [chain] });
	message = await interaction.fetchReply()
}

async function updateEmbed(interaction, message) {
	data = await requestData(1, 1, 50169, "chainWatcher", null)

	const colors = ["#e81416", "#ffa500", "#faeb36", "#79c314" , "#487de7", "#4b369d", "#70369d"]
	
	const chain = new EmbedBuilder()
		.setColor(colors[reroll])
		.setTitle('Embers Chain!!')
		.setDescription('the chain is the heart, the soul of the faction\nOffer your energy and help keep the chain alive')
		.addFields(
			{ name: 'Attacks:', value: `${data.chain.current}/${data.chain.max}`, inline: true },
			{ name: 'Time Left:', value: `${data.chain.timeout} seconds left`, inline: true },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Started:', value: `<t:${data.chain.start}:R>`, inline: true },
			{ name: 'Modifier:', value: `${data.chain.modifier}`, inline: true },
		)
		.setFooter({ text: '5 seconds Update'})
		.setTimestamp()
	reroll++
	if(reroll > 6) {reroll=0}
	interaction.editReply({ embeds: [chain] });
}