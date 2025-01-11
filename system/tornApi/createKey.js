require('dotenv').config({ path: '../../.env' })

const pull = require('./pullKey.js')
const keyParts = {
  beforeMacro: "https://api.torn.com/",
  beforeMicro: "?selections=",
  key: "&key=",
  comment: "&comment=",
  keySerial: "null",

  macroOptions: ["user/", "faction/"],
  microOptiobs: ["profile", "chain"]
  
  // with ID
  // https://api.torn.com/MACRO/000000?selections=MICRO&key=KEY
  // without ID
  // https://api.torn.com/MACRO/?selections=basic&key=KEY
}

module.exports = async function(Macro, Micro, UserId, reason, complement) {
  if(complement !== null) {
    keyParts.keySerial = complement
  }
  else {
    keyParts.keySerial = process.env.leaderkey
  }

  // return data
  return pull(await createkey(Macro, Micro, UserId, reason))
}

async function createkey(Macro, Micro, UserId, reason) {
  var key = await keyParts.beforeMacro
  
  if(UserId == null) {
    key = await key.concat(
      keyParts.macroOptions[Macro],
      keyParts.beforeMicro, 
      keyParts.microOptiobs[Micro], 
      keyParts.key,
      keyParts.keySerial,
      keyParts.comment,
      reason
    )
  }
  else {
    key = await key.concat(
      keyParts.macroOptions[Macro], 
      UserId,
      keyParts.beforeMicro, 
      keyParts.microOptiobs[Micro], 
      keyParts.key,
      keyParts.keySerial,
      keyParts.comnent,
      reason
    )
  }
  console.log(key)
  return key
}
