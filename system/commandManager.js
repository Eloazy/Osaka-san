const verify = require('./commands/verify.js')
const chain = require('./commands/chain.js')
const ally = require('./commands/ally.js')
const enemy = require('./commands/enemy.js')
const money = require('./commands/money.js')

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
  else if(interaction.options._subcommand == "ally") {
    ally(interaction).then((response) => {
      console.log(interaction.user.id+' | run '+interaction.commandName+' command')
    })
  }
  else if(interaction.options._subcommand == "enemy") {
    enemy(interaction, interaction.options.getNumber('id'), false).then((response) => {
      console.log(interaction.user.id+' | run '+interaction.commandName+' command')
    })
  }
  else if(interaction.options._subcommand == "stop") {
    enemy(interaction, null, true).then((response) => {
      console.log(interaction.user.id+' | run '+interaction.commandName+' command')
      interaction.reply('watcher stoped')
    })
  }
  else if(interaction.options._subcommand == "withdraw") {
    enemy(interaction, null, true).then((response) => {
      console.log(interaction.user.id+' | run '+interaction.commandName+' command')
      interaction.reply('watcher stoped')
    })
  }
  else if(interaction.options._subcommand == "loan") {
    interaction.reply('developing')
  }
  else {interaction.reply('this command has not registered or you dont have the perms to use')}
}
