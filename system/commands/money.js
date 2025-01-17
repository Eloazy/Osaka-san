module.exports = async function(interaction) {
	if(interaction.options._subcommand == "withdraw") {requestMoney(interaction)}
  	else if(interaction.options._subcommand == "loan") {loanMoney(interaction)}
  	else {console.log('exception')}
}

function requestMoney(interaction) {
	const text = `${interaction.member.nickname}, is requesting the amount of: ${interaction.options.getNumber('amount').toLocaleString()} of the faction's treasure\n\nWARNING: This API does not verify money, see if he really has that amount!!\nreact with :white_check_mark: to claim`
	createEmbed(interaction, text, "<@&1329890465268498516>")
}

function loanMoney(interaction) {
	const text = `${interaction.member.nickname}, is requesting a loan of: ${interaction.options.getNumber('amount').toLocaleString()}\n\nWARNING: loans are decided ONLY by people who have the LoanManager role!!\nreact with :white_check_mark: to claim`
	createEmbed(interaction, text, "<@&1329905667171156119>")
}

async function createEmbed(interaction, text, ping) {
	const { EmbedBuilder } = require('discord.js');
	
	const exampleEmbed = new EmbedBuilder()
		.setColor(0xEFBF04)
		.setTitle(`${interaction.options._subcommand} -> ${interaction.options.getNumber('amount').toLocaleString()}`)
		.setAuthor({ name: interaction.member.nickname })
		.setDescription(text)
		.setThumbnail(interaction.user.displayAvatarURL())
		.setTimestamp()
		.setFooter({ text: 'Osaka-san : v-2.0 : bank-system'});
	await interaction.guild.channels.cache.get("1329890269537112156").send(`${ping} ╗`);
	await interaction.guild.channels.cache.get("1329890269537112156").send({ embeds: [exampleEmbed] });
	interaction.reply({ content: 'requested', ephemeral: true })
}