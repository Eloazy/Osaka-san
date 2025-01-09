const { Client, GatewayIntentBits, Routes, PermissionsBitField } = require("discord.js")
require("dotenv").config()

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
})

client.on("ready", () => {
	console.log("Melted started")
	console.log("by Eloazy")
	console.log("---------------------")
})

client.on("interactionCreate", async (interaction) => {
	if(interaction.isCommand() && interaction.user.bot == false) {
		//commands
	}
})

client.login(process.env.token)
