const keyParts = [{
  beforeMacro: "https://api.torn.com/",
  complement: "/",
  beforeMicro: "?selections=",
  key: "&key=",
  comment: "&comment="

  // with ID
  // https://api.torn.com/MACRO/000000?selections=MICRO&key=KEY
  // without ID
  // https://api.torn.com/MACRO/?selections=basic&key=KEY
}]

module.exports = async function(Macro, Micro, UserId) {}
