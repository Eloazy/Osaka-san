const requestData = require('../tornApi/createKey.js')

module.exports = async function(interaction) {
  requestData(0, 0, null, "verify", interaction.options.getString("key")).then((data) => {
    try {
      
      await interaction.guild.members.edit(interaction.user.id, {nick: data.name})
      var vrole = interaction.member.guild.roles.cache.find(role => role.name === "Ember")
      interaction.member.roles.add(vrole)
      
    }catch(error) {
      console.error("exception in verify.js : ", error)
    }
  })
}
