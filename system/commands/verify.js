const requestData = require('../tornApi/createKey.js')

module.exports = async function(interaction) {
  requestData(0, 0, null, "verify", interaction.options.getString("key")).then((data) => {
    try {
      interaction.guild.members.edit(interaction.user.id, {nick: data.name}).catch((error) => {console.error('exception in verify => nickname change')})
      if(data.faction.faction_id == 53051) {
        var vrole = interaction.member.guild.roles.cache.find(role => role.name === "Ember").catch((error) => {console.log('Execption in role give : ', error)})
        interaction.member.roles.add(vrole)
        
        var vposition = interaction.member.guild.roles.cache.find(role => role.name === data.faction.position).catch((error) => {console.log('Execption in role give : ', error)})
        interaction.member.roles.add(vposition)
      }
      else {
        var vrole = interaction.member.guild.roles.cache.find(role => role.name === "visitant").catch((error) => {console.log('Execption in role give : ', error)})
        interaction.member.roles.add(vrole)
      }
      interaction.reply({ content: `thank you ${data.name}, you verifyed yourself, have a good day (serial deleted from our system)`, ephemeral: true})
    }catch(error) {
      console.error("exception in verify.js : ", error)
    }
  })
}
