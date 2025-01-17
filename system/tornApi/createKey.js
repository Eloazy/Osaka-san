require('dotenv').config({ path: '../../.env' })

const pull = require('./pullKey.js')

const keyParts = {
  firstPart: "https://api.torn.com/v2/",
  keySerial: null,
  
  macroOptions: ["user/", "faction/"],
  microOptions: ["profile", "chain", "members"]
}

module.exports = async function(Macro, Micro, Id, reason, complement) {
  if(complement !== null) {
    keyParts.keySerial = complement
  }
  else {
    keyParts.keySerial = process.env.leaderkey
  }

  // return data
  return pull(await createkey(Macro, Micro, Id, reason), keyParts.keySerial)
}

async function createkey(Macro, Micro, Id, reason) {
  var key = await keyParts.firstPart

  if(Macro == "user/") {
    if(typeof(Id) == "number") {
      key = await key.concat(keyParts.macroOptions[Macro],'?selections=', keyParts.microOptions[Micro],'&id=', id)
    }
    else {
      key = await key.concat(keyParts.macroOptions[Macro],'?selections=', keyParts.microOptions[Micro])
    }
  }
  else {
    if(typeof(Id) == "number") {
      key = await key.concat(keyParts.macroOptions[Macro], Id,'/', keyParts.microOptions[Micro])
    }
    else {
      key = await key.concat(keyParts.macroOptions[Macro], keyParts.microOptions[Micro])
    }  
  }
  return key
}
