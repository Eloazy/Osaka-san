const requestData = require('../tornApi/createKey.js')

module.exports = async function(interaction) {
  const r =requestData(0, 0, null, "verify", interaction.options.getString("verifyKey"))
  console.log(r)
}
