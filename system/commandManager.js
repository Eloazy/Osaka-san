const verify = require('./commands/verify.js')
const chain = require('./commands/chain.js')

module.exports = function(interaction) {
  if(interaction.commandName === "verify") {
    verify(interaction).then((response) => {
      console.log(interaction.user.id+' | run '+interaction.commandName+' command')
    })
  }
  else if(interaction.commandName === "chain") {
    chain(interaction).then((response) => {
      console.log(interaction.user.id+' | run '+interaction.commandName+' command')
    })
  }
}
