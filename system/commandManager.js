const verify = require('./commands/verify.js')

module.exports = function(interaction) {
  if(interaction.commandName === "verify") {
    verify(interaction).then((response) => {
      console.log(response)
    })
  }
}
