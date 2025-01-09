require('dotenv').config()

const keyParts = [{
  beforeMacro: "https://api.torn.com/",
  beforeMicro: "?selections=",
  key: "/&key=",
  comment: "&comment=",
  keySerial: "null",

  macroOptions: ["user/"],
  microOptiobs: ["basic/"]
  // with ID
  // https://api.torn.com/MACRO/000000?selections=MICRO&key=KEY
  // without ID
  // https://api.torn.com/MACRO/?selections=basic&key=KEY
}]

module.exports = async function(Macro, Micro, UserId, reason, complement) {
  if(complement !== null) {
    keyParts.key = complement
  }
  else {
    // use process.env
  }
  console.log(await createkey(Macro, Micro, UserId))
}

function createkey(Macro, Micro, UserId, reason) {
  var key = keyParts.beforeMacro
  
  if(UserId == null) {
    key = key.concat(
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
  else {
    key = key.concat(
      keyParts.macroOptions[Macro], 
      keyParts.beforeMicro, 
      keyParts.microOptiobs[Micro], 
      keyParts.key,
      keyParts.keySerial,
      keyParts.comnent,
      reason
    )
  }
  return key
}
