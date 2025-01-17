module.exports = async function(link, key) {
    var Data = null
    await fetch(link, {
        headers: {
            accept: 'application/json',
            Authorization: `ApiKey ${key}`
        }
    }).then(response => {
        if(!response.ok) {key_valid = false; return}
        return response.json()
    }).then(data => {
        Data = data
    })
    return Data
}
