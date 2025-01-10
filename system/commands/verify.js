const requestData = require('../tornApi/createKey.js')

module.exports = async function(interaction) {
  requestData(0, 0, null, "verify", interaction.options.getString("key")).then((data) => {
    try {
      await interaction.guild.members.edit(interaction.user.id, {nick: data.name})
      if(data.faction.faction_id == 53051) {
        var vrole = interaction.member.guild.roles.cache.find(role => role.name === "Ember")
        interaction.member.roles.add(vrole)
        
        var vposition = interaction.member.guild.roles.cache.find(role => role.name === data.faction.position)
        interaction.member.roles.add(vposition)
      }
      else {
        var vrole = interaction.member.guild.roles.cache.find(role => role.name === "visitant")
        interaction.member.roles.add(vrole)
      }
    }catch(error) {
      console.error("exception in verify.js : ", error)
    }
  })
}
