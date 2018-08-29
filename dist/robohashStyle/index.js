var Robohash = require('./robohash.js');

function getAvatar(hash){
	return Robohash.toDataUrl(hash);
}

module.exports = getAvatar;