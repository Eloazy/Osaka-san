module.exports = async function(key) {
    var Data = null
    await fetch(key).then(response => {
    if(!response.ok) {key_valid = false; return}
	return response.json()
	}).then(data => {Data = data})
    return Data
}
